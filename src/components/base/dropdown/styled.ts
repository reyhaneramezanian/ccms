import styled from '@emotion/styled';
import { BSInput, BSInputContainer } from '../input/styled';

export const StyledSelectInput = styled(BSInputContainer)(({ theme }) => ({
    position: 'relative',
    border: '1px solid',

    '& > div:nth-of-type(1)': {
        border: '1px solid',
        // ...getCommonInput(theme, false),
        padding: 16,
        cursor: 'pointer'
    }
}));

export const CommonMenuContainer = styled.div<{ show: boolean }>(({ theme, show }) => ({
    // display: show ? 'flex' : 'none',
    visibility: show ? 'visible' : 'hidden',
    opacity: show ? 1 : 0,

    minWidth: 230,
    flexDirection: 'column',
    maxHeight: 250,
    zIndex: theme.zIndex.menu,
    // transition: 'all 0.2s linear',
    position: 'absolute',
    overflow: 'auto',
    // width: '100%',

    // marginTop: 8,
    backgroundColor: '#FFF',
    boxShadow: theme.shadows.regular,

    padding: '16px 0px',

    '& > p': {
        width: '100%',
        cursor: 'pointer',
        padding: '3px 16px',
        '&:hover': {
            backgroundColor: theme.palette.grey['200']
        }
    }
}));

export const StyledAccordionSelectInput = styled(BSInputContainer)<{
    open?: boolean;
}>(({ theme, open }) => ({
    position: 'relative',
    zIndex: theme.zIndex.menu + 1,
    '& > div:nth-of-type(1)': {
        // ...getCommonInput(theme, false),
        // position: "relative",
        // zIndex: 10,
        padding: '16px 24px',
        backgroundColor: open ? theme.palette.grey['300'] : '#FFF',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: open ? theme.palette.grey['300'] : theme.palette.grey['200']
        },
        '& > p': {
            color: open ? '#FFF' : theme.palette.grey['300']
        },
        '& > div': {
            content: '""',
            width: '1.5rem',
            height: '1.5rem',
            borderRadius: '1rem',
            border: '2px solid ',
            borderColor: open ? '#FFF' : theme.palette.grey['300'],
            padding: 2,
            marginRight: 24,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            '&:before': {
                content: '""',
                position: 'absolute',
                backgroundColor: '#FFF',
                width: '60%',
                height: '60%',
                borderRadius: '100%'
            }
        }
    }
}));

export const StyledSelectInternalInput = styled(BSInput)({
    display: 'none'
});
