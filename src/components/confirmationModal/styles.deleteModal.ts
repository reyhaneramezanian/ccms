import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';

export const DeleteModalWrapper = styled(Box)({
    width: 498,
    maxWidth: '100%'
});

export const DeleteModalTitle = styled(Typography)({
    width: '90%',
    float: 'left',
    fontSize: '14px',
    fontFamily: 'Poppins',
    padding: '5px 0 0 5px'
});

export const DeleteModalIcon = styled(Box)({
    marginRight: 13
});
