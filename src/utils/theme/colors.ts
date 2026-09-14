import { PaletteOptions } from '@mui/material';

const COLORS = {
    // Brand Colors
    primary: '#487A9D',
    secondary: '#F2F3F7',
    // State Colors
    info: '#409FFF',
    success: '#20A144',
    warning: '#CC9E14',
    danger: '#E63C49',
    // Black Colors
    black1: '#3B3B3B',
    black2: '#4F4F4F',
    black3: '#243859',
    white: '#ffffff',
    // Gray Colors
    grey1: '#3B3B3B',
    grey2: '#4F4F4F',
    grey3: '#636363',
    grey4: '#7A7A7A',
    grey5: '#F2F3F7'
};

export const getPaletteColorsForMui = () => {
    const palette: PaletteOptions = {} as any;

    Object.keys(COLORS).forEach((key) => {
        palette[key] = {
            main: COLORS[key]
        };
    });

    return palette;
};

export default COLORS;
