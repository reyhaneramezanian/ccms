import { Box, styled } from '@mui/material';
export const NavBarContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    columnGap: '40px',
    position: 'fixed',
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: '#FCFCFC',
    height: 70,
    padding: '10px 50px',
    zIndex: 2,
    border: '1px solid #707070',
    '@media (max-width: 650px)': {
        padding: '0px 10px',
        columnGap: '10px'
    },
    '@media(max-width: 900px)': {
        border: 'none'
    }
});
export const NavbarModalContainer = styled('div')({
    position: 'fixed',
    top: '0%',
    right: 50,
    backgroundColor: '#FFFFFF',
    boxShadow: '2px 2px 5px #ADADAD33',
    border: '0.5px solid #E0E0E0',
    minWidth: 50,
    minHeight: 50,
    '@media(max-width: 650px)': {
        right: 10
    }
})
export const ModalUL = styled('ul')({
    listStyle: 'none',
    margin: 0,
    padding: 0
})
export const ModalLI = styled('li')({
    display: 'flex',
    alignItems: 'center',
    padding: 15,
    cursor: 'pointer'
})
export const NavbarLinkContainer = styled(Box)(({showInMobileView}: {showInMobileView: boolean}) => ({
    '@media(max-width: 900px)': {
        display: showInMobileView ? 'unset' : 'none'
    }
}))
export const SearchContainer = styled(Box)(({
    '@media(max-width: 900px)': {
        width: 44,
        height: 44,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid #EDEDED',
        borderRadius: 10,
    }
}))
export const MobileViewItem = styled(Box)({
    display: 'flex',
    alignItems: 'baseline',
    '@media(min-width: 900px)': {
        display: 'none'
    }
})
export const TypeMenuContainer = styled(Box)({
    borderRadius: 10,
    padding: 0,
    margin: 0,
    position: 'absolute',
    background: 'white',
    boxShadow: '0px 0px 15px -5px rgba(0,0,0,0.5)',
    minWidth: 209
})
export const TypeMenuItemContainer = styled(Box)({
    padding: 15
})









