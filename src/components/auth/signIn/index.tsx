import { MInputFormik } from '@/components/base/input/MInput';
import COLORS from '@/utils/theme/colors';
import { Box, Checkbox, FormControlLabel, Typography, InputAdornment } from '@mui/material';
import { Form, Formik, Field } from 'formik';
import Link from 'next/link';
import * as S from './signIn.styles';
import { useAuthPage } from '../services/useAuth';
import { signInFormInitialValues, signInFormValidation } from './data.signIn';
import { ISignInFormData } from './types.signIn';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import useManageActiveResidentFlat from 'src/hooks/useManageActiveResidentFlat';
import ForgetPassword from './confirm-password';
import { useDispatch, useSelector } from 'react-redux';
import { newModal, setPageData } from 'src/redux/actions/actions';
import { useState } from 'react';
import { useRouter } from 'next/router';
import storageKeys from 'src/data/storageKeys';

var containerlogin = {
    width: '100%',
    position: 'relative',
    display: 'inline-block'
};
var passstyle = {
    background: 'url(/images/key.png) no-repeat',
    position: 'absolute',
    width: '35px',
    height: '100%',
    top: '28px',
    right: '0'
};

var showpasstyle = {
    background: 'url(/images/show.png) no-repeat',
    position: 'absolute',
    width: '35px',
    height: '100%',
    top: '47px',
    right: '0',
    zIndex: 1,
    cursor: 'pointer'
};
const Signin = () => {
    const authPage = useAuthPage();
    const { enqueueSnackbar } = useSnackbar();
    const { handleClearActiveResidentFlatId } = useManageActiveResidentFlat();
    const dispatch = useDispatch();
    const [showPassword, setshowPassword] = useState(false);
    const [rememberme, setrememberme] = useState(
        localStorage.getItem(storageKeys.rememberpassword) == 'true' ? true : false
    );
    const router = useRouter();
    useEffect(() => {
        if (typeof authPage.state.error !== 'string' || authPage.state.error === '') return;

        enqueueSnackbar(authPage.state.error, { variant: 'error' });

        // eslint-disable-next-line
    }, [authPage.state.error]);

    const onChangeremember = (e) => {
        if (
            localStorage.getItem(storageKeys.rememberpassword) != undefined &&
            localStorage.getItem(storageKeys.rememberpassword) != 'true'
        ) {
            localStorage.setItem(storageKeys.rememberpassword, 'true');
            setrememberme(true);
        } else {
            localStorage.setItem(storageKeys.rememberpassword, 'false');
            setrememberme(false);
        }
    };
    const handleLogin = async (data: ISignInFormData) => {
        localStorage.setItem(storageKeys.imageprofile, '');
        localStorage.setItem(storageKeys.fullnameprofile, '');
        localStorage.setItem(storageKeys.usertype, '');
        localStorage.setItem(storageKeys.showmodal, '');
        localStorage.setItem(storageKeys.filterresidentflat, '');
        handleClearActiveResidentFlatId();

        await authPage.login(data.email.trim(), data.password.trim());
    };
    const handleForget = () => {
        dispatch(
            newModal({
                closeButton: true,
                Body: ForgetPassword,
                title: 'Forgot password'
            })
        );
    };
    const handelsignup = () => {
        router.push('/welcome');
    };

    return (
        <Formik
            initialValues={signInFormInitialValues}
            onSubmit={handleLogin}
            validationSchema={signInFormValidation}>
            <Form>
                <MInputFormik name="email" necessary={false} label="Email" placeholder="Email" />

                <MInputFormik
                    name="password"
                    placeholder="Password"
                    label="Password"
                    fullWidth
                    type={showPassword ? 'text' : 'password'}
                    necessary={false}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment
                                style={{ cursor: 'pointer' }}
                                position="end"
                                onClick={() => setshowPassword(!showPassword)}>
                                {!showPassword ? (
                                    <img src="/images/show.png" />
                                ) : (
                                    <img src="/images/showpassword.png" />
                                )}
                            </InputAdornment>
                        ),
                        style: {
                            backgroundColor: '#f8f8f8'
                        }
                    }}
                />

                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <FormControlLabel
                        label="Remember me"
                        control={
                            <Checkbox
                                onChange={onChangeremember}
                                checked={rememberme}
                                sx={{
                                    color: '#E63C49',
                                    '&.Mui-checked': {
                                        color: '#E63C49'
                                    }
                                }}
                            />
                        }
                    />

                    <Box onClick={handleForget}>
                        <Typography
                            style={{ cursor: 'pointer' }}
                            variant="body1"
                            component="a"
                            color={COLORS.danger}>
                            Forget password?
                        </Typography>
                    </Box>
                </Box>

                <S.SignInButton
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={authPage.state.loading}>
                    Sign in
                </S.SignInButton>

                <S.rowpage>
                    <S.cellpagetext>
                        <S.Authsingup onClick={handelsignup}>Don't have an account?</S.Authsingup>
                    </S.cellpagetext>
                    <S.cellpage style={{ margin: '0 0 0 2px' }}>
                        <S.Authsingupabi onClick={handelsignup}>Sign up</S.Authsingupabi>
                    </S.cellpage>
                </S.rowpage>
            </Form>
        </Formik>
    );
};

export default Signin;
