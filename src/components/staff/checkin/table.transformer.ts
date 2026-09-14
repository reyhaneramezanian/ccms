import { Attendance_GetStaffAttendancesQuery } from 'src/graphql/generated';
import Transformer from '@/utils/transformer';

class SecuritystafTransformer extends Transformer<Attendance_GetStaffAttendancesQuery> {
    transforms(transfers: Attendance_GetStaffAttendancesQuery) {
        return transfers.attendance_getStaffAttendances.result.items.map((transfer) => ({
            Check: false,
            id: transfer?.id,
            checkInDateTimeStart:
                transfer?.checkInDateTime?.slice(0, 10).replaceAll('-', '/') +
                ' ' +
                transfer?.checkInDateTime?.slice(11, 16),
            checkInDateTimeEnd:
                transfer?.checkOutDateTime != undefined
                    ? transfer?.checkOutDateTime?.slice(0, 10).replaceAll('-', '/') +
                      ' ' +
                      transfer?.checkOutDateTime?.slice(11, 16)
                    : '',
            checkOutDateTime: transfer?.checkOutDateTime,
            checkInDateTime: transfer?.checkInDateTime,
            complex: transfer?.complex?.name,
            Date: transfer?.checkInDateTime?.slice(0, 10).replaceAll('-', '/'),
            complexId: transfer?.complexId
        }));
    }
}

export default new SecuritystafTransformer();
