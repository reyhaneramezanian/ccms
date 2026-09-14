import { styled } from '@mui/material';
import { LoadingButton } from '@mui/lab';

export const MuiButton = styled(LoadingButton)(({theme}) => ({
    fontFamily: theme.typography.fontFamily,
    height: 42,
    width: '100%',
    borderRadius: 12,
    color: '#213950',
    fontSize: 18,
    textTransform: 'none'
}));