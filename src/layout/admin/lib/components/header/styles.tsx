import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { styled } from '@mui/system';
import COLORS from '@/utils/theme/colors';
import mediaScreen from '@/provider/media';
import { Box } from '@mui/material';

export const Header = styled('header')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 24,
    paddingBottom: 27
});

export const Icon = styled('img')({
    margin: '-12px 0 0 10px',
    height: 45
});

export const BoxWrapper = styled('div')({
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    borderLeft: `1px solid ${COLORS.secondary}`
});

export const ProfileAvatarWrapper = styled(Box)({
    width: 35,
    height: 35,
    borderRadius: '12px',
    backgroundColor: COLORS.white,
    marginRight: 15.5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
});

export const NotificationWrapper = styled(Box)({
    borderRight: `1px solid #E1E2E6`,
    marginRight: 20,
    paddingRight: 20,
    '@media(max-width:700px)': {
        margin: '0 0 0 0',
        paddingRight: 5
    }
});

export const RaiseAlarmIconWrapper = styled(Box)({
    width: 35,
    height: 35,
    borderRadius: '12px',
    backgroundColor: 'rgba(230,60,71, 0.25)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    marginRight: 15,
    '@media(max-width:700px)': {
        margin: '0 5px 0 0'
    }
});

export const IntercomCalling = styled(Box)({
    width: 35,
    height: 35,
    borderRadius: '12px',
    backgroundColor: 'rgba(61,204,121, 0.25)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    marginRight: 15
});

export const IconWrapper = styled(Box)({
    width: 35,
    height: 35,
    borderRadius: '12px',
    backgroundColor: COLORS.white,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
});

export const ProfileAvatar = styled('img')({
    maxWidth: '100%',
    height: '100%',
    borderRadius: '12px'
});

export const ProfileArrowIcon = styled(KeyboardArrowDownIcon)({
    marginLeft: 16
});
export const menu = styled('div')({
    display: 'none',
    cursor: 'pointer',
    marginRight: 15,
    [mediaScreen('md')]: {
        display: 'block'
    }
});
