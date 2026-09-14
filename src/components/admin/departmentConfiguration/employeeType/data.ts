import * as Yup from 'yup';
import { EmployeeTypeInput } from 'src/graphql/generated';

export const employeeTypeInitialForm = (row: any): EmployeeTypeInput => ({
    name: row?.name || '',
    activeStatus: row?.activeStatus || undefined
});

export const employeeTypeValidationSchema = Yup.object({
    name: Yup.string().required('This field is required'),
    activeStatus: Yup.string().required('This field is required')
});
