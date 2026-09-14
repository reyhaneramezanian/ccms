import mediaScreen from '@/provider/media';
import COLORS from '@/utils/theme/colors';
import { styled } from '@mui/system';

export const Navbar = styled('nav')<{ isActiveMobileMenu: boolean }>(({ isActiveMobileMenu }) => ({
    [mediaScreen('md')]: {
        visibility: isActiveMobileMenu ? 'initial' : 'collapse',
        position: 'fixed',
        left: isActiveMobileMenu ? 0 : '-100%',
        top: 0,
        transition: '0.3s',
        backgroundColor: COLORS.secondary,
        zIndex: 5,
        overflow: 'auto',
        height: '100%',
        padding: '15px',
        borderRadius: '0 12px 12px 0'
    }
}));

export const NavbarShadow = styled('div')<{ isActiveMobileMenu: boolean }>(
    ({ isActiveMobileMenu }) => ({
        [mediaScreen('md')]: {
            visibility: isActiveMobileMenu ? 'initial' : 'collapse',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: isActiveMobileMenu ? 1 : 0,
            transition: '0.3s',
            zIndex: 4,
            backgroundColor: 'rgba(000, 000, 000, 0.4)'
        }
    })
);

export const NavbarList = styled('ul')({
    listStyle: 'none',
    marginTop: -27,
    [mediaScreen('lg', 'min')]: {
        position: 'sticky',
        left: 0,
        top: 20,
        width: '100%'
    }
});

export const NavbarListItem = styled('li')<{ isActive?: boolean }>(({ isActive }) => ({
    marginTop: 27,
    backgroundColor: isActive ? COLORS.white : 'transparent',
    borderRadius: 8,
    boxShadow: isActive ? '-2px 2px 1px #00000008' : 'none',
    transition: '0.3s'
}));

export const NavbarListItemLink = styled('a')({
    height: 56,
    padding: '0 16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    textDecoration: 'none',
    cursor: 'pointer'
});

export const NavbarListSubItem = styled('ul')({
    marginTop: 8,
    marginBottom: 25.5,
    listStyle: 'none'
});

export const NavbarListSubItemItem = styled('li')({
    marginTop: 28
});

export const NavbarListSubItemItemLink = styled('a')<{ isActive: boolean }>(({ isActive }) => ({
    padding: '0 40px',
    position: 'relative',
    '::before': {
        content: '""',
        width: 8,
        height: 8,
        borderRadius: '50%',
        backgroundColor: isActive ? COLORS.info : COLORS.grey4,
        position: 'absolute',
        top: '50%',
        left: 16,
        transform: 'translateY(-50%)'
    }
}));
