import * as Yup from 'yup';
import {
    ActiveStatus,
    AdminAnnouncementTypeCreateMutationVariables,
    ApprovalStatus
} from 'src/graphql/generated';
import Utils from '@/utils/utils';

export const gateManagementHistoryInitialForm = {};

export const gateManagementHistoryFilterInitialForm = (state?: any) => {
    return {
        complexId: state?.complexId || undefined,
        blockId: state?.blockId || undefined,
        floorId: state?.floorId || undefined,
        flatId: state?.flatId || undefined,
        securityCode: state?.securityCode || undefined,
        start: state?.start || undefined,
        end: state?.end || undefined
        // approvalStatus: state?.approvalStatus || undefined
    };
};

export const gateManagementHistoryValidationForm = Yup.object({
    complexId: Yup.number().required('This field is required'),
    blockId: Yup.number(),
    floorId: Yup.number(),
    flatId: Yup.number()
});
