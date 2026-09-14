import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import * as residentstyle from '../../resident.style';
import { Formik, Form, FieldArray, Field, useField } from 'formik';
import { MSelectFormik } from '@/components/base/input/MSelect';
import { MInputFormik } from '@/components/base/input/MInput';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { Select, Checkbox, Grid, FormControlLabel, Button, Box, MenuItem } from '@mui/material';
import {
    useUser_GetCurrentAuthorizedUserQuery,
    useUser_UpdateAuthorizedUserMutation
} from 'src/graphql/generated';
import { PHONE_VALIDATIONIndia, PHONE_VALIDATIONUsa } from '@/utils/helper/regexes';
import Deleteacount from 'src/assets/icons/deleteacount';
import { Custom } from '../../../shared/share/tick-close';
import DeleteModal from './deleteModal';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';
import { LoadingButton } from '@mui/lab';
import storageKeys from 'src/data/storageKeys';
import { setPageData } from 'src/redux/actions/actions';

const personaledite = () => {
    const dispatch = useDispatch();
    const mutationErrorHandler = useMutationErrorHandler();
    const pageData = useSelector(({ pageData }: any) => pageData);

    const { enqueueSnackbar } = useSnackbar();

    const [gender, setgender] = useState(0);
    const [id, setid] = useState(0);

    const { mutate, isLoading } = useUser_UpdateAuthorizedUserMutation();
    const { data: datauser } = useUser_GetCurrentAuthorizedUserQuery();

    useEffect(() => {
        setgender(datauser?.user_getCurrentAuthorizedUser?.result?.gender);
        setid(datauser?.user_getCurrentAuthorizedUser?.result?.id);
        localStorage.setItem(
            storageKeys.fullnameprofile,
            datauser?.user_getCurrentAuthorizedUser?.result?.firstName +
                ' ' +
                datauser?.user_getCurrentAuthorizedUser?.result?.lastName
        );
        localStorage.setItem(
            storageKeys.imageprofile,
            datauser?.user_getCurrentAuthorizedUser?.result?.photoUrl
        );
        dispatch(
            setPageData({
                ...pageData,
                imageprofile: datauser?.user_getCurrentAuthorizedUser?.result?.photoUrl,
                fullnameprofile:
                    datauser?.user_getCurrentAuthorizedUser?.result?.firstName +
                    ' ' +
                    datauser?.user_getCurrentAuthorizedUser?.result?.lastName
            })
        );
    }, [datauser]);

    const onclickdelete = () => {
        dispatch(DeleteModal());
    };
    const handelsave = (e) => {
        mutate(
            {
                input: {
                    residentFlatId: datauser?.user_getCurrentAuthorizedUser?.result?.residentFlatId,
                    relation: datauser?.user_getCurrentAuthorizedUser?.result?.relation,
                    gender: e.Gender,
                    activeStatus: datauser?.user_getCurrentAuthorizedUser?.result?.activeStatus,
                    firstName: e.Firstname,
                    lastName: e.Surname,
                    dateOfBirth: datauser?.user_getCurrentAuthorizedUser?.result?.dateOfBirth,
                    phoneNumber: e.Phonenumber,
                    middleName: e.middleName,
                    photoUrl: datauser?.user_getCurrentAuthorizedUser?.result?.photoUrl,
                    id: id
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
                        datauser?.user_getCurrentAuthorizedUser?.result?.photoUrl
                    );
                    dispatch(
                        setPageData({
                            ...pageData,
                            imageprofile: datauser?.user_getCurrentAuthorizedUser?.result?.photoUrl,
                            fullnameprofile: e.Firstname + ' ' + e.Surname
                        })
                    );
                    enqueueSnackbar('Operation was successful!', {
                        variant: 'success'
                    });
                },
                onError: (err) => {
                    mutationErrorHandler(err, 'user_updateAuthorizedUser');
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
                middleName: datauser?.user_getCurrentAuthorizedUser?.result?.middleName,
                Firstname: datauser?.user_getCurrentAuthorizedUser?.result?.firstName,
                Surname: datauser?.user_getCurrentAuthorizedUser?.result?.lastName,
                Gender: gender,
                Phonenumber: datauser?.user_getCurrentAuthorizedUser?.result?.phoneNumber,
                Email: datauser?.user_getCurrentAuthorizedUser?.result?.email
            }}
            validationSchema={Yup.object({
                Firstname: Yup.string().required('This field is required'),
                Surname: Yup.string().required('This field is required'),
                //  Gender: Yup.string().required('This field is required'),
                Phonenumber: Yup.string()
                    .required('This field is required')
                    .matches(PHONE_VALIDATIONIndia, 'Please enter invalid number'),
                Email: Yup.string()
                    .required('This field is required')
                    .email('Must be a valid email')
                //Primary: Yup.string().required('This field is required')
            })}>
            <Form>
                <residentstyle.modalFormRowWrapper>
                    <residentstyle.rowprofile>
                        <residentstyle.cellprofile>
                            <div style={{ width: '96%' }}>
                                <MInputFormik
                                    name="Firstname"
                                    label="First name"
                                    placeholder="First name"
                                    fullWidth
                                />
                            </div>
                        </residentstyle.cellprofile>
                        <residentstyle.cellprofile>
                            <div style={{ width: '96%' }}>
                                <MInputFormik
                                    name="middleName"
                                    label="Middle name"
                                    placeholder="Middle name"
                                    fullWidth
                                    necessary={false}
                                />
                            </div>
                        </residentstyle.cellprofile>
                        <residentstyle.cellprofile>
                            <div style={{ width: '96%' }}>
                                <MInputFormik
                                    style={{ width: '96%' }}
                                    name="Surname"
                                    label="Surname"
                                    placeholder="Surname"
                                    fullWidth
                                />
                            </div>
                        </residentstyle.cellprofile>
                    </residentstyle.rowprofile>
                    <residentstyle.rowprofile>
                        <residentstyle.cellprofile>
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
                        </residentstyle.cellprofile>
                        <residentstyle.cellprofile>
                            <div style={{ width: '96%' }}>
                                <MInputFormik
                                    name="Email"
                                    label="Email address"
                                    placeholder="Email address"
                                    fullWidth
                                    disabled
                                />
                            </div>
                        </residentstyle.cellprofile>
                        <residentstyle.cellprofile>
                            <div style={{ width: '96%' }}>
                                <MInputFormik
                                    style={{ width: '96%' }}
                                    name="Phonenumber"
                                    label="Phone number"
                                    placeholder="Phone number"
                                    fullWidth
                                />
                            </div>
                        </residentstyle.cellprofile>
                    </residentstyle.rowprofile>
                </residentstyle.modalFormRowWrapper>
                <residentstyle.rowprofile>
                    <Box>
                        <Custom style={{ marginBottom: '30px' }} onClick={onclickdelete}>
                            <Deleteacount />
                        </Custom>
                    </Box>
                </residentstyle.rowprofile>
                <residentstyle.rowprofile>
                    <Box>
                        <LoadingButton
                            loading={isLoading}
                            type="submit"
                            variant="contained"
                            color="primary">
                            Save
                        </LoadingButton>
                    </Box>
                </residentstyle.rowprofile>
            </Form>
        </Formik>
    );
};
export default personaledite;
