import Transformer from '@/utils/transformer';
import Utils from '@/utils/utils';
import { GateManagementCabGetQuery } from 'src/graphql/generated';
import moment from 'moment';

class GateManagementCabTransfer extends Transformer<GateManagementCabGetQuery> {
    transforms(transfers: GateManagementCabGetQuery) {
        return transfers.gateApproval_getCabs.result.items.map((item) => {
            return {
                Check: false,
                id: item.id,
                companyName: item.companyName || '',
                licensePlate: item.licensePlate || '',
                startDate: item.start.slice(0, 10).replaceAll('-', '/'),
                endDate: item.end.slice(0, 10).replaceAll('-', '/'),
                startDates: item.start.slice(0, 10),
                endDates: item.end.slice(0, 10),
                startTime: item.start.slice(11, 16),
                endTime: item.end.slice(11, 16),
                startTimeText: Utils.convert24HourTo12HourTimeSyntax(item.start.slice(11, 16)),
                endTimeText: Utils.convert24HourTo12HourTimeSyntax(item.end.slice(11, 16)),
                end: item?.end?.slice(0, 10),
                start: item?.start?.slice(0, 10),
                securityCode: item.securityCode,
                status: item.approvalStatus
            };
        });
    }
}

export default new GateManagementCabTransfer();
