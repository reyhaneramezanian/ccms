import { FC } from 'react';
import { Box, Button } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { MInputFormik } from '@/components/base/input/MInput';
import * as adminstyle from '@/components/admin/admin.style';
import { closeModal, newModal } from 'src/redux/actions/actions';
import { IModalBodyProps } from '@/components/shared/modals/types.modals';
import { RowTable } from '@/components/table/table_layout/types.table.layout';
import { useDispatch } from 'react-redux';
import { MSelectFormik } from '@/components/base/input/MSelect';
import {
    DepartmentInput,
    useAdminDepartmentTypeCreateMutation,
    useAdminDepartmentTypeUpdateMutation
} from 'src/graphql/generated';
import { departmentTypeInitialForm, departmentTypeValidationSchema } from './data';
import { ACTIVE_STATUS } from 'src/data/options';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';

const DepartmentConfigurationEditModal: FC<IModalBodyProps<RowTable>> = ({
    data: { row, refetch }
}) => {
    const dispatch = useDispatch();
    const mutationErrorHandler = useMutationErrorHandler();
    const departmentTypeCreate = useAdminDepartmentTypeCreateMutation();
    const departmentTypeUpdate = useAdminDepartmentTypeUpdateMutation();

    const hasDepartmentType = typeof row !== 'undefined';

    const handleCancel = () => {
        dispatch(closeModal(DepartmentConfigurationEditModal.name));
    };

    const handleAccept = async (newDepartmentTypeData: DepartmentInput) => {
        if (hasDepartmentType) {
            await departmentTypeUpdate.mutateAsync(
                {
                    input: {
                        id: row.id,
                        ...newDepartmentTypeData
                    }
                },
                {
                    onError(err) {
                        mutationErrorHandler(err, 'department_update');
                    }
                }
            );
        } else {
            await departmentTypeCreate.mutateAsync(
                { input: newDepartmentTypeData },
                {
                    onError(err) {
                        mutationErrorHandler(err, 'department_create');
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
                initialValues={departmentTypeInitialForm(row)}
                validationSchema={departmentTypeValidationSchema}>
                <Form>
                    <adminstyle.modalFormRowWrapper>
                        <adminstyle.modalFormRowFieldWrapper>
                            <MInputFormik
                                style={{ width: '100%' }}
                                name="name"
                                label="Department type"
                                placeholder="Department type"
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
                            disabled={
                                departmentTypeCreate.isLoading || departmentTypeUpdate.isLoading
                            }>
                            {!hasDepartmentType ? 'Add' : 'Save'}
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

const handleShowDepartmentConfigurationEditModal = (refetch, row?: RowTable) => {
    return newModal({
        Body: DepartmentConfigurationEditModal,
        title: `${typeof row === 'undefined' ? 'Add' : 'Edit'} department`,
        topBar: true,
        id: DepartmentConfigurationEditModal.name,
        data: { row, refetch }
    });
};

export default handleShowDepartmentConfigurationEditModal;
