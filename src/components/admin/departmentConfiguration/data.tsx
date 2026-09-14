import { Column } from '@/components/table/table_layout/types.table.layout';
import {
    useAdminDepartmentTypeGetQuery,
    useAdminDepartmentTypeUpdateMutation,
    useAdminEmployeeTypeGetQuery,
    useAdminEmployeeTypeUpdateMutation,
    useAdminServiceTypeGetQuery,
    useAdminServiceTypeUpdateMutation
} from 'src/graphql/generated';
import { ICustomPageTabsProps } from '../types.admin';
import handleShowDepartmentConfigurationDeleteModal from './department/deleteModal';
import handleShowDepartmentConfigurationEditModal from './department/editModal';
import handleShowEmployeeTypeDepartmentConfigurationDeleteModal from './employeeType/deleteModal';
import handleShowEmployeeTypeDepartmentConfigurationEditModal from './employeeType/editModal';
import handleShowServiceTypeDepartmentConfigurationDeleteModal from './serviceType/deleteModal';
import handleShowServiceTypeDepartmentConfigurationEditModal from './serviceType/editModal';
import employeeTypeTransformer from './employeeType/table.transformer';
import serviceTypeTransformer from './serviceType/table.transformer';
import departmentTypeTransformer from './department/table.transformer';

export enum EDepartmentConfigurationTabsKey {
    EmployeeType = 'employee-type',
    ServiceType = 'service-type',
    DepartmentType = 'DepartmentType'
}

const EMPLOYEE_TYPE_DEPARTMENT_CONFIGURATION_COLUMNS: Column[] = [
    { id: 'Check', checkbox: true },
    { id: 'name', label: 'Employment type', sort: true, sortkey: 'name' },
    { id: 'activeStatus', label: 'Active/Inactivate', active: true },
    { id: 'Action', label: 'More', actions: true }
];

const SERVICE_TYPE_DEPARTMENT_CONFIGURATION_COLUMNS: Column[] = [
    { id: 'Check', checkbox: true },
    { id: 'name', label: 'Service type', sort: true, sortkey: 'name' },
    { id: 'department', label: 'Department', sort: true, sortkey: 'department.name' },
    { id: 'activeStatus', label: 'Active/Inactivate', active: true },
    { id: 'Action', label: 'More', actions: true }
];

const DEPARTMENT_OF_DEPARTMENT_CONFIGURATION_COLUMNS: Column[] = [
    { id: 'Check', checkbox: true },
    { id: 'name', label: 'Department', sort: true, sortkey: 'name' },
    { id: 'activeStatus', label: 'Active/Inactivate', active: true },
    { id: 'Action', label: 'More', actions: true }
];

export const DEPARTMENT_CONFIGURATION_TABS_ITEMS: ICustomPageTabsProps[] = [
    {
        label: 'Employment ',
        addButtonTitle: 'Add employment type',
        id: EDepartmentConfigurationTabsKey.EmployeeType,
        column: EMPLOYEE_TYPE_DEPARTMENT_CONFIGURATION_COLUMNS,
        handleEdit: handleShowEmployeeTypeDepartmentConfigurationEditModal,
        handleDelete: handleShowEmployeeTypeDepartmentConfigurationDeleteModal,
        handleAdd: handleShowEmployeeTypeDepartmentConfigurationEditModal,
        queryKey: 'employmentType_getEmploymentTypes',
        useQuery: useAdminEmployeeTypeGetQuery,
        useUpdateMutation: useAdminEmployeeTypeUpdateMutation as any,
        Transformer: employeeTypeTransformer,
        requiredFieldUpdate: ['name'],
        searchData: [
            {
                type: 'contains',
                key: 'name',
                empty: true,
                valueType: 'string'
            }
        ]
    },
    {
        label: 'Department',
        addButtonTitle: 'Add department type',
        id: EDepartmentConfigurationTabsKey.DepartmentType,
        column: DEPARTMENT_OF_DEPARTMENT_CONFIGURATION_COLUMNS,
        handleEdit: handleShowDepartmentConfigurationEditModal,
        handleDelete: handleShowDepartmentConfigurationDeleteModal,
        handleAdd: handleShowDepartmentConfigurationEditModal,
        queryKey: 'department_getDepartments',
        useQuery: useAdminDepartmentTypeGetQuery,
        useUpdateMutation: useAdminDepartmentTypeUpdateMutation as any,
        Transformer: departmentTypeTransformer,
        requiredFieldUpdate: [
            {
                key: 'name',
                value: 'name'
            }
        ],
        searchData: [
            {
                type: 'contains',
                key: 'name',
                empty: true,
                valueType: 'string'
            }
        ]
    },
    {
        label: 'Service type ',
        addButtonTitle: 'Add service type ',
        id: EDepartmentConfigurationTabsKey.ServiceType,
        column: SERVICE_TYPE_DEPARTMENT_CONFIGURATION_COLUMNS,
        handleEdit: handleShowServiceTypeDepartmentConfigurationEditModal,
        handleDelete: handleShowServiceTypeDepartmentConfigurationDeleteModal,
        handleAdd: handleShowServiceTypeDepartmentConfigurationEditModal,
        queryKey: 'serviceType_getServiceTypes',
        useQuery: useAdminServiceTypeGetQuery,
        useUpdateMutation: useAdminServiceTypeUpdateMutation as any,
        Transformer: serviceTypeTransformer,
        requiredFieldUpdate: ['name', 'departmentId'],
        searchData: [
            {
                type: 'contains',
                key: 'name',
                empty: true,
                valueType: 'string'
            }
        ]
    }
];
