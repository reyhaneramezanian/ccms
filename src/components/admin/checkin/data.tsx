import { Column } from '@/components/table/table_layout/types.table.layout';
import { useAttendance_GetStaffAttendancesQuery } from 'src/graphql/generated';
import { ICustomPageTabsProps } from '../types.admin';
import staffTransformer from './staff/table.transformer';
import securityTransformer from './security/table.transformer';
import StafAddModal from './staff/addModal';
import SecurityAddModal from './security/addModal';
import StaffilterModal from './staff/filterModal';
import SecurityfilterModal from './security/filterModal';
import StafviewModal from './staff/viewModal';
import SecurityviewModal from './security/viewModal';
import * as Yup from 'yup';

export const ColumnStaff: Column[] = [
    { id: 'Name', label: 'Name', sort: true, sortkey: 'staff.firstName' },
    { id: 'Department', label: 'Department', sort: true, sortkey: 'staff.department.name' },
    { id: 'Phone', label: 'Phone', sort: true, sortkey: 'staff.phoneNumber' },
    { id: 'Email', label: 'Email', sort: true, sortkey: 'staff.email' },
    { id: 'checkInDateTimeStart', label: 'Check-in time', sort: true, sortkey: 'checkInDateTime' },
    { id: 'checkInDateTimeEnd', label: 'Check-out time', sort: true, sortkey: 'checkOutDateTime' },
    { id: 'Action', label: 'More', actions: true }
];
export const Columnsecurity: Column[] = [
    { id: 'Name', label: 'Name', sort: true, sortkey: 'security.firstName' },
    { id: 'Phone', label: 'Phone', sort: true, sortkey: 'security.phoneNumber' },
    { id: 'Email', label: 'Email', sort: true, sortkey: 'security.email' },
    { id: 'checkInDateTimeStart', label: 'Check-in time', sort: true, sortkey: 'checkInDateTime' },
    { id: 'checkInDateTimeEnd', label: 'Check-out time', sort: true, sortkey: 'checkOutDateTime' },
    { id: 'Action', label: 'More', actions: true }
];
export enum EstaffTabsKey {
    Staff = 'Staff',
    Security = 'Security'
}

export const Staff_SYSTEM_TABS_ITEMS: ICustomPageTabsProps[] = [
    {
        label: 'Staff',
        id: EstaffTabsKey.Staff,
        column: ColumnStaff,
        queryKey: 'attendance_getStaffAttendances',
        useQuery: useAttendance_GetStaffAttendancesQuery,
        Transformer: staffTransformer,
        handleAdd: StafAddModal,
        handleFilter: StaffilterModal,
        handleSee: StafviewModal,

        searchData: [
            {
                type: 'contains',
                key: 'staff.firstName',
                empty: true,
                valueType: 'string'
            },
            {
                type: 'contains',
                key: 'staff.lastName',
                empty: true,
                valueType: 'string'
            },
            {
                type: 'contains',
                key: 'staff.department.name',
                empty: true,
                valueType: 'string'
            },
            {
                type: 'contains',
                key: 'staff.phoneNumber',
                empty: true,
                valueType: 'string'
            },
            {
                type: 'contains',
                key: 'staff.email',
                empty: true,
                valueType: 'string'
            },
            {
                type: 'gte',
                key: 'checkInDateTime',
                empty: true,
                valueType: 'string',
                defaultValueKey: 'checkInDateTime'
            },
            {
                type: 'eq',
                key: 'staff.departmentId',
                empty: true,
                valueType: 'number',
                defaultValueKey: 'departmentId'
            },
            {
                type: 'lte',
                key: 'checkOutDateTime',
                empty: true,
                valueType: 'string',
                defaultValueKey: 'checkOutDateTime'
            },
            {
                type: 'eq',
                key: 'complexId',
                empty: true,
                valueType: 'number',
                defaultValueKey: 'complexId'
            }
        ]
    },
    {
        label: 'Security',
        id: EstaffTabsKey.Security,
        column: Columnsecurity,
        queryKey: 'attendance_getStaffAttendances',
        useQuery: useAttendance_GetStaffAttendancesQuery,
        Transformer: securityTransformer,
        handleAdd: SecurityAddModal,
        handleFilter: SecurityfilterModal,
        handleSee: SecurityviewModal,

        searchData: [
            {
                type: 'contains',
                key: 'security.firstName',
                empty: true,
                valueType: 'string'
            },
            {
                type: 'contains',
                key: 'security.lastName',
                empty: true,
                valueType: 'string'
            },
            {
                type: 'contains',
                key: 'security.phoneNumber',
                empty: true,
                valueType: 'string'
            },
            {
                type: 'contains',
                key: 'security.email',
                empty: true,
                valueType: 'string'
            },
            {
                type: 'lte',
                key: 'checkOutDateTime',
                empty: true,
                valueType: 'string',
                defaultValueKey: 'checkOutDateTime'
            },
            {
                type: 'gte',
                key: 'checkInDateTime',
                empty: true,
                valueType: 'string',
                defaultValueKey: 'checkInDateTime'
            },
            {
                type: 'eq',
                key: 'complexId',
                empty: true,
                valueType: 'number',
                defaultValueKey: 'complexId'
            }
        ]
    }
];

export const staffFilterInitialForm = (row?: any): any => {
    return {
        checkInDateTime: row?.checkInDateTime || undefined,
        departmentId: row?.departmentId || undefined,
        checkOutDateTime: row?.checkOutDateTime || undefined,
        complexId: row?.complexId || undefined
    };
};
export const securityFilterInitialForm = (row?: any): any => {
    return {
        checkInDateTime: row?.checkInDateTime || undefined,
        checkOutDateTime: row?.checkOutDateTime || undefined,
        complexId: row?.complexId || undefined
    };
};

export const ValidationForm = Yup.object({
    checkOutDateTime: Yup.date()
        .when(
            'checkInDateTime',
            (checkInDateTime, Yup) =>
                checkInDateTime && Yup.min(checkInDateTime, 'To date cannot be before from date')
        )
        .when(
            'checkInDateTime',
            (checkInDateTime, Yup) => checkInDateTime && Yup.required('This field is required')
        )
});
