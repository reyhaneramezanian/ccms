import DashboardIcon from 'src/assets/icons/navbar/dashboard';
import LogoutIcon from 'src/assets/icons/navbar/logout';
import { ModalLI, ModalUL, NavbarModalContainer } from '../styled.navbar';
import { closeModal, newModal, activeSideBar, activeTab } from 'src/redux/actions/actions';
import { Box, CircularProgress, Divider, Typography } from '@mui/material';
import { Spacer } from '@/components/base/spacer';
import { connect, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { QueryCache } from 'react-query';
import { useAuthPage } from '@/components/auth/services/useAuth';
import { MuiButton } from '@/components/base/Button';

const ModalBody = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    let userRole = 'client';

    const RedirectToDashboard = () => {
        if (userRole === 'client') {
            router.push('/client');
            dispatch(activeTab('sessions'))
        } else if (userRole === 'healer') router.push('/healers/profile');
        dispatch(closeModal('dashboard-logout'));
    };

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
        <ModalUL>
            <ModalLI onClick={RedirectToDashboard}>
                <DashboardIcon />
                <Spacer space={15} />
                <Typography fontSize={18}>Dashboard</Typography>
            </ModalLI>
            <Divider style={{ width: '100%', borderColor: '#707070' }} />
            <ModalLI>
                <LogoutIcon />
                <Spacer space={15} />
                <Typography fontSize={18} onClick={handleLogout}>
                    {isSignOutLoading ? <CircularProgress size="1rem" /> : 'Logout'}
                </Typography>
            </ModalLI>
        </ModalUL>
    );
};

function ProfileSection({ children, activeSideBar }) {
    const dispatch = useDispatch();

    const onClickHandler = () => {
        if (window.innerWidth > 900) {
            dispatch(
                newModal({
                    id: 'dashboard-logout',
                    closeButton: false,
                    Container: NavbarModalContainer,
                    Body: ModalBody
                })
            );
        } else activeSideBar(true);
    };

    return (
        <Box
            sx={{
                cursor: 'pointer',
                fontFamily: 'Helvetica',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
            onClick={onClickHandler}>
            {children}
        </Box>
    );
}

const mapStateToProps = ({ isSideBarActive, chatCount }) => ({ isSideBarActive, chatCount });

const mapDispatchToProps = { activeSideBar, newModal };

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSection);
