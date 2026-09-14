import { TableLayoutProps } from 'src/components/table/table_layout/types.table.layout';
import { ITabsProps } from './../tabs/types.tabs';
import { Column, RowTable } from '../table/table_layout/types.table.layout';

export interface ITablePageProps {
    title: string;
    isShowAddButton?: boolean;
    isShowExcelButton?: boolean;
    addButtonText?: string;
    excelButtonText?: string;
    isShowSearch?: boolean;
    isShowFilter?: boolean;
    isfilteractive?: boolean;
    onChangeSearchValue?: (value: string) => void;
    onChangeFilterValue?: () => void;
    tableColumn: Column[];
    tableRow: RowTable[];
    onClickAddButton?: () => void;
    onClickExcelButton?: () => void;
    tabs?: {
        tabs: ITabsProps['tabs'];
        activeTab: ITabsProps['activeTab'];
        onTabChange: ITabsProps['onTabChange'];
    };
    setRow?: (setState: (prevState: RowTable[]) => RowTable[]) => void;
    onEditItem?: TableLayoutProps['onEditItem'];
    onApproveItem?: TableLayoutProps['onApproveItem'];
    onRejectItem?: TableLayoutProps['onRejectItem'];
    onDeleteItem?: TableLayoutProps['onDeleteItem'];
    onConvertToservice?: TableLayoutProps['onConvertToservice'];
    onSeeProfile?: TableLayoutProps['onSeeProfile'];
    onUserproperty?: TableLayoutProps['onUserproperty'];
    onSetasblock?: TableLayoutProps['onSetasblock'];
    onSetasexpire?: TableLayoutProps['onSetasexpire'];
    onAccept?: TableLayoutProps['onAccept'];
    onReject?: TableLayoutProps['onReject'];
    isLoading?: boolean;
    take?: number;
    approveActionLoading?: boolean;
    totalCount: number;
    activePage: number;
    onPageChange: (activePage: number) => void;
    handleDelete?(rows: RowTable[]): void;
    onChangeActive?: TableLayoutProps['onChangeActive'];
    onChangeCheckedItem?: TableLayoutProps['onChangeCheckedItem'];
    onChangeCheckedItems?: TableLayoutProps['onChangeCheckedItems'];
}
