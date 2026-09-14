import { FC } from 'react';
import { Box, Button } from '@mui/material';
import { Formik, Form } from 'formik';
import { MInputFormik } from '@/components/base/input/MInput';
import * as adminstyle from '@/components/admin/admin.style';
import { closeModal, newModal } from 'src/redux/actions/actions';
import { IModalBodyProps } from '@/components/shared/modals/types.modals';
import { RowTable } from '@/components/table/table_layout/types.table.layout';
import { useDispatch } from 'react-redux';
import { useAdminUtilityRateUpdateMutation } from 'src/graphql/generated';
import { utilityRateInitialForm, utilityRateValidationForm } from './data';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';

const UtilityRateEditModal: FC<IModalBodyProps<RowTable>> = ({ data: { row, refetch } }) => {
    const dispatch = useDispatch();
    const utilityRateUpdate = useAdminUtilityRateUpdateMutation();
    const mutationErrorHandler = useMutationErrorHandler();

    const handleCancel = () => {
        dispatch(closeModal(UtilityRateEditModal.name));
    };

    const handleSubmitForm = async (data: any) => {
        await utilityRateUpdate.mutateAsync(
            {
                input: {
                    id: row.id,
                    utilityType: row.utilityType,
                    rate: +data.rate
                }
            },
            {
                onError(err) {
                    mutationErrorHandler(err, 'utilityRate_update');
                }
            }
        );

        if (typeof refetch === 'function') {
            refetch();
        }

        dispatch(closeModal(UtilityRateEditModal.name));
    };

    return (
        <Box style={{ width: 450, maxWidth: '100%' }}>
            <Formik
                enableReinitialize
                onSubmit={handleSubmitForm}
                initialValues={utilityRateInitialForm(row)}
                validationSchema={utilityRateValidationForm}>
                <Form>
                    <adminstyle.modalFormRowWrapper>
                        <adminstyle.modalFormRowFieldWrapper>
                            <MInputFormik
                                style={{ width: '100%' }}
                                name="rate"
                                type="number"
                                label="Amount(INR)"
                                placeholder="158.000.000"
                                fullWidth
                            />
                        </adminstyle.modalFormRowFieldWrapper>
                    </adminstyle.modalFormRowWrapper>

                    <adminstyle.modalButtonGroup>
                        <Box>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={utilityRateUpdate.isLoading}>
                                Save
                            </Button>
                        </Box>

                        <Box>
                            <Button variant="outlined" color="grey3" onClick={handleCancel}>
                                Cancel
                            </Button>
                        </Box>
                    </adminstyle.modalButtonGroup>
                </Form>
            </Formik>
        </Box>
    );
};

const handleUtilityRateEditModal = (refetch, row?: RowTable) => {
    return newModal({
        Body: UtilityRateEditModal,
        title: `Edit utility rate`,
        topBar: true,
        id: UtilityRateEditModal.name,
        data: { refetch, row }
    });
};

export default handleUtilityRateEditModal;
