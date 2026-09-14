import { Column } from '@/components/table/table_layout/types.table.layout';
import { ICustomPageTabsProps } from '@/components/admin/types.admin';
import {
    useResidentMyRequestsGetQuery,
    useRequest_GetMyRequestsQuery
} from 'src/graphql/generated';
import servicesTransformer from './service/table.transformer';
import historyTransformer from './history/table.transformer';
import approveTransformer from './Approval/table.transformer';
import handleShowResidentMyServiceDeleteModal from './service/deleteModal';
import storageKeys from 'src/data/storageKeys';
import * as Yup from 'yup';
import snackbarMessages from 'src/data/snackbarMessages';
import handleShowResidentMyServiceEditModal from './service/editModal';
import handleShowResidentMyServiceAddModal from './service/addModal';
import Historyview from './history/viewModal';
import Utils from '@/utils/utils';

export enum EServicesTabsKey {
    Service = 'Service request',
    History = 'History',
    Approval = 'Service approval'
}

const SERVICE_COLUMN: Column[] = [
    { id: 'Check', checkbox: true },
    {
        id: 'departmentName',
        label: 'Department',
        sort: true,
        sortkey: 'serviceType.department.name'
    },
    {
        id: 'serviceName',
        label: 'Service',
        sort: true,
        sortkey: 'serviceType.name'
    },
    {
        id: 'date',
        label: 'Date',
        sort: true,
        sortkey: 'startDate'
    },
    {
        id: 'time',
        label: 'Time'
    },
    {
        id: 'status',
        label: 'Status',
        status: true
    },
    { id: 'More', label: 'More', actions: true }
];

const History: Column[] = [
    {
        id: 'departmentName',
        label: 'Department'
    },
    {
        id: 'name',
        label: 'Name'
    },
    {
        id: 'serviceName',
        label: 'Service'
    },
    {
        id: 'date',
        label: 'Date'
    },
    {
        id: 'time',
        label: 'Time'
    },

    { id: 'More', label: 'More', actions: true }
];

const Approval: Column[] = [
    {
        id: 'departmentName',
        label: 'Department'
    },
    {
        id: 'serviceName',
        label: 'Service'
    },
    {
        id: 'name',
        label: 'Name'
    },

    {
        id: 'date',
        label: 'Date'
    },
    {
        id: 'time',
        label: 'Time'
    },
    {
        id: 'approveAction',
        label: 'Action',
        approveAction: true
    },
    { id: 'More', label: 'More', actions: true }
];
export const GATE_MANAGEMENT_TABS_ITEMS: ICustomPageTabsProps[] = [
    {
        label: 'Service request',
        id: EServicesTabsKey.Service,
        column: SERVICE_COLUMN,
        useQuery: useRequest_GetMyRequestsQuery,
        queryKey: 'request_getMyRequests',
        addButtonTitle: 'Request new service',
        Transformer: servicesTransformer,
        handleDelete: handleShowResidentMyServiceDeleteModal,
        handleEdit: handleShowResidentMyServiceEditModal,
        handleAdd: handleShowResidentMyServiceAddModal,
        searchData: [
            {
                key: 'serviceType.name',
                type: 'contains',
                empty: true,
                valueType: 'string'
            },
            {
                key: 'serviceType.department.name',
                type: 'contains',
                empty: true,
                valueType: 'string'
            }
        ]
    },
    {
        label: 'Approved services',
        id: EServicesTabsKey.Approval,
        column: Approval,
        useQuery: useRequest_GetMyRequestsQuery,
        queryKey: 'request_getMyRequests',
        Transformer: approveTransformer,
        handleSee: Historyview,

        searchData: [
            {
                key: 'requestStatus',
                type: 'eq',
                empty: false,
                valueType: 'string',
                defaultValueKey: 'requestStatus'
            },
            {
                key: 'staff.lastName',
                type: 'contains',
                empty: true,
                valueType: 'string'
            },
            {
                key: 'staff.firstName',
                type: 'contains',
                empty: true,
                valueType: 'string'
            },
            {
                key: 'serviceType.name',
                type: 'contains',
                empty: true,
                valueType: 'string'
            },
            {
                key: 'serviceType.department.name',
                type: 'contains',
                empty: true,
                valueType: 'string'
            }
        ]
    },
    {
        label: 'History',
        id: EServicesTabsKey.History,
        column: History,
        useQuery: useRequest_GetMyRequestsQuery,
        queryKey: 'request_getMyRequests',
        Transformer: historyTransformer,
        handleSee: Historyview,

        searchData: [
            {
                key: 'requestStatus',
                type: 'eq',
                empty: false,
                valueType: 'string',
                defaultValueKey: 'requestStatus'
            },
            {
                key: 'staff.lastName',
                type: 'contains',
                empty: true,
                valueType: 'string'
            },
            {
                key: 'staff.firstName',
                type: 'contains',
                empty: true,
                valueType: 'string'
            },
            {
                key: 'serviceType.name',
                type: 'contains',
                empty: true,
                valueType: 'string'
            },
            {
                key: 'serviceType.department.name',
                type: 'contains',
                empty: true,
                valueType: 'string'
            }
        ]
    }
];

export const residentMyServiceInitialForm = (row) => {
    return {
        startDate: row?.startDate || Utils.convertDateTimeToInputDateValue(),
        endDate: row?.endDate || Utils.convertDateTimeToInputDateValue(),
        startTime: row?.startTime ? Utils.convertTimeSpanToTime(row?.startTime) : undefined,
        endTime: row?.endTime ? Utils.convertTimeSpanToTime(row?.endTime) : undefined,
        emergency: row?.emergency || false,
        residentFlatId: +localStorage.getItem(storageKeys.activeResidentFlatId)
    };
};

export const residentMyServiceValidationForm = () => {
    const obj = {
        startDate: Yup.string().required(snackbarMessages.requiredField),
        endDate: Yup.string().required(snackbarMessages.requiredField),
        startTime: Yup.string().required(snackbarMessages.requiredField),
        endTime: Yup.string().required(snackbarMessages.requiredField),
        emergency: Yup.boolean().required(snackbarMessages.requiredField),
        residentFlatId: Yup.number().required()
    };

    return Yup.object(obj);
};
