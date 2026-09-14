import snackbarMessages from 'src/data/snackbarMessages';
import * as Yup from 'yup';

export const securityProfileSettingInitialForm = () => ({
    password: '',
    newPassword: '',
    confirmNewPassword: ''
});

export const securityProfileSettingValidationForm = () => {
    const obj = {
        password: Yup.string().required(snackbarMessages.requiredField),
        newPassword: Yup.string().required(snackbarMessages.requiredField),
        confirmNewPassword: Yup.string()
            .required(snackbarMessages.requiredField)
            .oneOf([Yup.ref('newPassword')], snackbarMessages.didNotMatchPassword)
    };

    return Yup.object(obj);
};
