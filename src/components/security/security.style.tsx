import styled from '@emotion/styled';
import { SButtonContained } from '@/components/base/MButton/styled';
import { Grid, TextField, Typography, Button, Box } from '@mui/material';

export const card = styled.div({
    flexGrow: 1,
    padding: '20px 0',
    width: '90%',
    borderRadius: '8px',
    backgroundColor: '#F2F3F7',
    margin: '10px 0 20px 18px'
});
export const Titledashbord = styled.div({
    fontSize: '28px',
    fontFamily: 'Poppins',
    margin: '20px 10px 10px 15px'
});
export const boxReset = styled(Box)({
    flexGrow: 1
});
export const ResetButton = styled(Button)({
    color: '#487A9D',
    fontFamily: 'Poppins',
    fontSize: '14px'
});
export const Titledate = styled.div({
    margin: '15px 10px 10px 20px',
    width: '100%'
});
export const Textdate = styled.div({
    fontSize: '16px',
    fontFamily: 'Poppins',
    margin: '0 0 0 10px',
    float: 'left'
});
export const imgdate = styled.div({
    float: 'left'
});
export const Titlecard = styled.div({
    margin: '0 10px 10px 20px',
    width: '100%',
    fontSize: '20px',
    fontFamily: 'Poppins',
    paddingTop: '35px'
});
export const Textcard = styled.div({
    margin: '0 10px 10px 20px',
    width: '91%',
    height: '83px',
    overflow: 'hidden',
    fontSize: '16px',
    fontFamily: 'Poppins',
    padding: '10px 0 15px 0',
    wordWrap: 'break-word'
});
export const containerflex = styled(Box)({
    display: 'flex'
});
export const divflex = styled(Box)({
    flexBasis: '120px',
    margin: '5px'
});
export const modalbox = styled(Box)({
    width: 450,
    maxWidth: '99%',
    overflowX: 'hidden',
    ['@media (max-width:500px)']: {
        minWidth: '100%'
    }
});
export const modalButtonGroup = styled(Box)({
    display: 'flex',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginRight: -24,
    marginTop: 32,
    '& > *': {
        marginRight: '24px !important'
    }
});
export const modalFormRowWrapper = styled(Box)({});

export const modalFormRowFieldWrapper = styled(Box)({});
export const cellpage = styled(Box)({
    flex: 1,
    width: 200,
    ['@media (max-width:500px)']: {
        flex: '0 100%'
    }
});
export const rowpage = styled(Box)({
    display: 'flex',
    width: '100%',
    padding: '0 0 0 5px',
    flexDirection: 'row',
    flexWrap: 'wrap'
});

export const profileheader = styled(Box)({
    display: 'flex',
    width: '90%',
    padding: '20px ',
    flexDirection: 'row'
});
export const editeimage = styled(Box)({
    position: 'relative',
    top: 26,
    right: -62
});
export const image = styled(Box)({
    position: 'absolute',
    top: 72
});
export const profilenameuser = styled(Box)({
    color: '#3B3B3B',
    fontFamily: 'Poppins',
    fontSize: '28px',
    alignItems: 'center',
    margin: '20px 0 20px 100px'
});

export const profileimguser = styled.img({
    width: '80px',
    height: '80px',
    borderRadius: '8px',
    '&:hover': {
        opacity: '0.3'
    }
});
export const profileimguserMiddle = styled.img({
    transition: '.5s ease',
    opacity: 0,
    position: 'absolute',
    top: '60%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    width: 30,
    height: 30,
    '&:hover': {
        opacity: '1'
    }
});
export const rowprofile = styled(Box)({
    display: 'flex',
    width: '90%',
    padding: '0 0 0 10px',
    flexDirection: 'row'
});
export const containerprofile = styled(Box)({
    //display: 'flex',
    width: '100%',
    minHeight: 700,
    backgroundColor: '#fff',
    borderRadius: '8px'
});
