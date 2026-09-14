import { ICustomPageTabsProps } from '@/components/admin/types.admin';
import handleShowAlertSystemAddModal from '@/components/alertSystem/addModal';
import { ALERTS_SYSTEM_TAB_ITEM } from '@/components/alertSystem/data';

export const SECURITY_ALERTS_SYSTEM_TABS_ITEMS: ICustomPageTabsProps[] = [
    {
        label: 'Security alert',
        addButtonTitle: 'Add alert',
        handleAdd: handleShowAlertSystemAddModal,
        ...ALERTS_SYSTEM_TAB_ITEM
    }
];
