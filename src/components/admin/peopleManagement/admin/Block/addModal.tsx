import { Formik, Form, FieldArray, Field, useField } from 'formik';
import * as Yup from 'yup';
import { MInputFormik } from '@/components/base/input/MInput';
import * as adminstyle from '@/components/admin/admin.style';
import { closeModal, newModal } from 'src/redux/actions/actions';
import { IModalBodyProps } from '@/components/shared/modals/types.modals';
import { FC } from 'react';
import { Select, Checkbox, Grid, FormControlLabel, Button, Box, MenuItem } from '@mui/material';
import useManageTab from 'src/hooks/useManageTab';
import React, { useEffect, useState } from 'react';
import Delete from 'src/assets/icons/Deletelist';
import { Custom } from 'src/components/shared/share/tick-close';
import { RowTable } from '@/components/table/table_layout/types.table.layout';
import { useQueryClient, QueryClient } from 'react-query';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { MSelectFormik } from '@/components/base/input/MSelect';
import {
    useBlockManager_CreateMutation,
    useComplex_GetComplexesQuery,
    useBlock_GetBlocksQuery,
    useResidentFlat_GetResidentFlatsQuery,
    useTotalbuildingQuery
} from 'src/graphql/generated';
import Down from 'src/assets/icons/Down';
import { PHONE_VALIDATIONIndia, PHONE_VALIDATIONUsa } from '@/utils/helper/regexes';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';
import { LoadingButton } from '@mui/lab';

const PeaplemanagementAddModal: FC<IModalBodyProps<RowTable>> = ({ data }) => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient();

    const { mutate, isLoading } = useBlockManager_CreateMutation();
    const mutationErrorHandler = useMutationErrorHandler();

    const [complexlist, setcomplexlist] = useState([]);
    const [blocklist, setblocklist] = useState([[]]);
    const [complexitem, setcomplexitem] = useState([]);
    const [Residentitem, setResidentitem] = useState([]);
    const [Blockitem, setBlockitem] = useState(0);

    const { data: datacomplex } = useComplex_GetComplexesQuery({
        take: 1000,
        where: { activeStatus: { eq: 'ACTIVE' as any } }
    });
    const { data: dataBlock } = useBlock_GetBlocksQuery({
        take: 10000,
        where: {
            complexId: {
                eq: complexitem
            },
            activeStatus: { eq: 'ACTIVE' as any }
        }
    });
    const { data: dataResident } = useResidentFlat_GetResidentFlatsQuery({
        take: 10000,
        where: {
            flat: {
                floor: {
                    blockId: {
                        eq: Blockitem
                    }
                }
            }
        }
    });

    useEffect(() => {
        var js = [],
            jsblocklist = [],
            jsblock = [],
            jsResident = [],
            sw = 0;

        datacomplex?.complex_getComplexes?.result?.items.forEach((item) => {
            js.push({ option: item.name, value: item.id });
        });
        if (dataBlock?.block_getBlocks?.result?.items.length !== 0) {
            var sw = 0;
            dataBlock?.block_getBlocks?.result?.items.forEach((item) => {
                jsblock.push({ option: item.name, value: item.id });
            });
        }
        dataResident?.residentFlat_getResidentFlats?.result?.items.map((item) => {
            jsResident.push({
                option: item.resident.firstName + ' ' + item.resident.lastName,
                value: item.resident.id
            });
        });

        setcomplexlist(js);
        setblocklist(jsblock);
        setResidentitem(jsResident);
    }, [datacomplex, dataBlock, dataResident]);

    const handleCancel = () => {
        dispatch(closeModal(PeaplemanagementAddModal.name));
    };

    const handelsave = (e) => {
        mutate(
            {
                input: {
                    blockId: Blockitem,
                    activeStatus: e.Status,
                    residentId: e.Resident
                }
            },
            {
                onSuccess: () => {
                    enqueueSnackbar('Operation was successful!', { variant: 'success' }),
                        dispatch(closeModal(PeaplemanagementAddModal.name)),
                        queryClient.refetchQueries('blockManager_getBlockManagers');
                },
                onError: (err) => {
                    mutationErrorHandler(err, 'blockManager_create');
                }
            }
        );
    };
    const onchangeComplex = (e) => {
        setcomplexitem(e.target.value);
        setBlockitem(0);
    };
    const onchangeBlock = (e) => {
        setBlockitem(e.target.value);
    };
    return (
        <adminstyle.modalbox>
            <Formik
                enableReinitialize
                onSubmit={(v, handlers) => {
                    handelsave(v);
                }}
                initialValues={{ Resident: '', Status: '' }}
                validationSchema={Yup.object({
                    Block: Yup.string().required('This field is required'),
                    Status: Yup.string().required('This field is required'),
                    Complex: Yup.string().required('This field is required'),
                    Resident: Yup.string().required('This field is required')
                })}>
                <Form>
                    <adminstyle.modalFormRowWrapper>
                        <adminstyle.modalFormRowFieldWrapper>
                            <Field
                                as={FormControlLabel}
                                type="select"
                                name="Complex"
                                onChange={onchangeComplex}
                                style={{ width: '100%', margin: '4px 0 0 0' }}
                                control={<MSelectFormik options={complexlist} label="Complex" />}
                            />
                        </adminstyle.modalFormRowFieldWrapper>
                        <adminstyle.modalFormRowFieldWrapper>
                            <Field
                                as={FormControlLabel}
                                type="select"
                                name="Block"
                                onChange={onchangeBlock}
                                style={{ width: '100%', margin: '4px 0 0 0' }}
                                control={<MSelectFormik options={blocklist} label="Block" />}
                            />
                        </adminstyle.modalFormRowFieldWrapper>
                        <adminstyle.modalFormRowFieldWrapper>
                            <MSelectFormik
                                options={Residentitem}
                                name="Resident"
                                label="Resident name"
                                placeholder="Resident name"
                            />
                        </adminstyle.modalFormRowFieldWrapper>
                        <adminstyle.modalFormRowFieldWrapper>
                            <MSelectFormik
                                options={[
                                    {
                                        option: 'Active',
                                        value: 'ACTIVE'
                                    },
                                    {
                                        option: 'Inactivate',
                                        value: 'INACTIVE'
                                    }
                                ]}
                                name="Status"
                                label="Status"
                                placeholder="Status"
                            />
                        </adminstyle.modalFormRowFieldWrapper>
                    </adminstyle.modalFormRowWrapper>
                    <adminstyle.modalButtonGroup>
                        <Box>
                            <LoadingButton
                                loading={isLoading}
                                type="submit"
                                variant="contained"
                                color="primary">
                                Add
                            </LoadingButton>
                        </Box>

                        <Box>
                            <Button variant="outlined" color="grey3" onClick={handleCancel}>
                                Cancel
                            </Button>
                        </Box>
                    </adminstyle.modalButtonGroup>
                </Form>
            </Formik>
        </adminstyle.modalbox>
    );
};

const handleShowPeapleAddModal = (data?: RowTable) => {
    return newModal({
        Body: PeaplemanagementAddModal,
        title: 'Add block manager',
        topBar: true,
        id: PeaplemanagementAddModal.name,
        data
    });
};

export default handleShowPeapleAddModal;
