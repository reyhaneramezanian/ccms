import { Column, RowTable } from '@/components/table/table_layout/types.table.layout';
import { ItemTabs } from '@/components/tabs/types.tabs';
import { ICustomPageTabsProps } from '../../types.admin';
import BlockEditModal from './Block/editModal';
import BlockdeleteModal from './Block/deleteModal';
import BlockAddModal from './Block/addModal';
import EditModal from './Complex/editModal';
import DeleteModal from './Complex/deleteModal';
import PeaplemanagementAddModal from './Complex/addModal';
import DepartmentAddModal from './Department/addModal';
import DepartmentEditModal from './Department/editModal';
import DepartmentdeleteModal from './Department/deleteModal';
import PeopleAdminComplexTransformer from './Complex/table.transformer';
import PeopleAdminBlockTransformer from './Block/table.transformer';
import PeopleAdminDepartmentTransformer from './Department/table.transformer';
import SuperAddModal from './Super/addModal';
import SuperEditModal from './Super/editModal';
import SuperdeleteModal from './Super/deleteModal';
import Superview from './Super/viewModal';
import PeopleAdminsuperTransformer from './Super/table.transformer';
import peopleadminblock from './Block/viewModal';
import peopleadmincomplex from './Complex/viewModal';
import peopleadmindepartment from './Department/viewModal';
import {
    useUser_GetComplexManagersQuery,
    useUser_UpdateComplexManagerMutation,
    useBlockManager_GetBlockManagersQuery,
    useBlockManager_UpdateMutation,
    useDepartmentManager_GetDepartmentManagersQuery,
    useDepartmentManager_UpdateMutation,
    useUser_GetSuperAdminsQuery,
    useUser_UpdateSuperAdminProfileMutation
} from 'src/graphql/generated';
import Showcomplex from 'src/components/shared/share/show-complex';

export enum EpeaplemanagmentTabsKey {
    Superadmin = 'Super admin',
    Complex = 'Complex management',
    Block = 'Block management',
    Department = 'Department management'
}
export const ColumnSuper: Column[] = [
    { id: 'Check', checkbox: true },
    { id: 'Name', label: 'Name', sort: true, sortkey: 'firstName' },
    { id: 'Phone', label: 'Phone', sort: true, sortkey: 'phoneNumber' },
    { id: 'Email', label: 'Email', sort: true, sortkey: 'email' },
    { id: 'activeStatus', label: 'Active/Inactivate', active: true },
    { id: 'Action', label: 'More', actions: true }
];
export const ColumnComplex: Column[] = [
    { id: 'Check', checkbox: true },
    { id: 'Name', label: 'Name', sort: true, sortkey: 'firstName' },
    { id: 'Phone', label: 'Phone', sort: true, sortkey: 'phoneNumber' },
    { id: 'Email', label: 'Email', sort: true, sortkey: 'email' },
    { id: 'complexId', label: 'Complexes', Component: Showcomplex },
    { id: 'activeStatus', label: 'Active/Inactivate', active: true },
    { id: 'Action', label: 'More', actions: true }
];
export const ColumnBlock: Column[] = [
    { id: 'Check', checkbox: true },
    { id: 'Name', label: 'Name', sort: true, sortkey: 'resident.firstName' },
    { id: 'From', label: 'From', sort: true, sortkey: 'block.complex.name' },
    { id: 'Phone', label: 'Phone', sort: true, sortkey: 'resident.phoneNumber' },
    { id: 'Email', label: 'Email', sort: true, sortkey: 'resident.email' },
    { id: 'activeStatus', label: 'Active/Inactivate', active: true },
    { id: 'Action', label: 'More', actions: true }
];
export const ColumnDepartment: Column[] = [
    { id: 'Check', checkbox: true },
    { id: 'Name', label: 'Name', sort: true, sortkey: 'staff.firstName' },
    { id: 'department', label: 'Department', sort: true, sortkey: 'department.name' },
    { id: 'Phone', label: 'Phone', sort: true, sortkey: 'staff.phoneNumber' },
    { id: 'Email', label: 'Email', sort: true, sortkey: 'staff.email' },
    { id: 'activeStatus', label: 'Active/Inactivate', active: true },
    { id: 'Action', label: 'More', actions: true }
];
export const Peaple_Management_TABS_ITEMS: ICustomPageTabsProps[] = [
    {
        label: 'Super admin',
        addButtonTitle: 'Add super admin',
        id: EpeaplemanagmentTabsKey.Superadmin,
        column: ColumnSuper,
        handleEdit: SuperEditModal,
        handleDelete: SuperdeleteModal,
        handleSee: Superview,
        handleAdd: SuperAddModal,
        queryKey: 'user_getSuperAdmins',
        useQuery: useUser_GetSuperAdminsQuery,
        useUpdateMutation: useUser_UpdateSuperAdminProfileMutation,
        Transformer: PeopleAdminsuperTransformer,
        searchData: [
            {
                key: 'firstName',
                type: 'contains',
                empty: true,
                valueType: 'string'
            },
            {
                key: 'lastName',
                type: 'contains',
                empty: true,
                valueType: 'string'
            },
            {
                key: 'email',
                type: 'contains',
                empty: true,
                valueType: 'string'
            },
            {
                key: 'phoneNumber',
                type: 'contains',
                empty: true,
                valueType: 'string'
            }
        ],

        requiredFieldUpdate: [
            {
                key: 'middleName',
                value: 'middleName'
            },
            {
                key: 'firstName',
                value: 'firstName'
            },
            {
                key: 'lastName',
                value: 'lastName'
            },
            {
                key: 'gender',
                value: 'gender'
            },
            {
                key: 'dateOfBirth',
                value: 'dateOfBirth'
            },
            {
                key: 'phoneNumber',
                value: 'Phone'
            },
            {
                key: 'photoUrl',
                value: 'photoUrl'
            }
        ]
    },
    {
        label: 'Complex managers',
        addButtonTitle: 'Add complex manager',
        id: EpeaplemanagmentTabsKey.Complex,
        column: ColumnComplex,
        handleEdit: EditModal,
        handleDelete: DeleteModal,
        handleSee: peopleadmincomplex,
        handleAdd: PeaplemanagementAddModal,
        queryKey: 'user_getComplexManagers',
        useQuery: useUser_GetComplexManagersQuery,
        useUpdateMutation: useUser_UpdateComplexManagerMutation,
        Transformer: PeopleAdminComplexTransformer,
        searchData: [
            {
                key: 'firstName',
                type: 'contains',
                empty: true,
                valueType: 'string'
            },
            {
                key: 'lastName',
                type: 'contains',
                empty: true,
                valueType: 'string'
            },
            {
                key: 'email',
                type: 'contains',
                empty: true,
                valueType: 'string'
            },
            {
                key: 'phoneNumber',
                type: 'contains',
                empty: true,
                valueType: 'string'
            }
        ],

        requiredFieldUpdate: [
            {
                key: 'complexIds',
                value: 'complex'
            },
            {
                key: 'middleName',
                value: 'middleName'
            },
            {
                key: 'firstName',
                value: 'firstName'
            },
            {
                key: 'lastName',
                value: 'lastName'
            },
            {
                key: 'gender',
                value: 'gender'
            },
            {
                key: 'dateOfBirth',
                value: 'dateOfBirth'
            },
            {
                key: 'phoneNumber',
                value: 'Phone'
            },
            {
                key: 'photoUrl',
                value: 'photoUrl'
            }
        ]
    },
    {
        label: 'Block managers',
        addButtonTitle: 'Add block manager',
        id: EpeaplemanagmentTabsKey.Block,
        column: ColumnBlock,
        handleEdit: BlockEditModal,
        handleSee: peopleadminblock,
        handleDelete: BlockdeleteModal,
        handleAdd: BlockAddModal,
        queryKey: 'blockManager_getBlockManagers',
        useQuery: useBlockManager_GetBlockManagersQuery,
        useUpdateMutation: useBlockManager_UpdateMutation,
        Transformer: PeopleAdminBlockTransformer,
        searchData: [
            {
                key: 'resident.firstName',
                type: 'contains',
                empty: true,
                valueType: 'string'
            },
            {
                key: 'resident.lastName',
                type: 'contains',
                empty: true,
                valueType: 'string'
            },
            {
                key: 'resident.email',
                type: 'contains',
                empty: true,
                valueType: 'string'
            },
            {
                key: 'resident.phoneNumber',
                type: 'contains',
                empty: true,
                valueType: 'string'
            }
        ],

        requiredFieldUpdate: [
            {
                key: 'blockId',
                value: 'blockId'
            },
            {
                key: 'residentId',
                value: 'idresidebt'
            }
        ]
    },
    {
        label: 'Department managers',
        addButtonTitle: 'Add department manager',
        id: EpeaplemanagmentTabsKey.Department,
        column: ColumnDepartment,
        handleEdit: DepartmentEditModal,
        handleDelete: DepartmentdeleteModal,
        handleSee: peopleadmindepartment,
        handleAdd: DepartmentAddModal,
        queryKey: 'departmentManager_getDepartmentManagers',
        useQuery: useDepartmentManager_GetDepartmentManagersQuery,
        useUpdateMutation: useDepartmentManager_UpdateMutation,
        Transformer: PeopleAdminDepartmentTransformer,
        searchData: [
            {
                key: 'staff.firstName',
                type: 'contains',
                empty: true,
                valueType: 'string'
            },
            {
                key: 'staff.lastName',
                type: 'contains',
                empty: true,
                valueType: 'string'
            },
            {
                key: 'staff.email',
                type: 'contains',
                empty: true,
                valueType: 'string'
            },
            {
                key: 'staff.phoneNumber',
                type: 'contains',
                empty: true,
                valueType: 'string'
            },
            {
                key: 'department.name',
                type: 'contains',
                empty: true,
                valueType: 'string'
            }
        ],

        requiredFieldUpdate: [
            {
                key: 'departmentId',
                value: 'departmentId'
            },
            {
                key: 'staffId',
                value: 'idstaf'
            }
        ]
    }
];
