import { ISignInFormData } from './types.signIn';
import * as Yup from 'yup';

export const signInFormInitialValues: ISignInFormData = {
    email: '',
    password: ''
};

export const signInFormValidation = Yup.object({
    email: Yup.string().required('This field is required').email('Email is invalid'),
    password: Yup.string().required('This field is required')
});
