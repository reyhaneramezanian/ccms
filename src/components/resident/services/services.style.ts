import COLORS from '@/utils/theme/colors';
import { Box } from '@mui/material';
import { styled } from '@mui/system';

export const ServiceItemsWrapper = styled(Box)({
    marginBottom: 22,
    marginTop: 12,
    paddingBottom: 10,
    overflowX: 'auto',
    marginLeft: -8,
    display: 'flex',
    alignItems: 'center'
});

export const ServiceItem = styled(Box)<{ isActive: boolean }>(({ isActive }) => ({
    padding: '20px 25px',
    borderRadius: 8,
    border: `1px solid ${isActive ? 'transparent' : COLORS.grey3}`,
    backgroundColor: isActive ? COLORS.primary : COLORS.white,
    transition: '0.3s',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    height: 48,
    cursor: 'pointer'
}));
