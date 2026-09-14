import * as Yup from 'yup';

export const maintenanceTypeInitialForm = (row: any): any => ({
    name: row?.name || '',
    activeStatus: row?.activeStatus || undefined
});

export const maintenanceTypeValidationForm = Yup.object({
    name: Yup.string().required('This field is required'),
    activeStatus: Yup.string().required('This field is required')
});
