import COLORS from '@/utils/theme/colors';
import { Box } from '@mui/material';
import { styled } from '@mui/system';

export const CodeBoxWrapper = styled(Box)({
    width: 155,
    height: 45,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.secondary,
    margin: '0 auto',
    marginTop: 7,
    borderRadius: 8
});
