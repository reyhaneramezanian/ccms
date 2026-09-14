import styled from '@emotion/styled';

import { FlexContainer } from './Container';

interface RowViewProps {
    fullWidth?: boolean;
}

export const StyledRow = styled(FlexContainer)<RowViewProps>(() => ({
    flexDirection: 'row'
}));

export const RowContainer = styled(StyledRow)({});
