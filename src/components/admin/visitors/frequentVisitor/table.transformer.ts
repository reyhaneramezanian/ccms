import Transformer from '@/utils/transformer';
import { AdminVisitorsGetQuery } from 'src/graphql/generated';

class FrequentVisitorTransformer extends Transformer<AdminVisitorsGetQuery> {
    transforms(transfers: AdminVisitorsGetQuery) {
        var js = [];
        transfers.frequentVisitor_getFrequentVisitors.result.items.map((item) => {
            var jscomplex = [];
            item?.frequentVisitorComplexes.map((items) => {
                jscomplex.push(items.complexId);
            });
            js.push({
                complex: jscomplex,
                Check: false,
                id: item.id,
                name: item.name,
                description: item.description,
                activeStatus: item.activeStatus,
                complexId: item?.frequentVisitorComplexes
            });
        });
        return js;
    }
}

export default new FrequentVisitorTransformer();
