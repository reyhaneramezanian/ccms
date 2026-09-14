import { Attendance_GetStaffAttendancesQuery } from 'src/graphql/generated';
import Transformer from '@/utils/transformer';
import Utils from '@/utils/utils';

class SecuritystafTransformer extends Transformer<Attendance_GetStaffAttendancesQuery> {
    transforms(transfers: Attendance_GetStaffAttendancesQuery) {
        return transfers.attendance_getStaffAttendances.result.items.map((transfer) => ({
            Check: false,
            id: transfer?.id,
            Name: transfer?.staff?.firstName + ' ' + transfer?.staff?.lastName,
            Phone: transfer?.staff?.phoneNumber,
            Email: transfer?.staff?.email,
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
            departmentId: transfer?.staff?.departmentId,
            checkOutDateTime: transfer?.checkOutDateTime,
            checkInDateTime: transfer?.checkInDateTime,
            Department: transfer?.staff?.department.name,
            firstName: transfer?.staff?.firstName,
            lastName: transfer?.staff?.lastName,
            middleName: transfer?.staff?.middleName,
            dateOfJoining: transfer?.staff?.dateOfJoining.slice(0, 10),
            dateOfBirth: transfer?.staff?.dateOfBirth.slice(0, 10),
            dateOfTermination: transfer?.staff?.dateOfTermination.slice(0, 10),
            complexId: transfer?.complexId,
            securityId: transfer?.securityId,
            alternateEmail: transfer?.staff?.alternateEmail,
            alternatePhone: transfer?.staff?.alternatePhone,
            address: transfer?.staff?.address,
            gender: transfer?.staff?.gender,
            employeeType: transfer?.staff?.employmentType.name,
            head: transfer?.staff?.departmentManagers.length > 0 ? true : false,
            activeStatustext: Utils.convertoLowerCase(transfer?.staff?.activeStatus)
        }));
    }
}

export default new SecuritystafTransformer();
