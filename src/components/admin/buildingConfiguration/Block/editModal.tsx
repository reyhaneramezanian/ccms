import { FC } from 'react';
import { Typography, Box, Button } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { MInputFormik } from '@/components/base/input/MInput';
import * as adminstyle from '@/components/admin/admin.style';
import { closeModal, newModal } from 'src/redux/actions/actions';
import { IModalBodyProps } from '@/components/shared/modals/types.modals';
import { RowTable } from '@/components/table/table_layout/types.table.layout';
import { MSelectFormik } from '@/components/base/input/MSelect';
import * as s from '../@styles';
import { useQueryClient, QueryClient } from 'react-query';
import { useSnackbar } from 'notistack';
import {
    useBlock_UpdateMutation,
    useComplex_GetComplexesQuery,
    useTotalComplexblockfloorflatQuery,
    SortEnumType
} from 'src/graphql/generated';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';
import { LoadingButton } from '@mui/lab';

const BuildingConfigurationEditModal: FC<IModalBodyProps<RowTable>> = ({
    data: { row, refetch }
}) => {
    const dispatch = useDispatch();
    const { mutate, isLoading } = useBlock_UpdateMutation();
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient();
    const [complexlist, setcomplexlist] = useState([]);
    const [complexitem, setcomplexitem] = useState(row.Complex);
    const mutationErrorHandler = useMutationErrorHandler();
    const { data: totalbuilding } = useTotalComplexblockfloorflatQuery();

    const handleCancel = () => {
        dispatch(closeModal(BuildingConfigurationEditModal.name));
    };

    const { data: datacomplex } = useComplex_GetComplexesQuery({
        take: totalbuilding?.complex_getComplexes?.result?.totalCount,
        order: { id: SortEnumType.Desc }
    });

    useEffect(() => {
        var js = [];
        datacomplex?.complex_getComplexes?.result?.items.map((item) => {
            js.push({ option: item.name, value: item.id });
            if (row.Complex == item.name) setcomplexitem(item.id);
        });
        setcomplexlist(js);
    }, [datacomplex]);
    const handelsave = (e) => {
        mutate(
            {
                id: Number(row.id),
                input: {
                    name: e.Block,
                    activeStatus: e.Status,
                    complexId: e.Complex,
                    id: Number(row.id)
                }
            },
            {
                onSuccess: () => {
                    enqueueSnackbar('Operation was successful!', { variant: 'success' }),
                        queryClient.refetchQueries('block_getBlocks');
                    dispatch(closeModal(BuildingConfigurationEditModal.name));
                },
                onError: (err) => {
                    mutationErrorHandler(err, 'block_update');
                }
            }
        );
    };

    return (
        <adminstyle.modalbox>
            <Formik
                enableReinitialize
                onSubmit={(v, handlers) => {
                    handelsave(v);
                }}
                initialValues={{
                    Complex: complexitem,
                    Status: row.activeStatus,
                    Block: row.Block
                }}
                validationSchema={Yup.object({
                    Complex: Yup.string().required('This field is required'),
                    Status: Yup.string().required('This field is required'),
                    Block: Yup.string().required('This field is required')
                })}>
                <Form>
                    <adminstyle.modalFormRowWrapper>
                        <adminstyle.modalFormRowFieldWrapper>
                            <MSelectFormik
                                options={complexlist}
                                name="Complex"
                                label="Complex"
                                placeholder="Complex"
                            />
                        </adminstyle.modalFormRowFieldWrapper>
                        <adminstyle.modalFormRowFieldWrapper>
                            <MInputFormik
                                style={{ width: '100%' }}
                                name="Block"
                                label="Block"
                                placeholder="Block"
                                fullWidth
                            />
                        </adminstyle.modalFormRowFieldWrapper>
                        <adminstyle.modalFormRowFieldWrapper>
                            <MSelectFormik
                                options={[
                                    { option: 'Active', value: 'ACTIVE' },
                                    { option: 'Inactivate', value: 'INACTIVE' }
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
                                Save
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

const handleShowBuildingConfigurationEditModal = (refetch, row?: RowTable) => {
    return newModal({
        Body: BuildingConfigurationEditModal,
        title: `${typeof row === 'undefined' ? 'Add' : 'Edit'} block`,
        topBar: true,
        id: BuildingConfigurationEditModal.name,
        data: { row, refetch }
    });
};

export default handleShowBuildingConfigurationEditModal;
