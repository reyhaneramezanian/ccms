import React from 'react';
import { Global, css } from '@emotion/react';
import { CacheProvider } from '@emotion/react';

import { createTheme } from '@mui/material/styles';
import { EmotionCache } from '@emotion/cache';
import createEmotionCache from 'src/utils/createEmotionCache';
const clientSideEmotionCache = createEmotionCache();

import { CssBaseline, ThemeOptions, ThemeProvider as MuiThemeProvider } from '@mui/material';
import COLORS, { getPaletteColorsForMui } from '@/utils/theme/colors';

const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1300
        }
    },
    spacing: 8,
    palette: {
        ...getPaletteColorsForMui()
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    fontSize: '16px',
                    lineHeight: '21px',
                    fontWeight: 'normal',
                    fontStyle: 'normal',
                    borderRadius: 8,
                    minHeight: 44,
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: 'none'
                    }
                }
            },
            variants: [
                {
                    props: {
                        variant: 'contained'
                    },
                    style: {
                        color: COLORS.white
                    }
                }
            ]
        }
    },
    typography: {
        useNextVariants: true,

        h1: {
            fontSize: '56px',
            lineHeight: '72.8px'
        },
        h2: {
            fontSize: '48px',
            lineHeight: '62.4px'
        },
        h3: {
            fontSize: '40px',
            lineHeight: '52px'
        },
        h4: {
            fontSize: '32px',
            lineHeight: '41.6px'
        },
        h5: {
            fontSize: '24px',
            lineHeight: '31.2px'
        },
        h6: {
            fontSize: '20px',
            lineHeight: '26px'
        },
        subtitle1: {
            fontSize: '20px',
            lineHeight: '30px'
        },
        subtitle2: {
            fontSize: '18px',
            lineHeight: '27px'
        },
        body1: {
            fontSize: '16px',
            lineHeight: '24px'
        },
        body2: {
            fontSize: '14px',
            lineHeight: '21px'
        },
        allVariants: {
            fontFamily: ['yeseva-reg', 'Roboto'].join(','),
            color: COLORS.black1
        }
    }
} as ThemeOptions);

interface Props {
    children: React.ReactNode;
    emotionCache?: EmotionCache;
}

export default function AppThemeProvider({
    children,
    emotionCache = clientSideEmotionCache
}: Props) {
    return (
        <CacheProvider value={emotionCache}>
            {/* <DirectionProvider> */}
            <CssBaseline />
            <Global
                styles={css`
                    * {
                        box-sizing: border-box;
                        font-family: Roboto;
                        margin: 0;
                        padding: 0;
                    }

                    html,
                    body {
                        width: 100%;
                        height: 100%;
                        min-height: 100vh;
                        padding: 0;
                        margin: 0;
                        background: ${COLORS.secondary};
                    }

                    .div-root-1 {
                        overflow-x: initial !important;
                        max-width: 100%;
                    }

                    * {
                        max-width: 100%;
                    }

                    ul {
                        list-style: none;
                        padding: 0;
                    }
                `}
            />
            <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
            {/* </DirectionProvider> */}
        </CacheProvider>
    );
}
