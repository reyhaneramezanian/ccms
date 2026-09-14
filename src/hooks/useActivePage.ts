import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const useActivePage = (): [
    activePage: number,
    setActivePage: (newPage: number, isPush?: boolean) => void
] => {
    const router = useRouter();
    const [activePage, setActivePage] = useState<number>();

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const page = searchParams.get('page');

        if (typeof page !== 'string' || isNaN(+page)) {
            setActivePage(1);
            return;
        }

        setActivePage(+page);
    }, []);

    useEffect(() => {
        if (typeof router.query.page === 'undefined') return;

        setActivePage(+router.query.page);
    }, [router.query.page]);

    const handleChangeActivePage = (newPage: number) => {
        router.push({
            pathname: router.pathname,
            query: { ...router.query, page: newPage }
        });
    };

    return [activePage, handleChangeActivePage];
};

export default useActivePage;
