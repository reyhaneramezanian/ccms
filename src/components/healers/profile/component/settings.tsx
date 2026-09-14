import BusinessInfo from '@/components/auth/signUp/healer/components/business-info';
import PersonalInfo from '@/components/auth/signUp/healer/components/personal-info';
import { MuiButton } from '@/components/base/Button';
import { Box, Container, Divider, Grid, styled, useMediaQuery, useTheme } from '@mui/material';
import { Form, Formik } from 'formik';
import React from 'react';
import { Spacer } from '@/components/base/spacer';
import * as Yup from 'yup';

const CustomContainer = styled('div')(({ theme }) => ({
    marginLeft: '150px',
    [theme.breakpoints.down('sm')]: {
        marginLeft: '20px'
    }
}));

const initialValue = {
    name: '',
    bio: '',
    phone: '',
    gender: '',
    address: ''
};

const Settings = () => {
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
    const [formPage, setFormPage] = React.useState(0);
    const [value, setValue] = React.useState({
        workDays: [],
        typeAndPrice: [],
        vacation: [],
        files: {
            diplomas: []
        },
        profilePhoto: {}
    });

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required!'),
        bio: Yup.string().required('Bio is required!'),
        phone: Yup.string().required('Phone Number is required!'),
        gender: Yup.string().required('Gender is required!'),
        address: Yup.string().required('Address is required!')
    });

    return (
        <CustomContainer>
            <Formik
                initialValues={initialValue}
                validationSchema={validationSchema}
                onSubmit={() => {}}>
                {({ values: formikValue }) => (
                    <Form>
                        <HealerStepOne
                            setPage={setFormPage}
                            value={value}
                            setValue={setValue}
                            formikValue={formikValue}
                            isSmall={isSmall}
                        />
                    </Form>
                )}
            </Formik>
        </CustomContainer>
    );
};

export default Settings;

const HealerStepOne = ({ setPage, value, setValue, formikValue, isSmall }) => {
    const theme = useTheme();

    const SubmitButton = styled(MuiButton)(({ theme }) => ({
        background: theme.palette.primary.main,
        color: 'white',
        width: 350,
        ':hover': {
            background: theme.palette.primary.main
        },
        [theme.breakpoints.down('sm')]: {
            width: '90%'
        }
    }));

    return (
        <>
            <Grid container>
                <Grid item xs={12} md={7}>
                    <PersonalInfo
                        formikValue={formikValue}
                        value={value}
                        setValue={setValue}
                        showVacation={true}
                    />
                </Grid>
                <Grid item xs={12} md={5}>
                    <BusinessInfo
                        value={value}
                        setValue={setValue}
                        formikValue={formikValue}
                        marginItemTime={true}
                    />
                </Grid>
            </Grid>
            <Box
                style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: isSmall ? 'flex-start' : 'center'
                }}>
                <SubmitButton type="submit">Confrim</SubmitButton>
            </Box>
            <Spacer space={30} />
        </>
    );
};
