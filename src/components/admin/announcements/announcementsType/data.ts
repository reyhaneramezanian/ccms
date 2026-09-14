import * as Yup from 'yup';
import { ActiveStatus, AdminAnnouncementTypeCreateMutationVariables } from 'src/graphql/generated';

export const announcementTypeInitialForm: AdminAnnouncementTypeCreateMutationVariables = {
    name: ''
    // activeStatus: undefined
};

export const announcementTypeValidationForm = Yup.object({
    name: Yup.string().required('This field is required'),
    activeStatus: Yup.string().required('This field is required')
});
