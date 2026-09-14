import { User_GetSuperAdminsQuery } from 'src/graphql/generated';
import Transformer from '@/utils/transformer';
import Utils from '@/utils/utils';
class PeopleAdminTransformer extends Transformer<User_GetSuperAdminsQuery> {
    transforms(transfers: User_GetSuperAdminsQuery) {
        return transfers.user_getSuperAdmins.result.items.map((transfer) => ({
            Check: false,
            id: transfer.id,
            Name: transfer.firstName + ' ' + transfer.lastName,
            Phone: transfer.phoneNumber,
            Email: transfer.email,
            activeStatus: transfer.activeStatus,
            activeStatustext: Utils.convertoLowerCase(transfer.activeStatus),
            firstName: transfer.firstName,
            lastName: transfer.lastName,
            dateOfBirth: transfer.dateOfBirth.slice(0, 10),
            dateOfBirthtext: transfer.dateOfBirth.slice(0, 10).replaceAll('-', '/'),
            middleName: transfer.middleName,
            gender: transfer.gender,
            photoUrl: transfer.photoUrl
        }));
    }
}

export default new PeopleAdminTransformer();
