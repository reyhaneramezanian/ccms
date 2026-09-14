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
import { useComplaint_UpdateMutation } from 'src/graphql/generated';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';
import { LoadingButton } from '@mui/lab';

const ComplaintEditModal: FC<IModalBodyProps<RowTable>> = ({ data: { row, refetch } }) => {
    const dispatch = useDispatch();
    const { mutate, isLoading } = useComplaint_UpdateMutation();
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient();
    const mutationErrorHandler = useMutationErrorHandler();

    const handleCancel = () => {
        dispatch(closeModal(ComplaintEditModal.name));
    };
    const handelsave = (e) => {
        debugger;
        mutate(
            {
                input: {
                    complaintStatus: e.Status as any,
                    comment: e.Comment,
                    id: Number(row.id),
                    flatId: row.flatId,
                    date: row.date,
                    title: row.Title,
                    message: row.Message,
                    complaintTypeId: row.complaintTypeId
                }
            },
            {
                onSuccess: () => {
                    enqueueSnackbar('Operation was successful!', { variant: 'success' }),
                        dispatch(closeModal(ComplaintEditModal.name));
                    queryClient.refetchQueries('complaint_getComplaints');
                },
                onError: (err) => {
                    mutationErrorHandler(err, 'complaint_update');
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
                    Type: row.Type,
                    Date: row.date,
                    Title: row.Title,
                    Message: row.Message,
                    Status: row.Status,
                    Comment: row.comment
                }}
                validationSchema={Yup.object({
                    // Comment: Yup.string().required('This field is required'),
                    Status: Yup.string().required('This field is required')
                })}>
                <Form>
                    <adminstyle.modalFormRowWrapper>
                        <adminstyle.modalFormRowFieldWrapper>
                            <MInputFormik
                                style={{ width: '100%' }}
                                name="Type"
                                disabled
                                label="Type"
                                placeholder="Type"
                                fullWidth
                            />
                        </adminstyle.modalFormRowFieldWrapper>
                        <adminstyle.modalFormRowFieldWrapper>
                            <MInputFormik
                                style={{ width: '100%' }}
                                name="Date"
                                disabled
                                label="Date"
                                placeholder="Date"
                                fullWidth
                                type="date"
                            />
                        </adminstyle.modalFormRowFieldWrapper>
                        <adminstyle.modalFormRowFieldWrapper>
                            <MInputFormik
                                style={{ width: '100%' }}
                                name="Title"
                                disabled
                                label="Title"
                                placeholder="Title"
                                fullWidth
                            />
                        </adminstyle.modalFormRowFieldWrapper>
                        <adminstyle.modalFormRowFieldWrapper>
                            <MInputFormik
                                style={{ width: '100%' }}
                                name="Message"
                                disabled
                                label="Message"
                                placeholder="Message"
                                fullWidth
                                necessary={false}
                            />
                        </adminstyle.modalFormRowFieldWrapper>
                        <adminstyle.modalFormRowFieldWrapper>
                            <MSelectFormik
                                options={[
                                    { option: 'Pending', value: 'PENDING' },
                                    {
                                        option: 'In progress',
                                        value: 'IN_PROGRESS'
                                    },
                                    { option: 'Completed', value: 'COMPLETED' }
                                ]}
                                name="Status"
                                label="Status"
                                placeholder="Status"
                            />
                        </adminstyle.modalFormRowFieldWrapper>
                        <adminstyle.modalFormRowFieldWrapper>
                            <MInputFormik
                                style={{ width: '100%' }}
                                name="Comment"
                                label="Comment"
                                placeholder="Comment "
                                fullWidth
                                necessary={false}
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
        title: `${typeof row === 'undefined' ? 'Add' : 'Edit'} complaint`,
        topBar: true,
        id: ComplaintEditModal.name,
        data: { row, refetch }
    });
};

export default handleShowComplaintEditModal;
