import Utils from '@/utils/utils';
import { ApprovalStatus } from 'src/graphql/generated';
import * as Yup from 'yup';

export const gateManagementApprovalInitialForm = {};

export const gateManagementApprovalFilterInitialForm = (state?: any) => {
    return {
        complexId: state?.complexId || undefined,
        blockId: state?.blockId || undefined,
        floorId: state?.floorId || undefined,
        flatId: state?.flatId || undefined,
        securityCode: state?.securityCode || undefined,
        start: state?.start || undefined,
        end: state?.end || undefined
        // approvalStatus: ApprovalStatus.Pending
    };
};

export const gateManagementApprovalValidationForm = Yup.object({
    complexId: Yup.number().required('This field is required'),
    blockId: Yup.number(),
    floorId: Yup.number(),
    flatId: Yup.number()
});
