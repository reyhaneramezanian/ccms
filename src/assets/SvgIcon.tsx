import { getPaletteColor } from 'src/utils/theme/helper';
import styled from '@emotion/styled';
import React from 'react';

interface StyledProps extends AppBaseColorType {
    width?: number | string;
    color?: string;
    height?: number | string;
    mdIcon?: boolean;
}

export type IconProps = React.SVGProps<SVGSVGElement> & StyledProps;

export const StyledSvgIcon = styled.svg<StyledProps>(
    ({ width, height, palette, degree, fill, stroke, color }) => ({
        width: width ?? 24,
        height: height ?? 24,
        color: color ? color : getPaletteColor({ palette, degree })
    })
);

export default StyledSvgIcon;
