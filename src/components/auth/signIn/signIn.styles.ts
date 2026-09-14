import { Button } from '@mui/material';
import { styled } from '@mui/system';
import { Box, Typography } from '@mui/material';
import mediaScreen from '@/provider/media';

export const SignInButton = styled(Button)({
    minWidth: 290,
    margin: '0 auto',
    display: 'block',
    marginBottom: 60 - 24,
    marginTop: 22
});
export const cellpage = styled(Box)({
    flex: 1
});
export const cellpagetext = styled(Box)({
    width: 300,
    textAlign: 'right',
    [mediaScreen('md')]: {
        width: 250
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
    margin: '10px 0 0 0px',
    color: '#487A9D'
});
