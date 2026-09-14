import { FC } from 'react';
import { Typography, Box, Button } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { MInputFormik } from '@/components/base/input/MInput';
import * as residentstyle from '@/components/resident/resident.style';
import { closeModal, newModal } from 'src/redux/actions/actions';
import { IModalBodyProps } from '@/components/shared/modals/types.modals';
import { RowTable } from '@/components/table/table_layout/types.table.layout';
import { MSelectFormik } from '@/components/base/input/MSelect';
import * as s from '../@styles';
import { useQueryClient, QueryClient } from 'react-query';
import { useSnackbar } from 'notistack';
import {
    useUser_UpdateAuthorizedUserMutation,
    useUser_GetCurrentResidentQuery
} from 'src/graphql/generated';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { PHONE_VALIDATIONIndia, PHONE_VALIDATIONUsa } from '@/utils/helper/regexes';
import storageKeys from 'src/data/storageKeys';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';
import { LoadingButton } from '@mui/lab';

const AuthorizedEditModal: FC<IModalBodyProps<RowTable>> = ({ data: { row, refetch } }) => {
    const dispatch = useDispatch();
    const mutationErrorHandler = useMutationErrorHandler();

    const { enqueueSnackbar } = useSnackbar();
    const { mutate, isLoading } = useUser_UpdateAuthorizedUserMutation();
    const queryClient = useQueryClient();
    const { data: datauser } = useUser_GetCurrentResidentQuery({});
    const handleCancel = () => {
        dispatch(closeModal(AuthorizedEditModal.name));
    };
    const handelsave = (e) => {
        mutate(
            {
                input: {
                    photoUrl: row.photoUrl,
                    relation: e.relation,
                    gender: e.gender,
                    activeStatus: e.activeStatus,
                    //email: e.email,
                    firstName: e.firstName,
                    lastName: e.lastName,
                    phoneNumber: e.phoneNumber,
                    dateOfBirth: e.dateOfBirth,
                    residentFlatId: Number(localStorage.getItem(storageKeys.ResidentFlatId)),
                    id: Number(row.id)
                }
            },
            {
                onSuccess: () => {
                    enqueueSnackbar('Operation was successful!', {
                        variant: 'success'
                    }),
                        dispatch(closeModal(AuthorizedEditModal.name));
                    queryClient.refetchQueries('user_getAuthorizedUsers');
                },
                onError: (err) => {
                    mutationErrorHandler(err, 'user_updateAuthorizedUser');
                }
            }
        );
    };
    return (
        <residentstyle.modalbox>
            <Formik
                enableReinitialize
                onSubmit={(v, handlers) => {
                    handelsave(v);
                }}
                initialValues={{
                    firstName: row.firstName,
                    lastName: row.lastName,
                    phoneNumber: row.Phone,
                    email: row.email,
                    gender: row.gender,
                    dateOfBirth: row.dateOfBirth.slice(0, 10),
                    activeStatus: row.activeStatus[0],
                    relation: row.relation
                }}
                validationSchema={Yup.object({
                    firstName: Yup.string().required('This field is required'),
                    lastName: Yup.string().required('This field is required'),
                    phoneNumber: Yup.string()
                        .required('This field is required')
                        .matches(PHONE_VALIDATIONIndia, 'Please enter invalid number'),
                    email: Yup.string()
                        .required('This field is required')
                        .email('Must be a valid email'),
                    //gender: Yup.string().required('This field is required'),
                    dateOfBirth: Yup.date()
                        .max(new Date(), 'Date can not be in the future')
                        .required('This field is required'),
                    activeStatus: Yup.string().required('This field is required'),
                    relation: Yup.string().required('This field is required')
                })}>
                <Form>
                    <residentstyle.modalFormRowWrapper>
                        <residentstyle.rowprofile>
                            <MInputFormik
                                name="firstName"
                                label="First name"
                                placeholder="First name"
                                fullWidth
                            />
                        </residentstyle.rowprofile>
                        <residentstyle.rowprofile>
                            <MInputFormik
                                name="lastName"
                                label="Surname"
                                placeholder="Surname"
                                fullWidth
                            />
                        </residentstyle.rowprofile>
                        <residentstyle.rowprofile>
                            <MSelectFormik
                                options={[
                                    { option: 'None', value: null },
                                    { option: 'Male', value: 'MALE' },
                                    { option: 'Female', value: 'FEMALE' }
                                ]}
                                name="gender"
                                label="Gender"
                                necessary={false}
                            />
                        </residentstyle.rowprofile>
                        <residentstyle.rowprofile>
                            <MInputFormik
                                name="dateOfBirth"
                                label="Date of birth"
                                fullWidth
                                type="date"
                            />
                        </residentstyle.rowprofile>
                        <residentstyle.rowprofile>
                            <MInputFormik
                                name="phoneNumber"
                                label="Phone number"
                                placeholder="Phone number"
                                fullWidth
                            />
                        </residentstyle.rowprofile>
                        <residentstyle.rowprofile>
                            <MInputFormik
                                name="email"
                                label="Email"
                                placeholder="email"
                                fullWidth
                                disabled
                            />
                        </residentstyle.rowprofile>
                        <residentstyle.rowprofile>
                            <MSelectFormik
                                options={[
                                    { option: 'Spouse', value: 'SPOUSE' },
                                    { option: 'Mother', value: 'MOTHER' },
                                    { option: 'Father', value: 'FATHER' },
                                    { option: 'Brother', value: 'BROTHER' },
                                    { option: 'Sister', value: 'SISTER' },
                                    { option: 'Cousin', value: 'COUSIN' },
                                    { option: 'Friend', value: 'FRIEND' },
                                    { option: 'Child', value: 'CHILD' },
                                    { option: 'Other', value: 'OTHER' }
                                ]}
                                name="relation"
                                label="Relation"
                            />
                        </residentstyle.rowprofile>
                        <residentstyle.rowprofile>
                            <MSelectFormik
                                options={[
                                    { option: 'Active', value: 'ACTIVE' },

                                    { option: 'Inactivate', value: 'INACTIVE' }
                                ]}
                                name="activeStatus"
                                label="Status"
                                placeholder="Status"
                            />
                        </residentstyle.rowprofile>
                    </residentstyle.modalFormRowWrapper>

                    <residentstyle.modalButtonGroup>
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
                    </residentstyle.modalButtonGroup>
                </Form>
            </Formik>
        </residentstyle.modalbox>
    );
};

const handleShowBuildingConfigurationEditModal = (refetch, row?: RowTable) => {
    return newModal({
        Body: AuthorizedEditModal,
        title: 'Edit users',
        topBar: true,
        id: AuthorizedEditModal.name,
        data: { row, refetch }
    });
};

export default handleShowBuildingConfigurationEditModal;
