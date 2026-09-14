import { FC } from 'react';
import { Typography, Box, Button } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { MInputFormik } from '@/components/base/input/MInput';
import * as adminstyle from '@/components/admin/admin.style';
import { closeModal, newModal } from 'src/redux/actions/actions';
import { IModalBodyProps } from '@/components/shared/modals/types.modals';
import { RowTable } from '@/components/table/table_layout/types.table.layout';
import { useDispatch } from 'react-redux';
import { MSelectFormik } from '@/components/base/input/MSelect';
import { useQueryClient, QueryClient } from 'react-query';
import { useSnackbar } from 'notistack';
import { useComplaintType_UpdateMutation } from 'src/graphql/generated';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';
import { LoadingButton } from '@mui/lab';

const ComplaintEditModal: FC<IModalBodyProps<RowTable>> = ({ data: { row, refetch } }) => {
    const dispatch = useDispatch();
    const { mutate, isLoading } = useComplaintType_UpdateMutation();
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient();
    const mutationErrorHandler = useMutationErrorHandler();

    const handleCancel = () => {
        dispatch(closeModal(ComplaintEditModal.name));
    };
    const handelsave = (e) => {
        mutate(
            {
                input: {
                    name: e.ComplaintType,
                    id: Number(row.id),
                    activeStatus: e.Status
                }
            },
            {
                onSuccess: () => {
                    enqueueSnackbar('Operation was successful!', { variant: 'success' }),
                        queryClient.refetchQueries('complaintType_getComplaintTypes');
                    dispatch(closeModal(ComplaintEditModal.name));
                },
                onError: (err) => {
                    mutationErrorHandler(err, 'complaintType_update');
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
                initialValues={{ ComplaintType: row.name, Status: row.activeStatus }}
                validationSchema={Yup.object({
                    ComplaintType: Yup.string().required('This field is required'),
                    Status: Yup.string().required('This field is required')
                })}>
                <Form>
                    <adminstyle.modalFormRowWrapper>
                        <adminstyle.modalFormRowFieldWrapper>
                            <MInputFormik
                                style={{ width: '100%' }}
                                name="ComplaintType"
                                label="Complaint type"
                                placeholder="Complaint type"
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

const handleShowComplaintEditModal = (refetch, row?: RowTable) => {
    return newModal({
        Body: ComplaintEditModal,
        title: `${typeof row === 'undefined' ? 'Add' : 'Edit'} complaint type`,
        topBar: true,
        id: ComplaintEditModal.name,
        data: { row, refetch }
    });
};

export default handleShowComplaintEditModal;
