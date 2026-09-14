import { GateApprovalType } from 'src/graphql/generated';

const getApprovalText = (approvalType: GateApprovalType): string => {
    switch (approvalType) {
        case GateApprovalType.Cab:
            return 'Cab';

        case GateApprovalType.Delivery:
            return 'Delivery';

        case GateApprovalType.FrequentVisitor:
            return 'Frequent visitor';

        case GateApprovalType.OneTimeVisitor:
            return 'One time visitor';

        default:
            return 'None';
    }
};

export default getApprovalText;
