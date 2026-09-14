import * as Yup from 'yup';
import snackbarMessages from './snackbarMessages';

export const userFLatLocationValidationSchema = Yup.object({
    complexId: Yup.string().required(snackbarMessages.requiredField),
    blockId: Yup.string().required(snackbarMessages.requiredField),
    floorId: Yup.string().required(snackbarMessages.requiredField),
    flatId: Yup.string().required(snackbarMessages.requiredField)
});
