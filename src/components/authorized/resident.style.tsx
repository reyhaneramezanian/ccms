import styled from '@emotion/styled';
import { SButtonContained } from '@/components/base/MButton/styled';
import { Grid, TextField, Typography, Button, Box } from '@mui/material';
import COLORS from '@/utils/theme/colors';
import { grid } from '@mui/system';

export const ApprovalTypeListWrapper = styled(Box)({
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    justifyItems: 'center',
    marginTop: 35
});

export const textdetail = styled(Box)({
    width: '96%',
    textAlign: 'left',
    fontSize: 16,
    margin: '10px 5px 30px 10px',
    fontFamily: 'Poppins',
    color: '#3B3B3B',
    whiteSpace: 'initial',
    wordWrap: 'break-word',
    border: '1px solid #C3C3C3',
    backgroundColor: '#E5E7EF',
    height: 46,
    borderRadius: 4,
    padding: '9px 0 0 3px'
});
export const titledetail = styled(Box)({
    width: '100%',
    textAlign: 'left',
    fontSize: 16,
    fontFamily: 'Poppins',
    margin: '10px 0 10px 10px',
    color: '#4F4F4F'
});
export const ApprovalTypeListItem = styled(Box)({
    '&>*': {
        cursor: 'pointer'
    }
});

export const ApprovalTypeListItemCircle = styled(Box)<{ isActive: boolean }>(({ isActive }) => {
    return {
        width: 80,
        height: 80,
        borderRadius: '50%',
        border: `1px solid ${isActive ? COLORS.primary : COLORS.grey3}`,
        backgroundColor: isActive ? COLORS.primary : COLORS.white,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8
    };
});

export const card = styled.div({
    flexGrow: 1,
    padding: '20px 0',
    width: '90%',
    borderRadius: '8px',
    backgroundColor: '#F2F3F7',
    margin: '20px 0 20px 18px',
    height: 245
});
export const Titledashbord = styled.div({
    fontSize: '24px',
    fontFamily: 'Poppins',
    margin: '10px 10px 10px 15px'
});
export const Title = styled.div({
    fontSize: '20px',
    fontFamily: 'Poppins',
    margin: '25px 10px 10px 15px'
});
export const Titledate = styled.div({
    margin: '15px 10px 10px 15px',
    width: '100%'
});
export const Textdate = styled.div({
    fontSize: '14px',
    fontFamily: 'Poppins',
    margin: '0 0 0 3px',
    float: 'left',
    fontWeight: 'bold'
});
export const imgdate = styled.div({
    float: 'left'
});
export const Titlecard = styled.div({
    margin: '0 10px 5px 15px',
    width: '100%',
    fontSize: '18px',
    fontFamily: 'Poppins',
    paddingTop: '35px'
});
export const Textcard = styled.div({
    margin: '0 10px 5px 15px',
    width: '91%',
    height: '77px',
    overflow: 'hidden',
    fontSize: '14px',
    fontFamily: 'Poppins',
    padding: '10px 0 15px 0',
    wordWrap: 'break-word'
});
export const cardguick = styled.div({
    padding: '20px',
    width: '90%',
    borderRadius: '8px',
    backgroundColor: '#487A9D',
    margin: '10px 0 20px 18px',
    height: '73px',
    cursor: 'pointer'
});
export const imgcardguick = styled.div({
    float: 'left'
});
export const Textcardguick = styled.div({
    fontSize: '16px',
    fontFamily: 'Poppins',
    margin: '0 0 0 10px',
    float: 'left',
    color: '#fff'
});
export const Textall = styled.div({
    fontSize: '14px',
    fontFamily: 'Poppins',
    margin: '8px 0 0 15px',
    float: 'left'
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
    backgroundColor: '#487A9D',
    padding: '10px 0',
    color: '#fff',
    fontFamily: 'Poppins',
    fontSize: '15px',
    borderRadius: '8px',
    margin: '0 0 0 0 ',
    width: '130px',
    direction: 'rtl',
    ':hover': {
        backgroundColor: '#487A9D',
        color: '#fff'
    }
});
export const managelist = styled.div({
    width: '80%',
    margin: '30px auto'
});
export const managebox = styled.div({
    width: '33%',
    padding: '20px 0 20px 30px',
    float: 'left'
});
export const seemore = styled.div({
    direction: 'rtl',
    fontSize: '16px',
    fontFamily: 'Poppins',
    color: '#487A9D',
    margin: '23px 25px 0 0',
    cursor: 'pointer'
});
export const modalButtonGroup = styled(Box)({
    display: 'flex',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginRight: -24,
    marginTop: 32,
    '& > *': {
        marginRight: 24
    }
});
export const modalFormRowWrapper = styled(Box)({});

export const modalFormRowFieldWrapper = styled(Box)({});
export const modalFormRowFieldWrapperhalf = styled(Box)({
    display: 'flex',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    flexWrap: 'wrap'
});
export const modalFormRowFieldhalfright = styled(Box)({
    flex: 1,
    width: '48%',
    marginLeft: '7px'
});
export const modalFormRowFieldhalfleft = styled(Box)({
    flex: 1,
    width: '48%',
    marginRight: '7px'
});
export const modalbox = styled(Box)({
    width: 450,
    maxWidth: '99%',
    overflowX: 'hidden',
    ['@media (max-width:500px)']: {
        width: '99%'
    }
});
export const textsucsess = styled(Box)({
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: '16px',
    marginTop: '10px'
});
export const titelsucsess = styled(Box)({
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: '24px',
    margin: '10px 0 50px 0',
    alignItems: 'center'
});
export const code = styled(Box)({
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: '16px',
    margin: '20px auto',
    backgroundColor: '#F2F3F7',
    borderRadius: 8,
    height: 48,
    width: 155,
    padding: '13px 0 0 0'
});
export const line = styled.div({
    backgroundColor: '#E6E6E6',
    height: 1,
    width: '100%'
});
export const textpay = styled(Box)({
    textAlign: 'left',
    fontFamily: 'Poppins',
    fontSize: '16px',
    margin: '10px 5px 10px 0',
    color: '#636363'
});

export const modalFormRowFieldpay = styled(Box)({
    display: 'flex'
});
export const modalFormRowFieldhalfcenterpay = styled(Box)({
    flexGrow: 1
});
export const btnpay = styled(Box)({
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: '14px',
    margin: '20px auto',
    backgroundColor: '#fff',
    borderRadius: 8,
    height: 48,
    width: 130,
    padding: '13px 0 0 0',
    border: '1px solid #F2F3F7'
});
export const btnaddpay = styled(Box)({
    position: 'relative',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: '14px',
    margin: '20px auto',
    backgroundColor: '#fff',
    borderRadius: 8,
    height: 48,
    width: '100%',
    padding: '13px 0 0 0',
    border: '1px solid #F2F3F7'
});
export const minezpay = styled.div({
    top: '13%',
    minWidth: '130px !important',
    position: 'absolute',
    display: 'block',
    left: '-25px'
});
export const pluspay = styled.div({
    top: '13%',
    minWidth: '130px !important',
    position: 'absolute',
    display: 'block',
    right: '-25px'
});
export const Buttonchargpay = styled(Button)({
    backgroundColor: '#487A9D',
    padding: '10px 0',
    color: '#fff',
    fontFamily: 'Poppins',
    fontSize: '15px',
    borderRadius: '8px',
    margin: '0 0 0 0 ',
    width: '164px',
    direction: 'rtl',
    ':hover': {
        backgroundColor: '#487A9D',
        color: '#fff'
    }
});

export const Buttonpayhistory = styled(Button)({
    backgroundColor: '#487A9D',
    padding: '10px 0',
    color: '#fff',
    fontFamily: 'Poppins',
    fontSize: '15px',
    borderRadius: '8px',
    margin: '0 0 0 0 ',
    width: '196px',
    direction: 'rtl',
    ':hover': {
        backgroundColor: '#487A9D',
        color: '#fff'
    }
});

export const profileheader = styled(Box)({
    display: 'flex',
    width: '90%',
    padding: '20px ',
    flexDirection: 'row'
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
export const profilenameuser = styled(Box)({
    color: '#3B3B3B',
    fontFamily: 'Poppins',
    fontSize: '28px',
    alignItems: 'center',
    margin: '20px 0 20px 100px'
});
export const profiletabe = styled(Box)({
    width: '96%',
    margin: '20px'
});
export const container = styled(Box)({
    //display: 'flex',
    width: '100%',
    minHeight: 700,
    backgroundColor: '#fff',
    borderRadius: '8px'
});
export const cellprofile = styled(Box)({
    flex: 1
});

export const rowprofile = styled(Box)({
    display: 'flex',
    width: '90%',
    padding: '0 0 0 10px',
    flexDirection: 'row'
});
export const label = styled.div({
    fontSize: '14px',
    fontFamily: 'Poppins',
    margin: '2px 10px 10px 0',
    color: '#4F4F4F',
    float: 'left'
});
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
    padding: '0 0 0 10px',
    flexDirection: 'row',
    flexWrap: 'wrap',
    fontSize: '14px',
    fontFamily: 'Poppins'
});

export const cellcheckbox = styled(Box)({
    flex: 'none',
    padding: '0 0 0 20px'
});
export const boxmonth = styled(Box)({
    margin: '20px 0 0 15px',
    border: '1px solid #E8E8E8',
    borderRadius: 8,
    display: 'flex',
    width: '96%',
    height: 70,
    alignItems: 'center',
    padding: '0 0 0 15px'
});
export const inputpayment = styled(Box)({
    backgroundColor: '#F2F3F7',
    height: 48,
    width: '90%',
    borderRadius: 8,
    padding: '12px 0 0 7px',
    margin: '10px 5px 10px 0',
    minWidth: 144
});

export const cabbox = styled(Box)({
    backgroundImage: '/images/cab'
});
export const visitorbox = styled(Box)({
    backgroundImage: '/images/visitor'
});
export const deliverybox = styled(Box)({
    backgroundImage: '/images/delevery'
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
export const btndeleteacount = styled(Box)({
    color: '#E63C49',
    fontSize: '16px',
    fontFamily: 'Poppins',
    marginBottom: '30px',
    borderBottom: '1px solid #E63C49'
});
export const departmentscrol = styled(Box)({
    width: 'auto',
    height: 70,
    overflowX: 'scroll',
    overflowY: 'hidden'
});
export const btndepartment = styled(Box)({
    border: '1px solid #707070',
    borderRadius: 8,
    height: 48,
    minWidth: 100,
    margin: '5px',
    padding: '10px 0 0 0',
    textAlign: 'center',
    cursor: 'pointer',
    float: 'left'
});
export const boxtitledashbord = styled(Box)({
    borderRadius: '8px',
    fontSize: '16px',
    fontFamily: 'Poppins',
    color: '#fff',
    padding: '10px 3px 0 3px',
    height: 45,
    margin: '0 10px 0 0',
    textAlign: 'center',
    overflow: 'hidden',
    textOverflow: 'ellipsis !important',
    whiteSpace: 'nowrap'
});
export const boxpropertytitle = styled(Box)({
    width: '100%'
});
export const boxproperty = styled(Box)({
    width: '96%',
    height: 45,
    borderRadius: 8,
    backgroundColor: '#F2F3F7',
    padding: 10,
    margin: '5px 0 20px 0'
});
