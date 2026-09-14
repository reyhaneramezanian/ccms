import { Box } from '@mui/material';
import { styled } from '@mui/system';
import COLORS from '@/utils/theme/colors';

export const FlatBoxItem = styled(Box)<{ isActive: boolean }>(({ isActive }) => ({
    width: '100%',
    height: 48,
    borderRadius: 8,
    border: `1px solid ${isActive ? COLORS.primary : COLORS.grey3}`,
    backgroundColor: isActive ? COLORS.primary : COLORS.white,
    display: 'flex',
    alignItems: 'center',
    padding: '0 15px',
    transition: '0.3s',
    cursor: isActive ? 'default' : 'pointer',
    marginTop: 15
}));
