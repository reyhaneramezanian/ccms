import { Button, Box } from '@mui/material';
import { styled } from '@mui/system';

export const SignUpButton = styled(Button)<{ isActive: boolean }>(({ isActive }) => ({
    minWidth: isActive ? 290 : 190,
    display: isActive ? 'block' : '',
    margin: isActive ? '0 auto' : '0 10px 0 0',
    marginTop: 50,
    marginBottom: 64 - 24
}));
export const BackButton = styled(Button)({
    minWidth: 190,
    // display: 'block',
    //  margin: '0 auto',
    marginRight: 10,
    marginTop: 50,
    marginBottom: 64 - 24
});
export const BoxButton = styled(Box)({ margin: '0 auto', width: '100%', textAlign: 'center' });
export const cellpage = styled(Box)({
    flex: 1,
    '@media(max-width:500px)': {
        margin: '-17px 0 10px 0'
    }
});
export const cellpagetext = styled(Box)({
    width: 300,
    textAlign: 'right',
    '@media(max-width:500px)': {
        width: 268,
        margin: '-17px 0 10px 0'
    }
});
export const rowpage = styled(Box)({
    display: 'flex',
    width: '100%',
    padding: '0 0 0 0px',
    flexDirection: 'row',
    margin: '0 auto'
});
export const Authsingup = styled(Box)({
    fontSize: 16,
    fontFamily: 'Poppins',
    margin: '10px 0 0 20px',
    cursor: 'pointer',
    color: '#243859'
});
export const Authsingupabi = styled(Box)({
    fontSize: 16,
    fontFamily: 'Poppins',
    cursor: 'pointer',
    margin: '10px 0 0 3px',
    color: '#487A9D'
});
