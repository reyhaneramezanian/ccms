import { ICustomPageTabsProps } from '../types.admin';
import { ALERTS_SYSTEM_TAB_ITEM } from '@/components/alertSystem/data';

export const ALERTS_SYSTEM_TABS_ITEMS: ICustomPageTabsProps[] = [
    {
        label: 'Alert system',
        ...ALERTS_SYSTEM_TAB_ITEM
    }
];
