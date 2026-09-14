import styled from '@emotion/styled';
import { SButtonContained } from '@/components/base/MButton/styled';
import { Grid, TextField, Typography, Button } from '@mui/material';
import { Box } from '@material-ui/core';

export const container = styled(Box)({
    padding: 24,
    maxWidth: '100%'
});

export const cardgrid = styled.div({
    flexGrow: 1,
    padding: '20px 0',
    width: '100%',
    alignContent: 'center',
    alignItems: 'center'
});

export const TableSearchInputField = styled.input({
    flex: '1',
    minWidth: '100px',
    outline: 'none',
    border: 'none',
    backgroundColor: 'inherit',
    textAlign: 'center'
});

export const cardContent = styled.div({
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto',
    width: '100%',
    fontFamily: 'Helvetica Neue !important'
});
export const carddashbord = styled.div({
    height: '135px',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    margin: 'auto',
    textAlign: 'center',
    alignItems: 'center'
});

export const divimg = styled.div({
    position: 'relative'
    //display: 'inline-block',
    // width:'100%',
    //  margin:'auto 0 0 31px'
});
export const divamountinput = styled.div({
    position: 'relative',
    width: '87%',
    marginLeft: '35px'
});
export const divamount = styled.div({
    position: 'absolute',
    top: 21,
    left: -35
});
export const imguser = styled.img({
    top: '13%',
    minWidth: '130px !important',
    height: '130px',
    borderRadius: '70px',
    position: 'absolute',
    display: 'block',
    //border: '1px solid #707070',
    //marginTop: '-40px',
    left: 0,
    //backgroundColor:'green',
    objectFit: 'cover',
    ['@media (max-width:1300px)']: {
        left: '-2px'
    },
    ['@media (max-width:1264px)']: {
        left: '-4px'
    },
    ['@media (max-width:1256px)']: {
        left: '-4px'
    },
    ['@media (max-width:1212px)']: {
        left: '-5px'
    },
    ['@media (max-width:1176px)']: {
        left: '-6px'
    },
    ['@media (max-width:1141px)']: {
        left: '-6px'
    },
    ['@media (max-width:1100px)']: {
        left: '-9px'
    },
    ['@media (max-width:1000px)']: {
        left: '-9px'
    },
    ['@media (max-width:800px)']: {
        top: '175px',
        left: '-21px'
    },
    ['@media (max-width:900px)']: {
        left: '-18px'
    },
    ['@media (max-width:500px)']: {
        top: '0',
        left: '0',
        position: 'inherit',
        minWidth: '130px !important',
        height: '130px',
        borderRadius: '10px',
        margin: '0 auto'
    }
});
export const card = styled.div({
    height: '200px',
    display: 'flex',
    flexDirection: 'column',
    width: '210px',
    margin: 'auto',
    backgroundColor: 'transparent',
    border: 'none !important',
    padding: '0 0 0 40px',
    ['@media (max-width:1141px)']: {
        padding: '0 0 0 50px'
    },
    ['@media (max-width:1100px)']: {
        padding: '0 0 0 50px'
    },
    ['@media (max-width:1000px)']: {
        padding: '0 0 0 70px'
    },
    ['@media (max-width:500px)']: {
        padding: '0',
        width: '100%'
    }
});
export const galery = styled.div({
    width: '75%',
    height: '75%',
    borderRadius: '20px !important',
    margin: '15px 0 0 0 '
});
export const detailbil = styled.div({
    margin: '10px 0 0 0',
    height: 'auto',
    minHeight: '150px',
    ['@media (max-width:800px)']: {
        margin: '10px 0 0 100px'
    },
    ['@media (max-width:500px)']: {
        margin: '10px 0 0 10px'
    }
});
export const imgcontainer = styled.div({
    width: '100%',
    position: 'relative',
    display: 'inline-block'
});
export const containerlogout = styled.div({
    position: 'relative',
    display: 'inline-block'
});
export const imgtext = styled.div({
    top: '32%',
    width: '100%',
    height: '30px',
    margin: '45px 0 0 0',
    position: 'absolute',
    backgroundColor: '#353a43d6',
    display: 'block',
    color: '#fff',
    textAlign: 'left',
    paddingLeft: '5px',
    padding: '4px 0 0 10px',
    fontFamily: 'Helvetica Neue',
    fontSize: '15px'
});
export const imgtexttop = styled.div({
    top: '-12%',
    width: '80px',
    height: '24px',
    margin: '45px 0px 0 0',
    position: 'absolute',
    // backgroundColor: '#353a43d6',
    display: 'block',
    color: '#fff',
    textAlign: 'center',
    paddingLeft: '3px',
    fontSize: '14px',
    right: '0',
    borderRadius: '5px 0 0 5px',
    fontFamily: 'Helvetica Neue',
    paddingTop: '2px'
});
export const cardproject = styled.div({
    display: 'flex',
    flexDirection: 'column',
    //margin:'30px 10px 10px 0',
    backgroundColor: 'transparent',
    border: 'none !important'
});
export const imgproduct = styled.img({
    width: '100% !important',
    height: '179px',
    display: 'block',
    border: '1px solid #707070',
    // backgroundColor:'green',
    // overflow:'hide',
    objectFit: 'cover'
});
export const title = styled.div({
    fontSize: '20px !important',
    fontWeight: '500 !important',
    fontFamily: 'Helvetica Neue',
    margin: '5px 2px 0 4px',
    color: '#21242F',
    width: '100%',
    height: '30px',
    overflow: 'hidden',
    textOverflow: 'ellipsis !important',
    display: 'inline-block',
    ['@media (max-width:500px)']: {
        wordBreak: 'break-word !important',
        fontSize: '16px !important'
    }
});
export const span = styled.div({
    fontSize: '16px !important',
    fontFamily: 'Helvetica Neue !important',
    margin: '7px 2px 17px 5px',
    color: '#747783',
    width: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis !important',
    display: 'inline-block',
    height: '30px'
});
export const Money = styled.div({
    color: '#3583eb',
    fontWeight: '500 !important',
    fontSize: '20px !important',
    textAlign: 'right',
    padding: '0 15px 0 0',
    fontFamily: 'Roboto !important',
    margin: '5px 0 0 0'
});
export const rowEditeUser = styled.div({
    margin: '20px 0 0 0',
    width: '100% !important'
});
export const rowstatecity = styled.div({
    width: '51% !important',
    float: 'right',
    marginBottom: '10px'
});
export const rowstatestate = styled.div({
    width: '49% !important',
    float: 'right',
    marginBottom: '10px'
});
export const modoldiv = styled.div({
    width: '100% !important'
});
export const fileuplod = styled.img({
    position: 'relative',
    objectFit: 'cover',
    width: '100%',
    ['@media (max-width:1200px)']: {
        height: '70px',
        objectFit: 'fill'
    },
    ['@media (max-width:800px)']: {
        height: '80px',
        objectFit: 'fill'
    },
    ['@media (max-width:600px)']: {
        height: '65px',
        objectFit: 'fill'
    },
    ['@media (max-width:500px)']: {
        height: '80px',
        objectFit: 'fill'
    },
    ['@media (max-width:400px)']: {
        height: '60px',
        objectFit: 'fill'
    },
    ['@media (max-width:350px)']: {
        height: '45px',
        objectFit: 'fill'
    }
});
export const EditProgect = styled.div({
    width: '70% !important',
    margin: '50px auto'
});
export const imageGalery = styled.div({
    width: '50% !important',
    float: 'left',
    margin: '0 auto !important',
    borderRadius: '5px',
    objectFit: 'cover',
    position: 'relative'
});

export const imageGalerybutton = styled.div({
    width: '32% !important',
    float: 'right',
    margin: '0 auto !important',
    borderRadius: '5px'
});
export const Galerybutton = styled.div({
    margin: '0 auto !important',
    borderRadius: '5px'
});
export const Editimagegalery = styled.div({
    width: '350px !important',
    marginTop: '36px auto',
    ['@media (max-width:1200px)']: {
        width: '85% !important'
    },
    ['@media (max-width:1000px)']: {
        width: '100% !important'
    },
    ['@media (max-width:800px)']: {
        width: '60% !important',
        marginTop: '-40px'
    },
    ['@media (max-width:500px)']: {
        width: '100% !important',
        marginTop: '-40px'
    },
    ['@media (max-width:350px)']: {
        width: '100% !important',
        marginTop: '-40px'
    }
});
export const Editimagegalerybutton = styled.div({
    width: '32% !important',
    margin: '20px auto',
    ['@media (max-width:800px)']: {
        width: '80% !important',
        margin: '30px auto'
    }
});
export const imgstar = styled.div({
    marginTop: '20px',
    width: '100%'
});
export const nextbutton = styled.div({
    top: '-27px',
    width: '7%',
    height: '30px',
    margin: '45px 0 0 0',
    position: 'absolute',
    // backgroundColor: '#353a4370',
    display: 'block',
    color: '#fff',
    zIndex: 1,
    ['@media (max-width:350px)']: {
        top: '-43px'
    },
    ['@media (max-width:400px)']: {
        top: '-35px'
    },
    ['@media (max-width:600px)']: {
        top: '-35px'
    }
});
export const prevbutton = styled.div({
    top: '-27px',
    width: '7%',
    height: '30px',
    margin: '45px 0 0 0',
    position: 'absolute',
    //backgroundColor: '#353a4370',
    display: 'block',
    color: '#fff',
    right: '114px',
    zIndex: 1,
    ['@media (max-width:1200px)']: {
        right: '160px'
    },
    ['@media (max-width:1100px)']: {
        right: '110px'
    },
    ['@media (max-width:1000px)']: {
        right: '113px'
    },
    ['@media (max-width:900px)']: {
        right: '105px'
    },
    ['@media (max-width:800px)']: {
        right: '125px'
    },
    ['@media (max-width:700px)']: {
        right: '110px'
    },
    ['@media (max-width:600px)']: {
        right: '94px',
        top: '-35px'
    },
    ['@media (max-width:500px)']: {
        right: '116px'
    },
    ['@media (max-width:400px)']: {
        right: '90px',
        top: '-35px'
    },
    ['@media (max-width:350px)']: {
        right: '76px',
        top: '-43px'
    }
});
export const chartbidsort = styled.div({
    top: '81%',
    width: '100%',
    position: 'absolute',
    display: 'block',
    color: '#213950',
    fontFamily: 'Roboto',
    fontSize: '15px',
    direction: 'rtl'
});
export const chartbids = styled.div({
    top: '-10%',
    width: '100%',
    position: 'absolute',
    display: 'block',
    color: '#213950',
    fontFamily: 'Roboto',
    fontSize: '15px'
});
export const activebids = styled.div({
    padding: '1px 0 0 10px',
    ['@media (max-width:500px)']: {
        display: 'none'
    }
});
export const selectdashbord = styled.div({
    float: 'right',
    width: '200px',
    ['@media (max-width:500px)']: {
        width: '100%'
    }
});
export const averageRate = styled.div({
    width: '50%',
    float: 'left',
    fontSize: '17px',
    fontFamily: 'Helvetica Neue',
    color: '#747783',
    ['@media (max-width:500px)']: {
        width: '13%',
        float: 'right'
    }
});
export const Review = styled.div({
    fontSize: '16px',
    textAlign: 'left',
    fontFamily: 'Helvetica Neue',
    color: '#747783',
    width: '100%',
    float: 'left',
    margin: '0 0 0 20px'
});
export const imggaleryedite = styled.img({
    width: '100%',
    height: '227px',
    borderRadius: '12px',
    ['@media (max-width:500px)']: {
        width: '100%'
    }
});
export const imggaleryeditenext = styled.img({
    width: '98%',
    height: '71px',
    borderRadius: '8px',

    ['@media (max-width:800px)']: {
        height: '77px'
    },
    ['@media (max-width:600px)']: {
        height: '60px'
    },
    ['@media (max-width:500px)']: {
        height: '77px'
    },
    ['@media (max-width:400px)']: {
        height: '57px'
    },
    ['@media (max-width:350px)']: {
        height: '44px'
    }
});
export const btnleft = styled.div({
    float: 'right',
    width: '50%',
    margin: '0 50px 0 50px',

    ['@media (max-width:800px)']: {
        float: 'left',
        width: '100%',
        margin: '0 '
    }
});
export const btnright = styled.div({
    width: '50%',
    margin: '0 50px 0 50px',

    ['@media (max-width:800px)']: {
        width: '100%',
        margin: '0 '
    }
});

export const deletediv = styled.div({
    margin: '18px 0 -75px 0',

    ['@media (max-width:900px)']: {
        margin: '18px 0 5px 0',

        width: '100%',
        margin: '0 '
    }
});

export const Titleccms = styled.div({
    fontSize: '20px',
    fontFamily: 'Poppins',
    margin: '20px 0 30px 20px',
    color: '#3B3B3B'
});
export const Titleccms20 = styled.div({
    fontSize: '20px',
    fontFamily: 'Poppins',
    margin: '-4px 10px 10px 10px',
    height: '60px',
    color: '#3B3B3B'
});
export const Titledashbord = styled.div({
    fontSize: '28px',
    fontFamily: 'Poppins',
    margin: '20px 10px 10px 15px'
});
export const Titleccms16 = styled.div({
    fontSize: '16px',
    fontFamily: 'Poppins',
    margin: '2px 10px 10px 10px',
    color: '#828282',
    float: 'right'
});
export const Titleccms28 = styled.div({
    fontSize: '28px',
    fontFamily: 'Poppins',
    margin: '10px 10px 0 10px',
    float: 'right'
});
export const Seemore = styled.div({
    fontSize: '14px',
    fontFamily: 'Poppins',
    margin: '0 0 10px 10px',
    color: '#409FFF',
    cursor: 'pointer'
});
export const CustomInputSearch = styled(TextField)({
    border: '0px none',
    '& .MuiOutlinedInput-root': {
        '& .MuiInputBase-input': {
            marginTop: '0px',
            color: '#213950'
        }
    }
});
export const MyButton = styled(Button)({
    backgroundColor: '#fff',
    border: '1px solid #E8E8E8',
    color: '#2B368F !important',
    fontFamily: 'Poppins',
    fontSize: '15px',
    borderRadius: '8px',
    padding: '10px 0',
    width: '130px',
    direction: 'rtl',

    '&:hover': {
        backgroundColor: '#fff',
        color: '#2B368F'
    }
});
export const CancelButton = styled(Button)({
    padding: '10px 0',
    color: '#fff',
    fontFamily: 'Poppins',
    fontSize: '15px',
    borderRadius: '8px',
    margin: '0 0 0 0 ',
    width: '130px',
    direction: 'rtl',
    ':hover': {
        color: '#fff'
    }
});
export const step = styled.div({
    width: '100px',
    margin: '0 auto'
});
export const iconstep = styled.div({
    width: '25%',
    margin: '0 auto',
    float: 'left'
});

export const modalFormRowWrapper = styled(Box)({});

export const modalFormRowFieldWrapper = styled(Box)({});

export const modalbox = styled(Box)({
    width: 450,
    maxWidth: '99%',
    overflowX: 'hidden',
    ['@media (max-width:500px)']: {
        minWidth: '100%'
    }
});

export const Statues = styled(Box)({
    minWidth: 76,
    height: 32,
    borderRadius: 4,
    textAlign: 'center',
    fontSize: 12,
    fontFamily: 'Poppins'
});
export const textdetail = styled(Box)({
    width: '95%',
    textAlign: 'left',
    fontSize: 16,
    margin: '10px 5px 30px 10px',
    fontFamily: 'Poppins',
    color: '#3B3B3B',
    // whiteSpace: 'initial',
    wordWrap: 'break-word',
    border: '1px solid #C3C3C3',
    backgroundColor: '#E5E7EF',
    height: 46,
    borderRadius: 4,
    padding: '9px 0 0 3px',
    textOverflow: 'ellipsis !important',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
});
export const titledetail = styled(Box)({
    width: '100%',
    textAlign: 'left',
    fontSize: 16,
    fontFamily: 'Poppins',
    margin: '10px 0 10px 10px',
    color: '#4F4F4F'
});
export const headdetail = styled(Box)({
    width: '100%',
    textAlign: 'left',
    fontSize: 16,
    fontFamily: 'Poppins',
    margin: '10px 0 20px 3px',
    color: '#3B3B3B',
    fontWeight: 'bold'
});
export const tiltelhead = styled(Box)({
    float: 'left',
    width: 'auto',
    margin: '0 5px 0 0'
});
export const hrhead = styled(Box)({
    padding: '11px 0 11px 0'
});
export const label = styled.div({
    fontSize: '14px',
    fontFamily: 'Poppins',
    margin: '2px 10px 10px 0',
    color: '#4F4F4F',
    float: 'left'
});
export const containerflex = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignItems: 'center',
    width: '100%',
    margin: '10px 0 10px 0'
});
export const divflex = styled(Box)({
    //flexBasis: '20%',
    // margin: '5px',
    height: '120px',
    maxWidth: '120px'
    // minWidth: '120px'
});
export const carddashbordadmin = styled(Box)({
    height: '210px',
    border: '1px solid #E8E8E8',
    borderRadius: '8px',
    margin: '5px',
    width: '198px'
});
export const carddashbordadminGrid = styled(Box)({
    height: '410px',
    border: '1px solid #E8E8E8',
    borderRadius: '8px',
    margin: '5px',
    width: '48%',
    ['@media (max-width:500px)']: {
        width: '99%',
        height: 'auto'
    }
});

export const rowgrid = styled(Box)({
    width: '100%'
});
export const imageGrid = styled.img({
    height: '40px',
    borderRadius: '8px',
    margin: '5px',
    width: '40px'
});
export const boxGrid = styled(Box)({
    height: '50px',
    width: '55%',
    alignItems: 'center',
    margin: '0 0 0 10px',
    paddingTop: '5px'
});
export const boxmobilGrid = styled(Box)({
    height: '50px',
    width: '27%',
    alignItems: 'center',
    margin: '0 0 0 10px',
    paddingTop: '5px',
    overflow: 'hidden'
});
export const fulnameGrid = styled(Box)({
    fontSize: '16px',
    fontFamily: 'Poppins',
    color: '#3B3B3B',
    width: '100%',
    alignItems: 'center'
});
export const dateGrid = styled(Box)({
    fontSize: '14px',
    width: '100%',
    fontFamily: 'Poppins',
    color: '#7A7A7A'
});
export const containerdashbord = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    width: '100%'
});
export const boxsubject = styled(Box)({
    width: '70%'
});
export const boxmore = styled(Box)({
    width: '30%',
    margin: '30px 0 10px 0'
});
export const cellpage = styled(Box)({
    flex: 1,
    width: 200,
    minWidth: 100,
    ['@media (max-width:500px)']: {
        flex: '0 100%'
    }
});
export const cellvalid = styled(Box)({
    flex: 1
});
export const rowpage = styled(Box)({
    display: 'flex',
    width: '100%',
    padding: '0 0 0 5px',
    flexDirection: 'row',
    flexWrap: 'wrap'
});

export const ResetButton = styled(Button)({
    color: '#487A9D',
    fontFamily: 'Poppins',
    fontSize: '14px'
});
export const boxReset = styled(Box)({
    flexGrow: 1
});
export const boxinput = styled(Box)({
    width: 140,
    margin: '0 5px 0 0'
});
export const boxinputflat = styled(Box)({
    width: 110,
    margin: '0 5px 0 0'
});

export const modalButtonGroup = styled(Box)({
    display: 'flex',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 32,
    '& > *': {
        '&:not(:first-child)': {
            marginRight: '24px !important'
        }
    }
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
    margin: '20px 0 20px 88px'
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
export const CustomDiv = styled('div')({
    ['@media (max-width:950px)']: {
        minWidth: 0,
        minHeight: 0
    },
    width: '9vw',
    height: '25px',
    overflow: 'hidden',
    textAlign: 'left',
    alignItems: 'left',
    margin: '0 auto',
    float: 'left',
    textOverflow: 'ellipsis !important',
    whiteSpace: 'nowrap'
});
export const lablelselect = styled('div')({
    color: '#3b3b3b',
    fontFamily: 'Poppins',
    fontSize: '14px',
    marginLeft: 10,
    width: 'auto',
    float: 'left'
});
export const lablelstar = styled('div')({
    color: '#ec5757',
    fontFamily: 'Poppins',
    fontSize: '14px',
    width: 'auto',
    float: 'left',
    marginLeft: 4
});
export const boxcomples = styled(Box)({
    width: '98%',
    minHeight: 45,
    backgroundColor: '#f8f8f8',
    borderRadius: '8px',
    padding: '10px 0 0 10px'
});
