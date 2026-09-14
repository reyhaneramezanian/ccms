import Transformer from '@/utils/transformer';
import Utils from '@/utils/utils';
import { GateManagementOneTimeVisitorGetQuery } from 'src/graphql/generated';

class GateManagementOneTimeVisitorTransfer extends Transformer<GateManagementOneTimeVisitorGetQuery> {
    transforms(transfers: GateManagementOneTimeVisitorGetQuery) {
        return transfers.gateApproval_getOneTimeVisitors.result.items.map((item) => {
            return {
                ...item,
                Check: false,
                id: item.id,
                visitorName: `${item.visitorFirstName} ${item.visitorLastName}` || '',
                phoneNumber: item.visitorPhoneNumber || '',
                licensePlate: item.licensePlate || '',
                date: item.start.slice(0, 10).replaceAll('-', '/'),
                dates: item.start.slice(0, 10),
                fromTime: item.start.slice(11, 16),
                toTime: item.end.slice(11, 16),
                time: `${Utils.convert24HourTo12HourTimeSyntax(
                    item.start.slice(11, 16)
                )} - ${Utils.convert24HourTo12HourTimeSyntax(item.end.slice(11, 16))}`,
                securityCode: item.securityCode,
                status: item.approvalStatus,
                end: item?.end?.slice(0, 10),
                start: item?.start?.slice(0, 10)
            };
        });
    }
}

export default new GateManagementOneTimeVisitorTransfer();
