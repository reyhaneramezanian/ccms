import COLORS from '@/utils/theme/colors';
import { Box } from '@mui/material';
import { styled } from '@mui/system';

export const NotificationTitle = styled(Box)({
    fontSize: 28,
    marginBottom: 7
});

export const NotificationItem = styled('a')({
    marginTop: 24,
    backgroundColor: COLORS.grey5,
    borderRadius: 8,
    padding: '30px 24px',
    display: 'block',
    cursor: 'pointer'
});
