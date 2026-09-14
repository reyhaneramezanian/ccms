import { ItemTabs } from '@/components/tabs/types.tabs';
import SecurityProfilePersonalInformation from './personalInformation';
import SecurityProfileTimeSheet from './timeSheet';
import SecurityProfileSetting from './setting';
import { ICustomPageTabsProps } from '@/components/admin/types.admin';

enum ESecurityProfileTabItemsId {
    personalInformation = 'personal-information',
    timeSheet = 'time-sheet',
    setting = 'setting'
}

export const SecurityProfileTabItems: ICustomPageTabsProps[] = [
    {
        id: ESecurityProfileTabItemsId.personalInformation,
        label: 'Personal information'
    },
    {
        id: ESecurityProfileTabItemsId.timeSheet,
        label: 'Time sheet'
    },
    {
        id: ESecurityProfileTabItemsId.setting,
        label: 'Setting'
    }
];

export const SecurityProfilePagesComponent = {
    [ESecurityProfileTabItemsId.personalInformation]: SecurityProfilePersonalInformation,
    [ESecurityProfileTabItemsId.timeSheet]: SecurityProfileTimeSheet,
    [ESecurityProfileTabItemsId.setting]: SecurityProfileSetting
};
