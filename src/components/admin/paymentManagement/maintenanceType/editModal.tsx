import { FC } from 'react';
import { Box, Button } from '@mui/material';
import { Formik, Form } from 'formik';
import { MInputFormik } from '@/components/base/input/MInput';
import * as adminstyle from '@/components/admin/admin.style';
import { closeModal, newModal } from 'src/redux/actions/actions';
import { IModalBodyProps } from '@/components/shared/modals/types.modals';
import { RowTable } from '@/components/table/table_layout/types.table.layout';
import { useDispatch } from 'react-redux';
import {
    useAdminMaintenanceTypeCreateMutation,
    useAdminMaintenanceTypeUpdateMutation
} from 'src/graphql/generated';
import { maintenanceTypeInitialForm, maintenanceTypeValidationForm } from './data';
import { MSelectFormik } from '@/components/base/input/MSelect';
import { ACTIVE_STATUS } from 'src/data/options';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';

const UtilityRateEditModal: FC<IModalBodyProps<RowTable>> = ({ data: { row, refetch } }) => {
    const dispatch = useDispatch();
    const maintenanceTypeUpdate = useAdminMaintenanceTypeUpdateMutation();
    const maintenanceTypeCreate = useAdminMaintenanceTypeCreateMutation();
    const mutationErrorHandler = useMutationErrorHandler();

    const handleCancel = () => {
        dispatch(closeModal(UtilityRateEditModal.name));
    };

    const handleSubmitForm = async (data: any) => {
        if (row) {
            await maintenanceTypeUpdate.mutateAsync(
                {
                    input: {
                        id: row.id,
                        ...data
                    }
                },
                {
                    onError(err) {
                        mutationErrorHandler(err, 'maintenanceType_update');
                    }
                }
            );
        } else {
            await maintenanceTypeCreate.mutateAsync(
                {
                    input: data
                },
                {
                    onError(err) {
                        mutationErrorHandler(err, 'maintenanceType_create');
                    }
                }
            );
        }

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
                initialValues={maintenanceTypeInitialForm(row)}
                validationSchema={maintenanceTypeValidationForm}>
                <Form>
                    <adminstyle.modalFormRowWrapper>
                        <adminstyle.modalFormRowFieldWrapper>
                            <MInputFormik
                                style={{ width: '100%' }}
                                name="name"
                                label="Maintenance type"
                                placeholder="Test"
                                fullWidth
                            />
                        </adminstyle.modalFormRowFieldWrapper>

                        <adminstyle.modalFormRowFieldWrapper>
                            <MSelectFormik
                                options={ACTIVE_STATUS}
                                name="activeStatus"
                                label="Status"
                                placeholder="Status"
                            />
                        </adminstyle.modalFormRowFieldWrapper>
                    </adminstyle.modalFormRowWrapper>

                    <adminstyle.modalButtonGroup>
                        <Box>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={
                                    maintenanceTypeUpdate.isLoading ||
                                    maintenanceTypeCreate.isLoading
                                }>
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

const handleShowMaintenanceTypeEditModal = (refetch, row?: RowTable) => {
    return newModal({
        Body: UtilityRateEditModal,
        title: `${row ? 'Edit' : 'Add'} maintenance type`,
        topBar: true,
        id: UtilityRateEditModal.name,
        data: { refetch, row }
    });
};

export default handleShowMaintenanceTypeEditModal;
