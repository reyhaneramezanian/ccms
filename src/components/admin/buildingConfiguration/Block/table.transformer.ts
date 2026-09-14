import { Block_GetBlocksQuery } from 'src/graphql/generated';
import Transformer from '@/utils/transformer';

class BuildingTypeTransformer extends Transformer<Block_GetBlocksQuery> {
    transforms(transfers: Block_GetBlocksQuery) {
        return transfers.block_getBlocks.result.items.map((transfer) => ({
            Check: false,
            id: transfer.id,
            Complex: transfer.complex.name,
            complexId: transfer.complex.id,
            Block: transfer.name,
            activeStatus: transfer.activeStatus
        }));
    }
}

export default new BuildingTypeTransformer();
