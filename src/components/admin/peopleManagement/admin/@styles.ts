import COLORS from '@/utils/theme/colors';
import { Box } from '@material-ui/core';
import * as adminstyle from '../../admin.style';
import { styled } from '@mui/system';

export const modalButtonGroup = styled(Box)({
    display: 'flex',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginRight: -24,
    marginTop: 32,
    '& > *': {
        marginRight: 24
    }
});
export const modalFormRowWrapper = styled(Box)({});

export const modalFormRowFieldWrapper = styled(Box)({});
export const modalbox = styled(Box)({
    width:450,
    maxWidth: '99%',
    overflowX:'hidden',
    ['@media (max-width:500px)']: {
        width:'99%',
    }
})