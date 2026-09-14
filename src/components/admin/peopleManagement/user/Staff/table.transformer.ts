import { User_GetStaffsQuery } from 'src/graphql/generated';
import Transformer from '@/utils/transformer';
import utils from '@/utils/utils';

class StaffTransformer extends Transformer<User_GetStaffsQuery> {
    transforms(transfers: User_GetStaffsQuery) {
        return transfers.user_getStaffs.result.items.map((transfer) => ({
            Check: false,
            id: transfer.id,
            staffId: transfer.staffId,
            Name: transfer.firstName + ' ' + transfer.lastName,
            Phone: transfer.phoneNumber,
            Email: transfer.email,
            activeStatus: transfer.activeStatus,
            activeStatuses: utils.convertoLowerCase(transfer.activeStatus),
            Department: transfer.department.name,
            Departmentid: transfer.departmentId,
            firstName: transfer.firstName,
            lastName: transfer.lastName,
            middleName: transfer.middleName,
            dateOfJoinings: transfer.dateOfJoining.slice(0, 10).replaceAll('-', '/'),
            dateOfBirths: transfer.dateOfBirth.slice(0, 10).replaceAll('-', '/'),
            dateOfTerminations: transfer.dateOfTermination.slice(0, 10).replaceAll('-', '/'),
            dateOfJoining: transfer.dateOfJoining.slice(0, 10),
            dateOfBirth: transfer.dateOfBirth.slice(0, 10),
            dateOfTermination: transfer.dateOfTermination.slice(0, 10),
            alternateEmail: transfer.alternateEmail,
            alternatePhone: transfer.alternatePhone,
            address: transfer.address,
            gender: transfer.gender,
            gendertext: utils.convertoLowerCase(transfer.gender),
            employeeType: transfer.employmentType?.name,
            employmentTypeId: transfer.employmentTypeId,
            head: transfer.departmentManagers.length > 0 ? true : false,
            complexId: transfer.staffComplexes,
            photoUrl: transfer.photoUrl
        }));
    }
}

export default new StaffTransformer();
