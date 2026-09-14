import {
    useAdminMaintenanceTypeGetQuery,
    useAdminPaymentManagementUpdateMutation,
    useAdminMaintenanceTypeUpdateMutation,
    useAdminUtilityRateGetQuery,
    usePayment_GetPaymentBillsQuery,
    usePayment_GetPaymentMiscellaneousMaintenancesQuery
} from './../../../graphql/generated';
import { Column } from '@/components/table/table_layout/types.table.layout';
import { useAdminPaymentManagementGetQuery } from 'src/graphql/generated';
import { ICustomPageTabsProps } from '../types.admin';
import paymentsTransformer from './payments/table.transformer';
import maintenanceTransformer from './maintenancepayment/table.transformer';

import maintenanceTypeTransformer from './maintenanceType/table.transformer';
import utilityRateTransformer from './utilityRate/table.transformer';
import handleUtilityRateEditModal from './utilityRate/editModal';
import handleShowMaintenanceTypeConfigurationDeleteModal from './maintenanceType/deleteModal';
import handleShowMaintenanceTypeEditModal from './maintenanceType/editModal';
import handleShowPaymentsConfigurationDeleteModal from './payments/deleteModal';
import handleShowPaymentsEditModal from './payments/editModal';
import handleShowPaymentsFilterModal from './payments/filterModal';
import handleShowMaintenanceFilterModal from './maintenancepayment/filterModal';
import Space from 'src/components/shared/share/spacetiny';

export enum EPaymentManagementTabsKey {
    UtilityPayment = 'UtilityPayment',
    MaintenancePayment = 'MaintenancePayment',
    MaintenanceType = 'MaintenanceType',
    UtilityRate = 'UtilityRate'
}

const Utility_MANAGEMENT: Column[] = [
    //   { id: 'Check', checkbox: true },
    {
        id: 'from',
        label: 'From',
        Component: Space,
        sort: true,
        sortkey: 'flat.floor.block.complex.name'
    },
    { id: 'assignedOnText', label: 'Assigned on', sort: true, sortkey: 'createdDate' },
    { id: 'dueDateText', label: 'Due date', sort: true, sortkey: 'dueDate' },
    { id: 'receivedOnText', label: 'Received on', sort: true, sortkey: 'receivedOn' },
    { id: 'utilityType', label: 'Utility', sort: true, sortkey: 'utilityType' },
    { id: 'consumed', label: 'Consumed', sort: true, sortkey: 'consumed' },
    { id: 'amountText', label: 'Amount(INR)', sort: true, sortkey: 'amount' },

    { id: 'status', label: 'Status', status: true }
    //   { id: 'More', label: 'More', actions: true }
];

const Maintenance_MANAGEMENT: Column[] = [
    { id: 'Check', checkbox: true },
    {
        id: 'from',
        label: 'From',
        Component: Space,
        sort: true,
        sortkey: 'flat.floor.block.complex.name'
    },
    { id: 'assignedOnText', label: 'Assigned on', sort: true, sortkey: 'createdDate' },
    { id: 'dueDateText', label: 'Due date', sort: true, sortkey: 'dueDate' },
    { id: 'receivedOnText', label: 'Received on', sort: true, sortkey: 'receivedOn' },
    {
        id: 'maintenanceTypeName',
        label: 'Maintenance',
        sort: true,
        sortkey: 'maintenanceType.name',
        Component: Space
    },

    { id: 'amountText', label: 'Amount(INR)', sort: true, sortkey: 'amount' },
    { id: 'status', label: 'Status', status: true },
    { id: 'More', label: 'More', actions: true }
];
const MAINTENANCE_TYPE: Column[] = [
    { id: 'Check', checkbox: true },
    { id: 'name', label: 'Maintenance type', sort: true, sortkey: 'name' },
    { id: 'activeStatus', label: 'Active/Inactivate', active: true },
    { id: 'More', label: 'More', actions: true }
];

const UTILITY_RATE: Column[] = [
    { id: 'utilityType', label: 'Utility type' },
    { id: 'rateText', label: 'Rate(INR)' },
    { id: 'More', label: 'More', actions: true }
];

const Utility_MANAGEMENT_blockmanager: Column[] = [
    {
        id: 'from',
        label: 'From',
        Component: Space,
        sort: true,
        sortkey: 'flat.floor.block.complex.name'
    },
    { id: 'assignedOnText', label: 'Assigned on', sort: true, sortkey: 'createdDate' },
    { id: 'dueDateText', label: 'Due date', sort: true, sortkey: 'dueDate' },
    { id: 'receivedOnText', label: 'Received on', sort: true, sortkey: 'receivedOn' },
    { id: 'utilityType', label: 'Utility', sort: true, sortkey: 'utilityType' },
    { id: 'consumed', label: 'Consumed', sort: true, sortkey: 'consumed' },
    { id: 'amountText', label: 'Amount(INR)', sort: true, sortkey: 'amount' },

    { id: 'status', label: 'Status', status: true }
];

const Maintenance_MANAGEMENT_blockmanager: Column[] = [
    {
        id: 'from',
        label: 'From',
        Component: Space,
        sort: true,
        sortkey: 'flat.floor.block.complex.name'
    },
    { id: 'assignedOnText', label: 'Assigned on', sort: true, sortkey: 'createdDate' },
    { id: 'dueDateText', label: 'Due date', sort: true, sortkey: 'dueDate' },
    { id: 'receivedOnText', label: 'Received on', sort: true, sortkey: 'receivedOn' },
    {
        id: 'maintenanceTypeName',
        label: 'Maintenance',
        sort: true,
        sortkey: 'maintenanceType.name',
        Component: Space
    },
    { id: 'amountText', label: 'Amount(INR)', sort: true, sortkey: 'amount' },
    { id: 'status', label: 'Status', status: true }
];
const MAINTENANCE_TYPE_blockmanager: Column[] = [
    { id: 'name', label: 'Maintenance type', sort: true, sortkey: 'name' },
    { id: 'activeStatus', label: 'Active/Inactivate', active: true }
];

const UTILITY_RATE_blockmanager: Column[] = [
    { id: 'utilityType', label: 'Utility type' },
    { id: 'rateText', label: 'Rate(INR)' }
];

export const DEPARTMENT_CONFIGURATION_TABS_ITEMS: ICustomPageTabsProps[] = [
    {
        label: 'Utility payment',
        id: EPaymentManagementTabsKey.UtilityPayment,
        column: Utility_MANAGEMENT,
        column2: Utility_MANAGEMENT_blockmanager,
        notShowAddButton: true,
        useQuery: usePayment_GetPaymentBillsQuery,
        useUpdateMutation: useAdminPaymentManagementUpdateMutation,
        queryKey: 'payment_getPaymentBills',
        Transformer: paymentsTransformer,
        searchData: [
            {
                type: 'eq',
                key: 'amount',
                empty: true,
                valueType: 'number'
            },
            {
                type: 'contains',
                key: 'flat.name',
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
                key: 'flat.floor.block.name',
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
                type: 'eq',
                key: 'flatId',
                empty: true,
                valueType: 'number',
                defaultValueKey: 'flatId'
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
                key: 'flat.floor.blockId',
                empty: true,
                valueType: 'number',
                defaultValueKey: 'blockId'
            },
            {
                type: 'eq',
                key: 'flat.floor.block.complexId',
                empty: true,
                valueType: 'number',
                defaultValueKey: 'complexId'
            },

            /* {
                type: 'eq',
                key: 'utilityTypeId',
                empty: true,
                valueType: 'number',
                defaultValueKey: 'utilityTypeId'
            }, {
                type: 'eq',
                key: 'utilityType',
                empty: true,
                valueType: 'string',
                defaultValueKey: 'utilityType'
            },
            {
                type: 'eq',
                key: 'maintenanceTypeId',
                empty: true,
                valueType: 'number',
                defaultValueKey: 'maintenanceTypeId'
            },
            {
                type: 'eq',
                key: 'utilityTypeId',
                empty: true,
                valueType: 'number',
                defaultValueKey: 'utilityTypeId'
            },*/
            {
                type: 'gte',
                key: 'createdDate',
                empty: true,
                valueType: 'string',
                defaultValueKey: 'createdDate'
            },
            {
                type: 'lte',
                key: 'dueDate',
                empty: true,
                valueType: 'string',
                defaultValueKey: 'dueDate'
            },
            {
                type: 'eq',
                key: 'paymentStatus',
                empty: true,
                valueType: 'string',
                defaultValueKey: 'paymentStatus'
            }
        ],
        handleFilter: handleShowPaymentsFilterModal
    },
    {
        label: 'Maintenance payment',
        id: EPaymentManagementTabsKey.MaintenancePayment,
        column: Maintenance_MANAGEMENT,
        column2: Maintenance_MANAGEMENT_blockmanager,
        handleEdit: handleShowPaymentsEditModal,
        handleDelete: handleShowPaymentsConfigurationDeleteModal,
        handleAdd: handleShowPaymentsEditModal,
        addButtonTitle: 'Assign new charges',
        useQuery: usePayment_GetPaymentMiscellaneousMaintenancesQuery,
        useUpdateMutation: useAdminPaymentManagementUpdateMutation,
        queryKey: 'payment_getPaymentMiscellaneousMaintenances',
        Transformer: maintenanceTransformer,
        searchData: [
            {
                type: 'eq',
                key: 'amount',
                empty: true,
                valueType: 'number'
            },
            {
                type: 'contains',
                key: 'flat.name',
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
                key: 'flat.floor.block.name',
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
                type: 'eq',
                key: 'flatId',
                empty: true,
                valueType: 'number',
                defaultValueKey: 'flatId'
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
                key: 'flat.floor.blockId',
                empty: true,
                valueType: 'number',
                defaultValueKey: 'blockId'
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
                key: 'maintenanceTypeId',
                empty: true,
                valueType: 'number',
                defaultValueKey: 'maintenanceTypeId'
            },
            /*  {
                type: 'eq',
                key: 'utilityType',
                empty: true,
                valueType: 'string',
                defaultValueKey: 'utilityType'
            },
           
            {
                type: 'eq',
                key: 'utilityTypeId',
                empty: true,
                valueType: 'number',
                defaultValueKey: 'utilityTypeId'
            },*/
            {
                type: 'gte',
                key: 'createdDate',
                empty: true,
                valueType: 'string',
                defaultValueKey: 'createdDate'
            },
            {
                type: 'lte',
                key: 'dueDate',
                empty: true,
                valueType: 'string',
                defaultValueKey: 'dueDate'
            },
            {
                type: 'eq',
                key: 'paymentStatus',
                empty: true,
                valueType: 'string',
                defaultValueKey: 'paymentStatus'
            }
        ],
        handleFilter: handleShowMaintenanceFilterModal
    },
    {
        label: 'Maintenance type',
        id: EPaymentManagementTabsKey.MaintenanceType,
        column: MAINTENANCE_TYPE,
        column2: MAINTENANCE_TYPE_blockmanager,
        handleEdit: handleShowMaintenanceTypeEditModal,
        handleDelete: handleShowMaintenanceTypeConfigurationDeleteModal,
        handleAdd: handleShowMaintenanceTypeEditModal,
        addButtonTitle: 'Add maintenance type',
        useQuery: useAdminMaintenanceTypeGetQuery,
        useUpdateMutation: useAdminMaintenanceTypeUpdateMutation,
        queryKey: 'maintenanceType_getMaintenanceTypes',
        Transformer: maintenanceTypeTransformer
    },
    {
        label: 'Utility rate',
        id: EPaymentManagementTabsKey.UtilityRate,
        column: UTILITY_RATE,
        column2: UTILITY_RATE_blockmanager,
        handleEdit: handleUtilityRateEditModal,
        notShowAddButton: true,
        useQuery: useAdminUtilityRateGetQuery,
        queryKey: 'utilityRate_getUtilityRates',
        Transformer: utilityRateTransformer,
        searchData: [
            {
                key: 'rate',
                type: 'eq',
                valueType: 'number',
                empty: true
            }
        ]
    }
];
