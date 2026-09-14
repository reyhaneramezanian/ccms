import { useCallback, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPageData } from 'src/redux/actions/actions';

export function useModalState() {
    const dispatch = useDispatch();

    const [show, setShow] = useState(false);
    
    const handleCloseModal = useCallback(() => setShow(false), []);
    const handleShowModal = useCallback(() => setShow(true), []);

    const pageData = useSelector(({ pageData }: any) => pageData);

    const showLoading = useCallback(() => {
        dispatch(setPageData({ ...pageData, loading: true }));
    }, []);

    return {
        show,
        handleCloseModal,
        handleShowModal,
        showLoading
    };
}

export function useModalStateWithData<T = any>() {
    const [show, setShow] = useState(false);
    const itemData = useRef<T | undefined>();
    const handleCloseModal = useCallback(() => {
        itemData.current = undefined;
        setShow(false);
    }, []);

    const handleShowModal = useCallback((data: T) => {
        itemData.current = data;
        setShow(true);
    }, []);

    return {
        show,
        handleCloseModal,
        handleShowModal,
        itemData
    };
}
export function useModalStateWithState() {
    const [state, setState] = useState<{ show: boolean; data: any }>({
        show: false,
        data: ''
    });

    const handleCloseModal = useCallback(() => {
        setState({ show: false, data: '' });
    }, []);

    const handleShowModal = useCallback(<T>(data: T) => {
        setState({ show: true, data });
    }, []);
    return {
        handleCloseModal,
        handleShowModal,
        state
    };
}

export function modalContextChecker(func: any) {
    if (!func || typeof func !== 'function') {
        throw new Error("handleShowModal not inside it's context");
    }
}

export interface CommonModalProps {
    handleCloseModal: () => void;
}
