import { useAuthPage } from '@/components/auth/services/useAuth';
import { MuiButton } from '@/components/base/Button';
import { MInputFormik } from '@/components/base/input/MInput';
import { Spacer } from '@/components/base/spacer';
import { Box, styled, Typography, useTheme } from '@mui/material';
import { Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
//import BlueTickIcon from 'src/assets/icons/blue-tick';
import { closeModal, newModal } from 'src/redux/actions/actions';
import * as Yup from 'yup';

const EmailAddressRequestText = styled(Typography)({
    fontSize: 14,
    maxWidth: 342,
    textAlign: 'justify'
});

const SendBtn = styled(MuiButton)(({ theme }) => ({
    background: theme.palette.primary.main,
    color: 'white',
    // width: 200,
    ':hover': {
        background: theme.palette.primary.main
    }
}));

const CancleBtn = styled(MuiButton)(({ theme }) => ({
    color: theme.palette.primary.dark,
    border: `1px solid ${theme.palette.primary.dark}`
    // width: 200
}));

export const AddEmail = () => {
    const dispatch = useDispatch();
    const { state, changePassword } = useAuthPage();

    return (
        <Box>
            <Spacer space={30} />
            <EmailAddressRequestText>
                Please Enter Your Email Address As You Previously Created With That Account. We Will
                Send A Password Reset Link To Your Email.
            </EmailAddressRequestText>
            <Spacer space={30} />
            <Formik
                initialValues={{ email: `` }}
                onSubmit={(v) =>
                    changePassword(v.email).then(() => {
                        dispatch(closeModal('Forgot_Pass'));
                        dispatch(
                            newModal({
                                id: 'ChangePassEmailSent',
                                Body: EmailSentSuccessfully,
                                closeButton: true,
                                top: 0
                            })
                        );
                    })
                }
                validationSchema={Yup.object({
                    email: Yup.string().email('Must be a valid email').required('Email is required')
                })}>
                <Form>
                    <Box width="80%" marginX="auto">
                        <MInputFormik name="email" fullWidth placeholder="Enter email" />
                    </Box>
                    <Spacer space={20} />
                    <Box display="flex">
                        <SendBtn type="submit" loading={state.loading}>
                            Send
                        </SendBtn>
                        <Spacer space={10} />
                        <CancleBtn onClick={() => dispatch(closeModal('Forgot_Pass'))}>
                            Cancel
                        </CancleBtn>
                    </Box>
                    {state.error && (
                        <Typography fontSize={12} color="red">
                            {state.error}
                        </Typography>
                    )}
                </Form>
            </Formik>
        </Box>
    );
};

export const EmailSentSuccessfully = () => {
    const theme = useTheme();

    return (
        <Box display="flex" alignItems="center">
            {/*<BlueTickIcon />*/}
            <Box paddingX="20px">
                <Typography color={theme.palette.primary.dark} fontSize={22}>
                    Please check your email!
                </Typography>
                <Spacer space={35} />
                <Typography color={theme.palette.primary.dark} fontSize={16}>
                    We sent you a link to reset your password.
                </Typography>
            </Box>
        </Box>
    );
};
