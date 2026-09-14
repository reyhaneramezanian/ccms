import styled from '@emotion/styled';
import { Property } from 'csstype';
import { FlexContainer } from './Container';

interface CenterView {
    alignSelf?: Property.AlignSelf;
}

export const StyledCenter = styled(FlexContainer)<CenterView>(({ alignSelf }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}));
