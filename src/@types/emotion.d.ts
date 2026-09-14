import themeObj from '@/provider/theme/themeObject';
import '@emotion/react';
import { Property } from 'csstype';

type ThemeObj = typeof themeObj;

declare module '@emotion/react' {
    export interface Theme extends ThemeObj {}
}

// You are also able to use a 3rd party theme this way:
import '@emotion/react';
import { LibTheme } from 'some-lib';

declare module '@emotion/react' {
    export interface Theme extends LibTheme {}
}
// @types/react/index.d.ts
declare module 'react' {
    interface Attributes {
        css?: Property;
    }
}
