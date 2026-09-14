import Utils from '@/utils/utils';
import snackbarMessages from 'src/data/snackbarMessages';
import * as Yup from 'yup';
import { PHONE_VALIDATIONIndia, PHONE_VALIDATIONUsa } from '@/utils/helper/regexes';

export const residentSignupInitialForm = () => ({
    complexId: undefined,
    blockId: undefined,
    floorId: undefined,
    flatId: undefined,
    ownershipStatus: 'OWNER',
    firstName: '',
    lastName: '',
    gender: null,
    phoneNumber: '',
    email: '',
    alternativeContact: '',
    dateOfBirth: '',
    middleName: ''
});

export const residentSignupValidationSchema = (activePage: 0 | 1 | 2 | 3) => {
    switch (activePage) {
        case 0:
            return Yup.object({
                ownershipStatus: Yup.string().required(snackbarMessages.requiredField),
                complexId: Yup.string().required(snackbarMessages.requiredField),
                blockId: Yup.string().required(snackbarMessages.requiredField),
                floorId: Yup.string().required(snackbarMessages.requiredField),
                flatId: Yup.string().required(snackbarMessages.requiredField)
            });

        case 1:
            return Yup.object({
                firstName: Yup.string().required(snackbarMessages.requiredField),
                lastName: Yup.string().required(snackbarMessages.requiredField),
                // gender: Yup.string().required(snackbarMessages.requiredField),
                dateOfBirth: Yup.date()
                    .max(new Date(), 'Date can not be in the future')
                    .required('This field is required')
            });

        case 2:
            return Yup.object({
                phoneNumber: Yup.string()
                    .required(snackbarMessages.requiredField)
                    .matches(PHONE_VALIDATIONIndia, 'Please enter invalid number'),
                email: Yup.string()
                    .required(snackbarMessages.requiredField)
                    .email('Must be a valid email')
                //alternativeContact: Yup.string().required(snackbarMessages.requiredField)
            });
    }
};
