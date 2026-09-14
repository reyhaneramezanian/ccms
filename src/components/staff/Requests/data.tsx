import { Column } from '@/components/table/table_layout/types.table.layout';
import { ICustomPageTabsProps } from '../../admin/types.admin';
import staffTransformer from './table.transformer';
import { useRouter } from 'next/router';
import Image from 'src/components/shared/share/Image';
import { useRequest_GetNotAssignedRequestsQuery } from 'src/graphql/generated';
import Acceptmodal from './acceptModal';
import Rejectmodal from './rejectModal';
import Assign from 'src/components/shared/share/Assign';
import { Checkbox } from '@mui/material';
import Filterrequest from './filterModal';
export const ColumnRequests: Column[] = [
    //{ id: 'Check', checkbox: true },
    {
        id: 'id',
        label: 'Id'
    },
    { id: 'Name', label: 'Name', sort: true, sortkey: 'residentFlat.resident.firstName' },
    {
        id: 'Complex',
        label: 'Complex',
        sort: true,
        sortkey: 'residentFlat.flat.floor.block.complex.name'
    },
    { id: 'Block', label: 'Block', sort: true, sortkey: 'residentFlat.flat.floor.block.name' },
    { id: 'Floor', label: 'Floor', sort: true, sortkey: 'residentFlat.flat.floor.name' },
    { id: 'Flat', label: 'Flat', sort: true, sortkey: 'residentFlat.flat.name' },
    { id: 'Service', label: 'Service', sort: true, sortkey: 'serviceType.name' },
    { id: 'Date', label: 'Date', sort: true, sortkey: 'startDate' },
    { id: 'Timeinterval', label: 'Time interval' },
    //{ id: 'Emergency', label: 'Emergency', Component: ComponentEmergency },
    { id: 'Action', label: 'More', actions: true }
];

export enum ERequestsTabsKey {
    Requests = 'Requests'
}

function ComponentEmergency(value) {
    return <Checkbox disabled checked={value} />;
}

export const Requests_TABS_ITEMS: ICustomPageTabsProps[] = [
    {
        label: 'Requests',
        id: ERequestsTabsKey.Requests,
        column: ColumnRequests,
        queryKey: 'request_getNotAssignedRequests',
        useQuery: useRequest_GetNotAssignedRequestsQuery,
        Transformer: staffTransformer,
        handleAccepts: Acceptmodal,
        handleReject: Rejectmodal,
        handleFilter: Filterrequest,
        searchData: [
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
                key: 'residentFlat.flat.floor.block.complex.name',
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
                key: 'residentFlat.flat.floor.name',
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
                key: 'residentFlat.serviceType.name',
                empty: true,
                valueType: 'string'
            },
            {
                type: 'gte',
                key: 'startDate',
                empty: true,
                valueType: 'string',
                defaultValueKey: 'Datefilter'
            },
            {
                type: 'lte',
                key: 'startDate',
                empty: true,
                valueType: 'string',
                defaultValueKey: 'Dateendfilter'
            }
        ]
    }
];
export const FilterInitialForm = (row?: any): any => {
    return {
        Datefilter: row?.Datefilter || undefined,
        Dateendfilter: row?.Dateendfilter || undefined
    };
};
