import { FC } from 'react';
import { Typography, Box, Button } from '@mui/material';
import { Formik, Form } from 'formik';
import { MInputFormik } from '@/components/base/input/MInput';
import * as adminstyle from '@/components/admin/admin.style';
import { closeModal, newModal } from 'src/redux/actions/actions';
import { IModalBodyProps } from '@/components/shared/modals/types.modals';
import { RowTable } from '@/components/table/table_layout/types.table.layout';
import { useDispatch } from 'react-redux';
import { MSelectFormik } from '@/components/base/input/MSelect';
import { ACTIVE_STATUS } from 'src/data/options';
import { employeeTypeInitialForm, employeeTypeValidationSchema } from './data';
import {
    EmployeeTypeInput,
    useAdminEmployeeTypeCreateMutation,
    useAdminEmployeeTypeUpdateMutation
} from 'src/graphql/generated';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';

const EmployeeTypeDepartmentConfigurationEditModal: FC<IModalBodyProps<RowTable>> = ({
    data: { row, refetch }
}) => {
    const dispatch = useDispatch();
    const employeeTypeCreate = useAdminEmployeeTypeCreateMutation();
    const employeeTypeUpdate = useAdminEmployeeTypeUpdateMutation();
    const mutationErrorHandler = useMutationErrorHandler();

    const hasEmployeeType = typeof row !== 'undefined';

    const handleCancel = () => {
        dispatch(closeModal(EmployeeTypeDepartmentConfigurationEditModal.name));
    };

    const handleAccept = async (newEmployeeTypeData: EmployeeTypeInput) => {
        if (hasEmployeeType) {
            await employeeTypeUpdate.mutateAsync(
                {
                    input: {
                        id: row.id,
                        name: newEmployeeTypeData.name,
                        activeStatus: newEmployeeTypeData.activeStatus
                    }
                },
                {
                    onError(err) {
                        mutationErrorHandler(err, 'employeeType_update');
                    }
                }
            );
        } else {
            await employeeTypeCreate.mutateAsync(
                {
                    input: newEmployeeTypeData
                },
                {
                    onError(err) {
                        mutationErrorHandler(err, 'employeeType_create');
                    }
                }
            );
        }

        if (typeof refetch === 'function') {
            refetch();
        }

        handleCancel();
    };

    return (
        <Box style={{ width: 450, maxWidth: '100%' }}>
            <Formik
                enableReinitialize
                onSubmit={handleAccept}
                initialValues={employeeTypeInitialForm(row)}
                validationSchema={employeeTypeValidationSchema}>
                <Form>
                    <adminstyle.modalFormRowWrapper>
                        <adminstyle.modalFormRowFieldWrapper>
                            <MInputFormik
                                style={{ width: '100%' }}
                                name="name"
                                label="Employment type"
                                placeholder="Employment type"
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
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            disabled={employeeTypeCreate.isLoading || employeeTypeUpdate.isLoading}>
                            {!hasEmployeeType ? 'Add' : 'Save'}
                        </Button>

                        <Button variant="outlined" color="grey3" onClick={handleCancel}>
                            Cancel
                        </Button>
                    </adminstyle.modalButtonGroup>
                </Form>
            </Formik>
        </Box>
    );
};

const handleShowEmployeeTypeDepartmentConfigurationEditModal = (refetch, row?: RowTable) => {
    return newModal({
        Body: EmployeeTypeDepartmentConfigurationEditModal,
        title: `${typeof row === 'undefined' ? 'Add' : 'Edit'} employment `,
        topBar: true,
        id: EmployeeTypeDepartmentConfigurationEditModal.name,
        data: {
            row,
            refetch
        }
    });
};

export default handleShowEmployeeTypeDepartmentConfigurationEditModal;
