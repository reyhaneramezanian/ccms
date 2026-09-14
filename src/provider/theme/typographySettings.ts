export type Weights = 'bold' | 'semibold' | 'medium' | 'regular' | 'light';

export type Variants =
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'body1'
    | 'body2'
    | 'body3'
    | 'caption'
    | 'caption2';

const baseFonts: Record<Variants, { pxSize: number }> = {
    h1: { pxSize: 46 },
    h2: { pxSize: 34 },
    h3: { pxSize: 32 },
    h4: { pxSize: 28 },
    h5: { pxSize: 26 },
    h6: { pxSize: 22 },
    body1: { pxSize: 18 },
    body2: { pxSize: 16 },
    body3: { pxSize: 16 },
    caption: { pxSize: 14 },
    caption2: { pxSize: 12 }
};

const BASE_SIZE = 18;
//9px is smallest fontsize show in all screen size
const MIN_SIZE = 9 / baseFonts.caption2.pxSize;

export const variants = Object.entries(baseFonts).reduce((acc, [cur, value]) => {
    const minPx = value.pxSize * MIN_SIZE;
    const maxRem = value.pxSize / BASE_SIZE;
    const minRem = maxRem * MIN_SIZE;
    return {
        ...acc,
        [cur]: {
            fontSize: `clamp(${minPx}px ,calc(${minRem}rem + ${0.5}vw),${maxRem}rem)`,
            marginBlockStart: 0,
            marginBlockEnd: 0,
            lineHeight: 1.5
        }
    };
}, {} as Record<Variants, any>);

export const fontSelector = (lang: AppLanguages) => {
    let fontArray = [];
    switch (lang) {
        case 'en':
        case 'fr':
            fontArray = ['Poppins', 'Arial', 'sans-serif'];
            break;
        // case 'fa':
        //     fontArray = ['IRANSans', 'Arial'];
        //     break;
        default:
            fontArray = ['Poppins', 'Arial', 'sans-serif'];
            break;
    }
    return fontArray.join(',');
};
