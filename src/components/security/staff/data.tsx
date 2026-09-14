import { Column } from '@/components/table/table_layout/types.table.layout';
import { useAttendance_GetStaffAttendancesQuery } from 'src/graphql/generated';
import { ICustomPageTabsProps } from '../../admin/types.admin';
import staffTransformer from './table.transformer';
import FilterModal from './filterModal';
import StafviewModal from '@/components/admin/checkin/staff/viewModal';
import StafAddModal from './addModal';
import Space from 'src/components/shared/share/space';
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

export enum EstaffTabsKey {
    Staff = 'Staff'
}

export const Staff_SYSTEM_TABS_ITEMS: ICustomPageTabsProps[] = [
    {
        label: 'Check-in/out',
        id: EstaffTabsKey.Staff,
        column: ColumnStaff,
        queryKey: 'attendance_getStaffAttendances',
        useQuery: useAttendance_GetStaffAttendancesQuery,
        Transformer: staffTransformer,
        handleFilter: FilterModal,
        handleSee: StafviewModal,
        handleAdd: StafAddModal,

        searchData: [
            {
                type: 'contains',
                key: 'staff.phoneNumber',
                empty: true,
                valueType: 'string'
            },

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
                valueType: 'string',
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
            },
            {
                type: 'eq',
                key: 'securityId',
                empty: true,
                valueType: 'number',
                defaultValueKey: 'securityId'
            }
        ]
    }
];

export const staffFilterInitialForm = (row?: any) => {
    return {
        checkInDateTime: row?.checkInDateTime || undefined,
        departmentId: row?.departmentId || undefined,
        checkOutDateTime: row?.checkOutDateTime || undefined,
        complexId: row?.complexId || undefined,
        securityId: row?.securityId || undefined
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
