import styled from '@emotion/styled';
import { Property } from 'csstype';

export type ContainerProps = { maxWidth?: AppBreakpointKeys };

export const Container = styled.div<ContainerProps>(({ theme, maxWidth = 'xl' }) => ({
    width: '100%',
    maxWidth: theme.breakpoints.values[maxWidth],
    margin: '0 auto'
}));

export interface FlexViewProps extends ContainerProps {
    alignItems?: Property.AlignItems;
    alignContent?: Property.AlignContent;
    alignSelf?: Property.AlignSelf;
    justifyContent?: Property.JustifyContent;
    w?: number;
    wrap?: 'true' | 'false';
}

export const FlexContainer = styled.div<FlexViewProps>(
    ({ theme, alignItems, justifyContent, alignContent, alignSelf, w, maxWidth, css, wrap }) => ({
        display: 'flex',
        ...(wrap && { flexWrap: 'wrap' }),
        ...(alignItems && { alignItems }),
        ...(css && css),
        ...(justifyContent && { justifyContent }),
        ...(alignContent && { alignContent }),
        ...(alignSelf && { alignSelf }),
        ...(w && { width: w }),
        ...(maxWidth && { maxWidth: theme.breakpoints.values[maxWidth] })
    })
);
