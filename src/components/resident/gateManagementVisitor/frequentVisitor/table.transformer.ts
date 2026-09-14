import Transformer from '@/utils/transformer';
import Utils from '@/utils/utils';
import { GateManagementFrequentVisitorGetQuery } from 'src/graphql/generated';

class GateManagementFrequentVisitorTransfer extends Transformer<GateManagementFrequentVisitorGetQuery> {
    transforms(transfers: GateManagementFrequentVisitorGetQuery) {
        return transfers.gateApproval_getFrequentVisitors.result.items.map((item) => {
            return {
                ...item,
                Check: false,
                id: item.id,
                visitorName: `${item.visitorFirstName} ${item.visitorLastName}` || '',
                phoneNumber: item.visitorPhoneNumber || '',
                licensePlate: item.licensePlate || '',
                startDate: item.start.slice(0, 10).replaceAll('-', '/'),
                endDate: item.end.slice(0, 10).replaceAll('-', '/'),
                startDates: item.start.slice(0, 10),
                endDates: item.end.slice(0, 10),
                status: item.approvalStatus,
                visitorFirstName: item.visitorFirstName,
                visitorLastName: item.visitorLastName,
                securityCode: item.securityCode,
                end: item?.end?.slice(0, 10),
                start: item?.start?.slice(0, 10)
            };
        });
    }
}

export default new GateManagementFrequentVisitorTransfer();
