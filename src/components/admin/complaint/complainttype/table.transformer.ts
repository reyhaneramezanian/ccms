import { ComplaintType_GetComplaintTypesQuery } from 'src/graphql/generated';
import Transformer from '@/utils/transformer';

class ComplaintTypeTransformer extends Transformer<ComplaintType_GetComplaintTypesQuery> {
    transforms(transfers: ComplaintType_GetComplaintTypesQuery) {
        return transfers.complaintType_getComplaintTypes.result.items.map((transfer) => ({
            Check: false,
            id: transfer.id,
            name: transfer.name,
            activeStatus: transfer.activeStatus
        }));
    }
}

export default new ComplaintTypeTransformer();
