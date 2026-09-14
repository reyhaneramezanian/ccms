import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import * as securitystyle from '../../security.style';
import { Formik, Form, FieldArray, Field, useField } from 'formik';
import { MSelectFormik } from '@/components/base/input/MSelect';
import { MInputFormik } from '@/components/base/input/MInput';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { Select, Checkbox, Grid, FormControlLabel, Button, Box, MenuItem } from '@mui/material';
import {
    useUser_GetCurrentSecurityQuery,
    useUser_UpdateSecurityProfileMutation
} from 'src/graphql/generated';
import Deleteacount from 'src/assets/icons/deleteacount';
import { Custom } from '../../../shared/share/tick-close';
import DeleteModal from './deleteModal';
import { ACTIVE_STATUS, GenderOption } from 'src/data/options';
import Editeprofile from 'src/assets/icons/editeprofile';
import { useImageUploader, useUploadInput } from 'src/hooks/useMediaUploader';
import { getFullImageUrl } from '@/utils/helper/ui';
import { PHONE_VALIDATIONIndia, PHONE_VALIDATIONUsa } from '@/utils/helper/regexes';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';
import { LoadingButton } from '@mui/lab';
import storageKeys from 'src/data/storageKeys';
import { setPageData } from 'src/redux/actions/actions';

const Profile = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const [gender, setgender] = useState(0);
    const [activeStatu, setactiveStatu] = useState(0);
    const mutationErrorHandler = useMutationErrorHandler();
    const pageData = useSelector(({ pageData }: any) => pageData);
    const [imageuser, setimageuser] = useState('');
    const [imagenew, setimagenew] = useState('');
    const { uploadOnFile, state: stateimage } = useImageUploader();
    const { InputComponent, onFilePick } = useUploadInput(uploadOnFile);

    const { mutate, isLoading } = useUser_UpdateSecurityProfileMutation();
    const { data: datauser } = useUser_GetCurrentSecurityQuery();
    useEffect(() => {
        setgender(datauser?.user_getCurrentSecurity?.result?.gender);
        setactiveStatu(datauser?.user_getCurrentSecurity?.result?.activeStatus);
        localStorage.setItem(
            storageKeys.fullnameprofile,
            datauser?.user_getCurrentSecurity?.result?.firstName +
                ' ' +
                datauser?.user_getCurrentSecurity?.result?.lastName
        );
        localStorage.setItem(
            storageKeys.imageprofile,
            datauser?.user_getCurrentSecurity?.result?.photoUrl
        );
        dispatch(
            setPageData({
                ...pageData,
                imageprofile: datauser?.user_getCurrentSecurity?.result?.photoUrl,
                fullnameprofile:
                    datauser?.user_getCurrentSecurity?.result?.firstName +
                    ' ' +
                    datauser?.user_getCurrentSecurity?.result?.lastName
            })
        );
    }, [datauser]);
    useEffect(() => {
        if (stateimage?.items?.length > 0)
            setimagenew(
                stateimage?.items[stateimage?.items?.length - 1]?.url == ''
                    ? stateimage?.items[stateimage?.items?.length - 1]?.localUrl
                    : stateimage?.items[stateimage?.items?.length - 1]?.url
            );
    }, [stateimage]);

    const handelsave = (data) => {
        mutate(
            {
                input: {
                    photoUrl: datauser?.user_getCurrentSecurity?.result?.photoUrl,
                    complexId: datauser?.user_getCurrentSecurity?.result?.complexId,
                    firstName: data.firstName.trim(),
                    lastName: data.lastName.trim(),
                    phoneNumber: data.phoneNumber,
                    activeStatus: datauser?.user_getCurrentSecurity?.result?.activeStatus,
                    dateOfBirth: data.dateOfBirth,
                    yearsOfExperience: data.yearsOfExperience,
                    gender: data.Gender,
                    id: datauser?.user_getCurrentSecurity?.result?.id,
                    employmentTypeId: datauser?.user_getCurrentSecurity?.result?.employmentTypeId,
                    dateOfJoining: datauser?.user_getCurrentSecurity?.result?.dateOfJoining,
                    middleName: data.middleName.trim()
                }
            },
            {
                onSuccess: () => {
                    localStorage.setItem(
                        storageKeys.fullnameprofile,
                        data.firstName + ' ' + data.lastName
                    );
                    localStorage.setItem(
                        storageKeys.imageprofile,
                        datauser?.user_getCurrentSecurity?.result?.photoUrl
                    );
                    dispatch(
                        setPageData({
                            ...pageData,
                            imageprofile: datauser?.user_getCurrentSecurity?.result?.photoUrl,
                            fullnameprofile: data.firstName + ' ' + data.lastName
                        })
                    );
                    enqueueSnackbar('Operation was successful!', {
                        variant: 'success'
                    });
                },
                onError: (err) => {
                    mutationErrorHandler(err, 'user_updateSecurityProfile');
                }
            }
        );
    };
    const onclickdelete = () => {
        dispatch(DeleteModal());
    };
    return (
        <securitystyle.containerprofile>
            <Formik
                enableReinitialize
                onSubmit={(v, handlers) => {
                    handelsave(v);
                }}
                initialValues={{
                    middleName: datauser?.user_getCurrentSecurity?.result?.middleName,
                    firstName: datauser?.user_getCurrentSecurity?.result?.firstName,
                    lastName: datauser?.user_getCurrentSecurity?.result?.lastName,
                    Gender: gender,
                    complex: datauser?.user_getCurrentSecurity?.result?.complex?.name,
                    //activeStatus: activeStatu,
                    phoneNumber: datauser?.user_getCurrentSecurity?.result?.phoneNumber,
                    email: datauser?.user_getCurrentSecurity?.result?.email,
                    dateOfBirth: datauser?.user_getCurrentSecurity?.result?.dateOfBirth.slice(
                        0,
                        10
                    ),
                    yearsOfExperience: datauser?.user_getCurrentSecurity?.result?.yearsOfExperience
                }}
                validationSchema={Yup.object({
                    firstName: Yup.string().required('This field is required'),
                    lastName: Yup.string().required('This field is required'),
                    //Gender: Yup.string().required('This field is required'),
                    // activeStatus: Yup.string().required('This field is required'),
                    phoneNumber: Yup.string()
                        .required('This field is required')
                        .matches(PHONE_VALIDATIONIndia, 'Please enter invalid number'),
                    dateOfBirth: Yup.string().required('This field is required'),
                    yearsOfExperience: Yup.string().required('This field is required')
                })}>
                <Form>
                    <securitystyle.modalFormRowWrapper>
                        <securitystyle.rowpage>
                            <securitystyle.cellpage>
                                <div style={{ width: '96%' }}>
                                    <MInputFormik
                                        name="firstName"
                                        label="First name"
                                        placeholder="First name"
                                        fullWidth
                                    />
                                </div>
                            </securitystyle.cellpage>
                            <securitystyle.cellpage>
                                <div style={{ width: '96%' }}>
                                    <MInputFormik
                                        name="middleName"
                                        label="Middle name"
                                        placeholder="Middle name"
                                        fullWidth
                                        necessary={false}
                                    />
                                </div>
                            </securitystyle.cellpage>
                            <securitystyle.cellpage>
                                <div style={{ width: '96%' }}>
                                    <MInputFormik
                                        style={{ width: '96%' }}
                                        name="lastName"
                                        label="Surname"
                                        placeholder="Surname"
                                        fullWidth
                                    />
                                </div>
                            </securitystyle.cellpage>
                        </securitystyle.rowpage>
                        <securitystyle.rowpage>
                            <securitystyle.cellpage>
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
                            </securitystyle.cellpage>
                            <securitystyle.cellpage>
                                <div style={{ width: '96%' }}>
                                    <MInputFormik
                                        type="date"
                                        name="dateOfBirth"
                                        label="Date of birth"
                                    />
                                </div>
                            </securitystyle.cellpage>
                            <securitystyle.cellpage>
                                <div style={{ width: '96%' }}>
                                    <MInputFormik
                                        name="phoneNumber"
                                        label="Phone number"
                                        placeholder="+913524890"
                                    />
                                </div>
                            </securitystyle.cellpage>
                        </securitystyle.rowpage>

                        <securitystyle.rowpage>
                            <securitystyle.cellpage>
                                <div style={{ width: '96%' }}>
                                    <MInputFormik
                                        name="email"
                                        label="Email address"
                                        placeholder="Email"
                                        disabled
                                    />
                                </div>
                            </securitystyle.cellpage>
                            <securitystyle.cellpage>
                                <div style={{ width: '96%' }}>
                                    <MInputFormik
                                        type="number"
                                        name="yearsOfExperience"
                                        label="Years of experience"
                                        placeholder="1"
                                    />
                                </div>
                            </securitystyle.cellpage>
                            <securitystyle.cellpage>
                                <div style={{ width: '96%' }}>
                                    <MInputFormik
                                        name="complex"
                                        label="Complex"
                                        placeholder="complex"
                                        fullWidth
                                        disabled
                                    />
                                </div>
                            </securitystyle.cellpage>
                        </securitystyle.rowpage>
                    </securitystyle.modalFormRowWrapper>
                    <securitystyle.rowprofile>
                        <Box>
                            <Custom style={{ marginBottom: '30px' }} onClick={onclickdelete}>
                                <Deleteacount />
                            </Custom>
                        </Box>
                    </securitystyle.rowprofile>
                    <securitystyle.rowpage>
                        <Box>
                            <LoadingButton
                                loading={isLoading}
                                type="submit"
                                variant="contained"
                                color="primary">
                                Save
                            </LoadingButton>
                        </Box>
                    </securitystyle.rowpage>
                </Form>
            </Formik>
        </securitystyle.containerprofile>
    );
};
export default Profile;
