import {
    UseMutationOptions,
    UseMutationResult,
    UseQueryOptions,
    UseQueryResult
} from 'react-query';
import Transformer from '@/utils/transformer';
import { RowTable } from '../table/table_layout/types.table.layout';
import { Column } from '../table/table_layout/types.table.layout';
import { ItemTabs } from '../tabs/types.tabs';
import { ISearchData } from 'src/hooks/useManageTabsQueries';

export interface IRequiredFieldUpdate {
    key: string;
    value: string;
}

export interface ICustomPageTabsProps extends ItemTabs {
    column?: Column[];
    column2?: Column[];
    handleAccepts?(refetch: any, rowIds: number[]): void;
    handleReject?(refetch: any, rowIds: number[]): void;
    handleEdit?(refetch: any, row: RowTable, ...other): void;
    handleDelete?(refetch: any, rowIds: number[], data?: any): void;
    handleAdd?(refetch: any, ...other): void;
    handleSee?(row: RowTable): void;
    handleexpire?(refetch: any, rowIds: number[], data?: any): void;
    handleUserproperty?(row: RowTable): void;
    handleService?(refetch: any, row: RowTable): void;
    handleFilter?(state: any, setState: any): void;
    notShowAddButton?: boolean;
    addButtonTitle?: string;
    queryKey?: string;
    useQuery?: (variables?: any, options?: UseQueryOptions) => UseQueryResult;
    useUpdateMutation?: (options?: any) => UseMutationResult;
    Transformer?: Transformer<any>;
    searchData?: ISearchData[];
    isNotSearch?: boolean;
    requiredFieldUpdate?: IRequiredFieldUpdate[] | string[];
}

export interface PeaplemanagementTabs extends ItemTabs {
    column: Column[];
    handleEdit(row: RowTable): void;
    handleDelete(row: RowTable): void;
    handleAdd(): void;
}
