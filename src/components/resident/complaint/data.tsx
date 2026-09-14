import { Column, RowTable } from '@/components/table/table_layout/types.table.layout';
import { ItemTabs } from '@/components/tabs/types.tabs';
import { ICustomPageTabsProps } from '@/components/admin/types.admin';
import ComplaintDeleteModal from './complaint/deleteModal';
import ComplaintAddModal from './addModal.complaint';
import ComplaintTransformer from './complaint/table.transformer';
import Complaintview from './complaint/viewModal';
import filtercomplaint from './complaint/filterModal';
import {
    useComplaint_GetComplaintsQuery,
    useComplaint_CreateMutation
} from 'src/graphql/generated';
import Space from 'src/components/shared/share/space';
import Spacetiny from 'src/components/shared/share/spacetiny';

export enum EComplaintTabsKey {
    Complaint = 'Complaint'
}

export const ColumnComplaint: Column[] = [
    { id: 'Check', checkbox: true },
    { id: 'Type', label: 'Type', Component: Spacetiny, sort: true, sortkey: 'complaintType.name' },
    {
        id: 'From',
        label: 'From',
        Component: Space,
        sort: true,
        sortkey: 'flat.floor.block.complex.name'
    },
    { id: 'Title', label: 'Title', Component: Spacetiny, sort: true, sortkey: 'title' },
    { id: 'Date', label: 'Date', sort: true, sortkey: 'date' },
    { id: 'Message', label: 'Message', Component: Space, sort: true, sortkey: 'message' },
    { id: 'comment', label: 'Comment', Component: Space, sort: true, sortkey: 'comment' },
    { id: 'Status', label: 'Status', status: true },
    { id: 'Action', label: 'More', actions: true }
];
export const Complaint_TABS_ITEMS: ICustomPageTabsProps[] = [
    {
        label: 'Complaint',
        addButtonTitle: 'Add complaint',
        id: EComplaintTabsKey.Complaint,
        column: ColumnComplaint,
        handleEdit: ComplaintAddModal,
        handleDelete: ComplaintDeleteModal,
        handleAdd: ComplaintAddModal,
        handleSee: Complaintview,
        handleFilter: filtercomplaint,
        queryKey: 'complaint_getComplaints',
        useQuery: useComplaint_GetComplaintsQuery,
        useUpdateMutation: useComplaint_CreateMutation,
        Transformer: ComplaintTransformer,
        searchData: [
            {
                type: 'contains',
                key: 'title',
                empty: true,
                valueType: 'string'
            },
            {
                type: 'contains',
                key: 'complaintType.name',
                empty: true,
                valueType: 'string'
            },
            {
                type: 'contains',
                key: 'flat.floor.block.complex.name',
                empty: true,
                valueType: 'string'
            },
            {
                type: 'contains',
                key: 'flat.floor.name',
                empty: true,
                valueType: 'string'
            },
            {
                type: 'contains',
                key: 'flat.name',
                empty: true,
                valueType: 'string'
            },
            {
                type: 'contains',
                key: 'flat.floor.block.name',
                empty: true,
                valueType: 'string'
            },
            {
                type: 'contains',
                key: 'message',
                empty: true,
                valueType: 'string'
            },
            {
                type: 'eq',
                key: 'date',
                empty: true,
                valueType: 'string',
                defaultValueKey: 'date'
            },

            {
                type: 'eq',
                key: 'complaintStatus',
                empty: true,
                valueType: 'string',
                defaultValueKey: 'complaintStatus'
            },
            {
                type: 'eq',
                key: 'complaintTypeId',
                empty: true,
                valueType: 'number',
                defaultValueKey: 'complaintTypeId'
            }
        ]
    }
];

export const complaintFilterInitialForm = (row?: any): any => {
    return {
        date: row?.date || undefined,
        complaintStatus: row?.complaintStatus || undefined,
        complaintTypeId: row?.complaintTypeId || undefined
    };
};
