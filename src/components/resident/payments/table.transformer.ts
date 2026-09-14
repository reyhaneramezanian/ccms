import { Complaint_GetComplaintsQuery } from 'src/graphql/generated';
import Transformer from '@/utils/transformer';
import Utils from '@/utils/utils';

class ComplaintTransformer extends Transformer<Complaint_GetComplaintsQuery> {
    transforms(transfers: Complaint_GetComplaintsQuery) {
        console.log(transfers.complaint_getComplaints.result.items);
        return transfers.complaint_getComplaints.result.items.map((transfer) => ({
            Check: false,
            id: transfer.id,
            Type: transfer?.complaintType?.name,
            Title: transfer.title,
            Status: transfer.complaintStatus,
            Date: transfer.date.slice(0, 10).replaceAll('-', '/'),
            date: transfer.date.slice(0, 10),
            From:
                transfer.flat.floor.block.complex.name +
                ' ,' +
                transfer.flat.floor.block.name +
                ' ,' +
                transfer.flat.floor.name +
                ' ,' +
                transfer.flat.name,
            Message: transfer.message,
            complex: transfer.flat.floor.block.complex.name,
            block: transfer.flat.floor.block.name,
            floor: transfer.flat.floor.name,
            flat: transfer.flat.name
        }));
    }
}

export default new ComplaintTransformer();
