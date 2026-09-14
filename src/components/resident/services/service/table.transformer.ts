import Transformer from '@/utils/transformer';
import Utils from '@/utils/utils';
import { Request_GetMyRequestsQuery } from 'src/graphql/generated';

class ServicesTransformer extends Transformer<Request_GetMyRequestsQuery> {
    transforms(transfers: Request_GetMyRequestsQuery) {
        return transfers.request_getMyRequests.result.items.map((item) => {
            const startDate = Utils.convertDateTimeToInputDateValue(item.startDate);
            const endDate = Utils.convertDateTimeToInputDateValue(item.endDate);

            return {
                Check: false,
                id: item.id,
                departmentName: item.serviceType.department.name || '',
                serviceName: item.serviceType.name || '',
                serviceId: item.serviceType.id,
                date:
                    item.startDate.slice(0, 10).replaceAll('-', '/') +
                    ' - ' +
                    item.endDate.slice(0, 10).replaceAll('-', '/'),
                time:
                    Utils.convertTimeSpanToTime(item.startTime) +
                    ' - ' +
                    Utils.convertTimeSpanToTime(item.endTime),
                startDate: item.startDate.slice(0, 10),
                endDate: item.endDate.slice(0, 10),
                startTime: Utils.convertTimeSpanToTime(item.startTime),
                endTime: Utils.convertTimeSpanToTime(item.endTime),
                status: item.requestStatus,
                emergency: item.emergency,
                departmentId: item.serviceType.departmentId
            };
        });
    }
}

export default new ServicesTransformer();
