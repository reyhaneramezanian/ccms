import { FormikProps } from 'formik';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useRef } from 'react';
import { useAppMainBodyRef } from 'src/hooks/useAppMainBodyRef';

export function useAlertIfFormError() {
    const ref = useAppMainBodyRef();
    const { enqueueSnackbar } = useSnackbar();
    const alterIfFormError = useCallback((errorObject) => {
        if (Object.keys(errorObject).length > 0) {
            ref?.current?.scrollTo({ top: 0, behavior: 'smooth' });
            enqueueSnackbar('Check your form inputs!', { variant: 'error' });
        }
    }, []);

    return { alterIfFormError };
}
export function useAlreadyExistError(error, key, message) {
    const { enqueueSnackbar } = useSnackbar();
    useEffect(() => {
        if (error?.[key]?.status === 'ALREADY_EXISTS') {
            enqueueSnackbar(message, { variant: 'error' });
        } else if (error?.[key]?.status === 'ADD_ENTITY_FAILED') {
            enqueueSnackbar('Unknown Error', { variant: 'error' });
        }
    }, [error, key, message]);

    return;
}
