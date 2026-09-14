import Transformer from '@/utils/transformer';
import { AdminAnnouncementTypeGetQuery } from 'src/graphql/generated';

class AnnouncementTypeTransformer extends Transformer<AdminAnnouncementTypeGetQuery> {
    transforms(transfers: AdminAnnouncementTypeGetQuery) {
        return transfers.announcementType_getAnnouncementTypes.result.items.map((item) => ({
            Check: false,
            id: item.id,
            name: item.name,
            activeStatus: item.activeStatus
        }));
    }
}

export default new AnnouncementTypeTransformer();
