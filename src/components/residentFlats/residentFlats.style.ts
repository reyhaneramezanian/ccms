import COLORS from '@/utils/theme/colors';
import { MenuItem as MMenuItem } from '@mui/material';
import { Box } from '@material-ui/core';
import { styled } from '@mui/system';

export const MenuItem = styled(MMenuItem)({
    height: 48,
    display: 'flex',
    alignItems: 'center',
    //overflow: 'scroll',
    '&:not(:last-child)': {
        borderBottom: '1px solid #E8E8E8'
    },
    '&:focus': {
        backgroundColor: '#fff'
    }
});

export const IconWrapper = styled(Box)({
    width: 35,
    height: 35,
    borderRadius: '12px',
    backgroundColor: COLORS.white,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    position: 'relative'
});
