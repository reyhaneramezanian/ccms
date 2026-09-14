import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { closeModal } from 'src/redux/actions/actions';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material';
import Icon from 'src/assets/icons/Tick';

const CustomParent = styled('div')({
    display: 'flex',
    alignItems: 'center'
});
const CustomDivColumn = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 40
});

export const SUCCESS_MAIL_ID = 'SUCCESS_MAIL_ID';
function SuccessEmailModal() {
    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(() => {
            dispatch(closeModal(SUCCESS_MAIL_ID));
        }, 5000);
    }, []);

    return (
        <CustomParent>
            <Icon />
            <CustomDivColumn>
                <Typography
                    component="span"
                    style={{
                        fontFamily: 'Poppins',
                        fontSize: '16px',
                        color: '#3E205A',
                        marginTop: '-20px'
                    }}>
                    Please check your email!
                </Typography>
                <Typography
                    component="span"
                    style={{
                        fontFamily: 'Poppins',
                        fontSize: '16px',
                        maxWidth: '77%',
                        color: '#3E205A',
                        marginTop: 10
                    }}>
                    We sent you a link to reset your password
                </Typography>
            </CustomDivColumn>
        </CustomParent>
    );
}

export default SuccessEmailModal;
