import {
    useGateManagementCabGetQuery,
    useGateManagementDeliveryGetQuery
} from './../../../graphql/generated';
import { Column } from '@/components/table/table_layout/types.table.layout';
import { ICustomPageTabsProps } from '@/components/admin/types.admin';
import gateManagementCabTransfer from './table.transformer';
import handleShowGateManagementDeleteModal from '@/components/gateManagement/deleteModal';
import handleShowGateManagementCabModal from '../manage/addModal.cab';
import handleShowGateManagementExpireModal from '@/components/gateManagement/expireModal';
import handleShowGateManagementFilterModal from '@/components/gateManagement/filterModalresident';
export enum EGateManagementCabTabsKey {
    Cab = 'cab'
}

const GATE_MANAGEMENT_DELIVERY: Column[] = [
    { id: 'Check', checkbox: true },
    {
        id: 'companyName',
        label: 'Company',
        sort: true,
        sortkey: 'companyName'
    },
    {
        id: 'licensePlate',
        label: 'License plate'
    },
    {
        id: 'startDate',
        label: 'Start date',
        sort: true,
        sortkey: 'start'
    },
    {
        id: 'endDate',
        label: 'End date',
        sort: true,
        sortkey: 'end'
    },
    {
        id: 'startTimeText',
        label: 'Start time'
    },
    {
        id: 'endTimeText',
        label: 'End time'
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
        label: 'Gate management - cab',
        id: EGateManagementCabTabsKey.Cab,
        column: GATE_MANAGEMENT_DELIVERY,
        useQuery: useGateManagementCabGetQuery,
        queryKey: 'gateApproval_getCabs',
        Transformer: gateManagementCabTransfer,
        addButtonTitle: 'Add cab',
        searchData: [
            {
                key: 'companyName',
                type: 'contains',
                empty: true,
                valueType: 'string'
            },
            {
                key: 'licensePlate',
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
        handleEdit: handleShowGateManagementCabModal,
        handleAdd: handleShowGateManagementCabModal,
        handleexpire: handleShowGateManagementExpireModal,
        handleFilter: handleShowGateManagementFilterModal
    }
];
