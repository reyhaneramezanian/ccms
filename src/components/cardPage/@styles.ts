import COLORS from '@/utils/theme/colors';
import { Box } from '@mui/material';
import { styled } from '@mui/system';

export const CardPageWrapper = styled(Box)({
    borderRadius: 8,
    backgroundColor: COLORS.white,
    padding: 24,
    maxWidth: '100%'
});
