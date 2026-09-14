import { User_GetComplexManagersQuery } from 'src/graphql/generated';
import Transformer from '@/utils/transformer';
import Utils from '@/utils/utils';

class PeopleAdminTransformer extends Transformer<User_GetComplexManagersQuery> {
    transforms(transfers: User_GetComplexManagersQuery) {
        var js = [];
        transfers.user_getComplexManagers.result.items.map((transfer) => {
            var jscomplex = [];
            transfer?.complexManagerComplexes.map((items) => {
                jscomplex.push(items.complexId);
            });
            js.push({
                complex: jscomplex,
                Check: false,
                id: transfer.id,
                Name: transfer.firstName + ' ' + transfer.lastName,
                Phone: transfer.phoneNumber,
                Email: transfer.email,
                activeStatus: transfer.activeStatus,
                activeStatustext: Utils.convertoLowerCase(transfer.activeStatus),
                firstName: transfer.firstName,
                lastName: transfer.lastName,
                middleName: transfer.middleName,
                dateOfBirth: transfer.dateOfBirth.slice(0, 10),
                complexId: transfer?.complexManagerComplexes,
                gender: transfer.gender,
                photoUrl: transfer.photoUrl
            });
        });
        return js;
    }
}

export default new PeopleAdminTransformer();
