import getApprovalText from '@/utils/getApprovalText';
import Transformer from '@/utils/transformer';
import Utils from '@/utils/utils';
import { GateApprovalType, GateManagementGetQuery } from 'src/graphql/generated';

class GateManagementApprovalTransfer extends Transformer<GateManagementGetQuery> {
    transforms(transfers: GateManagementGetQuery) {
        return transfers.gateApproval_getGateApprovals.result.items.map((item) => {
            const hasNotTime = item.gateApprovalType === GateApprovalType.FrequentVisitor;

            return {
                Check: false,
                id: item.id,
                from: `${item.residentFlat.flat.floor.block.complex.name}, ${item.residentFlat.flat.floor.block.name}, ${item.residentFlat.flat.floor.name},${item.residentFlat.flat.name}`,
                type: getApprovalText(item.gateApprovalType),
                name: `${item.residentFlat.resident.firstName} ${item.residentFlat.resident.lastName}`,
                phoneNumber: item.residentFlat.resident.phoneNumber,
                startDate:
                    item?.start != undefined
                        ? item?.start?.slice(0, 10).replaceAll('-', '/') +
                          ' ' +
                          item?.start?.slice(11, 16)
                        : '',
                endDate:
                    item?.end != undefined
                        ? item?.end?.slice(0, 10).replaceAll('-', '/') +
                          ' ' +
                          item?.end?.slice(11, 16)
                        : '',
                code: item.securityCode,
                approvalStatustext: Utils.convertoLowerCase(item.approvalStatus),
                end: item?.end?.slice(0, 10),
                start: item?.start?.slice(0, 10),
                approveAction: [
                    item.id,
                    `${item.residentFlat.resident.firstName} ${item.residentFlat.resident.lastName}`,
                    item.gateApprovalMode,
                    item.end
                ]
            };
        });
    }
}

export default new GateManagementApprovalTransfer();
