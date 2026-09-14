import { Localization } from '@/i18n/types';
import themeObj from '@/provider/theme/themeObject';
import { Variants, Weights } from '@/provider/theme/typographySettings';
import { IconProps } from 'src/assets/icons/SvgIcon';
import { StyledComponent } from '@emotion/styled';
import { breakpointsKeys } from '@/provider/theme/breakpoint';
import { NextPageContext } from 'next';
import { CSSProperties } from 'react';
import { PaletteColorOptions } from '@mui/material';
import { ColorPartial } from '@mui/material/styles/createPalette';

type Palette = keyof typeof themeObj['palette'];
type Degree =
    | keyof typeof themeObj['palette']['primary']
    | keyof typeof themeObj['palette']['info'];

declare global {
    type AppLanguages = 'en' | 'fr' | 'es';
    type AppDir = 'ltr' | 'rtl';

    type AppPageContext = NextPageContext;

    type AppOptions = {
        value: string | number;
        option: string | number;
    };
    type ArrayOptionLoading = Array<AppOptions> | 'loading';

    type AppCommonInput = {
        name: string;
        label?: string;
        StartAdornment?: React.FC<any>;
        EndAdornment?: React.FC<any>;
    };

    type AppCommonChild = { children: React.ReactNode };
    type AppUserType =
        | {
              id: number;
              email: string;
          }
        | undefined;

    type AppLocalization = {
        localization: Localization;
    };

    type AppBaseColorType = {
        palette?: Palette;
        degree?: Degree;
        palette2?: Palette;
        degree2?: Degree;
    };

    type AppTypographyVariant = {
        variant?: Variants;
        active?: boolean;
    };
    type AppScaleVariant = {
        scale?: 'tiny' | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
    };
    type AppTypographyWeight = {
        fontWeight?: Weights;
    };
    type AppTypographyProperty = {
        align?: Property.TextAlign;
    };

    type CommonIconProps = IconProps;

    type AppBreakpointKeys = keyof typeof breakpointsKeys;

    type AppStyledComponent<T> = StyledComponent<T>;
    type AppStyle = CSSProperties;

    type AppQueryOption = UseQueryOptions;
}

interface PaletteApp<C> {
    primary: C;
    secondary: C;
    info: C;
    success: C;
    warning: C;
    danger: C;
    black1: C;
    black2: C;
    black3: C;
    white: C;
    grey1: C;
    grey2: C;
    grey3: C;
    grey4: C;
    grey5: C;
}

declare module '@mui/material/styles' {
    interface CustomPalette extends PaletteApp<PaletteOptions> {}
    interface Palette extends CustomPalette {}
    interface PaletteOptions extends CustomPalette {}
}

declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        primary: true;
        grey3: true;
        danger: true;
    }
}
