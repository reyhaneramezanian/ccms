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
import { ACTIVE_STATUS } from 'src/data/options';
import { serviceTypeInitialForm, serviceTypeValidationSchema } from './data';
import {
    ServiceTypeInput,
    useAdminDepartmentTypeGetQuery,
    useAdminServiceTypeCreateMutation,
    useAdminServiceTypeUpdateMutation
} from 'src/graphql/generated';
import Utils from '@/utils/utils';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';

const ServiceTypeDepartmentConfigurationEditModal: FC<IModalBodyProps<RowTable>> = ({
    data: { row, refetch }
}) => {
    const dispatch = useDispatch();
    const serviceTypeCreate = useAdminServiceTypeCreateMutation();
    const serviceTypeUpdate = useAdminServiceTypeUpdateMutation();
    const departmentTypeQuery = useAdminDepartmentTypeGetQuery();
    const mutationErrorHandler = useMutationErrorHandler();

    const hasServiceType = typeof row !== 'undefined';

    const handleCancel = () => {
        dispatch(closeModal(ServiceTypeDepartmentConfigurationEditModal.name));
    };

    const handleAccept = async (newServiceTypeData: ServiceTypeInput) => {
        if (hasServiceType) {
            await serviceTypeUpdate.mutateAsync(
                {
                    input: {
                        id: row.id,
                        activeStatus: newServiceTypeData.activeStatus,
                        name: newServiceTypeData.name,
                        departmentId: newServiceTypeData.departmentId
                    }
                },
                {
                    onError(err) {
                        mutationErrorHandler(err, 'serviceType_update');
                    }
                }
            );
        } else {
            await serviceTypeCreate.mutateAsync(
                {
                    input: {
                        activeStatus: newServiceTypeData.activeStatus,
                        departmentId: newServiceTypeData.departmentId,
                        name: newServiceTypeData.name
                    }
                },
                {
                    onError(err) {
                        mutationErrorHandler(err, 'serviceType_create');
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
                initialValues={serviceTypeInitialForm(row)}
                validationSchema={serviceTypeValidationSchema}>
                <Form>
                    <adminstyle.modalFormRowWrapper>
                        <adminstyle.modalFormRowFieldWrapper>
                            <MInputFormik
                                style={{ width: '100%' }}
                                name="name"
                                label="Service type"
                                placeholder="Service type"
                                fullWidth
                            />
                        </adminstyle.modalFormRowFieldWrapper>

                        <adminstyle.modalFormRowFieldWrapper>
                            <MSelectFormik
                                options={Utils.convertQueryDataToArray(
                                    departmentTypeQuery?.data?.department_getDepartments?.result
                                        ?.items,
                                    departmentTypeQuery.isFetching
                                )}
                                name="departmentId"
                                label="Department"
                                placeholder="Select"
                            />
                        </adminstyle.modalFormRowFieldWrapper>

                        <adminstyle.modalFormRowFieldWrapper>
                            <MSelectFormik
                                options={ACTIVE_STATUS}
                                name="activeStatus"
                                label="Status"
                                placeholder="Select"
                            />
                        </adminstyle.modalFormRowFieldWrapper>
                    </adminstyle.modalFormRowWrapper>

                    <adminstyle.modalButtonGroup>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            disabled={serviceTypeCreate.isLoading || serviceTypeUpdate.isLoading}>
                            {!hasServiceType ? 'Add' : 'Save'}
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

const handleShowServiceTypeDepartmentConfigurationEditModal = (refetch, row?: RowTable) => {
    return newModal({
        Body: ServiceTypeDepartmentConfigurationEditModal,
        title: `${typeof row === 'undefined' ? 'Add' : 'Edit'} service type`,
        topBar: true,
        id: ServiceTypeDepartmentConfigurationEditModal.name,
        data: {
            refetch,
            row
        }
    });
};

export default handleShowServiceTypeDepartmentConfigurationEditModal;
