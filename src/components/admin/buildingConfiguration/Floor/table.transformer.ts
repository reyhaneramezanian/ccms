import { Floor_GetFloorsQuery } from 'src/graphql/generated';
import Transformer from '@/utils/transformer';

class BuildingTypeTransformer extends Transformer<Floor_GetFloorsQuery> {
    transforms(transfers: Floor_GetFloorsQuery) {
        return transfers.floor_getFloors.result.items.map((transfer) => ({
            Check: false,
            id: transfer.id,
            Complex: transfer.block.complex.name,
            Floor: transfer.name,
            Block: transfer.block.name,
            activeStatus: transfer.activeStatus,
            blockId: transfer.block.id
        }));
    }
}

export default new BuildingTypeTransformer();
