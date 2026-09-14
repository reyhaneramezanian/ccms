import { Flat_GetFlatsQuery } from 'src/graphql/generated';
import Transformer from '@/utils/transformer';

class BuildingTypeTransformer extends Transformer<Flat_GetFlatsQuery> {
    transforms(transfers: Flat_GetFlatsQuery) {
        return transfers.flat_getFlats.result.items.map((transfer) => ({
            Check: false,
            id: transfer.id,
            Complex: transfer.floor.block.complex.name,
            Flat: transfer.name,
            Floor: transfer.floor.name,
            Block: transfer.floor.block.name,
            activeStatus: transfer.activeStatus,
            floorId: transfer.floor.id
        }));
    }
}

export default new BuildingTypeTransformer();
