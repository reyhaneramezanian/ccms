import { Column } from '@/components/table/table_layout/types.table.layout';
import { useAttendance_GetStaffAttendancesQuery } from 'src/graphql/generated';
import { ICustomPageTabsProps } from '../../admin/types.admin';
import staffTransformer from './table.transformer';
import FilterModal from './filterModal';
import StafviewModal from './viewModal';
import * as Yup from 'yup';

export const ColumnStaff: Column[] = [
    { id: 'complex', label: 'Complex', sort: true, sortkey: 'complex.name' },
    { id: 'checkInDateTimeStart', label: 'Check-in time', sort: true, sortkey: 'checkInDateTime' },
    { id: 'checkInDateTimeEnd', label: 'Check-out time', sort: true, sortkey: 'checkOutDateTime' }
    //{ id: 'Action', label: 'More', actions: true }
];

export enum EstaffTabsKey {
    Staff = 'Check-in/out'
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

        searchData: [
            {
                type: 'contains',
                key: 'complex.name',
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
                key: 'complexId',
                empty: true,
                valueType: 'number',
                defaultValueKey: 'complexId'
            },
            {
                type: 'lte',
                key: 'checkOutDateTime',
                empty: true,
                valueType: 'string',
                defaultValueKey: 'checkOutDateTime'
            }
        ]
    }
];

export const staffFilterInitialForm = (row?: any): any => {
    return {
        checkInDateTime: row?.checkInDateTime || undefined,
        complexId: row?.complexId || undefined,
        checkOutDateTime: row?.checkOutDateTime || undefined
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
