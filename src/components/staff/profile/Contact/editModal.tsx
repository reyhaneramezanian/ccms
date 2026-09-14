import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import * as stafftstyle from '../../staff.style';
import { Formik, Form, FieldArray, Field, useField } from 'formik';
import { MSelectFormik } from '@/components/base/input/MSelect';
import { MInputFormik } from '@/components/base/input/MInput';
import * as Yup from 'yup';
import { Select, Checkbox, Grid, FormControlLabel, Button, Box, MenuItem } from '@mui/material';
import { PHONE_VALIDATIONIndia, PHONE_VALIDATIONUsa } from '@/utils/helper/regexes';
import {
    useUser_GetCurrentStaffQuery,
    useUser_UpdateStaffProfileMutation
} from 'src/graphql/generated';
import { useSnackbar } from 'notistack';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';
import { LoadingButton } from '@mui/lab';

const contactedite = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const mutationErrorHandler = useMutationErrorHandler();

    const { mutate, isLoading } = useUser_UpdateStaffProfileMutation();
    const { data: datauser } = useUser_GetCurrentStaffQuery();

    const handelsave = (e) => {
        debugger;
        mutate(
            {
                input: {
                    photoUrl: datauser?.user_getCurrentStaff?.result?.photoUrl,

                    departmentId: datauser?.user_getCurrentStaff?.result?.departmentId,
                    employmentTypeId: datauser?.user_getCurrentStaff?.result?.employmentTypeId,
                    headOfDepertment:
                        datauser?.user_getCurrentStaff?.result?.departmentManagers?.length > 0
                            ? true
                            : false,
                    gender: datauser?.user_getCurrentStaff?.result?.gender,
                    activeStatus: datauser?.user_getCurrentStaff?.result?.activeStatus,
                    firstName: datauser?.user_getCurrentStaff?.result?.firstName,
                    lastName: datauser?.user_getCurrentStaff?.result?.lastName,
                    dateOfBirth: datauser?.user_getCurrentStaff?.result?.dateOfBirth,
                    phoneNumber: e.Primaryphone,
                    // email: e.Primaryemail,
                    middleName: datauser?.user_getCurrentStaff?.result?.middleName,
                    alternatePhone: e.Alternativephone,
                    alternateEmail: e.Alternativeemail,
                    address: e.Address,
                    // role: datauser?.user_getCurrentStaff?.result?.role,
                    dateOfJoining: datauser?.user_getCurrentStaff?.result?.dateOfJoining,
                    dateOfTermination: datauser?.user_getCurrentStaff?.result?.dateOfTermination,
                    id: datauser?.user_getCurrentStaff?.result?.id
                }
            },
            {
                onSuccess: () => {
                    enqueueSnackbar('Operation was successful!', {
                        variant: 'success'
                    });
                },
                onError: (err) => {
                    mutationErrorHandler(err, 'user_updateStaffProfile');
                }
            }
        );
    };
    return (
        <Formik
            enableReinitialize
            onSubmit={(v, handlers) => {
                handelsave(v);
            }}
            initialValues={{
                Primaryphone: datauser?.user_getCurrentStaff?.result?.phoneNumber,
                Alternativephone: datauser?.user_getCurrentStaff?.result?.alternatePhone,
                Primaryemail: datauser?.user_getCurrentStaff?.result?.email,
                Alternativeemail: datauser?.user_getCurrentStaff?.result?.alternateEmail,
                Address: datauser?.user_getCurrentStaff?.result?.address
            }}
            validationSchema={Yup.object({
                Primaryphone: Yup.string()
                    .required('This field is required')
                    .matches(PHONE_VALIDATIONIndia, 'Please enter invalid number'),
                Alternativephone: Yup.string()
                    .required('This field is required')
                    .matches(PHONE_VALIDATIONIndia, 'Please enter invalid number'),
                Primaryemail: Yup.string()
                    .required('This field is required')
                    .email('Must be a valid email'),
                Alternativeemail: Yup.string()
                    .required('This field is required')
                    .email('Must be a valid email'),
                Address: Yup.string().required('This field is required')
            })}>
            <Form>
                <stafftstyle.modalFormRowWrapper>
                    <stafftstyle.rowpage>
                        <stafftstyle.cellpage>
                            <div style={{ width: '96%' }}>
                                <MInputFormik
                                    name="Primaryphone"
                                    label="Primary phone"
                                    placeholder="Primary phone"
                                    fullWidth
                                />
                            </div>
                        </stafftstyle.cellpage>
                        <stafftstyle.cellpage>
                            <div style={{ width: '96%' }}>
                                <MInputFormik
                                    name="Alternativephone"
                                    label="Alternative phone"
                                    placeholder="Alternative phone"
                                    fullWidth
                                />
                            </div>
                        </stafftstyle.cellpage>
                        <stafftstyle.cellpage>
                            <div style={{ width: '96%' }}>
                                <MInputFormik
                                    name="Primaryemail"
                                    label="Primary email"
                                    placeholder="Primary email"
                                    fullWidth
                                    disabled
                                />
                            </div>{' '}
                        </stafftstyle.cellpage>
                    </stafftstyle.rowpage>
                    <stafftstyle.rowpage>
                        <stafftstyle.cellpage>
                            <div style={{ width: '96%' }}>
                                <MInputFormik
                                    name="Alternativeemail"
                                    label="Alternative email"
                                    placeholder="Alternative email"
                                    fullWidth
                                />
                            </div>
                        </stafftstyle.cellpage>
                        <stafftstyle.cellpage>
                            <div style={{ width: '96%' }}>
                                <MInputFormik
                                    name="Address"
                                    label="Address"
                                    placeholder="Address"
                                    fullWidth
                                />
                            </div>
                        </stafftstyle.cellpage>
                        <stafftstyle.cellpage></stafftstyle.cellpage>
                    </stafftstyle.rowpage>
                </stafftstyle.modalFormRowWrapper>
                <stafftstyle.rowpage>
                    <Box>
                        <LoadingButton
                            loading={isLoading}
                            type="submit"
                            variant="contained"
                            color="primary">
                            Save
                        </LoadingButton>
                    </Box>
                </stafftstyle.rowpage>
            </Form>
        </Formik>
    );
};
export default contactedite;
