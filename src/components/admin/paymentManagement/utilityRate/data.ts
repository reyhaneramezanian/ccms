import * as Yup from 'yup';

export const utilityRateInitialForm = (row: any): any => ({
    rate: row?.rate || ''
});

export const utilityRateValidationForm = Yup.object({
    rate: Yup.number().required('This field is required').min(0, 'Min is 0')
});
