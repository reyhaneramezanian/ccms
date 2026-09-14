import { FC, useEffect, useState } from 'react';
import { Typography, Box } from '@mui/material';
import { Formik, Form } from 'formik';
import { MInputFormik } from '@/components/base/input/MInput';
import * as adminstyle from '@/components/admin/admin.style';
import { closeModal, newModal } from 'src/redux/actions/actions';
import { IModalBodyProps } from '@/components/shared/modals/types.modals';
import { RowTable } from '@/components/table/table_layout/types.table.layout';
import { useDispatch } from 'react-redux';
import { MSelectFormik } from '@/components/base/input/MSelect';
import { announcementBoardInitialForm, announcementBoardValidationForm } from './data';
import {
    AdminAnnouncementBoardCreateMutationVariables,
    useAdminAnnouncementBoardCreateMutation,
    useAdminAnnouncementBoardUpdateMutation,
    useAdminAnnouncementTypeGetQuery,
    useBlock_GetBlocksQuery,
    useComplex_GetComplexesQuery,
    useFlat_GetFlatsQuery,
    useFloor_GetFloorsQuery,
    UserType,
    useSecurityUserGetQuery
} from 'src/graphql/generated';
import defaultQueryOptions from 'src/data/queryOptions';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';
import { useGetUser } from 'src/auth/UserProvider';
import storageKeys from 'src/data/storageKeys';

const AnnouncementsBoardEditModal: FC<IModalBodyProps<RowTable>> = ({ data: { row, refetch } }) => {
    const dispatch = useDispatch();

    const [complexId, setComplexId] = useState<number | undefined>();
    const [blockId, setBlockId] = useState<number | undefined>();
    const [floorId, setFloorId] = useState<number | undefined>();
    const [flatId, setFlatId] = useState<number | undefined>();

    const announcementBoardUpdate = useAdminAnnouncementBoardUpdateMutation();
    const announcementBoardCreate = useAdminAnnouncementBoardCreateMutation();
    const mutationErrorHandler = useMutationErrorHandler();
    const user = useGetUser();
    const hasUser = typeof user === 'object' && user !== null;

    const securityQuery = useSecurityUserGetQuery(undefined, {
        enabled: hasUser && user.userType === UserType.Security
    });

    const complexesQuery = useComplex_GetComplexesQuery(
        { take: 1000 },
        {
            ...defaultQueryOptions,
            enabled: true
        }
    );
    const blocksQuery = useBlock_GetBlocksQuery(
        {
            take: 1000,
            where: {
                complexId: {
                    eq: complexId
                }
            }
        },
        {
            ...defaultQueryOptions,
            enabled: typeof complexId === 'number'
        }
    );

    const floorsQuery = useFloor_GetFloorsQuery(
        {
            take: 1000,
            where: {
                blockId: {
                    eq: blockId
                }
            }
        },
        {
            ...defaultQueryOptions,
            enabled: typeof blockId === 'number'
        }
    );
    const flatsQuery = useFlat_GetFlatsQuery(
        {
            take: 1000,
            where: {
                floorId: {
                    eq: floorId
                }
            }
        },
        {
            ...defaultQueryOptions,
            enabled: typeof floorId === 'number'
        }
    );
    const announcementsTypeQuery = useAdminAnnouncementTypeGetQuery(
        { take: 1000 },
        defaultQueryOptions
    );

    useEffect(() => {
        setComplexId(row?.complexId);
        setBlockId(row?.blockId);
        setFloorId(row?.floorId);
        setFlatId(row?.flatId);
    }, [row]);

    const handleCancel = () => {
        dispatch(closeModal(AnnouncementsBoardEditModal.name));
    };

    const handleSubmitForm = async (data: AdminAnnouncementBoardCreateMutationVariables) => {
        if (row) {
            await announcementBoardUpdate.mutateAsync(
                {
                    id: row.id,
                    announcementTypeId: data.announcementTypeId,
                    complexId:
                        complexId ||
                        securityQuery?.data?.user_getCurrentSecurity?.result?.complexId,
                    blockId: blockId,
                    floorId: floorId,
                    flatId: flatId,
                    date: data.date,
                    title: data.title,
                    message: data.message
                },
                {
                    onError(err) {
                        mutationErrorHandler(err, 'announcement_update');
                    }
                }
            );
        } else {
            await announcementBoardCreate.mutateAsync(
                {
                    announcementTypeId: data.announcementTypeId,
                    complexId:
                        complexId ||
                        securityQuery?.data?.user_getCurrentSecurity?.result?.complexId,
                    blockId: blockId,
                    floorId: floorId,
                    flatId: flatId,
                    date: data.date,
                    title: data.title,
                    message: data.message
                },
                {
                    onError(err) {
                        mutationErrorHandler(err, 'announcement_create');
                    }
                }
            );
        }

        if (refetch) {
            refetch();
        }

        dispatch(closeModal(AnnouncementsBoardEditModal.name));
    };

    function customOptions(
        isLoading,
        options: any = [],
        type: 'complex' | 'block' | 'floor' | 'flat' | 'announcementsType'
    ) {
        if (type === 'block' && typeof complexId === 'undefined') return [];
        if (type === 'floor' && typeof blockId === 'undefined') return [];
        if (type === 'flat' && typeof floorId === 'undefined') return [];

        return isLoading
            ? 'loading'
            : options.map((item) => ({
                  option: item.name,
                  value: item.id
              }));
    }

    const complexItems = customOptions(
        complexesQuery.isFetching,
        complexesQuery?.data?.complex_getComplexes?.result?.items,
        'complex'
    );
    const blockItems = customOptions(
        blocksQuery.isFetching,
        blocksQuery?.data?.block_getBlocks?.result?.items,
        'block'
    );
    const floorsItems = customOptions(
        floorsQuery.isFetching,
        floorsQuery?.data?.floor_getFloors?.result?.items,
        'floor'
    );
    const flatItems = customOptions(
        flatsQuery.isFetching,
        flatsQuery?.data?.flat_getFlats?.result?.items,
        'flat'
    );
    const announcementsItems = customOptions(
        announcementsTypeQuery.isFetching,
        announcementsTypeQuery?.data?.announcementType_getAnnouncementTypes?.result?.items,
        'announcementsType'
    );

    const initialValues = {
        message: row?.message || undefined,
        announcementTypeId: row?.announcementTypeId || undefined,
        date: row?.dateend || undefined,
        title: row?.title || undefined,
        complexId: row?.complexId || undefined,
        blockId: row?.blockId || undefined,
        floorId: row?.floorId || undefined,
        flatId: row?.flatId || undefined
    };

    if (!hasUser) return null;
    return (
        <Box style={{ width: 450, maxWidth: '100%' }}>
            <Formik
                enableReinitialize
                onSubmit={handleSubmitForm}
                initialValues={initialValues}
                validationSchema={announcementBoardValidationForm(user.userType)}>
                <Form>
                    <adminstyle.modalFormRowWrapper>
                        {user.userType !== UserType.Security && (
                            <>
                                {
                                    /*localStorage.getItem(storageKeys.usertype) !== 'BlockManager' ? (*/
                                    <>
                                        <adminstyle.modalFormRowFieldWrapper>
                                            <MSelectFormik
                                                options={complexItems}
                                                name="complexId"
                                                label="Complex"
                                                placeholder="A Complex"
                                                onChange={(_, option: any) => {
                                                    setComplexId(option.value);
                                                    setBlockId(undefined);
                                                    setFloorId(undefined);
                                                    setFlatId(undefined);
                                                }}
                                            />
                                        </adminstyle.modalFormRowFieldWrapper>

                                        <adminstyle.modalFormRowFieldWrapper>
                                            <MSelectFormik
                                                options={blockItems}
                                                name="blockId"
                                                label="Block"
                                                placeholder="2"
                                                onChange={(_, option: any) => {
                                                    setBlockId(option.value);
                                                    setFloorId(undefined);
                                                    setFlatId(undefined);
                                                }}
                                                necessary={
                                                    localStorage.getItem(storageKeys.usertype) ===
                                                    'BlockManager'
                                                        ? true
                                                        : false
                                                }
                                            />
                                        </adminstyle.modalFormRowFieldWrapper>
                                    </>
                                    /* ) : (
                                    ''
                                )*/
                                }
                                <adminstyle.modalFormRowFieldWrapper>
                                    <MSelectFormik
                                        options={floorsItems}
                                        name="floorId"
                                        label="Floor"
                                        placeholder="2"
                                        onChange={(_, option: any) => {
                                            setFloorId(option.value);
                                            setFlatId(undefined);
                                        }}
                                        necessary={false}
                                    />
                                </adminstyle.modalFormRowFieldWrapper>

                                <adminstyle.modalFormRowFieldWrapper>
                                    <MSelectFormik
                                        options={flatItems}
                                        name="flatId"
                                        label="Flat"
                                        placeholder="2"
                                        onChange={(_, option: any) => {
                                            setFlatId(option.value);
                                        }}
                                        necessary={false}
                                    />
                                </adminstyle.modalFormRowFieldWrapper>
                            </>
                        )}

                        <adminstyle.modalFormRowFieldWrapper>
                            <MSelectFormik
                                options={announcementsItems}
                                name="announcementTypeId"
                                label="Type"
                                placeholder="Select Type"
                            />
                        </adminstyle.modalFormRowFieldWrapper>

                        <adminstyle.modalFormRowFieldWrapper>
                            <MInputFormik
                                style={{ width: '100%' }}
                                name="date"
                                label="Date"
                                fullWidth
                                type="date"
                            />
                        </adminstyle.modalFormRowFieldWrapper>

                        <adminstyle.modalFormRowFieldWrapper>
                            <MInputFormik
                                style={{ width: '100%' }}
                                name="title"
                                label="Title"
                                fullWidth
                            />
                        </adminstyle.modalFormRowFieldWrapper>

                        <adminstyle.modalFormRowFieldWrapper>
                            <MInputFormik
                                style={{ width: '100%' }}
                                name="message"
                                label="Message"
                                fullWidth
                                necessary={false}
                            />
                        </adminstyle.modalFormRowFieldWrapper>
                    </adminstyle.modalFormRowWrapper>

                    <adminstyle.modalButtonGroup>
                        <Box>
                            <adminstyle.CancelButton
                                variant="contained"
                                type="submit"
                                disabled={
                                    announcementBoardCreate.isLoading ||
                                    announcementBoardUpdate.isLoading
                                }>
                                {row ? 'Save' : 'Add'}
                            </adminstyle.CancelButton>
                        </Box>

                        <Box>
                            <adminstyle.MyButton variant="contained" onClick={handleCancel}>
                                <Typography>Cancel</Typography>
                            </adminstyle.MyButton>
                        </Box>
                    </adminstyle.modalButtonGroup>
                </Form>
            </Formik>
        </Box>
    );
};

const handleShowAnnouncementsBoardEditModal = (refetch, row?: RowTable) => {
    return newModal({
        Body: AnnouncementsBoardEditModal,
        title: `${typeof row === 'undefined' ? 'Add' : 'Edit'} announcement `,
        topBar: true,
        id: AnnouncementsBoardEditModal.name,
        data: { refetch, row }
    });
};

export default handleShowAnnouncementsBoardEditModal;
