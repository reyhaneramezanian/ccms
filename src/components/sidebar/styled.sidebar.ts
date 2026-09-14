import { Box, styled, TextField, Typography } from '@mui/material';

export const Container = styled(Box)(({ theme }) => ({
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.palette.primary.main,
    overflow: 'auto',
    color: 'white',
    padding: '40px 0'
}));

export const ProfileInfoContainer = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    padding: '0 16px'
});

export const SideBarList = styled('ul')(({ theme }) => ({
    listStyle: 'none',
    padding: '0',
    margin: '0'
}));

export const SideBarItem = styled('li')<{ isActive: boolean }>(({ isActive }) => ({
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    background: isActive ? 'linear-gradient(to right, #DDBFFA , transparent)' : 'transparent',
    '& a': {
        textDecoration: 'none'
    }
}));

export const SideBarItemContainer = styled('div')({
    display: 'flex',
    color: 'white',
    padding: '0 16px',
    '& svg': {
        alignSelf: 'center'
    }
});

export const ItemName = styled(Typography)({
    fontSize: 18,
    fontFamily: 'Helvetica',
    marginLeft: 15
});

export const CustomInputSearch = styled(TextField)({
    width:'100%',
    marginTop:'25px',
    padding: '0 16px',
    "& .MuiOutlinedInput-root":{
        borderRadius:'25px',
    backgroundColor:'#D5C2E7',
    "& .MuiInputBase-input":{
    marginTop:'5px',
    color:'#A587C2',
    },
    "& fieldset": {
        borderColor: "#D5C2E7",
    },
    "&.Mui-focused fieldset": {
        borderColor: "#D5C2E7",
    }
}
});