import { Complex_GetComplexesQuery } from 'src/graphql/generated';
import Transformer from '@/utils/transformer';
import Utils from '@/utils/utils';

class BuildingTypeTransformer extends Transformer<Complex_GetComplexesQuery> {
    transforms(transfers: Complex_GetComplexesQuery) {
        return transfers.complex_getComplexes.result.items.map((transfer) => ({
            Check: false,
            id: transfer.id,
            name: transfer.name,
            activeStatus: transfer.activeStatus,
            paymentModetext: Utils.convertoLowerCase(transfer.paymentMode),
            paymentMode: transfer.paymentMode,
            initiallyAmount: transfer.initiallyAmount,
            permittedConsumption: transfer.permittedConsumption
        }));
    }
}

export default new BuildingTypeTransformer();
