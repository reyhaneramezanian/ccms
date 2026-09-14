import { Column, RowTable } from '@/components/table/table_layout/types.table.layout';
import { ItemTabs } from '@/components/tabs/types.tabs';
import { ICustomPageTabsProps } from '../types.admin';
import * as adminstyle from '../admin.style';
import ComplaintDeleteModal from './complaint/deleteModal';
import ComplaintEditModal from './complaint/editModal';
import ComplaintAddModal from './complaint/addModal';
import complainttypeDeleteModal from './complainttype/deleteModal';
import complainttypeEditModal from './complainttype/editModal';
import complainttypeAddModal from './complainttype/addModal';
import ComplaintTransformer from './complaint/table.transformer';
import ComplaintTypeTransformer from './complainttype/table.transformer';
import Complaintview from './complaint/viewModal';
import filtercomplaint from './complaint/filterModal';
import serviceModalcomplaint from './complaint/serviceModal';
import {
    useComplaint_GetComplaintsQuery,
    useComplaint_CreateMutation,
    useComplaintType_GetComplaintTypesQuery,
    useComplaintType_UpdateMutation
} from 'src/graphql/generated';
import Space from 'src/components/shared/share/space';
import Spacetiny from 'src/components/shared/share/spacetiny';

export enum EComplaintTabsKey {
    Complainttype = 'Complaint type',
    Complaint = 'Complaint'
}
export const ColumnComplainttype: Column[] = [
    { id: 'Check', checkbox: true },
    { id: 'name', label: 'Complaint type', sort: true, sortkey: 'name' },
    { id: 'activeStatus', label: 'Active/Inactivate', active: true },
    { id: 'Action', label: 'More', actions: true }
];
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
export const ColumnComplainttype_blockmanager: Column[] = [
    { id: 'name', label: 'Complaint type', sort: true, sortkey: 'name' },
    { id: 'activeStatus', label: 'Active/Inactivate', active: true }
];
export const ColumnComplaint_blockmanager: Column[] = [
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
    { id: 'Status', label: 'Status', status: true }
];
export const Complaint_TABS_ITEMS: ICustomPageTabsProps[] = [
    {
        label: 'Complaint type',
        addButtonTitle: 'Add complaint type',
        id: EComplaintTabsKey.Complainttype,
        column: ColumnComplainttype,
        column2: ColumnComplainttype_blockmanager,
        handleEdit: complainttypeEditModal,
        handleDelete: complainttypeDeleteModal,
        handleAdd: complainttypeAddModal,
        queryKey: 'complaintType_getComplaintTypes',
        useQuery: useComplaintType_GetComplaintTypesQuery,
        useUpdateMutation: useComplaintType_UpdateMutation,
        Transformer: ComplaintTypeTransformer,
        requiredFieldUpdate: [
            {
                key: 'name',
                value: 'name'
            }
        ]
    },
    {
        label: 'Complaint',
        addButtonTitle: 'Add complaint',
        id: EComplaintTabsKey.Complaint,
        column: ColumnComplaint,
        column2: ColumnComplaint_blockmanager,
        handleEdit: ComplaintEditModal,
        handleDelete: ComplaintDeleteModal,
        handleAdd: ComplaintAddModal,
        handleSee: Complaintview,
        handleFilter: filtercomplaint,
        handleService: serviceModalcomplaint,
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
                key: 'flat.floor.block.complexId',
                empty: true,
                valueType: 'number',
                defaultValueKey: 'complexId'
            },
            {
                type: 'eq',
                key: 'flat.floor.blockId',
                empty: true,
                valueType: 'number',
                defaultValueKey: 'blockId'
            },
            {
                type: 'eq',
                key: 'flat.floorId',
                empty: true,
                valueType: 'number',
                defaultValueKey: 'floorId'
            },
            {
                type: 'eq',
                key: 'flatId',
                empty: true,
                valueType: 'number',
                defaultValueKey: 'flatId'
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
        complexId: row?.complexId || undefined,
        blockId: row?.blockId || undefined,
        floorId: row?.floorId || undefined,
        flatId: row?.flatId || undefined,
        date: row?.date || undefined,
        complaintStatus: row?.complaintStatus || undefined,
        complaintTypeId: row?.complaintTypeId || undefined
    };
};
