import { Request_GetNotAssignedRequestsQuery } from 'src/graphql/generated';
import Transformer from '@/utils/transformer';
import Utils from '@/utils/utils';

class RequeststaffTransformer extends Transformer<Request_GetNotAssignedRequestsQuery> {
    transforms(transfers: Request_GetNotAssignedRequestsQuery) {
        return transfers.request_getNotAssignedRequests.result.items.map((transfer) => ({
            Check: false,
            id: transfer?.id,
            Name:
                transfer?.residentFlat?.resident?.firstName +
                ' ' +
                transfer?.residentFlat?.resident?.lastName,
            firstName: transfer?.residentFlat?.resident?.firstName,
            lastName: transfer?.residentFlat?.resident?.firstName,
            Complex: transfer?.residentFlat?.flat?.floor?.block?.complex?.name,
            Block: transfer?.residentFlat?.flat?.floor?.block?.name,
            Floor: transfer?.residentFlat?.flat?.floor?.name,
            Flat: transfer?.residentFlat?.flat?.name,
            Service: transfer?.serviceType?.name,
            Date: transfer?.startDate?.slice(0, 10).replaceAll('-', '/'),
            Dateend: transfer?.startDate?.slice(0, 10).replaceAll('-', '/'),
            Datefilter: transfer?.startDate?.slice(0, 10),
            Dateendfilter: transfer?.startDate?.slice(0, 10),
            Assign: [
                transfer?.id,
                transfer?.startDate?.slice(0, 10),
                Utils.convertTimeSpanToTime(transfer?.startTime)
            ],
            Timeinterval:
                Utils.convertTimeSpanToTime(transfer?.startTime) +
                ' - ' +
                Utils.convertTimeSpanToTime(transfer?.endTime),
            Emergency: transfer?.emergency
        }));
    }
}

export default new RequeststaffTransformer();
