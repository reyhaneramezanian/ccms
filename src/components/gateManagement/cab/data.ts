import Utils from '@/utils/utils';
import snackbarMessages from 'src/data/snackbarMessages';
import { UserType } from 'src/graphql/generated';
import * as Yup from 'yup';

export const visitorModalValidationForm = (userType: UserType) => {
    let obj = {
        companyName: Yup.string().required(snackbarMessages.requiredField),
        licensePlate: Yup.string().required(snackbarMessages.requiredField),
        startDate: Yup.string().required(snackbarMessages.requiredField),
        endDate: Yup.date()
            .when(
                'startDate',
                (startDate, Yup) =>
                    startDate && Yup.min(startDate, 'End time cannot be before start time')
            )
            .required('This field is required')
        //startTime: Yup.string().required(snackbarMessages.requiredField),
        //endTime: Yup.string().required(snackbarMessages.requiredField)
    };

    if (userType === UserType.Security) {
        obj = Object.assign(obj, {
            //complexId: Yup.number().required(snackbarMessages.requiredField),
            blockId: Yup.number().required(snackbarMessages.requiredField),
            floorId: Yup.number().required(snackbarMessages.requiredField),
            flatId: Yup.number().required(snackbarMessages.requiredField)
        });
    }

    return Yup.object(obj);
};
