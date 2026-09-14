import COLORS from '@/utils/theme/colors';
import { Box } from '@mui/material';
import { styled } from '@mui/system';

export const CardStepperWrapper = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center'
});

export const CardStepperItem = styled(Box)<{ isActive: boolean }>(({ isActive }) => ({
    width: isActive ? 16 : 8,
    height: 8,
    borderRadius: isActive ? 4 : '50%',
    transition: '0.3s',
    backgroundColor: isActive ? COLORS.danger : '#E8E8E8',
    '&:not(:first-child)': {
        marginLeft: 8
    }
}));
