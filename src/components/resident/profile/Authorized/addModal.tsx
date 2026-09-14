import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import * as residentstyle from '../../resident.style';
import { Formik, Form, FieldArray, Field, useField } from 'formik';
import { MSelectFormik } from '@/components/base/input/MSelect';
import { MInputFormik } from '@/components/base/input/MInput';
import * as Yup from 'yup';
import { Select, Checkbox, Grid, FormControlLabel, Button, Box, MenuItem } from '@mui/material';
import {
    useUser_CreateAuthorizedUserMutation,
    useUser_GetCurrentResidentQuery
} from 'src/graphql/generated';
import Down from 'src/assets/icons/Down';
import { IModalBodyProps } from '@/components/shared/modals/types.modals';
import { RowTable } from '@/components/table/table_layout/types.table.layout';
import { closeModal, newModal } from 'src/redux/actions/actions';
import { useSnackbar } from 'notistack';
import { useQueryClient, QueryClient } from 'react-query';
import { PHONE_VALIDATIONIndia, PHONE_VALIDATIONUsa } from '@/utils/helper/regexes';
import storageKeys from 'src/data/storageKeys';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';
import { LoadingButton } from '@mui/lab';

const AuthorizedAddModal: FC<IModalBodyProps<RowTable>> = ({ data }) => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const mutationErrorHandler = useMutationErrorHandler();

    const { mutate, isLoading } = useUser_CreateAuthorizedUserMutation();
    const queryClient = useQueryClient();
    const handleCancel = () => {
        dispatch(closeModal(AuthorizedAddModal.name));
    };
    const handelsave = (e) => {
        mutate(
            {
                input: {
                    relation: e.relation,
                    gender: e.gender,
                    activeStatus: e.activeStatus,
                    email: e.email,
                    firstName: e.firstName,
                    lastName: e.lastName,
                    phoneNumber: e.phoneNumber,
                    dateOfBirth: e.dateOfBirth,
                    residentFlatId: Number(localStorage.getItem(storageKeys.ResidentFlatId))
                }
            },
            {
                onSuccess: () => {
                    enqueueSnackbar('Operation was successful!', {
                        variant: 'success'
                    }),
                        dispatch(closeModal(AuthorizedAddModal.name));
                    queryClient.refetchQueries('user_getAuthorizedUsers');
                },
                onError: (err) => {
                    mutationErrorHandler(err, 'user_createAuthorizedUser');
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
                    firstName: '',
                    lastName: '',
                    phoneNumber: '',
                    email: '',
                    gender: null,
                    dateOfBirth: '',
                    activeStatus: '',
                    relation: ''
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
                    //  gender: Yup.string().required('This field is required'),
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
                                Add
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
const handleAuthorizedAddModal = (data?: RowTable) => {
    return newModal({
        Body: AuthorizedAddModal,
        title: 'Add users',
        topBar: true,
        id: AuthorizedAddModal.name,
        data
    });
};

export default handleAuthorizedAddModal;
