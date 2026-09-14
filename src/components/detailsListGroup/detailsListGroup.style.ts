import COLORS from '@/utils/theme/colors';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';

export const detailsListGroupWrapper = styled(Box)({
    marginTop: -32
});

export const detailsListGroupItem = styled(Box)({
    marginTop: 32
});

export const detailsListGroupItemTitle = styled(Typography)({
    marginBottom: 16,
    color: COLORS.black2
});
export const textdetail = styled(Box)({
    width: '100%',
    textAlign: 'left',
    fontSize: 16,
    margin: '10px 5px 30px 0px',
    fontFamily: 'Poppins',
    color: '#3B3B3B',
    whiteSpace: 'initial',
    wordWrap: 'break-word',
    border: '1px solid #C3C3C3',
    backgroundColor: '#E5E7EF',
    height: 46,
    borderRadius: 4,
    padding: '9px 0 0 3px'
});
