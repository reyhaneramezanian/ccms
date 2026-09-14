import { Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Box } from '@mui/system';
import * as S from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { setPageData } from 'src/redux/actions/actions';
import React, { useEffect, useState } from 'react';
import { useGetUser } from 'src/auth/UserProvider';
import UserIcon from 'src/assets/icons/User';
import NotificationIcon from 'src/assets/icons/notificationIcon';
import NotificationIconfull from 'src/assets/icons/notificationIconfull';
import { useRouter } from 'next/router';
import getRoleText from 'src/data/roleText';
import { UserType, useNotificationsGetQuery } from 'src/graphql/generated';
import ResidentFlats from '@/components/residentFlats';
import Complexmanager from '@/components/complex-manager';
import AlarmIcon from 'src/assets/icons/alarmIcon';
import IntercomCalling from 'src/assets/icons/intercomCallingIcon';
import handleShowRaiseAlarmModal from '@/components/resident/raiseAlarmModal';
import { getFullImageUrl } from '@/utils/helper/ui';
import { Provider } from 'react-redux';
import { useLocation } from 'react-router-dom';
import storageKeys from 'src/data/storageKeys';

const Header = () => {
    const notificationQuery = useNotificationsGetQuery({
        where: { isSeen: { eq: false } }
    });
    const [state, setState] = useState({
        mobileView: false,
        drawerOpen: false
    });
    const { mobileView, drawerOpen } = state;

    const dispatch = useDispatch();
    const pageData = useSelector(({ pageData }: any) => pageData);
    // const { state } = useLocation();

    const user = useGetUser();
    const router = useRouter();
    useEffect(() => {
        const setResponsiveness = () => {
            return window.innerWidth < 700
                ? setState((prevState) => ({ ...prevState, mobileView: true }))
                : setState((prevState) => ({ ...prevState, mobileView: false }));
        };
        setResponsiveness();

        window.addEventListener('resize', () => setResponsiveness());

        return () => {
            window.removeEventListener('resize', () => setResponsiveness());
        };
    }, []);
    const handelmenu = () => {
        if (pageData.actionmenu === 'open') {
            dispatch(setPageData({ ...pageData, actionmenu: 'close' }));
            return;
        }

        dispatch(setPageData({ ...pageData, actionmenu: 'open' }));
    };

    const hasUser = typeof user === 'object' && user !== null;

    const handleClickAvatar = () => {
        if (!hasUser) return;
        if (
            user.userType === UserType.ComplexManager &&
            localStorage.getItem(storageKeys.usertype) !== 'BlockManager'
        )
            router.push(`/${getRoleText(user.userType)}/profile-complex`);
        else if (localStorage.getItem(storageKeys.usertype) === 'BlockManager')
            router.push(`/admin/profile-block`);
        else router.push(`/${getRoleText(user.userType)}/profile`);
    };

    const handleClickNotification = () => {
        if (!hasUser) return;

        router.push(`/${getRoleText(user.userType)}/notifications`);
    };
    useEffect(() => {
        if (!hasUser) return;
        if (user?.activeStatus === 'INACTIVE')
            router.push({
                pathname: '/erroractive'
            });
        if (
            pageData.fullnameprofile === '' ||
            pageData.fullnameprofile === undefined ||
            pageData.imageprofile === '' ||
            pageData.imageprofile === undefined
        ) {
            localStorage.setItem(
                storageKeys.fullnameprofile,
                localStorage.getItem(storageKeys.fullnameprofile) != '' &&
                    localStorage.getItem(storageKeys.fullnameprofile) !== undefined
                    ? localStorage.getItem(storageKeys.fullnameprofile)
                    : user?.firstName + ' ' + user?.lastName
            );
            localStorage.setItem(
                storageKeys.imageprofile,
                localStorage.getItem(storageKeys.imageprofile) != '' &&
                    localStorage.getItem(storageKeys.imageprofile) !== undefined
                    ? localStorage.getItem(storageKeys.imageprofile)
                    : user?.photoUrl
            );
            dispatch(
                setPageData({
                    ...pageData,
                    imageprofile:
                        localStorage.getItem(storageKeys.imageprofile) != '' &&
                        localStorage.getItem(storageKeys.imageprofile) !== undefined
                            ? localStorage.getItem(storageKeys.imageprofile)
                            : user?.photoUrl,
                    fullnameprofile:
                        localStorage.getItem(storageKeys.fullnameprofile) != '' &&
                        localStorage.getItem(storageKeys.fullnameprofile) !== undefined
                            ? localStorage.getItem(storageKeys.fullnameprofile)
                            : user?.firstName + ' ' + user?.lastName
                })
            );
        }
    }, [hasUser]);

    const ProfileUi = () => {
        return (
            <S.BoxWrapper onClick={handleClickAvatar}>
                <S.ProfileAvatarWrapper>
                    {hasUser && user.photoUrl ? (
                        <S.ProfileAvatar
                            src={
                                (pageData.imageprofile == '' ||
                                    pageData.imageprofile == null ||
                                    pageData.imageprofile == undefined) &&
                                (localStorage.getItem(storageKeys.imageprofile) == '' ||
                                    localStorage.getItem(storageKeys.imageprofile) == 'null' ||
                                    localStorage.getItem(storageKeys.imageprofile) == undefined)
                                    ? '/images/men.png'
                                    : getFullImageUrl(
                                          pageData.imageprofile == '' ||
                                              pageData.imageprofile == undefined
                                              ? localStorage.getItem(storageKeys.imageprofile)
                                              : pageData.imageprofile
                                      )
                            }
                        />
                    ) : (
                        <S.ProfileAvatar src="/images/men.png"></S.ProfileAvatar>
                    )}
                </S.ProfileAvatarWrapper>
                {mobileView ? (
                    ''
                ) : (
                    <Typography variant="subtitle2">
                        {pageData?.fullnameprofile == ''
                            ? localStorage.getItem(storageKeys.fullnameprofile)
                            : pageData?.fullnameprofile}
                    </Typography>
                )}
            </S.BoxWrapper>
        );
    };

    return (
        <S.Header>
            <Box display="flex" alignItems="center">
                <S.menu onClick={() => handelmenu()}>
                    <MenuIcon fontSize="large" />
                </S.menu>
                <S.Icon src="/images/Logo.png" />
            </Box>

            <Box display="flex" alignItems="center">
                {hasUser &&
                    user.userType === UserType.Resident &&
                    localStorage.getItem(storageKeys.activeResidentFlatId) !== '0' && (
                        <>
                            <Box
                                display="flex"
                                alignItems="center"
                                marginRight="10px"
                                onClick={() => {
                                    dispatch(handleShowRaiseAlarmModal());
                                }}
                                style={{ cursor: 'pointer' }}>
                                <S.RaiseAlarmIconWrapper>
                                    <img src="/images/Raise.png" />
                                </S.RaiseAlarmIconWrapper>
                            </Box>
                        </>
                    )}

                <S.NotificationWrapper onClick={handleClickNotification}>
                    <S.IconWrapper>
                        {notificationQuery?.data?.notification_getNotifications?.result
                            ?.totalCount > 0 ? (
                            <NotificationIconfull />
                        ) : (
                            <NotificationIcon />
                        )}
                    </S.IconWrapper>
                </S.NotificationWrapper>

                {hasUser && user.userType === UserType.Resident ? (
                    <>
                        <S.NotificationWrapper>{ProfileUi()}</S.NotificationWrapper>

                        <ResidentFlats />
                    </> /*: hasUser && user.userType === UserType.ComplexManager ? (
                    <>
                        <S.NotificationWrapper>{ProfileUi()}</S.NotificationWrapper>

                        <Complexmanager />
                    </>
                ) : */
                ) : (
                    ProfileUi()
                )}
            </Box>
        </S.Header>
    );
};

export default Header;
