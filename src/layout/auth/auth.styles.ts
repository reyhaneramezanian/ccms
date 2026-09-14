import CardPage from '@/components/cardPage';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import mediaScreen from '@/provider/media';
export const AuthLayoutWrapper = styled(Box)({
    //minHeight: '100vh',
    display: 'flex',
    justifyContent: 'space-between',
    // alignItems: 'center',
    maxWidth: 1220,
    margin: '0 auto',
    padding: '3px 0',
    [mediaScreen('md')]: {
        display: 'revert'
    }
});

export const AuthLayoutSlider = styled(Box)({
    width: 600,
    minHeight: 400,
    position: 'relative',
    objectFit: 'fill',
    padding: '25px 0',
    [mediaScreen('md')]: {
        width: '100%'
    }
});

export const AuthLayoutCard = styled(CardPage)({
    width: 498,
    [mediaScreen('md')]: {
        width: '100%'
    }
});

export const SignInTitle = styled(Typography)({
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 50,
    marginTop: 40 - 24
});
export const Authsingup = styled(Box)({
    fontSize: 16,
    fontFamily: 'Poppins',
    margin: '30px 0 0 20px',
    cursor: 'pointer',
    color: '#243859'
});
export const Authsingupabi = styled(Box)({
    fontSize: 16,
    fontFamily: 'Poppins',
    cursor: 'pointer',
    margin: '30px 0 0 -45px',
    color: '#487A9D'
});
export const cellpage = styled(Box)({
    flex: 1
});
export const rowpage = styled(Box)({
    display: 'flex',
    width: '100%',
    padding: '0 0 0 0px',
    flexDirection: 'row'
});
export const Item = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 250,
    width: '100%',
    margin: 15
});
