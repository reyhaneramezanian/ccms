import COLORS from '@/utils/theme/colors';
import { Box } from '@mui/material';
import { styled } from '@mui/system';

export const RaiseAlarmIconsWrapper = styled(Box)({
    marginTop: 35,
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    rowGap: 34,
    marginBottom: 32
});

export const RaiseAlarmIconsItemWrapper = styled(Box)<{ isActive: boolean }>(({ isActive }) => ({
    width: 80,
    height: 80,
    borderRadius: '50%',
    border: `1px solid ${isActive ? 'transparent' : COLORS.grey3}`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    transition: '0.3s',
    backgroundColor: isActive ? COLORS.primary : 'transparent'
}));
