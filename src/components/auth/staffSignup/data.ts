import Utils from '@/utils/utils';
import snackbarMessages from 'src/data/snackbarMessages';
import * as Yup from 'yup';
import { PHONE_VALIDATIONIndia, PHONE_VALIDATIONUsa } from '@/utils/helper/regexes';

export const staffSignupInitialForm = () => ({
    firstName: '',
    lastName: '',
    //middleName: '',
    gender: null,
    dateOfBirth: '',
    phoneNumber: '',
    alternatePhone: '',
    email: '',
    alternateEmail: '',
    address: '',
    complexId: undefined,
    departmentId: undefined,
    // serviceTypeId: undefined,
    employmentTypeId: undefined,
    // role: undefined,
    // activeStatus: undefined,
    dateOfJoining: '',
    dateOfTermination: ''
});

export const staffSignupValidationSchema = (activePage: 0 | 1 | 2 | 3 | 4) => {
    switch (activePage) {
        case 0:
            return Yup.object({
                firstName: Yup.string().required(snackbarMessages.requiredField),
                lastName: Yup.string().required(snackbarMessages.requiredField),
                // middleName: Yup.string().required(snackbarMessages.requiredField),
                //gender: Yup.string().required(snackbarMessages.requiredField),
                dateOfBirth: Yup.date()
                    .max(new Date(), 'Date can not be in the future')
                    .required('This field is required')
            });

        case 1:
            return Yup.object({
                phoneNumber: Yup.string()
                    .required(snackbarMessages.requiredField)
                    .matches(PHONE_VALIDATIONIndia, 'Please enter invalid number'),
                alternatePhone: Yup.string()
                    .required(snackbarMessages.requiredField)
                    .notOneOf(
                        [Yup.ref('phoneNumber'), null],
                        'Alternate phone must not match with primary phone'
                    )
                    .matches(PHONE_VALIDATIONIndia, 'Please enter invalid number'),
                email: Yup.string()
                    .email('Email is invalid')
                    .required(snackbarMessages.requiredField),
                alternateEmail: Yup.string()
                    .email('Email is invalid')
                    .notOneOf([Yup.ref('email'), null], 'Alternate email must not match with email')
                    .required(snackbarMessages.requiredField),
                address: Yup.string().required(snackbarMessages.requiredField)
            });

        case 2:
            return Yup.object({
                complexId: Yup.string().required(snackbarMessages.requiredField),
                departmentId: Yup.string().required(snackbarMessages.requiredField),
                // serviceTypeId: Yup.string().required(snackbarMessages.requiredField),
                employmentTypeId: Yup.string().required(snackbarMessages.requiredField)
            });

        case 3:
            return Yup.object({
                //  role: Yup.string().required(snackbarMessages.requiredField),
                // activeStatus: Yup.string().required(snackbarMessages.requiredField),
                dateOfJoining: Yup.string().required(snackbarMessages.requiredField),
                dateOfTermination: Yup.string().required(snackbarMessages.requiredField)
            });
    }
};
