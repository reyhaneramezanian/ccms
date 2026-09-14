import { Column } from '@/components/table/table_layout/types.table.layout';
import { ICustomPageTabsProps } from '../../admin/types.admin';
import staffTransformer from './table.transformer';
import { useRouter } from 'next/router';
import Image from 'src/components/shared/share/Image';
import { useRequest_GetAllRequestsQuery } from 'src/graphql/generated';
import Assign from 'src/components/shared/share/Assign';
import { Checkbox } from '@mui/material';
import Filterrequest from './filterModal';
import Space from 'src/components/shared/share/space';
import * as Yup from 'yup';

export const ColumnRequests: Column[] = [
    //{ id: 'Check', checkbox: true },
    {
        id: 'id',
        label: 'Id'
    },
    {
        id: 'Nameresident',
        label: 'Resident',
        sort: true,
        sortkey: 'residentFlat.resident.firstName'
    },

    {
        id: 'from',
        label: 'From',
        Component: Space,
        sort: true,
        sortkey: 'residentFlat.flat.floor.block.complex.name'
    },
    { id: 'Service', label: 'Service', Component: Space, sort: true, sortkey: 'serviceType.name' },
    { id: 'Namestaff', label: 'Staff', sort: true, sortkey: 'staff.firstName' },
    { id: 'Date', label: 'Date', sort: true, sortkey: 'startDate' },
    { id: 'Timeinterval', label: 'Time interval' },
    { id: 'requestStatus', label: 'Status', status: true }
    //   { id: 'Emergency', label: 'Emergency', Component: ComponentEmergency }
];

export enum ERequestsTabsKey {
    Requests = 'Requests'
}

function ComponentEmergency(value) {
    return <Checkbox disabled checked={value} />;
}

export const Requests_TABS_ITEMS: ICustomPageTabsProps[] = [
    {
        label: 'Services',
        id: ERequestsTabsKey.Requests,
        column: ColumnRequests,
        queryKey: 'request_getAllRequests',
        useQuery: useRequest_GetAllRequestsQuery,
        Transformer: staffTransformer,
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
export const ValidationForm = Yup.object({
    Dateendfilter: Yup.date()
        .when(
            'Datefilter',
            (Datefilter, Yup) =>
                Datefilter && Yup.min(Datefilter, 'To date cannot be before from date')
        )
        .when(
            'Datefilter',
            (Datefilter, Yup) => Datefilter && Yup.required('This field is required')
        )
});
