import Transformer from '@/utils/transformer';
import Utils from '@/utils/utils';
import { AdminAnnouncementsBoardGetQuery } from 'src/graphql/generated';

class AnnouncementBoardTransformer extends Transformer<AdminAnnouncementsBoardGetQuery> {
    transforms(transfers: AdminAnnouncementsBoardGetQuery) {
        return transfers.announcement_getAnnouncements.result.items.map((item) => {
            return {
                Check: false,
                id: item.id,
                announcementType: item.announcementType.name,
                date: item.date.slice(0, 10).replaceAll('-', '/'),
                dateend: item.date.slice(0, 10),
                title: item.title,
                message: item.message,
                complexName: item.complex?.name,
                blockName: item.block?.name,
                floorName: item.floor?.name,
                flatName: item.flat?.name,
                complexId: item?.complex?.id,
                blockId: item?.block?.id,
                floorId: item?.floor?.id,
                flatId: item?.flat?.id,
                announcementTypeId: item.announcementType.id
            };
        });
    }
}

export default new AnnouncementBoardTransformer();
