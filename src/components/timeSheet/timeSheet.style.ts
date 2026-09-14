import COLORS from '@/utils/theme/colors';
import { Box } from '@mui/material';
import { styled } from '@mui/system';

export const DaysOfWeekWrapper = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginLeft: -20,
    marginTop: -15,
    '&>*': {
        marginLeft: 20,
        marginTop: 15
    }
});

export const DaysOfWeekItem = styled(Box)<{ isActive: boolean }>(({ isActive }) => ({
    width: 48,
    height: 48,
    borderRadius: 6,
    backgroundColor: isActive ? COLORS.info : COLORS.secondary,
    borderColor: isActive ? 'transparent' : '#E8E8E8',
    borderWidth: 1,
    borderStyle: 'solid',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    transition: '0.3s',
    '&:hover': {
        transform: 'scale(1.06)'
    },
    '&:active': {
        transform: 'scale(0.96)'
    },
    '*': {
        '&::selection': {
            backgroundColor: 'transparent'
        }
    }
}));

export const label = styled(Box)({
    float: 'left',
    width: '46px',
    height: '49px',
    alignItems: 'center',
    textAlign: 'center',
    margin: '30px 0 0 0',
    backgroundColor: '#d3d3d3',
    color: '#4f4f4f',
    borderRadius: '8px 0 0 8px',
    zIndex: 1,
    padding: '12px 0',
    fontFamily: 'Poppins',
    fontSize: '14px'
    // position: 'relative',
    //left: 4
});
export const inputtimeshit = styled(Box)({
    float: 'left',
    width: '77%',
    ['@media (max-width:1100px)']: {
        width: '50%'
    }

    //margin: '0 0 0 5px'
    // position: 'relative'
});
export const boxinput = styled(Box)({
    // position: 'absolute'
});
