import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { LanguageContext } from '@/i18n/LanguageContext';

import { useContext } from 'react'


// Create rtl cache
const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [rtlPlugin],
});

interface Props extends AppLocalization {
    children: React.ReactNode;
}

function RTL(props) {
    return <CacheProvider value={cacheRtl}>{props.children}</CacheProvider>;
}



function DirectionProvider({ children, localization }: Props) {
    const { direction } = localization
    let rtl = false


    return (
        <>
            {
                direction == "rtl" ? (<div dir="rtl">
                    <RTL>
                        {children}
                    </RTL>
                </div>) : (<>{children}</>)
            }
        </>

    )
}

export default DirectionProvider
