import Utils from '@/utils/utils';
import { ApprovalStatus } from 'src/graphql/generated';

export const gateManagementFilterInitialForm = (state?: any) => {
    return {
        complexId: state?.complexId || undefined,
        blockId: state?.blockId || undefined,
        floorId: state?.floorId || undefined,
        flatId: state?.flatId || undefined,
        securityCode: state?.securityCode || undefined,
        start: state?.start ? Utils.convertDateTimeToInputDateValue(state?.start) : undefined,
        end: state?.end ? Utils.convertDateTimeToInputDateValue(state?.end) : undefined,
        approvalStatus: ApprovalStatus.Pending
    };
};
