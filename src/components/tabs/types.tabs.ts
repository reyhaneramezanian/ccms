import { AllHTMLAttributes } from 'react';

export type ItemTabs = { id: string; label: string };

export interface ITabsProps extends AllHTMLAttributes<HTMLDivElement> {
    navbarTab?: boolean;
    tabs: ItemTabs[];
    activeTab: ItemTabs;
    onTabChange(newItem: ItemTabs): void;
    overlay?: boolean;
}
