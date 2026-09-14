import * as Yup from 'yup';
import { PHONE_VALIDATIONIndia, PHONE_VALIDATIONUsa } from '@/utils/helper/regexes';

export const securitySignupInitialForm = () => ({
    yearsOfExperience: undefined,
    complexId: undefined,
    email: '',
    firstName: '',
    lastName: '',
    gender: null,
    dateOfBirth: undefined,
    phoneNumber: '',
    // activeStatus: undefined,
    employeeType: '',
    middleName: ''
});

export const securitySignupValidationSchema = (activePage: 0 | 1 | 2) => {
    switch (activePage) {
        case 0:
            return Yup.object({
                firstName: Yup.string().required('This field is required'),
                lastName: Yup.string().required('This field is required'),
                //  gender: Yup.string().required('This field is required'),
                dateOfBirth: Yup.date()
                    .max(new Date(), 'Date can not be in the future')
                    .required('This field is required')
            });

        case 1:
            return Yup.object({
                yearsOfExperience: Yup.number()
                    .required('This field is required')
                    .min(0, 'Min is 0'),
                complexId: Yup.number().required('This field is required'),
                email: Yup.string().email('Email is invalid').required('This field is required'),
                phoneNumber: Yup.string()
                    .required('This field is required')
                    .matches(PHONE_VALIDATIONIndia, 'Please enter invalid number'),
                employeeType: Yup.string().required('This field is required')
                // activeStatus: Yup.string().required('This field is required')
            });
    }
};
