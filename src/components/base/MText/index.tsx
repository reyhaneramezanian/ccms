import styled from '@emotion/styled';
import {  getTextColor, textWeight } from 'src/utils/theme/helper';
import { Property } from 'csstype';
import React, { forwardRef } from 'react';

export type MTextPropTypes = AppBaseColorType &
    AppTypographyVariant &
    AppTypographyWeight &
    AppTypographyProperty & { lineHeight?: number };

const BSMText = styled.p<MTextPropTypes>(
    ({
        theme,
        fontWeight: weight = 'regular',
        color,
        variant = 'body1',
        palette ,
        degree,
        align = 'left',
        lineHeight,
        css
    }) => ({
        ...(css && css),
        color: color ? color : getTextColor({ degree, palette }),
        fontWeight: textWeight[weight],
        textAlign: align,
        ...theme.typography[variant],
        lineHeight: lineHeight ?? theme.typography[variant].lineHeight
    })
);

export type MTextPropsWithRef = AppBaseColorType &
    AppTypographyVariant &
    AppTypographyWeight &
    React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> &
    AppScaleVariant & {
        children?:
            | React.ReactNode
            | string
            | number
            | undefined
            | Array<JSX.Element | string | number | undefined>;
        align?: Property.TextAlign;
        span?: boolean;
    };

export type MTextProps = Omit<MTextPropsWithRef, 'ref'>;

export const MText = forwardRef(
    ({ span, ...props }: MTextPropsWithRef & { lineHeight?: number }, ref) => {
        const asVariant = span
            ? 'span'
            : props.variant?.includes('caption')
            ? 'span'
            : props.variant?.includes('body')
            ? 'p'
            : (props.variant as any);
        return <BSMText ref={ref as any} as={asVariant} {...props} />;
    }
);

MText.displayName = 'MText';
