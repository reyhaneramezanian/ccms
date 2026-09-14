import { Column, RowTable } from '@/components/table/table_layout/types.table.layout';
import { ItemTabs } from '@/components/tabs/types.tabs';
import { ICustomPageTabsProps } from '../../admin/types.admin';
import Image from 'src/components/shared/share/Image';
import Switcher from '@/components/shared/share/swicher';
import Space from 'src/components/shared/share/space';

export enum EresidentTabsKey {
    Personal = 'Personal information',
    Property = 'Property information',
    Setting = 'Setting'
}
export const tabs = [
    { label: 'Personal information', id: 'Personal' },
    { label: 'Property information', id: 'Property' },
    { label: 'Setting', id: 'Setting' }
];
