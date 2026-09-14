import DashboardIcon from 'src/assets/sidebar/dashboard';
import SessionsIcon from 'src/assets/sidebar/sessions';
import SettingIcon from 'src/assets/sidebar/setting';
import CloseIcon from 'src/assets/sidebar/close';
import ChatIcon from 'src/assets/sidebar/chat';
import Link from 'next/link';
import { activeSideBar, activeTab } from 'src/redux/actions/actions';
import { MImage } from '../base/image/MImage';
import { ItemProps } from './types.sidebar';
import { CircularProgress, InputAdornment, styled, Typography } from '@mui/material';
import { Spacer } from '../base/spacer';
import { useRouter } from 'next/router';
import { connect, useDispatch } from 'react-redux';
import { Box } from '@mui/system';
import {
    SideBarItemContainer,
    ItemName,
    SideBarItem,
    SideBarList,
    Container,
    ProfileInfoContainer,
    CustomInputSearch
} from './styled.sidebar';
import LogoutIcon from 'src/assets/sidebar/logout';
import SearchIcon from 'src/assets/sidebar/search';
import { useAuthPage } from '../auth/services/useAuth';
import { QueryCache } from 'react-query';

const items = [
    {
        name: 'Dashboard',
        tab: 'dashboard',
        Icon: DashboardIcon
    },
    {
        name: 'Sessions',
        tab: 'sessions',
        Icon: SessionsIcon
    },
    {
        name: 'Chat',
        tab: 'chat',
        Icon: ChatIcon
    },
    {
        name: 'Setting',
        tab: 'setting',
        Icon: SettingIcon
    }
];

const Item = ({ name, tab, activeTabName, Icon, activeSideBar }: ItemProps) => {
    const router = useRouter();
    const isActive = tab === activeTabName;
    const dispatch = useDispatch();
    let userRole = 'client';
    const href = userRole === 'client' ? '/client' : 'healers/profile';

    function onClickHandler(){
        if(!router.pathname.includes(href)) router.push(href);
        dispatch(activeTab(tab));
        activeSideBar(false);
    }

    return (
        <SideBarItem isActive={isActive} onClick={onClickHandler}>
            <SideBarItemContainer>
                <Icon />
                <ItemName>{name}</ItemName>
            </SideBarItemContainer>
        </SideBarItem>
    );
};

function Sidebar({ isSideBarActive, activeSideBar, activeTabName, ...props }) {
    const router = useRouter();

    const { signOut, isSignOutLoading } = useAuthPage();
    const queryCache = new QueryCache({
        onError: (error) => {
            console.log(error);
        },
        onSuccess: (data) => {
            console.log(data);
        }
    });

    const handleLogout = () => {
        signOut();
        queryCache.clear();
    };
    
    

    return (
        <Container>
            <ProfileInfoContainer>
                <Box>
                    <MImage
                        resources={{
                            src: '/images/profile.png',
                            fallback: '/images/empty_profile.png'
                        }}
                        style={{
                            borderRadius: '50%',
                            width: '76px',
                            height: '76px',
                            border: 'none'
                        }}
                    />
                    <Spacer space={15} />
                    <Typography fontSize="20px">Louisa Fuller</Typography>
                    <Typography fontSize="15px">mikecooper.94</Typography>
                </Box>
                <Box marginRight="10px" onClick={() => activeSideBar(false)}>
                    <CloseIcon />
                </Box>
            </ProfileInfoContainer>
            <Spacer space={25} />
            <Box>
                <CustomInputSearch
                    placeholder="Search Project"
                    id="standard"
                    variant="outlined"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                        style: {
                            height: '50px',
                            width: '100%',
                            maxWidth: '343px'
                        }
                    }}
                />
            </Box>
            <Spacer space={35} />
            <SideBarList>
                {items.map((item, index) => (
                    <Item key={index} {...item} activeTabName={activeTabName} activeSideBar={activeSideBar} />
                ))}
            </SideBarList>
            <Spacer space={70} />
            <SideBarItemContainer onClick={handleLogout}>
                <LogoutIcon />
                <ItemName>{isSignOutLoading ? <CircularProgress size="1rem" /> : 'Logout'}</ItemName>
            </SideBarItemContainer>
        </Container>
    );
}

const mapStateToProps = ({ isSideBarActive, activeTabName }) => ({ isSideBarActive, activeTabName });

const mapDispatchToProps = { activeSideBar };

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
