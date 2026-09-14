import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import * as adminstyle from '../../admin.style';
import { Formik, Form, FieldArray, Field, useField } from 'formik';
import { MSelectFormik } from '@/components/base/input/MSelect';
import { MInputFormik } from '@/components/base/input/MInput';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { Select, Checkbox, Grid, Typography, Button, Box, MenuItem, Modal } from '@mui/material';
import {
    useUser_GetCurrentSuperAdminQuery,
    useUser_UpdateSuperAdminProfileMutation
} from 'src/graphql/generated';
import Deleteacount from 'src/assets/icons/deleteacount';
import { Custom } from '@/components/shared/share/tick-close';
import DeleteModal from './deleteModal';
import { ACTIVE_STATUS, GenderOption } from 'src/data/options';
import Editeprofile from 'src/assets/icons/editeprofile';
import { useImageUploader, useUploadInput } from 'src/hooks/useMediaUploader';
import { getFullImageUrl } from '@/utils/helper/ui';
import { PHONE_VALIDATIONIndia, PHONE_VALIDATIONUsa } from '@/utils/helper/regexes';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';
import { LoadingButton } from '@mui/lab';
import { setPageData } from 'src/redux/actions/actions';
import storageKeys from 'src/data/storageKeys';
import { useRouter } from 'next/router';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#fff',
    borderRadius: '7px !important',
    border: '0px solid #fff !important',
    p: 2
};

const Profile = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const [gender, setgender] = useState(0);
    const [activeStatu, setactiveStatu] = useState(0);
    const mutationErrorHandler = useMutationErrorHandler();
    const pageData = useSelector(({ pageData }: any) => pageData);
    const [show, setShow] = useState(false);
    const [imageuser, setimageuser] = useState('');
    const [imagenew, setimagenew] = useState('');

    const { uploadOnFile, state: stateimage } = useImageUploader();
    const { InputComponent, onFilePick } = useUploadInput(uploadOnFile);

    const { mutate, isLoading } = useUser_UpdateSuperAdminProfileMutation();
    const { data: datauser } = useUser_GetCurrentSuperAdminQuery(undefined, {
        //enabled:
    });
    useEffect(() => {
        setgender(datauser?.user_getCurrentSuperAdmin?.result?.gender);
        setactiveStatu(datauser?.user_getCurrentSuperAdmin?.result?.activeStatus);

        if (
            datauser?.user_getCurrentSuperAdmin?.result?.photoUrl == null ||
            datauser?.user_getCurrentSuperAdmin?.result?.photoUrl == undefined
        )
            setimageuser('/images/men.png');
        else {
            setimageuser(datauser?.user_getCurrentSuperAdmin?.result?.photoUrl);
            localStorage.setItem(
                storageKeys.fullnameprofile,
                datauser?.user_getCurrentSuperAdmin?.result?.firstName +
                    ' ' +
                    datauser?.user_getCurrentSuperAdmin?.result?.lastName
            );
            localStorage.setItem(
                storageKeys.imageprofile,
                datauser?.user_getCurrentSuperAdmin?.result?.photoUrl
            );
            dispatch(
                setPageData({
                    ...pageData,
                    imageprofile: datauser?.user_getCurrentSuperAdmin?.result?.photoUrl,
                    fullnameprofile:
                        datauser?.user_getCurrentSuperAdmin?.result?.firstName +
                        ' ' +
                        datauser?.user_getCurrentSuperAdmin?.result?.lastName
                })
            );
        }
    }, [datauser]);
    const handelsave = (e) => {
        mutate(
            {
                input: {
                    //externalId: datauser?.user_getCurrentSuperAdmin?.result?.externalId,
                    gender: e.Gender,
                    activeStatus: activeStatu,
                    firstName: e.Firstname,
                    lastName: e.Surname,
                    phoneNumber: e.phoneNumber,
                    // email: e.email,
                    id: datauser?.user_getCurrentSuperAdmin?.result?.id,
                    dateOfBirth: datauser?.user_getCurrentSuperAdmin?.result?.dateOfBirth,
                    photoUrl: datauser?.user_getCurrentSuperAdmin?.result?.photoUrl
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
                        imagenew === ''
                            ? datauser?.user_getCurrentSuperAdmin?.result?.photoUrl
                            : imagenew
                    );
                    dispatch(
                        setPageData({
                            ...pageData,
                            imageprofile: datauser?.user_getCurrentSuperAdmin?.result?.photoUrl,
                            fullnameprofile: e.Firstname + ' ' + e.Surname
                        })
                    );

                    enqueueSnackbar('Operation was successful!', {
                        variant: 'success'
                    });
                },
                onError: (err) => {
                    mutationErrorHandler(err, 'user_updateSuperAdminProfile');
                }
            }
        );
    };
    const onclickdelete = () => {
        dispatch(DeleteModal());
    };
    const onfiledelet = () => {
        setShow(true);
    };
    const handleClose = () => {
        setShow(false);
    };
    const handleimageUser = () => {
        mutate(
            {
                input: {
                    gender: datauser?.user_getCurrentSuperAdmin?.result?.gender,
                    activeStatus: datauser?.user_getCurrentSuperAdmin?.result?.activeStatus,
                    firstName: datauser?.user_getCurrentSuperAdmin?.result?.firstName,
                    lastName: datauser?.user_getCurrentSuperAdmin?.result?.lastName,
                    phoneNumber: datauser?.user_getCurrentSuperAdmin?.result?.phoneNumber,
                    // email: e.email,
                    id: datauser?.user_getCurrentSuperAdmin?.result?.id,
                    dateOfBirth: datauser?.user_getCurrentSuperAdmin?.result?.dateOfBirth,
                    photoUrl: ''
                }
            },
            {
                onSuccess: () => {
                    localStorage.setItem(storageKeys.imageprofile, '');
                    dispatch(
                        setPageData({
                            ...pageData,
                            imageprofile: '',
                            fullnameprofile:
                                datauser?.user_getCurrentSuperAdmin?.result?.firstName +
                                ' ' +
                                datauser?.user_getCurrentSuperAdmin?.result?.lastName
                        })
                    );
                    enqueueSnackbar('Operation was successful!', {
                        variant: 'success'
                    });
                    setimageuser('');
                    setShow(false);
                },
                onError: (err) => {
                    mutationErrorHandler(err, 'user_updateSuperAdminProfile');
                }
            }
        );
    };
    return (
        <adminstyle.containerprofile>
            <Formik
                enableReinitialize
                onSubmit={(v, handlers) => {
                    handelsave(v);
                }}
                initialValues={{
                    Firstname: datauser?.user_getCurrentSuperAdmin?.result?.firstName,
                    Surname: datauser?.user_getCurrentSuperAdmin?.result?.lastName,
                    Gender: gender,
                    // activeStatus: activeStatu,
                    phoneNumber: datauser?.user_getCurrentSuperAdmin?.result?.phoneNumber,
                    email: datauser?.user_getCurrentSuperAdmin?.result?.email
                }}
                validationSchema={Yup.object({
                    Firstname: Yup.string().required('This field is required'),
                    Surname: Yup.string().required('This field is required'),
                    // Gender: Yup.string().required('This field is required'),
                    // activeStatus: Yup.string().required('This field is required'),
                    phoneNumber: Yup.string()
                        .required('This field is required')
                        .matches(PHONE_VALIDATIONIndia, 'Please enter invalid number'),
                    email: Yup.string().required('This field is required')
                })}>
                <Form>
                    <adminstyle.modalFormRowWrapper>
                        <adminstyle.rowpage>
                            <adminstyle.cellpage>
                                <div style={{ width: '96%' }}>
                                    <MInputFormik
                                        name="Firstname"
                                        label="First name"
                                        placeholder="First name"
                                        fullWidth
                                    />
                                </div>
                            </adminstyle.cellpage>
                            <adminstyle.cellpage>
                                <div style={{ width: '96%' }}>
                                    <MInputFormik
                                        style={{ width: '96%' }}
                                        name="Surname"
                                        label="Surname"
                                        placeholder="Surname"
                                        fullWidth
                                    />
                                </div>
                            </adminstyle.cellpage>
                            <adminstyle.cellpage>
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
                            </adminstyle.cellpage>
                        </adminstyle.rowpage>
                        <adminstyle.rowpage>
                            <adminstyle.cellpage>
                                <div style={{ width: '96%' }}>
                                    <MInputFormik
                                        name="phoneNumber"
                                        label="Phone number"
                                        placeholder="Phone"
                                    />
                                </div>
                            </adminstyle.cellpage>
                            <adminstyle.cellpage>
                                <div style={{ width: '96%' }}>
                                    <MInputFormik
                                        name="email"
                                        label="Email address"
                                        placeholder="Email"
                                        disabled
                                    />
                                </div>
                            </adminstyle.cellpage>
                            <adminstyle.cellpage></adminstyle.cellpage>
                        </adminstyle.rowpage>
                    </adminstyle.modalFormRowWrapper>
                    <adminstyle.rowprofile>
                        <Box>
                            <Custom style={{ marginBottom: '30px' }} onClick={onclickdelete}>
                                <Deleteacount />
                            </Custom>
                        </Box>
                    </adminstyle.rowprofile>
                    <adminstyle.rowpage>
                        <Box>
                            <LoadingButton
                                loading={isLoading}
                                type="submit"
                                variant="contained"
                                color="primary">
                                Save
                            </LoadingButton>
                        </Box>
                    </adminstyle.rowpage>
                </Form>
            </Formik>
            <Modal
                style={{ border: '0px solid #fff !important' }}
                keepMounted
                open={show}
                // onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description">
                <Box sx={style}>
                    <adminstyle.rowpage>
                        <adminstyle.cellpage>
                            Are you sure you want to delete your image?
                        </adminstyle.cellpage>
                    </adminstyle.rowpage>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginTop: '50px'
                        }}>
                        <LoadingButton
                            loading={isLoading}
                            sx={{
                                textTransform: 'none',
                                width: '170px',
                                height: '36px',
                                marginRight: '28px',
                                backgroundColor: '#e63c49',
                                borderRadius: '4px',
                                color: '#fff' /*':hover': { backgroundColor: '#A587C2' } */
                            }}
                            onClick={handleimageUser}>
                            <Typography
                                sx={{
                                    fontSize: '15px',
                                    color: '#fff',
                                    fontFamily: 'Helvetica Neue'
                                }}>
                                Yes
                            </Typography>
                        </LoadingButton>
                        <Button
                            sx={{
                                textTransform: 'none',
                                width: '170px',
                                height: '36px',
                                backgroundColor: '#fff',
                                borderRadius: '4px',
                                color: '#737373',
                                border: '1px solid #b0b0b0',
                                ':hover': { backgroundColor: '#fff' }
                            }}
                            onClick={handleClose}>
                            <Typography
                                sx={{
                                    fontSize: '15px',
                                    color: '#2B368F',
                                    fontFamily: 'Helvetica Neue'
                                }}>
                                No
                            </Typography>
                        </Button>
                    </div>
                </Box>
            </Modal>
        </adminstyle.containerprofile>
    );
};
export default Profile;
