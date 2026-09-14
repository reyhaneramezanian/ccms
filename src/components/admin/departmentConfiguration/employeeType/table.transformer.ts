import { AdminEmployeeTypeGetQuery } from 'src/graphql/generated';
import Transformer from '@/utils/transformer';

class EmployeeTypeTransformer extends Transformer<AdminEmployeeTypeGetQuery> {
    transforms(transfers: AdminEmployeeTypeGetQuery) {
        return transfers.employmentType_getEmploymentTypes.result.items.map((transfer) => {
            return {
                Check: false,
                id: transfer.id,
                name: transfer.name,
                activeStatus: transfer.activeStatus
            };
        });
    }
}

export default new EmployeeTypeTransformer();
