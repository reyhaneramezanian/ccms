import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import * as stafftstyle from '../../staff.style';
import { Formik, Form, FieldArray, Field, useField } from 'formik';
import { MSelectFormik } from '@/components/base/input/MSelect';
import { MInputFormik } from '@/components/base/input/MInput';
import * as Yup from 'yup';
import { Select, Checkbox, Grid, FormControlLabel, Button, Box, MenuItem } from '@mui/material';
import { updatePassworduser } from 'src/auth/firebase';
import { useSnackbar } from 'notistack';
import { useGetUser } from 'src/auth/UserProvider';

const personaledite = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const user = useGetUser();
    const hasUser = typeof user === 'object' && user !== null;

    const handelsave = async (e) => {
        if (!hasUser) return;

        try {
            const res = await updatePassworduser(user.email, e.Currentpassword, e.Newpassword);
            enqueueSnackbar('Operation was successful!', {
                variant: 'success'
            });
        } catch (err) {
            enqueueSnackbar('Operation Failed!', { variant: 'error' });
        }
    };
    return (
        <Formik
            enableReinitialize
            onSubmit={(v, handlers) => {
                handelsave(v);
            }}
            initialValues={{
                Confirmnewpassword: '',
                Currentpassword: '',
                Newpassword: ''
            }}
            validationSchema={Yup.object({
                Currentpassword: Yup.string().required('This field is required'),
                Newpassword: Yup.string().required('This field is required'),
                Confirmnewpassword: Yup.string()
                    .oneOf([Yup.ref('Newpassword'), null], 'New password must match')
                    .required()
            })}>
            <Form>
                <stafftstyle.modalFormRowWrapper>
                    <stafftstyle.rowpage>
                        <stafftstyle.cellpage>
                            <div style={{ width: '96%' }}>
                                <MInputFormik
                                    style={{ width: '96%' }}
                                    name="Currentpassword"
                                    label="Current password"
                                    placeholder="Current password"
                                    fullWidth
                                    type={'password'}
                                />
                            </div>
                        </stafftstyle.cellpage>
                        <stafftstyle.cellpage>
                            <div style={{ width: '96%' }}>
                                <MInputFormik
                                    style={{ width: '96%' }}
                                    name="Newpassword"
                                    label="New password"
                                    placeholder="New password"
                                    fullWidth
                                    type={'password'}
                                />
                            </div>
                        </stafftstyle.cellpage>
                    </stafftstyle.rowpage>
                    <stafftstyle.rowpage>
                        <stafftstyle.cellpage>
                            <div style={{ width: '96%' }}>
                                <MInputFormik
                                    name="Confirmnewpassword"
                                    label="Confirm new password"
                                    placeholder="Confirm new password"
                                    fullWidth
                                    type={'password'}
                                />
                            </div>
                        </stafftstyle.cellpage>
                        <stafftstyle.cellprofile></stafftstyle.cellprofile>
                    </stafftstyle.rowpage>
                </stafftstyle.modalFormRowWrapper>
                <stafftstyle.rowpage>
                    <Box>
                        <Button type="submit" variant="contained" color="primary">
                            Save
                        </Button>
                    </Box>
                </stafftstyle.rowpage>
            </Form>
        </Formik>
    );
};
export default personaledite;
