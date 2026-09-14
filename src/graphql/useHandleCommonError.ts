import { useCallback } from 'react';
import useTranslation from '@/i18n/hooks/useTranslation';

export function useHandleServerError() {
    const { t } = useTranslation('common');
    const handleUnknowError = useCallback((err) => {
        if (err?.graphQLErrors && err?.graphQLErrors[0]?.message) {
            //   enqueueSnackbar(err.graphQLErrors[0].message, { variant: "error" });
        } else {
            //   enqueueSnackbar(t("error.serverError"), { variant: "error" });
        }
    }, []);
    return handleUnknowError;
}

export function onErrorMessage(err: any, key?: string) {
    if (typeof err === 'string') return err;
    return err?.message || (key && err[key]?.status) || 'ERROR OCCURRED';
}
