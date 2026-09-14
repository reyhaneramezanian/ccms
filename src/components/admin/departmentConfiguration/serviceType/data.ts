import { ServiceTypeInput } from 'src/graphql/generated';
import * as Yup from 'yup';

export const serviceTypeInitialForm = (row: any): ServiceTypeInput => ({
    name: row?.name || '',
    departmentId: row?.departmentId || undefined,
    activeStatus: row?.activeStatus || undefined
});

export const serviceTypeValidationSchema = Yup.object({
    name: Yup.string().required('This field is required'),
    departmentId: Yup.number().required('This field is required'),
    activeStatus: Yup.string().required('This field is required')
});
