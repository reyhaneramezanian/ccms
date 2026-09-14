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
    useUser_GetCurrentResidentQuery,
    useUser_UpdateResidentMutation
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

    const { mutate, isLoading } = useUser_UpdateResidentMutation();
    const { data: datauser } = useUser_GetCurrentResidentQuery();

    useEffect(() => {
        setgender(datauser?.user_getCurrentResident?.result?.gender);
        setid(datauser?.user_getCurrentResident?.result?.id);
        localStorage.setItem(
            storageKeys.fullnameprofile,
            datauser?.user_getCurrentResident?.result?.firstName +
                ' ' +
                datauser?.user_getCurrentResident?.result?.lastName
        );
        localStorage.setItem(
            storageKeys.imageprofile,
            datauser?.user_getCurrentResident?.result?.photoUrl
        );
        dispatch(
            setPageData({
                ...pageData,
                imageprofile: datauser?.user_getCurrentResident?.result?.photoUrl,
                fullnameprofile:
                    datauser?.user_getCurrentResident?.result?.firstName +
                    ' ' +
                    datauser?.user_getCurrentResident?.result?.lastName
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
                    alternativeContact: e.Primary,
                    gender: e.Gender,
                    activeStatus: 'ACTIVE' as any,
                    firstName: e.Firstname,
                    lastName: e.Surname,
                    dateOfBirth: datauser?.user_getCurrentResident?.result?.dateOfBirth,
                    phoneNumber: e.Phonenumber,
                    middleName: e.middleName,
                    photoUrl: datauser?.user_getCurrentResident?.result?.photoUrl,
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
                        datauser?.user_getCurrentResident?.result?.photoUrl
                    );
                    dispatch(
                        setPageData({
                            ...pageData,
                            imageprofile: datauser?.user_getCurrentResident?.result?.photoUrl,
                            fullnameprofile: e.Firstname + ' ' + e.Surname
                        })
                    );
                    enqueueSnackbar('Operation was successful!', {
                        variant: 'success'
                    });
                },
                onError: (err) => {
                    mutationErrorHandler(err, 'user_updateResident');
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
                middleName: datauser?.user_getCurrentResident?.result?.middleName,
                Firstname: datauser?.user_getCurrentResident?.result?.firstName,
                Surname: datauser?.user_getCurrentResident?.result?.lastName,
                Gender: gender,
                Phonenumber: datauser?.user_getCurrentResident?.result?.phoneNumber,
                Email: datauser?.user_getCurrentResident?.result?.email,
                Primary: datauser?.user_getCurrentResident?.result?.alternativeContact
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

                    <residentstyle.rowprofile>
                        <residentstyle.cellprofile>
                            <div style={{ width: '96%' }}>
                                <MInputFormik
                                    style={{ width: '96%' }}
                                    name="Primary"
                                    label="Alternative contact"
                                    placeholder="Primary contact"
                                    fullWidth
                                    necessary={false}
                                />
                            </div>
                        </residentstyle.cellprofile>
                        <residentstyle.cellprofile></residentstyle.cellprofile>
                        <residentstyle.cellprofile></residentstyle.cellprofile>
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
