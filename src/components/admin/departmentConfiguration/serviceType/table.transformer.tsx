import { AdminServiceTypeGetQuery } from 'src/graphql/generated';
import Transformer from '@/utils/transformer';

class ServiceTypeTransformer extends Transformer<AdminServiceTypeGetQuery> {
    transforms(transfers: AdminServiceTypeGetQuery) {
        return transfers.serviceType_getServiceTypes.result.items.map((transfer) => ({
            Check: false,
            id: transfer.id,
            name: transfer.name,
            activeStatus: transfer.activeStatus,
            departmentId: transfer.departmentId,
            department: transfer.department?.name
        }));
    }
}

export default new ServiceTypeTransformer();
