import { HTMLAttributes } from 'react';
import { ActiveStatus } from 'src/graphql/generated';

interface Button extends HTMLAttributes<HTMLButtonElement> {
    label: string;
}

export type Column = {
    id: string;
    label?: string;
    search?: string;
    button?: Button;
    sort?: boolean;
    checkbox?: boolean;
    status?: boolean;
    active?: boolean;
    actions?: boolean;
    approveAction?: boolean;
    Component?: any;
    componentProps?: any;
    sortkey: string;
};

export type RowTable = {
    id: number;
    Check?: boolean;
    activeStatus?: ActiveStatus;
    [key: string]: any;
};

export type TableLayoutProps = {
    columns: Column[];
    rows: Array<RowTable>;
    onSearch?: (data: { column: Column; value: string }) => void;
    searchData?: any;
    isError?: boolean;
    onSort?: (data: { column: Column; direction: 'ASC' | 'DESC' }) => void;
    onChange?: (rows: Array<RowTable>) => void;
    onChangeCheckedItems?(columnId: string, isCheckedItems: boolean, rows: Array<RowTable>): void;
    onChangeCheckedItem?(columnId: string, isCheckedItem: boolean, row: RowTable): void;
    onChangeActive?(columnId: string, isActive: ActiveStatus, row: RowTable): void;
    onEditItem?(row: RowTable): void;
    onApproveItem?(row: RowTable): void;
    onRejectItem?(row: RowTable): void;
    approveActionLoading?: boolean;
    onDeleteItem?(row: RowTable): void;
    onConvertToservice?(row: RowTable): void;
    onSeeProfile?(row: RowTable): void;
    onUserproperty?(row: RowTable): void;
    onSetasblock?(row: RowTable): void;
    onSetasexpire?(row: RowTable): void;
    onAccept?(row: RowTable): void;
    onReject?(row: RowTable): void;
    TD?: any;
    TR?: any;
};
