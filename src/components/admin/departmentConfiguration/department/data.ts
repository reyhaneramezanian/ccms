import { DepartmentInput } from 'src/graphql/generated';
import * as Yup from 'yup';

export const departmentTypeInitialForm = (row: any): DepartmentInput => ({
    name: row?.name || '',
    activeStatus: row?.activeStatus || undefined
});

export const departmentTypeValidationSchema = Yup.object({
    name: Yup.string().required('This field is required'),
    activeStatus: Yup.string().required('This field is required')
});
