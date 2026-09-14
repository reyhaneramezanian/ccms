import COLORS from '@/utils/theme/colors';
import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { WelcomeActivePage } from './types.welcome';

export const WelcomeWrapper = styled(Box)<{ activePage: WelcomeActivePage }>((props) => ({
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: props.activePage === 'welcome' ? 815 : 'auto',
    maxWidth: '90%',
    margin: '0 auto'
}));

export const WelcomeDescription = styled(Typography)({
    fontSize: 15,
    fontWeight: 'lighter',
    lineHeight: '18px',
    color: COLORS.black3,
    marginTop: 10
});

export const WelcomeButton = styled(Button)({
    minWidth: 168,
    marginTop: 31
});

export const WelcomeImageWrapper = styled(Box)({
    width: 835,
    maxWidth: '90%',
    height: 194,
    position: 'relative',
    marginTop: 100
});

export const WelcomeRoleContainer = styled(Box)({
    marginTop: 32
});

export const WelcomeRoleItem = styled(Box)({
    width: 240,
    height: 240,
    borderRadius: 8,
    border: '1px solid #DDE0EE',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    transition: '0.3s',
    cursor: 'pointer',
    '&:hover': {
        borderColor: COLORS.grey3
    },
    '&>div': {
        position: 'relative',
        width: 170,
        maxWidth: 'calc(100% - 20px)',
        height: 135
    }
});

export const WelcomeRoleItemTitle = styled(Typography)({
    marginTop: 15,
    letterSpacing: '15px',
    lineHeight: '13px',
    fontSize: 11,
    color: COLORS.danger
});
