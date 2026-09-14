import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import * as stafftstyle from '../../staff.style';
import { Formik, Form, FieldArray, Field, useField } from 'formik';
import { MSelectFormik } from '@/components/base/input/MSelect';
import { MInputFormik } from '@/components/base/input/MInput';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { Select, Checkbox, Grid, FormControlLabel, Button, Box, MenuItem } from '@mui/material';
import {
    useUser_GetCurrentStaffQuery,
    useUser_UpdateStaffProfileMutation
} from 'src/graphql/generated';
import Deleteacount from 'src/assets/icons/deleteacount';
import { Custom } from '../../../shared/share/tick-close';
import DeleteModal from './deleteModal';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';
import { LoadingButton } from '@mui/lab';
import storageKeys from 'src/data/storageKeys';
import { setPageData } from 'src/redux/actions/actions';

const personaledite = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const [gender, setgender] = useState(0);
    const pageData = useSelector(({ pageData }: any) => pageData);
    const { mutate, isLoading } = useUser_UpdateStaffProfileMutation();
    const { data: datauser } = useUser_GetCurrentStaffQuery();
    const mutationErrorHandler = useMutationErrorHandler();

    useEffect(() => {
        setgender(datauser?.user_getCurrentStaff?.result?.gender);
        localStorage.setItem(
            storageKeys.fullnameprofile,
            datauser?.user_getCurrentStaff?.result?.firstName +
                ' ' +
                datauser?.user_getCurrentStaff?.result?.lastName
        );
        localStorage.setItem(
            storageKeys.imageprofile,
            datauser?.user_getCurrentStaff?.result?.photoUrl
        );
        dispatch(
            setPageData({
                ...pageData,
                imageprofile: datauser?.user_getCurrentStaff?.result?.photoUrl,
                fullnameprofile:
                    datauser?.user_getCurrentStaff?.result?.firstName +
                    ' ' +
                    datauser?.user_getCurrentStaff?.result?.lastName
            })
        );
    }, [datauser]);
    const handelsave = (e) => {
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
                    gender: e.Gender,
                    activeStatus: datauser?.user_getCurrentStaff?.result?.activeStatus,
                    firstName: e.Firstname,
                    lastName: e.Surname,
                    dateOfBirth: e.dateofbirth,
                    phoneNumber: datauser?.user_getCurrentStaff?.result?.phoneNumber,
                    // email: datauser?.user_getCurrentStaff?.result?.email,
                    middleName: e.Middlename,
                    alternatePhone: datauser?.user_getCurrentStaff?.result?.alternatePhone,
                    alternateEmail: datauser?.user_getCurrentStaff?.result?.alternateEmail,
                    address: datauser?.user_getCurrentStaff?.result?.address,
                    // role: datauser?.user_getCurrentStaff?.result?.role,
                    dateOfJoining: datauser?.user_getCurrentStaff?.result?.dateOfJoining,
                    dateOfTermination: datauser?.user_getCurrentStaff?.result?.dateOfTermination,
                    id: datauser?.user_getCurrentStaff?.result?.id
                }
            },
            {
                onSuccess: () => {
                    localStorage.setItem(
                        storageKeys.fullnameprofile,
                        e.Firstname + ' ' + e.Surname
                    );
                    localStorage.setItem(
                        storageKeys.imageprofile,
                        datauser?.user_getCurrentStaff?.result?.photoUrl
                    );
                    dispatch(
                        setPageData({
                            ...pageData,
                            imageprofile: datauser?.user_getCurrentStaff?.result?.photoUrl,
                            fullnameprofile: e.Firstname + ' ' + e.Surname
                        })
                    );
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
    const onclickdelete = () => {
        dispatch(DeleteModal());
    };
    return (
        <Formik
            enableReinitialize
            onSubmit={(v, handlers) => {
                handelsave(v);
            }}
            initialValues={{
                Firstname: datauser?.user_getCurrentStaff?.result?.firstName,
                Surname: datauser?.user_getCurrentStaff?.result?.lastName,
                Gender: gender,
                Middlename: datauser?.user_getCurrentStaff?.result?.middleName,
                dateofbirth: datauser?.user_getCurrentStaff?.result?.dateOfBirth.slice(0, 10)
            }}
            validationSchema={Yup.object({
                Firstname: Yup.string().required('This field is required'),
                Surname: Yup.string().required('This field is required'),
                //Gender: Yup.string().required('This field is required'),
                //Middlename: Yup.string().required('This field is required'),
                dateofbirth: Yup.string().required('This field is required')
            })}>
            <Form>
                <stafftstyle.modalFormRowWrapper>
                    <stafftstyle.rowpage>
                        <stafftstyle.cellpage>
                            <div style={{ width: '96%' }}>
                                <MInputFormik
                                    name="Firstname"
                                    label="First name"
                                    placeholder="First name"
                                    fullWidth
                                />
                            </div>
                        </stafftstyle.cellpage>
                        <stafftstyle.cellpage>
                            <div style={{ width: '96%' }}>
                                <MInputFormik
                                    style={{ width: '96%' }}
                                    name="Middlename"
                                    label="Middle name"
                                    placeholder="Middle name"
                                    fullWidth
                                    necessary={false}
                                />
                            </div>
                        </stafftstyle.cellpage>
                        <stafftstyle.cellpage>
                            <div style={{ width: '96%' }}>
                                <MInputFormik
                                    style={{ width: '96%' }}
                                    name="Surname"
                                    label="Surname"
                                    placeholder="Surname"
                                    fullWidth
                                />
                            </div>
                        </stafftstyle.cellpage>
                    </stafftstyle.rowpage>
                    <stafftstyle.rowpage>
                        <stafftstyle.cellpage>
                            <MSelectFormik
                                style={{ width: '96%' }}
                                options={[
                                    { option: 'None', value: null },
                                    { option: 'Male', value: 'MALE' },
                                    { option: 'Female', value: 'FEMALE' }
                                ]}
                                name="Gender"
                                label="Gender"
                                placeholder="Gender"
                                necessary={false}
                            />
                        </stafftstyle.cellpage>
                        <stafftstyle.cellpage>
                            <div style={{ width: '96%' }}>
                                <MInputFormik
                                    style={{ width: '96%' }}
                                    name="dateofbirth"
                                    label="Date of birth"
                                    placeholder="Date of birth"
                                    fullWidth
                                    type="date"
                                />
                            </div>
                        </stafftstyle.cellpage>
                        <stafftstyle.cellpage> </stafftstyle.cellpage>
                    </stafftstyle.rowpage>
                </stafftstyle.modalFormRowWrapper>
                <stafftstyle.rowprofile>
                    <Box>
                        <Custom style={{ marginBottom: '30px' }} onClick={onclickdelete}>
                            <Deleteacount />
                        </Custom>
                    </Box>
                </stafftstyle.rowprofile>
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
export default personaledite;
