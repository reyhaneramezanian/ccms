import themeObj from '@/provider/theme/themeObject';
import { useMediaQuery } from '@material-ui/core';

export function useIsDesktop() {
    const isDesktop = useMediaQuery(themeObj.breakpoints.up.sm);
    const isMdDesktop = useMediaQuery(themeObj.breakpoints.up.md);

    return {
        isDesktop,
        isMdDesktop
    };
}
