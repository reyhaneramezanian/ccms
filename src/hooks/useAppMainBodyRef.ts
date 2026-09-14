import { useEffect, useRef } from 'react';
import { APP_MAIN_BODY_ID } from 'src/constants/ids';

export function useAppMainBodyRef() {
    const bodyRef = useRef<HTMLElement>();

    useEffect(() => {
        const interval = setInterval(() => {
            bodyRef.current = document.getElementById(APP_MAIN_BODY_ID);
            if (bodyRef.current) {
                clearInterval(interval);
            }
        }, 50);
    }, []);

    return bodyRef;
}
