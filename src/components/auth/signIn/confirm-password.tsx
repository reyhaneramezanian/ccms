import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Grid, Box } from '@mui/material';
import { MInputFormik } from '@/components/base/input/MInput';
import { useChangePassword } from '@/components/auth/services/use-change-password';
import SuccessEmailModal, { SUCCESS_MAIL_ID } from '@/components/auth/services/success-email';
import { newModal } from 'src/redux/actions/actions';
import { useDispatch } from 'react-redux';

const MyButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#fff',
    border: '1px solid #2B368F',
    color: '#2B368F !important',
    fontFamily: 'Helvetica Neue',
    fontSize: '15px',
    fontWeight: 'bold',
    borderRadius: '7px',
    padding: '10px 80px',
    margin: '0 20px ',
    '&:hover': {
        backgroundColor: '#fff',
        color: '#2B368F'
    },
    [theme.breakpoints.down('sm')]: {
        padding: '10px 70px'
    }
}));
const CancelButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#2B368F',
    padding: '10px 90px',
    color: '#D6E1FF',
    fontFamily: 'Helvetica Neue',
    fontSize: '15px',
    fontWeight: 'bold',
    borderRadius: '7px',
    margin: '0 20px ',

    ':hover': {
        backgroundColor: '#2B368F',
        color: '#D6E1FF'
    },
    [theme.breakpoints.down('sm')]: {
        padding: '10px 70px'
    }
}));

export default function ForgetPassword({ closeModal }) {
    const { changePassword, loading } = useChangePassword();
    const dispatch = useDispatch();

    const initialValues = {
        email: ''
    };

    return (
        <div>
            <div style={{ maxWidth: 500, marginTop: 15 }}>
                <Typography gutterBottom style={{ width: '83%' }}>
                    A link to reset your password will be sent to the email you provide below.
                </Typography>
            </div>
            <Formik
                enableReinitialize
                onSubmit={(v, handlers) => {
                    changePassword(v.email, handlers);
                    closeModal();
                }}
                initialValues={initialValues}
                validationSchema={Yup.object({
                    email: Yup.string().email('Invalid Email').required('Email is required')
                })}>
                <Form>
                    <Box mt={1}>
                        <Grid container spacing={2}>
                            <Grid item md={12} xs={12}>
                                <Grid container display="flex" justifyContent="center">
                                    <Grid item md={11} xs={12} mb={4} mt={4}>
                                        <MInputFormik name="email" label="Enter email" fullWidth />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>

                    <Grid container>
                        <Grid
                            item
                            xs={12}
                            md={12}
                            sx={{ display: 'flex', justifyContent: 'space-around' }}
                            my={1}>
                            <Grid item xs={6} md={5}>
                                {/* <CancelButton variant="contained" type="submit">
                  Send
                </CancelButton> */}
                                <div style={{ display: 'flex', flex: 1 }}></div>
                            </Grid>
                            <Grid item xs={6} md={6}>
                                <CancelButton variant="contained" type="submit">
                                    Send
                                </CancelButton>
                            </Grid>
                            <Grid item xs={6} md={6}>
                                <MyButton variant="contained" onClick={closeModal}>
                                    <Typography>Cancel</Typography>
                                </MyButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Form>
            </Formik>
        </div>
    );
}
