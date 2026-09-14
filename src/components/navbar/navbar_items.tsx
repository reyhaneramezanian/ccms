import MobileViewTypesMenu from './components/type-menu-in-mobile-view';
import NotificationIcon from 'src/assets/common/notification';
import ProfileSection from './components/profile-section';
import SearchIcon from 'src/assets/common/search';
import NavbarLink from './components/navbar-link';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { SearchContainer } from './styled.navbar';
import { MImage } from '../base/image/MImage';
import { Typography } from '@mui/material';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import logo from '../../assets/icons/logo';
const sharedStyles: CSSProperties = {
    cursor: 'pointer',
    fontFamily: 'Helvetica'
};
export const navbarItems = {
    default: [
        <MImage
            key="0"
            resources={{ src: '/images/Subtraction6.png' }}
            style={{ borderRadius: '50%', width: '60px', height: '60px', ...sharedStyles }}
        />,
        <MobileViewTypesMenu key="1" />,
        <NavbarLink key="2" href="/healing">
            <Typography>Healing Type</Typography>
        </NavbarLink>,
        <NavbarLink key="3" href="/healers">
            <Typography>Healers</Typography>
        </NavbarLink>,
        <NavbarLink key="4" href="/about">
            <Typography>About C4Healing</Typography>
        </NavbarLink>,
        <div key="5" style={{ flex: 1 }} />,
        <SearchContainer key="6" sx={{ ...sharedStyles }}>
            <SearchIcon />
        </SearchContainer>,
        <NavbarLink key="7" href="/login">
            <Button
                variant="outlined"
                style={{ borderRadius: '20px', width: '150px', ...sharedStyles }}>
                Login
            </Button>
        </NavbarLink>
    ],
    clientOrHealer: [
        <MImage
            key="0"
            resources={{ src: '/images/Subtraction6.png' }}
            style={{ borderRadius: '50%', width: '60px', height: '60px', ...sharedStyles }}
        />,
        <MobileViewTypesMenu key="1" />,
        <NavbarLink key="2" href="/healing">
            <Typography>Healing Type</Typography>
        </NavbarLink>,
        <NavbarLink key="3" href="/healers">
            <Typography>Healers</Typography>
        </NavbarLink>,
        <NavbarLink key="4" href="/about">
            <Typography>About C4Healing</Typography>
        </NavbarLink>,
        <div key="5" style={{ flex: 1 }} />,
        <SearchContainer key="6" sx={{ ...sharedStyles, marginRight: '20px' }}>
            <SearchIcon />
        </SearchContainer>,
        <Box key="7" sx={{ ...sharedStyles, marginRight: '20px' }}>
            <NotificationIcon />
        </Box>,
        <ProfileSection key="8">
            <MImage
                key="8"
                resources={{ src: '/images/profile.png', fallback: '/images/empty_profile.png' }}
                style={{
                    borderRadius: '50%',
                    width: '60px',
                    height: '60px',
                    border: '2.5px solid #35094F',
                    ...sharedStyles
                }}
            />
        </ProfileSection>
    ]
}