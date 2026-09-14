import { useEffect, useRef } from 'react';
import { Portal } from 'react-overlays';

export const MenuPortalHOC = ({ children, id = 'portal' }) => {
    const ref = useRef<HTMLElement>();
    useEffect(() => {
        const i = setInterval(() => {
            const portal = document.getElementById(id);
            if (portal) {
                ref.current = portal;
                clearInterval(i);
            }
        }, 50);
    }, []);

    return <Portal container={ref}>{children}</Portal>;
};
