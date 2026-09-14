import styled from '@emotion/styled';
import { getPaletteColor, inferLighter } from 'src/utils/theme/helper';

export const StyledCheckbox = styled.label<
    AppBaseColorType & { selected?: boolean; content?: any }
>(({}) => ({
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    // padding: '16px 0',
    '& > input': { opacity: 0, width: 0, height: 0 }
}));

export const BSToggleButton = styled.div<
    AppBaseColorType & {
        backActive?: string;
        backDeactive?: string;
        thumbActive?: string;
        thumbDeactive?: string;
        checked?: boolean;
    }
>(
    ({
        palette = 'info',
        degree = 'green',
        palette2 = 'grey',
        degree2 = '200',
        backActive = getPaletteColor({ palette, degree }),
        backDeactive = getPaletteColor({ palette: palette2, degree: degree2 }),
        thumbActive = '#FFF',
        thumbDeactive = '#FFF',
        checked = false
    }) => ({
        display: 'flex',
        alignItems: 'center',
        color: checked ? thumbActive : thumbDeactive,
        '& > span': {
            margin: '0 8px',
            color: 'inherit'
        },
        '& > label': {
            width: 64,
            height: 32,
            display: 'block',
            position: 'relative',
            cursor: 'pointer',
            borderRadius: '99em',
            padding: 4,
            backgroundColor: backDeactive,
            '&:after': {
                transition: '0.3s',
                content: "''",
                width: 24,
                height: 24,
                top: 4,
                left: 4,
                borderRadius: '99em',
                backgroundColor: thumbDeactive,
                position: 'absolute'
            }
        },

        '& > input[type=checkbox]': {
            height: 0,
            width: 0,
            display: 'none'
        },
        '& > input:checked + label': {
            backgroundColor: backActive
        },
        '& > input:checked + label:after': {
            backgroundColor: thumbActive,
            left: 'calc(100% - 4px)',
            transform: 'translateX(-100%)'
        },
        '& > label:active:after': {
            width: 36
        }
    })
);
