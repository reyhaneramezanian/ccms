import PersonalInformation from './Personal/editModal';
import Contact from './Contact/editModal';
import Career from './Career/editModal';
import Timesheet from './timeSheet';
import Setting from './Setting/editModal';
import { ICustomPageTabsProps } from '@/components/admin/types.admin';

export enum EresidentTabsKey {
    Personal = 'Personal information',
    Contact = 'Contact information',
    Career = 'Career information',
    Setting = 'Setting',
    Timesheet = 'time-sheet'
}
export const tabs = [
    { label: 'Personal information', id: 'Personal' },
    { label: 'Contact information', id: 'Contact' },
    { label: 'Career information', id: 'Career' },
    { label: 'Time sheet', id: 'Timeshite' },
    { label: 'Setting', id: 'Setting' }
];
export const StaffProfileTabItems: ICustomPageTabsProps[] = [
    {
        id: EresidentTabsKey.Personal,
        label: 'Personal information'
    },
    {
        id: EresidentTabsKey.Contact,
        label: 'Contact information'
    },
    {
        id: EresidentTabsKey.Career,
        label: 'Career information'
    },
    {
        id: EresidentTabsKey.Timesheet,
        label: 'Time sheet'
    },
    {
        id: EresidentTabsKey.Setting,
        label: 'Setting'
    }
];

export const StaffProfilePagesComponent = {
    [EresidentTabsKey.Personal]: PersonalInformation,
    [EresidentTabsKey.Contact]: Contact,
    [EresidentTabsKey.Career]: Career,
    [EresidentTabsKey.Timesheet]: Timesheet,
    [EresidentTabsKey.Setting]: Setting
};
