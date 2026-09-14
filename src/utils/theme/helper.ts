import themeObj from '@/provider/theme/themeObject';
import { Weights } from '@/provider/theme/typographySettings';
import { useTheme } from '@emotion/react';

export function inferLighter(color: string) {
    return `${color}61`;
}

export function getPaletteColor({ palette, degree }: AppBaseColorType) {
    const theme = useTheme();
    if (!palette) {
        return themeObj.palette.palette.paginate.main;
    }
    if (!degree || !themeObj.palette[palette] || !(degree in themeObj.palette[palette])) {
        return theme.palette.secondary.darker;
    }
    return (themeObj.palette[palette] as any)[degree];
}

export function getTextColor({ palette, degree }: AppBaseColorType) {
    if (!palette) {
        return themeObj.palette.text.main;
    } else if (!degree || !themeObj.palette[palette] || !(degree in themeObj.palette[palette])) {
        return (themeObj.palette[palette] as any)['main'];
    }
    return (themeObj.palette[palette] as any)[degree];
}

export const textWeight: Record<Weights, number> = {
    bold: 700,
    semibold: 600,
    medium: 500,
    regular: 400,
    light: 300
};
