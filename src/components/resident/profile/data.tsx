import { Column, RowTable } from '@/components/table/table_layout/types.table.layout';
import { ItemTabs } from '@/components/tabs/types.tabs';
import { ICustomPageTabsProps } from '../../admin/types.admin';
import Image from 'src/components/shared/share/Image';
import Switcher from '@/components/shared/share/swicher';
import Space from 'src/components/shared/share/space';
import PersonalPage from './Personal/editModal';
import PeropertyPage from './Peroperty/editModal';
import AuthorizedPage from './Authorized';
import SettingPage from './Setting/editModal';

export enum EresidentTabsKey {
    Personal = 'Personal information',
    Property = 'Property information',
    Authorized = 'Authorized users',
    Setting = 'Setting'
}
export const tabs = [
    { label: 'Personal information', id: 'Personal' },
    { label: 'Property information', id: 'Property' },
    { label: 'Authorized users', id: 'Authorized' },
    { label: 'Setting', id: 'Setting' }
];
export const ColumnAuthorized: Column[] = [
    { id: 'Check', checkbox: true },
    { id: 'photoUrl', label: '', Component: Image },
    { id: 'name', label: 'Name' },
    { id: 'Relation', label: 'Relation' },
    { id: 'Phone', label: 'Phone number' },
    { id: 'email', label: 'Email', Component: Space },
    { id: 'activeStatus', label: 'Active/Inactivate', Component: Switcher },
    { id: 'Action', label: 'More', actions: true }
];
export const SecurityProfileTabItems: ICustomPageTabsProps[] = [
    {
        id: EresidentTabsKey.Personal,
        label: 'Personal information'
    },
    {
        id: EresidentTabsKey.Property,
        label: 'Property information'
    },
    {
        id: EresidentTabsKey.Authorized,
        label: 'Authorized users'
    },
    {
        id: EresidentTabsKey.Setting,
        label: 'Setting'
    }
];

export const SuperProfilePagesComponent = {
    [EresidentTabsKey.Personal]: PersonalPage,
    [EresidentTabsKey.Property]: PeropertyPage,
    [EresidentTabsKey.Authorized]: AuthorizedPage,
    [EresidentTabsKey.Setting]: SettingPage
};
