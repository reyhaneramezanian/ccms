import {
    useGateManagementFrequentVisitorGetQuery,
    useGateManagementOneTimeVisitorGetQuery
} from './../../../graphql/generated';
import { Column } from '@/components/table/table_layout/types.table.layout';
import { ICustomPageTabsProps } from '@/components/admin/types.admin';
import gateManagementFrequentVisitorTransfer from './frequentVisitor/table.transformer';
import gateManagementOneTimeVisitorTransfer from './oneTimeVisitor/table.transformer';
import handleShowGateManagementDeleteModal from '@/components/gateManagement/deleteModal';
import handleShowGateManagementFilterModal from '@/components/gateManagement/filterModalresidentvisitor';
import handleShowGateManagementExpireModal from '@/components/gateManagement/expireModal';
import Space from 'src/components/shared/share/space';

export enum EGateManagementVisitorTabsKey {
    FrequentVisitor = 'frequent-visitor',
    OneTimeVisitor = 'ONE_TIME_VISITOR'
}

const GATE_MANAGEMENT_FREQUENT_VISITOR: Column[] = [
    { id: 'Check', checkbox: true },
    {
        id: 'visitorName',
        label: 'Visitor name',
        sort: true,
        sortkey: 'visitorFirstName',
        Component: Space
    },
    {
        id: 'phoneNumber',
        label: 'Phone number',
        sort: true,
        sortkey: 'visitorPhoneNumber'
    },
    {
        id: 'licensePlate',
        label: 'License plate'
    },
    {
        id: 'startDate',
        label: 'Date of delivery',
        sort: true,
        sortkey: 'start'
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

const GATE_MANAGEMENT_ONE_TIME_VISITOR: Column[] = [
    { id: 'Check', checkbox: true },
    {
        id: 'visitorName',
        label: 'Visitor name',
        sort: true,
        sortkey: 'visitorFirstName',
        Component: Space
    },
    {
        id: 'phoneNumber',
        label: 'Phone number',
        sort: true,
        sortkey: 'visitorPhoneNumber'
    },
    {
        id: 'licensePlate',
        label: 'License plate'
    },
    {
        id: 'date',
        label: 'Date',
        sort: true,
        sortkey: 'start'
    },
    {
        id: 'time',
        label: 'Time'
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
        label: 'Frequent visitor',
        id: EGateManagementVisitorTabsKey.FrequentVisitor,
        column: GATE_MANAGEMENT_FREQUENT_VISITOR,
        // handleAdd: handleShowAddModalvisitor,
        useQuery: useGateManagementFrequentVisitorGetQuery,
        queryKey: 'gateApproval_getFrequentVisitors',
        Transformer: gateManagementFrequentVisitorTransfer,
        addButtonTitle: 'Add frequent visitor',
        searchData: [
            {
                key: 'visitorPhoneNumber',
                type: 'eq',
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
                key: 'visitorFirstName',
                type: 'contains',
                empty: true,
                valueType: 'string'
            },
            {
                key: 'visitorLastName',
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
                key: 'visitorFirstName',
                type: 'contains',
                empty: true,
                valueType: 'string',
                defaultValueKey: 'visitorFirstName'
            },
            {
                key: 'visitorLastName',
                type: 'contains',
                empty: true,
                valueType: 'string',
                defaultValueKey: 'visitorLastName'
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
        handleexpire: handleShowGateManagementExpireModal,
        // handleEdit: handleShowAddModalvisitor
        handleFilter: handleShowGateManagementFilterModal
    },
    {
        label: 'One time visitor',
        id: EGateManagementVisitorTabsKey.OneTimeVisitor,
        column: GATE_MANAGEMENT_ONE_TIME_VISITOR,
        // handleAdd: handleShowAddModalvisitor,
        useQuery: useGateManagementOneTimeVisitorGetQuery,
        queryKey: 'gateApproval_getOneTimeVisitors',
        Transformer: gateManagementOneTimeVisitorTransfer,
        addButtonTitle: 'Add one time visitor',
        searchData: [
            {
                key: 'visitorPhoneNumber',
                type: 'eq',
                empty: true,
                valueType: 'string'
            },
            {
                key: 'visitorFirstName',
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
                key: 'visitorLastName',
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
                key: 'visitorFirstName',
                type: 'contains',
                empty: true,
                valueType: 'string',
                defaultValueKey: 'visitorFirstName'
            },
            {
                key: 'visitorLastName',
                type: 'contains',
                empty: true,
                valueType: 'string',
                defaultValueKey: 'visitorLastName'
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
        handleexpire: handleShowGateManagementExpireModal,
        handleFilter: handleShowGateManagementFilterModal
        // handleEdit: handleShowAddModalvisitor
    }
];
