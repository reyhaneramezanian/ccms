import React, { useEffect, useState } from 'react';
import COLORS from '@/utils/theme/colors';
import { Collapse, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box } from '@mui/system';
import CustomLink from '@/components/customLink/customLink';
import DATA from './data';
import * as S from './styles';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useGetUser } from 'src/auth/UserProvider';
import { UserType } from 'src/graphql/generated';
import { setPageData } from 'src/redux/actions/actions';
import { useAuthPage } from '@/components/auth/services/useAuth';
import LogoutMenuIcon from 'src/assets/icons/logoutMenu';
import {
    useUser_GetCurrentStaffQuery,
    useBlockManager_GetBlockManagersQuery,
    ActiveStatus,
    useTimeSheetGetQuery
} from 'src/graphql/generated';
import storageKeys from 'src/data/storageKeys';
import defaultQueryOptions from 'src/data/queryOptions';
const Navbar = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [activeSubMenuIndex, setIsActiveSubmenuIndex] = useState<number>(-1);
    const pageData = useSelector(({ pageData }: any) => pageData);
    const user = useGetUser();
    const { signOut } = useAuthPage();
    const [usermanager, setusermanager] = useState('');

    const hasUser = typeof user === 'object' && user !== null;

    const timeSheetGetQuery = useTimeSheetGetQuery(undefined, defaultQueryOptions);

    useEffect(() => {
        if (user.userType === UserType.Security) {
            if (timeSheetGetQuery?.data?.timeSheet_getTimeSheets?.result?.totalCount == 0)
                router.push({
                    pathname: '/security/profile',
                    query: { tab: 'time-sheet' }
                });
        } else if (user.userType === UserType.Staff) {
            if (timeSheetGetQuery?.data?.timeSheet_getTimeSheets?.result?.totalCount == 0) {
                router.push({
                    pathname: '/staff/profile/',
                    query: { tab: 'time-sheet' }
                });
            }
        }
    }, [timeSheetGetQuery.isLoading]);

    const datauser = useUser_GetCurrentStaffQuery(undefined, {
        enabled: hasUser && user.userType === UserType.Staff
    });
    const blockmanager = useBlockManager_GetBlockManagersQuery(
        {
            where: { residentId: { eq: user.id } }
        },
        { enabled: hasUser }
    );

    useEffect(() => {
        if (user?.userType === 'STAFF') {
            if (datauser?.data?.user_getCurrentStaff?.result?.departmentManagers != undefined)
                if (datauser?.data?.user_getCurrentStaff?.result?.departmentManagers?.length > 0)
                    setusermanager('staffmanager');
        }
        if (user?.userType === 'RESIDENT') {
            if (localStorage.getItem(storageKeys.activeResidentFlatId) === '0')
                setusermanager('BlockManager');
        }
    }, [datauser, blockmanager]);

    useEffect(() => {
        if (typeof user !== 'object' || !user.userType) return;
        DATA[
            (user.userType as any) === ('STAFF' as any) && usermanager == 'staffmanager'
                ? ('staffmanager' as any)
                : usermanager === 'BlockManager'
                ? ('BlockManager' as any)
                : user.userType
        ].forEach((item, index) => {
            if (!Array.isArray(item.subItems)) return;

            const findIndexActiveSubMenu = item.subItems.findIndex(
                (subItem) => subItem.link === router.pathname
            );

            if (findIndexActiveSubMenu === -1) return;

            setIsActiveSubmenuIndex(index);
        });
    }, [user, router.pathname, usermanager]);

    const handleHideMobileMenu = () => {
        dispatch(setPageData({ ...pageData, actionmenu: 'close' }));
    };

    const handleChangeActiveSubmenu = (hasSubItems: boolean, index: number) => {
        if (!hasSubItems) return;

        setIsActiveSubmenuIndex((prev) => (prev === index ? -1 : index));
    };

    const handleLogout = () => {
        signOut();
    };

    return (
        <div>
            <S.Navbar isActiveMobileMenu={pageData.actionmenu === 'open'}>
                <S.NavbarList id="navbar">
                    {typeof user === 'object' &&
                        user.userType &&
                        DATA[
                            (user.userType as any) === ('STAFF' as any) &&
                            usermanager === 'staffmanager'
                                ? ('staffmanager' as any)
                                : usermanager === 'BlockManager'
                                ? ('BlockManager' as any)
                                : user.userType
                        ].map(({ title, link, Icon, subItems }, index) => {
                            const isActive =
                                link === router.pathname || activeSubMenuIndex === index;
                            const menuColor = isActive ? COLORS.black1 : COLORS.grey4;

                            return (
                                <S.NavbarListItem isActive={isActive} key={index}>
                                    <CustomLink href={link || router.pathname} passHref>
                                        <S.NavbarListItemLink
                                            onClick={() => {
                                                handleChangeActiveSubmenu(
                                                    Array.isArray(subItems),
                                                    index
                                                );
                                            }}>
                                            <Box display="flex" alignItems="center">
                                                <Icon
                                                    size={24}
                                                    width={24}
                                                    height={24}
                                                    color={menuColor}
                                                />

                                                <Typography
                                                    style={{
                                                        paddingLeft: 8,
                                                        color: menuColor
                                                    }}
                                                    component="span"
                                                    variant="body1">
                                                    {title}
                                                </Typography>
                                            </Box>

                                            {Array.isArray(subItems) && (
                                                <KeyboardArrowDownIcon
                                                    style={{
                                                        color: COLORS.grey4,
                                                        transition: '0.3s',
                                                        transform: `rotate(${
                                                            activeSubMenuIndex === index ? 180 : 0
                                                        }deg)`
                                                    }}
                                                />
                                            )}
                                        </S.NavbarListItemLink>
                                    </CustomLink>

                                    <Collapse in={activeSubMenuIndex === index}>
                                        {Array.isArray(subItems) &&
                                            subItems.map((subItem, subItemIndex) => {
                                                const isActiveSubItemLink =
                                                    subItem.link === router.pathname;

                                                return (
                                                    <S.NavbarListSubItem key={subItemIndex}>
                                                        <CustomLink href={subItem.link}>
                                                            <S.NavbarListSubItemItemLink
                                                                isActive={isActiveSubItemLink}>
                                                                <Typography
                                                                    style={{
                                                                        color: isActiveSubItemLink
                                                                            ? COLORS.info
                                                                            : COLORS.grey4
                                                                    }}
                                                                    variant="body2"
                                                                    component="span">
                                                                    {subItem.title}
                                                                </Typography>
                                                            </S.NavbarListSubItemItemLink>
                                                        </CustomLink>
                                                    </S.NavbarListSubItem>
                                                );
                                            })}
                                    </Collapse>
                                </S.NavbarListItem>
                            );
                        })}

                    <S.NavbarListItem>
                        <S.NavbarListItemLink onClick={handleLogout}>
                            <Box display="flex" alignItems="center">
                                <LogoutMenuIcon />

                                <Typography
                                    style={{
                                        paddingLeft: 8
                                    }}
                                    color={COLORS.danger}
                                    component="span"
                                    variant="body1">
                                    Log out
                                </Typography>
                            </Box>
                        </S.NavbarListItemLink>
                    </S.NavbarListItem>
                </S.NavbarList>
            </S.Navbar>

            <S.NavbarShadow
                isActiveMobileMenu={pageData.actionmenu === 'open'}
                onClick={handleHideMobileMenu}
            />
        </div>
    );
};

export default Navbar;
