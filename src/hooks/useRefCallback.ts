import { useCallback, useEffect, useRef } from 'react';

export default function useHookWithRefCallback(
    setListeners: any,
    clearListeners: any,
    forwardedRef?: any
) {
    const ref = useRef(null);
    const setRef = useCallback(
        (node) => {
            if (node) {
                if (!ref.current) {
                    ref.current = node;
                    if (forwardedRef) forwardedRef.current = node;

                    setListeners && setListeners(node);
                }
            }
        },
        [setListeners]
    );

    useEffect(() => {
        return () => {
            ref.current && clearListeners(ref.current);
            console.log('cleaned');
        };
    }, [clearListeners]);

    return [setRef];
}
