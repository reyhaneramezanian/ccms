import { styled } from '@mui/system';
import { Formik, Form } from 'formik';
import React from 'react';
import { MInputFormik } from '../base/input/MInput';
import { MSelectFormik } from '../base/input/MSelect';
import { TextField, TextFieldProps } from '@mui/material';

import * as Yup from 'yup';
import { Button, Grid, Typography } from '@mui/material';
import { getPx } from '@/utils/responsive/getPx';

const CustomMInputFormik = styled(MInputFormik)({
    background: 'white',
    border: 'none !important',
    borderRadius: 6,
    '& .MuiOutlinedInput-notchedOutline': {
        border: 'none',
        borderRadius: 6
    }
});

const CustomMSelectFormik = styled(MSelectFormik)({
    background: 'white',
    border: 'none !important',
    borderRadius: 6,
    '& .MuiOutlinedInput-notchedOutline': {
        border: 'none',
        borderRadius: 6
    }
});

export default function FormInstance() {
    const initialValues = React.useMemo(() => {
        return {
            email: ``,
            firstname: ``,
            gender: null
        };
    }, []);

    const formikRef = React.useRef();

    return (
        <div>
            <Formik
                innerRef={formikRef}
                enableReinitialize
                onSubmit={(v, { resetForm }) => {
                    console.log(v);
                    resetForm();
                }}
                initialValues={initialValues}
                validationSchema={Yup.object({
                    firstname: Yup.string().required('This field is required'),

                    email: Yup.string()
                        .email('This field should be an email')
                        .required('This field is required'),
                    gender: Yup.string().required('This field is required')
                })}>
                <Form>
                    <div
                        style={{
                            width: 500,
                            display: 'flex',
                            flexDirection: 'column',
                            margin: 'auto'
                        }}>
                        <CustomMInputFormik name="firstname" label="Firstname" fullWidth />

                        <CustomMInputFormik name="email" label="Email" fullWidth />
                        <div>
                            {' '}
                            <CustomMSelectFormik
                                name="gender"
                                label="Gender"
                                options={[
                                    { option: 'None', value: null },
                                    { option: 'Male', value: 'M' },
                                    { option: 'Female', value: 'F' }
                                ]}
                            />
                        </div>

                        <Button variant="contained" type="submit" fullWidth>
                            <Typography variant="body1">Submit</Typography>
                        </Button>
                    </div>
                </Form>
            </Formik>
            <div style={{ background: 'red', height: 130, width: '100%', color: '#fff' }}>
                130px fixed
            </div>
            <div style={{ background: 'blue', height: getPx(130), width: '100%', color: '#fff' }}>
                {getPx(130)}px comes from the function
            </div>
        </div>
    );
}
