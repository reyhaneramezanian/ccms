import { useGateManagementDeliveryGetQuery } from './../../../graphql/generated';
import { Column } from '@/components/table/table_layout/types.table.layout';
import { ICustomPageTabsProps } from '@/components/admin/types.admin';
import gateManagementDeliveryTransfer from './table.transformer';
import handleShowGateManagementDeliveryModal from '../manage/addModal.delivery';
import handleShowGateManagementDeleteModal from '@/components/gateManagement/deleteModal';
import handleShowGateManagementExpireModal from '@/components/gateManagement/expireModal';
import handleShowGateManagementFilterModal from '@/components/gateManagement/filterModalresident';

export enum EGateManagementTabsKey {
    Delivery = 'delivery'
}

const GATE_MANAGEMENT_DELIVERY: Column[] = [
    { id: 'Check', checkbox: true },
    {
        id: 'date',
        label: 'Date of delivery',
        sort: true,
        sortkey: 'start'
    },
    {
        id: 'time',
        label: 'Time'
    },
    {
        id: 'companyName',
        label: 'Company',
        sort: true,
        sortkey: 'companyName'
    },
    {
        id: 'packageLeavingLocationText',
        label: 'Leave at',
        sort: true,
        sortkey: 'packageLeavingLocation'
    },
    {
        id: 'securityCode',
        label: 'Code',
        sort: true,
        sortkey: 'securityCode'
    },
    {
        id: 'status',
        label: 'Status',
        status: true
    },
    { id: 'More', label: 'More', actions: true }
];

export const GATE_MANAGEMENT_TABS_ITEMS: ICustomPageTabsProps[] = [
    {
        label: 'Gate management - Delivery',
        id: EGateManagementTabsKey.Delivery,
        column: GATE_MANAGEMENT_DELIVERY,
        handleAdd: handleShowGateManagementDeliveryModal,
        useQuery: useGateManagementDeliveryGetQuery,
        queryKey: 'gateApproval_getDeliveries',
        Transformer: gateManagementDeliveryTransfer,
        addButtonTitle: 'Add delivery',
        searchData: [
            {
                key: 'companyName',
                type: 'contains',
                empty: true,
                valueType: 'string'
            },
            {
                key: 'securityCode',
                type: 'eq',
                empty: true,
                valueType: 'string'
            },
            {
                type: 'contains',
                key: 'companyName',
                empty: true,
                valueType: 'string',
                defaultValueKey: 'companyName'
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
        handleDelete: handleShowGateManagementDeleteModal,
        handleEdit: handleShowGateManagementDeliveryModal,
        handleexpire: handleShowGateManagementExpireModal,
        handleFilter: handleShowGateManagementFilterModal
    }
];
