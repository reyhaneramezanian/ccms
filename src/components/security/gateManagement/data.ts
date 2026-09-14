import { useGateManagementGetQuery } from './../../../graphql/generated';
import { Column } from '@/components/table/table_layout/types.table.layout';
import {
    useAdminAnnouncementBoardUpdateMutation,
    useAdminAnnouncementTypeUpdateMutation
} from 'src/graphql/generated';
import gateManagementApprovalTransfer from './approval/table.transformer';
import gateManagementHistoryTransfer from './history/table.transformer';
import { ICustomPageTabsProps } from '@/components/admin/types.admin';
import handleShowGateManagementApprovalFilterModal from './approval/filterModal';
import handleShowGateManagementHistoryFilterModal from './history/filterModal';
import { handleShowSelectGateManagementApprovalTypeModal } from '@/components/gateManagement';
import handleShowGateManagementHistoryDetailsModal from './history/detailsModal';
import Space from 'src/components/shared/share/space';
import ApproveAction from 'src/components/shared/share/approveActions';

export enum EGateManagementTabsKey {
    Approval = 'Approval',
    History = 'History'
}

const GATE_MANAGEMENT_APPROVAL: Column[] = [
    {
        id: 'from',
        label: 'From',
        Component: Space,
        sort: true,
        sortkey: 'residentFlat.flat.floor.block.complex.name'
    },
    {
        id: 'type',
        label: 'Type',
        sort: true,
        sortkey: 'gateApprovalType'
    },
    {
        id: 'name',
        label: 'Name',
        Component: Space,
        sort: true,
        sortkey: 'residentFlat.resident.firstName'
    },
    {
        id: 'phoneNumber',
        label: 'Phone',
        sort: true,
        sortkey: 'residentFlat.resident.phoneNumber'
    },
    {
        id: 'startDate',
        label: 'Start'
    },
    {
        id: 'endDate',
        label: 'End'
    },
    {
        id: 'code',
        label: 'Code',
        sort: true,
        sortkey: 'securityCode'
    },
    {
        id: 'approveAction',
        label: 'Action',
        Component: ApproveAction
    },
    { id: 'More', label: 'More', actions: true }
];

const GATE_MANAGEMENT_HISTORY: Column[] = [
    {
        id: 'from',
        label: 'From',
        Component: Space,
        sort: true,
        sortkey: 'residentFlat.flat.floor.block.complex.name'
    },
    {
        id: 'type',
        label: 'Type',
        sort: true,
        sortkey: 'gateApprovalType'
    },
    {
        id: 'name',
        label: 'Name',
        Component: Space,
        sort: true,
        sortkey: 'residentFlat.resident.firstName'
    },
    {
        id: 'phoneNumber',
        label: 'Phone',
        sort: true,
        sortkey: 'residentFlat.resident.phoneNumber'
    },
    {
        id: 'startDate',
        label: 'Start'
    },
    {
        id: 'endDate',
        label: 'End'
    },
    {
        id: 'code',
        label: 'Code',
        sort: true,
        sortkey: 'securityCode'
    },

    {
        id: 'approvalStatus',
        label: 'Status',
        status: true
    },
    { id: 'More', label: 'More', actions: true }
];

export const GATE_MANAGEMENT_TABS_ITEMS: ICustomPageTabsProps[] = [
    {
        label: 'Approval',
        id: EGateManagementTabsKey.Approval,
        column: GATE_MANAGEMENT_APPROVAL,
        handleAdd: handleShowSelectGateManagementApprovalTypeModal,
        useQuery: useGateManagementGetQuery,
        useUpdateMutation: useAdminAnnouncementTypeUpdateMutation,
        queryKey: 'gateApproval_getGateApprovals',
        Transformer: gateManagementApprovalTransfer,
        searchData: [
            {
                key: 'securityCode',
                type: 'eq',
                empty: true,
                valueType: 'string'
            },
            {
                type: 'contains',
                key: 'residentFlat.flat.name',
                empty: true,
                valueType: 'string'
            },
            {
                type: 'contains',
                key: 'residentFlat.flat.floor.name',
                empty: true,
                valueType: 'string'
            },
            {
                type: 'contains',
                key: 'residentFlat.flat.floor.block.name',
                empty: true,
                valueType: 'string'
            },
            {
                type: 'contains',
                key: 'residentFlat.flat.floor.block.complex.name',
                empty: true,
                valueType: 'string'
            },
            {
                type: 'contains',
                key: 'residentFlat.resident.firstName',
                empty: true,
                valueType: 'string'
            },
            {
                type: 'contains',
                key: 'residentFlat.resident.lastName',
                empty: true,
                valueType: 'string'
            },
            {
                type: 'contains',
                key: 'residentFlat.resident.phoneNumber',
                empty: true,
                valueType: 'string'
            },
            {
                type: 'eq',
                key: 'residentFlat.flatId',
                empty: true,
                valueType: 'number',
                defaultValueKey: 'flatId'
            },
            {
                type: 'eq',
                key: 'residentFlat.flat.floorId',
                empty: true,
                valueType: 'number',
                defaultValueKey: 'floorId'
            },
            {
                type: 'eq',
                key: 'residentFlat.flat.floor.blockId',
                empty: true,
                valueType: 'number',
                defaultValueKey: 'blockId'
            },
            {
                type: 'eq',
                key: 'residentFlat.flat.floor.block.complexId',
                empty: true,
                valueType: 'number',
                defaultValueKey: 'complexId'
            },

            {
                key: 'securityCode',
                type: 'eq',
                empty: true,
                valueType: 'string',
                defaultValueKey: 'securityCode'
            },
            {
                key: 'start',
                type: 'gte',
                empty: true,
                valueType: 'string',
                defaultValueKey: 'start'
            },
            {
                key: 'end',
                type: 'lte',
                empty: true,
                valueType: 'string',
                defaultValueKey: 'end'
            }
        ],
        addButtonTitle: 'Add walk-in approval',
        handleFilter: handleShowGateManagementApprovalFilterModal,
        handleSee: handleShowGateManagementHistoryDetailsModal
    },
    {
        label: 'History',
        id: EGateManagementTabsKey.History,
        column: GATE_MANAGEMENT_HISTORY,
        useQuery: useGateManagementGetQuery,
        useUpdateMutation: useAdminAnnouncementBoardUpdateMutation,
        queryKey: 'gateApproval_getGateApprovals',
        Transformer: gateManagementHistoryTransfer,
        searchData: [
            {
                key: 'securityCode',
                type: 'eq',
                empty: true,
                valueType: 'string'
            },
            {
                type: 'contains',
                key: 'residentFlat.flat.name',
                empty: true,
                valueType: 'string'
            },
            {
                type: 'contains',
                key: 'residentFlat.flat.floor.name',
                empty: true,
                valueType: 'string'
            },
            {
                type: 'contains',
                key: 'residentFlat.flat.floor.block.name',
                empty: true,
                valueType: 'string'
            },
            {
                type: 'contains',
                key: 'residentFlat.flat.floor.block.complex.name',
                empty: true,
                valueType: 'string'
            },
            {
                type: 'contains',
                key: 'residentFlat.resident.firstName',
                empty: true,
                valueType: 'string'
            },
            {
                type: 'contains',
                key: 'residentFlat.resident.lastName',
                empty: true,
                valueType: 'string'
            },
            {
                type: 'contains',
                key: 'residentFlat.resident.phoneNumber',
                empty: true,
                valueType: 'string'
            },
            {
                type: 'eq',
                key: 'residentFlat.flatId',
                empty: true,
                valueType: 'number',
                defaultValueKey: 'flatId'
            },
            {
                type: 'eq',
                key: 'residentFlat.flat.floorId',
                empty: true,
                valueType: 'number',
                defaultValueKey: 'floorId'
            },
            {
                type: 'eq',
                key: 'residentFlat.flat.floor.blockId',
                empty: true,
                valueType: 'number',
                defaultValueKey: 'blockId'
            },
            {
                type: 'eq',
                key: 'residentFlat.flat.floor.block.complexId',
                empty: true,
                valueType: 'number',
                defaultValueKey: 'complexId'
            },

            {
                key: 'securityCode',
                type: 'eq',
                empty: true,
                valueType: 'string',
                defaultValueKey: 'securityCode'
            },
            {
                key: 'approvalStatus',
                type: 'eq',
                empty: true,
                valueType: 'string',
                defaultValueKey: 'approvalStatus'
            },
            {
                key: 'start',
                type: 'gte',
                empty: true,
                valueType: 'string',
                defaultValueKey: 'start'
            },
            {
                key: 'end',
                type: 'lte',
                empty: true,
                valueType: 'string',
                defaultValueKey: 'end'
            }
        ],
        notShowAddButton: true,
        handleFilter: handleShowGateManagementHistoryFilterModal,
        handleSee: handleShowGateManagementHistoryDetailsModal
    }
];
