import { DepartmentManager_GetDepartmentManagersQuery } from 'src/graphql/generated';
import Transformer from '@/utils/transformer';
import Utils from '@/utils/utils';
class PeopleAdminTransformer extends Transformer<DepartmentManager_GetDepartmentManagersQuery> {
    transforms(transfers: DepartmentManager_GetDepartmentManagersQuery) {
        return transfers.departmentManager_getDepartmentManagers.result.items.map((transfer) => ({
            Check: false,
            id: transfer.id,
            Name: transfer.staff.firstName + ' ' + transfer.staff.lastName,
            Phone: transfer.staff.phoneNumber,
            Email: transfer.staff.email,
            activeStatus: transfer.activeStatus,
            activeStatustext: Utils.convertoLowerCase(transfer.activeStatus),
            department: transfer.department.name,
            idstaf: transfer.staff.id,
            departmentId: transfer.departmentId,
            firstName: transfer.staff.firstName,
            lastName: transfer.staff.lastName
        }));
    }
}

export default new PeopleAdminTransformer();
