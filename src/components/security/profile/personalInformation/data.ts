import Utils from '@/utils/utils';
import snackbarMessages from 'src/data/snackbarMessages';
import * as Yup from 'yup';

export const securityProfilePersonalInformationInitialForm = (state: any) => {
    return {
        firstName: state?.firstName || '',
        lastName: state?.lastName || '',
        dateOfBirth: Utils.convertDateTimeToInputDateValue(state?.dateOfBirth),
        phoneNumber: state?.phoneNumber || '',
        gender: state?.gender || undefined,
        email: state?.email || '',
        yearsOfExperience: state?.yearsOfExperience || undefined,
        activeStatus: state?.activeStatus || undefined
    };
};

export const securityProfilePersonalInformationValidationForm = () => {
    const obj = {
        firstName: Yup.string(),
        lastName: Yup.string(),
        dateOfBirth: Yup.string().required(snackbarMessages.requiredField),
        phoneNumber: Yup.string(),
        gender: Yup.string().required(snackbarMessages.requiredField),
        email: Yup.string(),
        yearsOfExperience: Yup.string().required(snackbarMessages.requiredField),
        activeStatus: Yup.string().required(snackbarMessages.requiredField)
    };

    return Yup.object(obj);
};
