import { Column, RowTable } from '@/components/table/table_layout/types.table.layout';
import { ItemTabs } from '@/components/tabs/types.tabs';
import { ICustomPageTabsProps } from '../../types.admin';
import PeoplestafEditModal from './Staff/editModal';
import PeoplestafDeleteModal from './Staff/deleteModal';
import PeoplestafAddModal from './Staff/addModal';
import PeopleresidentEditModal from './Resident/editModal';
import PeopleresidentDeleteModal from './Resident/deleteModal';
import PeopleresidentAddModal from './Resident/addModal';
import PeoplesecurityAddModal from './Security/addModal';
import PeoplesecurityEditModal from './Security/editModal';
import PeoplesecurityDeleteModal from './Security/deleteModal';
import PeopleResidentTransformer from './Resident/table.transformer';
import PeopleResidentflatTransformer from './Residentflat/table.transformer';
import PeopleStafTransformer from './Staff/table.transformer';
import PeopleSecurityTransformer from './Security/table.transformer';
import PeopleApprovalTransformer from './Approval/table.transformer';
import PeropertyTransformer from './Property/table.transformer';
import EditDelete from 'src/components/shared/share/edit-delete';
import PeopleViewModalResident from './Resident/viewModal';
import PeopleViewModalstaff from './Staff/viewModal';
import PeopleViewModalSecurity from './Security/viewModal';
import PeopleViewModalApproval from './Approval/viewModal';
import PeopleViewModalProperty from './Property/viewModal';
import storageKeys from 'src/data/storageKeys';
import Showcomplex from 'src/components/shared/share/show-complex';
import {
    useResidentFlat_UpdateMutation,
    useUser_GetResidentsQuery,
    useUser_GetStaffsQuery,
    useUser_GetSecuritiesQuery,
    useUser_UpdateSecurityProfileMutation,
    useUser_GetUsersQuery,
    useResidentFlat_GetResidentFlatsQuery,
    useUser_UpdateStaffProfileMutation,
    useUser_UpdateResidentMutation
} from 'src/graphql/generated';
import Space from 'src/components/shared/share/space';
import FilterModal from './Residentflat/filterModal';
import Editemodalproperty from './Residentflat/addModal';
import Deletemodalproperty from './Residentflat/deleteModal';
export enum EpeaplemanagmentTabsKey {
    Resident = 'Resident',
    Staff = 'Staff',
    Security = 'Security',
    Approval = 'User approval',
    Peroperty = 'Peroperty approval',
    PropertyResident = 'Property resident'
}
export const ColumnResident: Column[] = [
    { id: 'Check', checkbox: true },
    { id: 'Name', label: 'Name', sort: true, sortkey: 'firstName' },
    { id: 'From', label: 'From' },
    { id: 'Phone', label: 'Phone', sort: true, sortkey: 'phoneNumber' },
    { id: 'Email', label: 'Email', sort: true, sortkey: 'email' },
    { id: 'activeStatus', label: 'Active/Inactivate', active: true },
    { id: 'Action', label: 'More', actions: true }
];
export const ColumnResidentflat: Column[] = [
    { id: 'Check', checkbox: true },
    { id: 'Name', label: 'Name', sort: true, sortkey: 'firstName' },
    { id: 'From', label: 'From' },
    { id: 'Phone', label: 'Phone', sort: true, sortkey: 'phoneNumber' },
    {
        id: 'ownershipStatustext',
        label: 'Ownership status',
        sort: true,
        sortkey: 'ownershipStatus'
    },
    { id: 'approvalStatustext', label: 'Approval status', sort: true, sortkey: 'approvalStatus' },
    { id: 'activeStatus', label: 'Active/Inactivate', active: true },
    { id: 'Action', label: 'More', actions: true }
];
export const ColumnResidentflat_blockmanager: Column[] = [
    //{ id: 'Check', checkbox: true },
    { id: 'Name', label: 'Name', sort: true, sortkey: 'firstName' },
    { id: 'From', label: 'From' },
    { id: 'Phone', label: 'Phone', sort: true, sortkey: 'phoneNumber' },
    {
        id: 'ownershipStatustext',
        label: 'Ownership status',
        sort: true,
        sortkey: 'ownershipStatus'
    },
    { id: 'approvalStatustext', label: 'Approval status', sort: true, sortkey: 'approvalStatus' },
    { id: 'activeStatus', label: 'Active/Inactivate', active: true }

    //{ id: 'Action', label: 'More', actions: true }
];

export const ColumnStaff: Column[] = [
    { id: 'Check', checkbox: true },
    { id: 'staffId', label: 'Staff id', sort: true, sortkey: 'staffId' },
    { id: 'Name', label: 'Name', sort: true, sortkey: 'firstName' },
    { id: 'Department', label: 'Department', sort: true, sortkey: 'department.name' },
    { id: 'Phone', label: 'Phone', sort: true, sortkey: 'phoneNumber' },
    { id: 'Email', label: 'Email', Component: Space, sort: true, sortkey: 'email' },
    { id: 'complexId', label: 'Complexes', Component: Showcomplex },
    { id: 'activeStatus', label: 'Active/Inactivate', active: true },
    { id: 'Action', label: 'More', actions: true }
];
export const ColumnSecurity: Column[] = [
    { id: 'Check', checkbox: true },
    { id: 'securityId', label: 'Security id', sort: true, sortkey: 'securityId' },
    { id: 'Name', label: 'Name', sort: true, sortkey: 'firstName' },
    { id: 'Complex', label: 'Complex', sort: true, sortkey: 'complex.name' },
    { id: 'Phone', label: 'Phone', sort: true, sortkey: 'phoneNumber' },
    { id: 'Email', label: 'Email', sort: true, sortkey: 'email', Component: Space },
    { id: 'employeeType', label: 'Employee type', sort: true, sortkey: 'employmentType.name' },
    { id: 'activeStatus', label: 'Active/Inactivate', active: true },
    { id: 'Action', label: 'More', actions: true }
];

export const ColumnResident_blockmanager: Column[] = [
    { id: 'Name', label: 'Name', sort: true, sortkey: 'firstName' },
    { id: 'From', label: 'From' },
    { id: 'Phone', label: 'Phone', sort: true, sortkey: 'phoneNumber' },
    { id: 'Email', label: 'Email', sort: true, sortkey: 'email' },
    { id: 'activeStatus', label: 'Active/Inactivate', active: true },
    { id: 'Action', label: 'More', actions: true }
];
export const ColumnStaff_blockmanager: Column[] = [
    { id: 'staffId', label: 'Staff id', sort: true, sortkey: 'staffId' },
    { id: 'Name', label: 'Name', sort: true, sortkey: 'firstName' },
    { id: 'Department', label: 'Department', sort: true, sortkey: 'department.name' },
    { id: 'Phone', label: 'Phone', sort: true, sortkey: 'phoneNumber' },
    { id: 'Email', label: 'Email', Component: Space, sort: true, sortkey: 'email' },
    { id: 'complexId', label: 'Complexes', Component: Showcomplex },
    { id: 'activeStatus', label: 'Active/Inactivate', active: true },
    { id: 'Action', label: 'More', actions: true }
];
export const ColumnSecurity_blockmanager: Column[] = [
    { id: 'securityId', label: 'Security id', sort: true, sortkey: 'securityId' },
    { id: 'Name', label: 'Name', sort: true, sortkey: 'firstName' },
    { id: 'Complex', label: 'Complex', sort: true, sortkey: 'complex.name' },
    { id: 'Phone', label: 'Phone', sort: true, sortkey: 'phoneNumber' },
    { id: 'Email', label: 'Email', sort: true, sortkey: 'email', Component: Space },
    { id: 'employeeType', label: 'Employee type', sort: true, sortkey: 'employmentType.name' },
    { id: 'activeStatus', label: 'Active/Inactivate', active: true },
    { id: 'Action', label: 'More', actions: true }
];
export const ColumnApproval: Column[] = [
    //  { id: 'Check', checkbox: true },
    { id: 'Name', label: 'Name', sort: true, sortkey: 'firstName' },
    { id: 'Type', label: 'Type', sort: true, sortkey: 'userType' },
    { id: 'Phone', label: 'Phone', sort: true, sortkey: 'phoneNumber' },
    { id: 'Email', label: 'Email', sort: true, sortkey: 'email' },
    { id: 'Approval', label: 'Approval/Reject', Component: EditDelete },
    { id: 'Action', label: 'More', actions: true }
];
export const ColumnProperty: Column[] = [
    //{ id: 'Check', checkbox: true },
    { id: 'Name', label: 'Name', sort: true, sortkey: 'resident.firstName' },
    { id: 'Phone', label: 'Phone', sort: true, sortkey: 'resident.phoneNumber' },
    { id: 'Email', label: 'Email', sort: true, sortkey: 'resident.email' },
    { id: 'Approval', label: 'Approval/Reject', Component: EditDelete },
    { id: 'Action', label: 'More', actions: true }
];
export const Peaple_Management_TABS_ITEMS: ICustomPageTabsProps[] = [
    {
        label: 'Resident',
        addButtonTitle: 'Add resident',
        id: EpeaplemanagmentTabsKey.Resident,
        column: ColumnResident,
        column2: ColumnResident_blockmanager,
        handleEdit: PeopleresidentEditModal,
        handleDelete: PeopleresidentDeleteModal,
        handleAdd: PeopleresidentAddModal,
        handleSee: PeopleViewModalResident,
        handleUserproperty: PeopleViewModalResident,
        queryKey: 'user_getResidents',
        useQuery: useUser_GetResidentsQuery,
        Transformer: PeopleResidentTransformer,
        useUpdateMutation: useUser_UpdateResidentMutation,
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
                key: 'alternativeContact',
                value: 'primaryContact'
            },
            /*{
                key: 'email',
                value: 'Email'
            },*/
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
        label: 'Staff',
        addButtonTitle: 'Add staff',
        id: EpeaplemanagmentTabsKey.Staff,
        column: ColumnStaff,
        column2: ColumnStaff_blockmanager,
        handleSee: PeopleViewModalstaff,
        handleEdit: PeoplestafEditModal,
        handleDelete: PeoplestafDeleteModal,
        handleAdd: PeoplestafAddModal,
        queryKey: 'user_getStaffs',
        useQuery: useUser_GetStaffsQuery,
        Transformer: PeopleStafTransformer,
        useUpdateMutation: useUser_UpdateStaffProfileMutation,
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
            },
            {
                key: 'staffId',
                type: 'eq',
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
                key: 'middleName',
                value: 'middleName'
            },
            /* {
                key: 'email',
                value: 'Email'
            },*/
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
                key: 'role',
                value: 'role'
            },
            {
                key: 'employmentTypeId',
                value: 'employmentTypeId'
            },
            {
                key: 'departmentId',
                value: 'Departmentid'
            },
            {
                key: 'dateOfJoining',
                value: 'dateOfJoining'
            },
            {
                key: 'dateOfTermination',
                value: 'dateOfTermination'
            },
            {
                key: 'headOfDepertment',
                value: 'head'
            },
            {
                key: 'address',
                value: 'address'
            },
            {
                key: 'alternateEmail',
                value: 'alternateEmail'
            },
            {
                key: 'alternatePhone',
                value: 'alternatePhone'
            }
        ]
    },
    {
        label: 'Security',
        addButtonTitle: 'Add security',
        id: EpeaplemanagmentTabsKey.Security,
        column: ColumnSecurity,
        column2: ColumnSecurity_blockmanager,
        handleEdit: PeoplesecurityEditModal,
        handleDelete: PeoplesecurityDeleteModal,
        handleAdd: PeoplesecurityAddModal,
        handleSee: PeopleViewModalSecurity,
        queryKey: 'user_getSecurities',
        useQuery: useUser_GetSecuritiesQuery,
        useUpdateMutation: useUser_UpdateSecurityProfileMutation,
        Transformer: PeopleSecurityTransformer,
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
            },
            {
                key: 'complex.name',
                type: 'contains',
                empty: true,
                valueType: 'string'
            },
            {
                key: 'employmentType.name',
                type: 'contains',
                empty: true,
                valueType: 'string'
            },
            {
                key: 'securityId',
                type: 'eq',
                empty: true,
                valueType: 'string'
            }
        ],
        requiredFieldUpdate: [
            {
                key: 'yearsOfExperience',
                value: 'Yearsofexperience'
            },
            {
                key: 'dateOfJoining',
                value: 'dateOfJoining'
            },

            {
                key: 'complexId',
                value: 'complexId'
            },
            {
                key: 'firstName',
                value: 'Firstname'
            },
            {
                key: 'lastName',
                value: 'Lastname'
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
            /* {
                key: 'email',
                value: 'Email'
            },*/
            {
                key: 'employmentTypeId',
                value: 'employmentTypeId'
            }
        ]
    },
    {
        label: 'User approval',
        id: EpeaplemanagmentTabsKey.Approval,
        column: ColumnApproval,
        queryKey: 'user_getUsers',
        useQuery: useUser_GetUsersQuery,
        handleSee: PeopleViewModalApproval,
        Transformer: PeopleApprovalTransformer,
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
        ]
    },
    {
        label: 'Property approval',
        id: EpeaplemanagmentTabsKey.Peroperty,
        column: ColumnProperty,
        queryKey: 'residentFlat_getResidentFlats',
        useQuery: useResidentFlat_GetResidentFlatsQuery,
        handleSee: PeopleViewModalProperty,
        Transformer: PeropertyTransformer,
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
        ]
    },
    {
        label: 'Property resident',
        // addButtonTitle: 'Add resident',
        id: EpeaplemanagmentTabsKey.PropertyResident,
        column: ColumnResidentflat,
        column2: ColumnResidentflat_blockmanager,
        handleEdit: Editemodalproperty,
        handleDelete: Deletemodalproperty,
        handleFilter: FilterModal,
        queryKey: 'residentFlat_getResidentFlats',
        useQuery: useResidentFlat_GetResidentFlatsQuery,
        Transformer: PeopleResidentflatTransformer,
        useUpdateMutation: useResidentFlat_UpdateMutation,
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
                key: 'resident.phoneNumber',
                type: 'contains',
                empty: true,
                valueType: 'string'
            },
            {
                key: 'flat.floor.block.complex.name',
                type: 'contains',
                empty: true,
                valueType: 'string'
            },
            {
                key: 'flat.floor.block.name',
                type: 'contains',
                empty: true,
                valueType: 'string'
            },
            {
                key: 'flat.floor.name',
                type: 'contains',
                empty: true,
                valueType: 'string'
            },
            {
                key: 'flat.name',
                type: 'contains',
                empty: true,
                valueType: 'string'
            },
            {
                type: 'eq',
                key: 'resident.email',
                empty: true,
                valueType: 'string',
                defaultValueKey: 'email'
            },
            {
                type: 'eq',
                key: 'activeStatus',
                empty: true,
                valueType: 'string',
                defaultValueKey: 'activeStatus'
            }
        ],
        requiredFieldUpdate: [
            {
                key: 'ownershipStatus',
                value: 'ownershipStatus'
            },
            {
                key: 'flatId',
                value: 'flatId'
            }
        ]
    }
];
export const residentFilterInitialForm = (row?: any): any => {
    return {
        email: row?.email || undefined,
        activeStatus: row?.activeStatus || undefined
    };
};
