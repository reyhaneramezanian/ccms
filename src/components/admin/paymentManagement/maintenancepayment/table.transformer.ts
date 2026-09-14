import Transformer from '@/utils/transformer';
import Utils from '@/utils/utils';
import { Payment_GetPaymentMiscellaneousMaintenancesQuery } from 'src/graphql/generated';

class PaymentsTransformer extends Transformer<Payment_GetPaymentMiscellaneousMaintenancesQuery> {
    transforms(transfers: Payment_GetPaymentMiscellaneousMaintenancesQuery) {
        return transfers.payment_getPaymentMiscellaneousMaintenances.result.items.map((item) => {
            return {
                id: item.id,
                Check: false,
                complexId: item.flat.floor.block.complex.id,
                from:
                    item.flat.floor.block.complex.name +
                    ' , ' +
                    item.flat.floor.block.name +
                    ' , ' +
                    item.flat.floor.name +
                    ' , ' +
                    item.flat.name,
                // Utility: item.paymentType,
                complexName: item.flat.floor.block.complex.name,
                blockId: item.flat.floor.block.id,
                blockName: item.flat.floor.block.name,
                floorId: item.flat.floor.id,
                floorName: item.flat.floor.name,
                flatId: item.flat.id,
                flatName: item.flat.name,
                dueDate: item.dueDate,
                dueDateText: item.dueDate?.slice(0, 10).replaceAll('-', '/'),
                receivedOn: item.receivedOn,
                receivedOnText: item.receivedOn?.slice(0, 10).replaceAll('-', '/'),
                assignedOn: item.createdDate,
                assignedOnText: item.createdDate?.slice(0, 10).replaceAll('-', '/'),
                maintenanceTypeId: item.maintenanceType.id,
                maintenanceTypeName: item.maintenanceType.name,
                amount: item.amount,
                amountText: Utils.convertNumberToPrice(item.amount),
                status: item.paymentStatus,
                comment: item.comment
            };
        });
    }
}

export default new PaymentsTransformer();
