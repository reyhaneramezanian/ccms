import { useTheme } from '@emotion/react';
import { CircularProgress } from '@mui/material';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, newModal, setPageData } from 'src/redux/actions/actions';

const LoadLogin = () => {
    const theme = useTheme();
    return <CircularProgress sx={{ color: theme.palette.main }} />;
};

const LoginIdModal = 'LoadLogin';

export function useModalState() {
    const dispatch = useDispatch();
    const pageData = useSelector(({ pageData }: any) => pageData);

    const showLoading = useCallback(() => {
        dispatch(setPageData({ ...pageData, loading: true }));
    }, []);

    const open = useCallback(() => {
        dispatch(
            newModal({
                closeButton: false,
                Body: LoadLogin,
                id: LoginIdModal
            })
        );
    }, []);

    const close = useCallback(() => {
        dispatch(closeModal(LoginIdModal));
        dispatch(setPageData({ ...pageData, loading: false }));
    }, []);

    return {
        open,
        close,
        showLoading
    };
}
