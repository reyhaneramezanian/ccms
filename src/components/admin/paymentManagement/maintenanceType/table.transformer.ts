import Transformer from '@/utils/transformer';
import { AdminMaintenanceTypeGetQuery } from 'src/graphql/generated';

class MaintenanceTypeTransformer extends Transformer<AdminMaintenanceTypeGetQuery> {
    transforms(transfers: AdminMaintenanceTypeGetQuery) {
        return transfers.maintenanceType_getMaintenanceTypes.result.items.map((item) => {
            return {
                id: item.id,
                Check: false,
                name: item.name,
                activeStatus: item.activeStatus
            };
        });
    }
}

export default new MaintenanceTypeTransformer();
