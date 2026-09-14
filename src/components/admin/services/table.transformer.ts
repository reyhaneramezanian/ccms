import { Request_GetAllRequestsQuery } from 'src/graphql/generated';
import Transformer from '@/utils/transformer';
import Utils from '@/utils/utils';

class RequeststaffTransformer extends Transformer<Request_GetAllRequestsQuery> {
    transforms(transfers: Request_GetAllRequestsQuery) {
        return transfers.request_getAllRequests.result.items.map((transfer) => ({
            Check: false,
            id: transfer?.id,
            Nameresident:
                transfer?.residentFlat?.resident?.firstName +
                ' ' +
                transfer?.residentFlat?.resident?.lastName,
            Namestaff:
                transfer?.staff?.firstName != undefined
                    ? transfer?.staff?.firstName + ' ' + transfer?.staff?.lastName
                    : '---',
            firstName: transfer?.residentFlat?.resident?.firstName,
            lastName: transfer?.residentFlat?.resident?.firstName,
            from:
                transfer?.residentFlat?.flat?.floor?.block?.complex?.name +
                ', ' +
                transfer?.residentFlat?.flat?.floor?.block?.name +
                ', ' +
                transfer?.residentFlat?.flat?.floor?.name +
                ', ' +
                transfer?.residentFlat?.flat?.name,
            Complex: transfer?.residentFlat?.flat?.floor?.block?.complex?.name,
            Block: transfer?.residentFlat?.flat?.floor?.block?.name,
            Floor: transfer?.residentFlat?.flat?.floor?.name,
            Flat: transfer?.residentFlat?.flat?.name,
            Service: transfer?.serviceType?.name,
            Date: transfer?.startDate?.slice(0, 10).replaceAll('-', '/'),
            Dateend: transfer?.startDate?.slice(0, 10).replaceAll('-', '/'),
            Datefilter: transfer?.startDate?.slice(0, 10),
            Dateendfilter: transfer?.startDate?.slice(0, 10),
            Assign: [transfer?.id],
            Timeinterval:
                Utils.convertTimeSpanToTime(transfer?.startTime) +
                ' - ' +
                Utils.convertTimeSpanToTime(transfer?.endTime),
            Emergency: transfer?.emergency,
            requestStatus: transfer?.requestStatus
        }));
    }
}

export default new RequeststaffTransformer();
