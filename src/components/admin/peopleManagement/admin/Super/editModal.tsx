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
import { useUser_UpdateSuperAdminProfileMutation } from 'src/graphql/generated';
import Down from 'src/assets/icons/Down';
import { PHONE_VALIDATIONIndia, PHONE_VALIDATIONUsa } from '@/utils/helper/regexes';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';
import { LoadingButton } from '@mui/lab';
import { GenderOption } from 'src/data/options';

const PeaplemanagementAddModal: FC<IModalBodyProps<RowTable>> = ({ data: { row, refetch } }) => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient();

    const { mutate, isLoading } = useUser_UpdateSuperAdminProfileMutation();
    const mutationErrorHandler = useMutationErrorHandler();

    const handleCancel = () => {
        dispatch(closeModal(PeaplemanagementAddModal.name));
    };

    const handelsave = (data) => {
        debugger;
        mutate(
            {
                input: {
                    activeStatus: data.Status as any,
                    firstName: data.firstName.trim(),
                    lastName: data.lastName.trim(),
                    dateOfBirth: data.dateOfBirth,
                    gender: data.gender,
                    phoneNumber: data.phoneNumber,
                    middleName: data.middleName.trim(),
                    id: row.id,
                    photoUrl: row.photoUrl
                }
            },
            {
                onSuccess: () => {
                    enqueueSnackbar('Operation was successful!', { variant: 'success' }),
                        dispatch(closeModal(PeaplemanagementAddModal.name)),
                        queryClient.refetchQueries('user_getSuperAdmins');
                },
                onError: (err) => {
                    mutationErrorHandler(err, 'user_updateSuperAdminProfile');
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
                    email: row.Email,
                    firstName: row.firstName,
                    lastName: row.lastName,
                    gender: row.gender,
                    dateOfBirth: row.dateOfBirth,
                    phoneNumber: row.Phone,
                    middleName: row.middleName,
                    Status: row.activeStatus
                }}
                validationSchema={Yup.object({
                    firstName: Yup.string().required('This field is required'),
                    lastName: Yup.string().required('This field is required'),
                    Status: Yup.string().required('This field is required'),
                    dateOfBirth: Yup.date()
                        .max(new Date(), 'Date can not be in the future')
                        .required('This field is required'),

                    phoneNumber: Yup.string()
                        .required('This field is required')
                        .matches(PHONE_VALIDATIONIndia, 'Please enter invalid number')
                })}>
                <Form>
                    <adminstyle.modalFormRowWrapper>
                        <adminstyle.modalFormRowFieldWrapper>
                            <MInputFormik
                                name="firstName"
                                label="First name"
                                placeholder="First name"
                            />
                        </adminstyle.modalFormRowFieldWrapper>
                        <adminstyle.modalFormRowFieldWrapper>
                            <MInputFormik
                                name="middleName"
                                label="Middle name"
                                placeholder="Middle name"
                                necessary={false}
                            />
                        </adminstyle.modalFormRowFieldWrapper>
                        <adminstyle.modalFormRowFieldWrapper>
                            <MInputFormik name="lastName" label="Surname" placeholder="Surname" />
                        </adminstyle.modalFormRowFieldWrapper>
                        <adminstyle.modalFormRowFieldWrapper>
                            <MSelectFormik
                                name="gender"
                                label="Gender"
                                options={GenderOption}
                                necessary={false}
                            />
                        </adminstyle.modalFormRowFieldWrapper>
                        <adminstyle.modalFormRowFieldWrapper>
                            <MInputFormik
                                style={{ width: '100%' }}
                                name="dateOfBirth"
                                label="Date of birth"
                                placeholder="Date of birth"
                                fullWidth
                                type="date"
                            />
                        </adminstyle.modalFormRowFieldWrapper>
                        <adminstyle.modalFormRowFieldWrapper>
                            <MInputFormik
                                inputMode="numeric"
                                name="phoneNumber"
                                label="Phone number"
                                placeholder="Phone"
                            />
                        </adminstyle.modalFormRowFieldWrapper>
                        <adminstyle.modalFormRowFieldWrapper>
                            <MInputFormik
                                disabled
                                name="email"
                                label="Email address"
                                placeholder="maria.smith@gmail.com"
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

const handleShowPeapleAddModal = (refetch, row?: RowTable) => {
    return newModal({
        Body: PeaplemanagementAddModal,
        title: 'Edit super admin',
        topBar: true,
        id: PeaplemanagementAddModal.name,
        data: { row, refetch }
    });
};

export default handleShowPeapleAddModal;
