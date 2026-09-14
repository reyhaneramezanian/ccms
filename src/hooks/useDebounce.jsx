import { useState, useEffect } from 'react';
import { setPageData } from 'src/redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';

const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay);

        return () => clearTimeout(handler);
    }, [value]);

    return debouncedValue;
};

export default useDebounce;

export function useTableSearchDebounce(value = '') {
    const dispatch = useDispatch();
    const searchValue = useDebounce(value, 500);
    const pageData = useSelector((state) => state.pageData);

    useEffect(() => dispatch(setPageData({ ...pageData, activePage: 1 })), [searchValue]);

    return searchValue;
}
