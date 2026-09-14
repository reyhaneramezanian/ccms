import { Attendance_GetStaffAttendancesQuery } from 'src/graphql/generated';
import Transformer from '@/utils/transformer';
import utils from '@/utils/utils';
class SecuritystafTransformer extends Transformer<Attendance_GetStaffAttendancesQuery> {
    transforms(transfers: Attendance_GetStaffAttendancesQuery) {
        return transfers.attendance_getStaffAttendances.result.items.map((transfer) => ({
            Check: false,
            id: transfer?.id,
            Name: transfer?.security?.firstName + ' ' + transfer?.security?.lastName,
            Phone: transfer?.security?.phoneNumber,
            middleName: transfer?.security?.middleName,
            Email: transfer?.security?.email || '',
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
            activeStatus: transfer?.security?.activeStatus,
            activeStatustext: utils.convertoLowerCase(transfer?.security?.activeStatus),
            employeeType: transfer?.security?.employmentType?.name,
            complexId: transfer?.complexId,
            Firstname: transfer?.security?.firstName,
            Lastname: transfer?.security?.lastName,
            gender: transfer?.security?.gender,
            dateOfBirth: transfer?.security?.dateOfBirth.slice(0, 10).replaceAll('-', '/'),
            Complex: transfer?.security?.complex?.name || ''
        }));
    }
}

export default new SecuritystafTransformer();
