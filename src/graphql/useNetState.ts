import { useCallback, useRef, useState } from 'react';

export function useNetState() {
    const [mutateState, setMutateState] = useState<
        Record<
            string,
            {
                loading: boolean;
                error: string;
            }
        >
    >({});
    const isLoading = (key: string) => {
        return mutateState[key]?.loading || false;
    };

    const setLoading = useCallback((key) => {
        setMutateState((p) => ({ ...p, [key]: { loading: true, error: '' } }));
    }, []);

    const finishLoading = useCallback((key, error = '') => {
        setMutateState((p) => ({ ...p, [key]: { loading: false, error } }));
    }, []);

    return {
        isLoading,
        mutateState,
        setLoading,
        finishLoading
    };
}

export function setCommonSWRLoading(data: any, error: any, isLoading: boolean) {
    return !data && !error && isLoading;
}
