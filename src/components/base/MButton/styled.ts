import { getPaletteColor } from '@/utils/theme/helper';
import styled from '@emotion/styled';
import { MButtonStyleProps } from './types.button';
import { keyframes } from '@emotion/react';

const animation = keyframes`
   to {
          transform: scale(4);
          opacity: 0;
        }
`;

export const BSButton = styled.button(({ theme, css, disabled }) => ({
    ...(css && css),
    transition: 'all .3s ease-out',
    cursor: 'pointer',
    borderStyle: 'none',
    outline: 0,
    border: 0,
    margin: 0, // Remove the margin in Safari
    // borderRadius: 0,
    // padding: 0, // Remove the padding in Firefox
    position: 'relative',
    overflow: 'hidden',
    userSelect: 'none',
    verticalAlign: 'middle',
    textDecoration: 'none',
    borderRadius: theme?.shape?.borderRadius?.common,
    padding: '8px 16px',
    backgroundColor: 'transparent',
    ...(disabled && { opacity: 0.5 }),
    '&>span.ripple': {
        position: 'absolute',
        borderRadius: '50%',
        transform: 'scale(0)',
        animation: `${animation} 600ms linear`,
        backgroundColor: 'rgba(255, 255, 255, 0.7)'
    },

    '&:focus': {
        outline: 0
    }
}));

export const BSIconButton = styled(BSButton)<MButtonStyleProps>(({ theme, palette, degree }) => ({
    borderRadius: '99em',
    color: getPaletteColor({
        palette,
        degree
    }),
    padding: 4,
    '&:hover': {
        // backgroundColor: "rgba(0,0,0,0.3)",
    }
}));

export const BSHyperlink = styled.a<AppBaseColorType>(({ palette, degree }) => ({
    textDecoration: 'none',
    cursor: 'pointer',
    color: getPaletteColor({ palette, degree })
}));

export const BSButtonWrapper = styled.span(({ css }) => ({
    ...(css && css),
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}));

export const SButtonContained = styled(BSButton)<MButtonStyleProps>(
    ({ theme, palette, degree }) => ({
        backgroundColor: getPaletteColor({ palette, degree })
    })
);

export const SButtonOutline = styled(BSButton)<MButtonStyleProps>(
    ({ theme, palette, degree, active, hoverEffect  }) => ({
        border: '1px solid',
        borderColor: getPaletteColor({ palette, degree }),
        background: `linear-gradient(to bottom, #fff 50%, ${getPaletteColor({
            palette,
            degree
        })} 50%)`,
        backgroundPosition: active ? 'bottom' : 'top',
        color: active
            ? '#FFF'
            : getPaletteColor({
                  palette,
                  degree
              }),
        backgroundSize: '100% 200%',
        ...(hoverEffect !== 'none' && {
            '&:hover': {
                backgroundPosition: 'bottom',
                color: '#FFF'
            }
        })
    })
);

const PADDING_HORIZ = 16;

export const SButtonText = styled(BSButton)<MButtonStyleProps & { pad?: number }>(
    ({ palette, degree, pad = PADDING_HORIZ }) => ({
        color: getPaletteColor({ palette, degree }),
        position: 'relative',
        '&:before': {
            content: "''",
            position: 'absolute',
            width: '0%',
            left: '50%',
            transition: 'width 0.3s ease 0s, left 0.3s ease 0s',
            bottom: 4,
            display: 'block',
            backgroundColor: getPaletteColor({ palette, degree }),
            height: 2
        },
        '&:hover:before': {
            left: pad,
            width: `calc(100% - ${2 * pad}px)`
        }
    })
);
