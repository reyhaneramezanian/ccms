import TableLayout from './table_layout/table.layout';
import Pagination from './pagination/pagination';
import { TableLayoutProps } from './table_layout/types.table.layout';
import { PaginationProps } from './pagination/types.pagination';

export interface TableProps extends TableLayoutProps, PaginationProps {}

export default function Table({
    totalPages = 0,
    activePage,
    onPageChange,
    disbalePaginate = false,
    ...props
}: TableProps) {
    return (
        <>
            <TableLayout {...props} />

            {!disbalePaginate && (
                <Pagination
                    totalPages={totalPages}
                    activePage={activePage}
                    onPageChange={onPageChange}
                />
            )}
        </>
    );
}
