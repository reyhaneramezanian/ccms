import CabIcon from 'src/assets/icons/cab';
import DeliveryIcon from 'src/assets/icons/delivery';
import VisitorIcon from 'src/assets/icons/visitor';
import { GateApprovalType } from 'src/graphql/generated';

export const selectApprovalTypeListItemsData = [
    {
        type: GateApprovalType.Delivery,
        Icon: DeliveryIcon,
        title: 'Delivery'
    },
    {
        type: GateApprovalType.FrequentVisitor,
        Icon: VisitorIcon,
        title: 'Visitor'
    },
    {
        type: GateApprovalType.Cab,
        Icon: CabIcon,
        title: 'Cab'
    }
];
