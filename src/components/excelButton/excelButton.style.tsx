import COLORS from '@/utils/theme/colors';
import { Box, Button } from '@mui/material';
import { styled } from '@mui/system';
import Excel from 'src/assets/icons/excel';

export const AddButton = styled(Button)({
    float: 'right',
    borderRadius: 8,
    border: '1px solid #487A9D',
    color: '#487A9D',
    fontSize: 16,
    fontFamily: 'Poppins',
    backgroundColor: '#fff',
    minWidth: 182,
    ':hover': {
        backgroundColor: '#fff'
    }
});

export const AddButtonIconWrapper = styled(Box)({
    width: 28,
    height: 28,
    borderRadius: 6,
    marginRight: 16,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
});

export const AddButtonIcon = styled(Excel)({
    color: '#487A9D'
});
