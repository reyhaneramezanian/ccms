export type PaginationProps = {
    totalPages?: number;
    activePage?: number;
    onPageChange?: (pageNumber: number) => void;
    disbalePaginate?:boolean
};

export type PageProps = {
    number: number;
    active?: boolean;
    onClick?: (page: number) => void;
};
