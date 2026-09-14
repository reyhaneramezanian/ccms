import { AdminDepartmentTypeGetQuery } from 'src/graphql/generated';
import Transformer from '@/utils/transformer';

class DepartmentTypeTransformer extends Transformer<AdminDepartmentTypeGetQuery> {
    transforms(transfers: AdminDepartmentTypeGetQuery) {
        return transfers.department_getDepartments.result.items.map((transfer) => ({
            Check: false,
            id: transfer.id,
            name: transfer.name,
            activeStatus: transfer.activeStatus
        }));
    }
}

export default new DepartmentTypeTransformer();
