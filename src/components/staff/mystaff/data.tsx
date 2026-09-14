import { Column } from '@/components/table/table_layout/types.table.layout';
import { useUser_GetMyStaffsQuery } from 'src/graphql/generated';
import { ICustomPageTabsProps } from '../../admin/types.admin';
import staffTransformer from './table.transformer';
import Seeicon from 'src/assets/icons/seeprofile';
import { useRouter } from 'next/router';
import Image from 'src/components/shared/share/Image';
import Seeprofile from 'src/components/shared/share/see-profile';

export const ColumnStaff: Column[] = [
    { id: 'image', label: '', Component: Image },
    { id: 'Name', label: 'Name', sort: true, sortkey: 'firstName' },
    { id: 'Employeetype', label: 'Employee type', sort: true, sortkey: 'employmentType.name' },
    { id: 'Phonenumber', label: 'Phone number', sort: true, sortkey: 'phoneNumber' },
    { id: 'Email', label: 'Email', sort: true, sortkey: 'email' },
    { id: 'Seeprofile', label: 'See profile', Component: Seeprofile }
];

export enum EstaffTabsKey {
    Staff = 'My staff'
}

export const Staff_SYSTEM_TABS_ITEMS: ICustomPageTabsProps[] = [
    {
        label: 'Staff',
        id: EstaffTabsKey.Staff,
        column: ColumnStaff,
        queryKey: 'user_getMyStaffs',
        useQuery: useUser_GetMyStaffsQuery,
        Transformer: staffTransformer,
        searchData: [
            {
                type: 'contains',
                key: 'firstName',
                empty: true,
                valueType: 'string'
            },
            {
                type: 'contains',
                key: 'employmentType.name',
                empty: true,
                valueType: 'string'
            },
            {
                type: 'contains',
                key: 'lastName',
                empty: true,
                valueType: 'string'
            },
            {
                type: 'contains',
                key: 'email',
                empty: true,
                valueType: 'string'
            },
            {
                type: 'contains',
                key: 'phoneNumber',
                empty: true,
                valueType: 'string'
            }
        ]
    }
];
