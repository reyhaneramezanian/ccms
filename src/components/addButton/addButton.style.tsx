import COLORS from '@/utils/theme/colors';
import { Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/system';

export const AddButton = styled(Button)({
    float: 'right',
    borderRadius: 8,
    color: COLORS.white,
    fontSize: 16,
    height: 45,
    fontFamily: 'Poppins',
    backgroundColor: COLORS.primary,
    minWidth: 182,
    ':hover': {
        backgroundColor: COLORS.primary
    },
    marginLeft: '20px'
});

export const AddButtonIconWrapper = styled(Box)({
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: 'rgb(000,000,000, 0.2)',
    marginRight: 16,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    ':hover': {
        backgroundColor: 'rgb(000,000,000, 0.2)'
    }
});

export const AddButtonIcon = styled(AddIcon)({
    color: COLORS.white
});
