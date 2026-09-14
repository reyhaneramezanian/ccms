import COLORS from '@/utils/theme/colors';
import { Typography } from '@mui/material';
import { Box, styled } from '@mui/system';
import CardPage from './cardPage';

export const modalButtonGroup = styled(Box)({
    display: 'flex',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 32,
    '& > *': {
        '&:not(:first-child)': {
            marginRight: '24px !important'
        }
    }
});

export const ProfileWrapper = styled(CardPage)({});

export const ProfileFormWrapper = styled(Box)({
    width: 980,
    maxWidth: '100%'
});

export const ProfileAvatarWrapper = styled(Box)({
    display: 'flex',
    alignItems: 'center'
});

export const ProfileAvatar = styled(Box)({
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: 'rgba(64, 159, 255, 0.2)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& > img': {
        maxWidth: '100%',
        maxHeight: '100%',
        borderRadius: 12
    }
});

export const ProfileAvatarShortName = styled(Typography)({
    fontSize: 35
});

export const ProfileAvatarFullName = styled(Typography)({
    fontSize: 28,
    marginLeft: 28
});

export const ProfileDeleteAccountTypography = styled(Typography)({
    color: COLORS.danger,
    borderBottom: `1px dashed ${COLORS.danger}`,
    display: 'inline',
    paddingBottom: 5,
    cursor: 'pointer'
});
