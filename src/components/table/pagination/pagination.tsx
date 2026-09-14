import RightArrowIcon from 'src/assets/common/RightArrowIcon';
import Arrownextone from 'src/assets/icons/arrownextone';
import Arrowpreviulast from 'src/assets/icons/arrowpreviulast';
import { LeftArrowIcon } from 'src/assets/common/LeftArrowIcon';
import {
    PaginationContainer,
    PaginationPageItem,
    PaginationArrowContainer,
    PaginationDotsContainer
} from './styled.pagination';
import { PageProps, PaginationProps } from './types.pagination';

function Page({ number, active, onClick }: PageProps) {
    return (
        <PaginationPageItem active={active} onClick={() => onClick?.(number)}>
            {number}
        </PaginationPageItem>
    );
}

function Dots() {
    return <PaginationDotsContainer>...</PaginationDotsContainer>;
}

export default function Pagination({ totalPages, activePage, onPageChange }: PaginationProps) {
    let first = [1],
        middle = [],
        last = [totalPages];

    if (activePage < 4 || totalPages <= 5) {
        first = [1, 2, 3, 4].filter((number) => number <= totalPages);
    }

    if (activePage > 3 && activePage < totalPages - 2) {
        middle = [activePage - 1, activePage, activePage + 1];
    }

    if (activePage > totalPages - 3 && totalPages > 5) {
        last = [totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }

    if (totalPages < 5) last = [];
    if (totalPages <= 1) first = [];

    return (
        <PaginationContainer>
            {totalPages > 1 && (
                <>
                    <PaginationArrowContainer onClick={handlepageone}>
                        <Arrownextone />
                    </PaginationArrowContainer>
                    <PaginationArrowContainer onClick={handlePreviousPage}>
                        <LeftArrowIcon />
                    </PaginationArrowContainer>
                </>
            )}
            {first.map(insertPage)}
            {middle.length > 0 && <Dots />}
            {middle.map(insertPage)}
            {totalPages > 5 && <Dots />}
            {last.map(insertPage)}
            {totalPages > 1 && (
                <>
                    <PaginationArrowContainer onClick={handleNextPage}>
                        <RightArrowIcon />
                    </PaginationArrowContainer>
                    <PaginationArrowContainer onClick={handlePagelast}>
                        <Arrowpreviulast />
                    </PaginationArrowContainer>
                </>
            )}
        </PaginationContainer>
    );
    function handlepageone() {
        onPageChange?.(1);
    }

    function handlePreviousPage() {
        if (activePage < 2) return;

        onPageChange?.(activePage - 1);
    }

    function handleNextPage() {
        if (activePage >= totalPages) return;

        onPageChange?.(activePage + 1);
    }
    function handlePagelast() {
        onPageChange?.(totalPages);
    }
    function insertPage(number: number, index: number) {
        return (
            <Page
                key={index}
                number={number}
                active={activePage === number}
                onClick={onPageChange}
            />
        );
    }
}
