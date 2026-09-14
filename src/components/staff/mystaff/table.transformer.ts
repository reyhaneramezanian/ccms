import { User_GetMyStaffsQuery } from 'src/graphql/generated';
import Transformer from '@/utils/transformer';
import { getFullImageUrl } from '@/utils/helper/ui';

class SecuritystafTransformer extends Transformer<User_GetMyStaffsQuery> {
    transforms(transfers: User_GetMyStaffsQuery) {
        return transfers.user_getMyStaffs.result.items.map((transfer) => ({
            Check: false,
            id: transfer.id,
            image:
                transfer.photoUrl == null || transfer.photoUrl == undefined
                    ? '/images/men.png'
                    : getFullImageUrl(transfer.photoUrl),
            Name: transfer.firstName + ' ' + transfer.lastName,
            Phonenumber: transfer.phoneNumber,
            Email: transfer.email,
            Employeetype: transfer.employmentType.name,
            Seeprofile: transfer.id,
            firstName: transfer.firstName,
            lastName: transfer.lastName,
            address: transfer.address,
            alternatePhone: transfer.alternatePhone,
            alternateEmail: transfer.alternateEmail,
            dateOfBirth: transfer.dateOfBirth.slice(0, 10),
            dateOfJoining: transfer.dateOfJoining.slice(0, 10),
            dateOfTermination: transfer.dateOfTermination.slice(0, 10),
            gender: transfer.gender,
            timeshit: transfer.timeSheets
        }));
    }
}

export default new SecuritystafTransformer();
