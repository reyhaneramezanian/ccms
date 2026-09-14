import { User_GetUsersQuery } from 'src/graphql/generated';
import Transformer from '@/utils/transformer';
import utils from '@/utils/utils';
class ApprovalTransformer extends Transformer<User_GetUsersQuery> {
    transforms(transfers: User_GetUsersQuery) {
        return transfers.user_getUsers.result.items.map((transfer) => ({
            Check: false,
            id: transfer.id,
            Name: transfer.firstName + ' ' + transfer.lastName,
            Phone: transfer.phoneNumber,
            Email: transfer.email,
            firstName: transfer.firstName,
            lastName: transfer.lastName,
            Type: utils.convertoLowerCase(transfer.userType),
            Approval: [transfer.id, 'userapproval', transfer.firstName + ' ' + transfer.lastName]
            /*  Complexname: transfer.residentFlats.map((item) => item.flat.floor.block.complex.name),
            Blockname: transfer.residentFlats.map((item) => item.flat.floor.block.name),
            Floorname: transfer.residentFlats.map((item) => item.flat.floor.name),
            Flatname: transfer.residentFlats.map((item) => item.flat.name),
            Owership: transfer.residentFlats.map((item) => item.ownershipStatus)*/
        }));
    }
}

export default new ApprovalTransformer();
