import { FrequentVisitorInput } from 'src/graphql/generated';
import * as Yup from 'yup';

export const frequentVisitorValidationSchema = Yup.object({
    name: Yup.string().required('This field is required'),
    description: Yup.string().required('This field is required'),
    activeStatus: Yup.string().required('This field is required'),
    Complex: Yup.array().required('This field is required')
});
