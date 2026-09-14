import Transformer from '@/utils/transformer';
import Utils from '@/utils/utils';
import { AdminUtilityRateGetQuery } from 'src/graphql/generated';

class UtilityRateTransformer extends Transformer<AdminUtilityRateGetQuery> {
    transforms(transfers: AdminUtilityRateGetQuery) {
        return transfers.utilityRate_getUtilityRates.result.items.map((item) => {
            return {
                id: item.id,
                utilityType: item.utilityType,
                rate: item.rate,
                rateText: `${Utils.convertNumberToPrice(item.rate)}`
            };
        });
    }
}

export default new UtilityRateTransformer();
