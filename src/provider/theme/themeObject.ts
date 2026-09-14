// import {  fontSizes } from 'src/utils/helpers/theme';
import { BP_DN, BP_UP, BP_UP_H, BP_DN_H, breakpointsKeys } from './breakpoint';
import { variants } from './typographySettings';
export const TOOLBAR_HEIGHT = 70;
export const PRIMARY_COLOR = '#0342FE';
const SHADOW_COLOR = 'rgb(0, 0, 0,0.43)';
const themeObj = {
    palette: {
        palette: {
            common: { black: '#191A23', white: '#FFFFFF' },
            primary: {
                main: PRIMARY_COLOR,
                light: '#E4E1F0',
                dark: '#3E205A'
            },
            secondary: {
                main: '#CDE5FC',
                light: '#E7F1FC',
                dark: '#75B0EA',
                darker: '#213950'
            },
            grey: {
                main: '#E3E3E3',
                text: '#656565'
            },
            error: { main: '#D84444' },
            paginate: { main: '#35094F' }
        },
        text: {
            main: '#222222',
            placeholder: '#8B8B8B',
            100: '#6270DD',
            700: '#444444'
        }
    },
    breakpoints: {
        values: breakpointsKeys,
        up: BP_UP,
        down: BP_DN,
        height: {
            up: BP_UP_H,
            down: BP_DN_H
        }
    },
    shape: {
        borderRadius: {
            common: 4,
            tiny: 4,
            small: 8,
            medium: 12,
            large: 16,
            xlarge: 24
        }
    },
    shadows: {
        shadowColor: SHADOW_COLOR,
        regular: `0px 0px 7px 1px ${SHADOW_COLOR}, 0 1px 2px rgba(0,0,0,0.24)`
    },
    sizes: {
        pageHeight: `calc(100vh - ${TOOLBAR_HEIGHT}px)`
    },
    mixins: {
        toolbar: {
            minHeight: TOOLBAR_HEIGHT,
            zIndex: 1500
        }
    },
    transition: {
        duration: '0.3s',
        background: '0.3s background-color'
    },
    typography: {
        // useNextVariants: true,
        fontFamily: ['yeseva-reg', 'roboto-reg'].join(','),
        allVariants: { fontWeight: 'normal' },
        transform: { small: 'scale(0.85)', xsmall: 'scale(0.75)' },
        ...variants
    },
    zIndex: {
        modal: 9999,
        menu: 8888
    }
};
export default themeObj;
