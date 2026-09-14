import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import * as residentstyle from '../../resident.style';
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
            enqueueSnackbar(err, { variant: 'error' });
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
                Newpassword: Yup.string()
                    .required('This field is required')
                    .min(6, 'Password is too short - should be 6 chars minimum'),
                Confirmnewpassword: Yup.string()
                    .oneOf([Yup.ref('Newpassword'), null], 'New password must match')
                    .min(6, 'Password is too short - should be 6 chars minimum')
                    .required()
            })}>
            <Form>
                <residentstyle.modalFormRowWrapper>
                    <residentstyle.rowprofile>
                        <residentstyle.cellprofile>
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
                        </residentstyle.cellprofile>
                        <residentstyle.cellprofile>
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
                        </residentstyle.cellprofile>
                    </residentstyle.rowprofile>
                    <residentstyle.rowprofile>
                        <residentstyle.cellprofile>
                            <div style={{ width: '96%' }}>
                                <MInputFormik
                                    name="Confirmnewpassword"
                                    label="Confirm new password"
                                    placeholder="Confirm new password"
                                    fullWidth
                                    type={'password'}
                                />
                            </div>
                        </residentstyle.cellprofile>
                        <residentstyle.cellprofile></residentstyle.cellprofile>
                    </residentstyle.rowprofile>
                </residentstyle.modalFormRowWrapper>
                <residentstyle.rowprofile>
                    <Box>
                        <Button type="submit" variant="contained" color="primary">
                            Save
                        </Button>
                    </Box>
                </residentstyle.rowprofile>
            </Form>
        </Formik>
    );
};
export default personaledite;
