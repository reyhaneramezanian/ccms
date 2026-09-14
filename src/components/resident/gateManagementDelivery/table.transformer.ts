import Transformer from '@/utils/transformer';
import Utils from '@/utils/utils';
import packageLeavingLocationText from 'src/data/packageLeavingLocation';
import { GateManagementDeliveryGetQuery } from 'src/graphql/generated';

class GateManagementDeliveryTransfer extends Transformer<GateManagementDeliveryGetQuery> {
    transforms(transfers: GateManagementDeliveryGetQuery) {
        return transfers.gateApproval_getDeliveries.result.items.map((item) => {
            return {
                Check: false,
                id: item.id,
                date: item.start.slice(0, 10).replaceAll('-', '/'),
                dates: item.start.slice(0, 10),
                time: `${Utils.convert24HourTo12HourTimeSyntax(
                    item.start.slice(11, 16)
                )} - ${Utils.convert24HourTo12HourTimeSyntax(item.end.slice(11, 16))}`,
                fromTime: item.start.slice(11, 16),
                toTime: item.end.slice(11, 16),
                companyName: item.companyName || '',
                packageLeavingLocation: item.packageLeavingLocation,
                packageLeavingLocationText: packageLeavingLocationText[item.packageLeavingLocation],
                status: item.approvalStatus,
                start: item.start,
                end: item.end,
                additionalInformation: item.additionalInformation,
                securityCode: item.securityCode
            };
        });
    }
}

export default new GateManagementDeliveryTransfer();
