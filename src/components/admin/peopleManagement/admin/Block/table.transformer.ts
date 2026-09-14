import { BlockManager_GetBlockManagersQuery } from 'src/graphql/generated';
import Transformer from '@/utils/transformer';
import Utils from '@/utils/utils';
class PeopleAdminTransformer extends Transformer<BlockManager_GetBlockManagersQuery> {
    transforms(transfers: BlockManager_GetBlockManagersQuery) {
        return transfers.blockManager_getBlockManagers.result.items.map((transfer) => ({
            Check: false,
            id: transfer.id,
            Name: transfer.resident.firstName + ' ' + transfer.resident.lastName,
            Phone: transfer.resident.phoneNumber,
            Email: transfer.resident.email,
            activeStatus: transfer.activeStatus,
            activeStatustext: Utils.convertoLowerCase(transfer.activeStatus),
            firstName: transfer.resident.firstName,
            lastName: transfer.resident.lastName,
            complexId: transfer.block.complex.id,
            blockId: transfer.block.id,
            From: transfer.block.complex.name + ' ,' + transfer.block.name,
            Block: transfer.block.name,
            Complex: transfer.block.complex.name,
            idresidebt: transfer.resident.id
        }));
    }
}

export default new PeopleAdminTransformer();
