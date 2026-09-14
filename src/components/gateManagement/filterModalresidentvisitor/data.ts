import Utils from '@/utils/utils';
import { ApprovalStatus } from 'src/graphql/generated';

export const gateManagementFilterInitialForm = (state?: any) => {
    return {
        start: state?.start ? Utils.convertDateTimeToInputDateValue(state?.start) : undefined,
        end: state?.end ? Utils.convertDateTimeToInputDateValue(state?.end) : undefined,
        visitorFirstName: state?.visitorFirstName || undefined,
        visitorLastName: state?.visitorLastName || undefined
    };
};
