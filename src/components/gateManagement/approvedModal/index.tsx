import COLORS from '@/utils/theme/colors';
import { Box, Button, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { closeModal, newModal } from 'src/redux/actions/actions';
import * as S from './approvedModal.style';

const GateManagementApprovedModal = ({ data: { securityCode } }) => {
    const dispatch = useDispatch();

    const handleCancel = () => {
        dispatch(closeModal(GateManagementApprovedModal.name));
    };

    return (
        <Box style={{ width: 450, maxWidth: '100%' }}>
            <Box display="flex" justifyContent="center">
                <img src="/images/tick.png" alt="" />
            </Box>

            <Typography
                variant="h5"
                color={COLORS.success}
                textAlign="center"
                style={{ marginTop: 24 }}>
                Approved
            </Typography>

            <Box marginTop="48px">
                <Typography variant="body1" textAlign="center">
                    Access code
                </Typography>

                <S.CodeBoxWrapper>
                    <Typography variant="body1" textAlign="center">
                        {securityCode}
                    </Typography>
                </S.CodeBoxWrapper>
            </Box>

            <Box marginTop="45px" display="flex" justifyContent="center">
                <Button variant="contained" color="primary" onClick={handleCancel}>
                    Ok
                </Button>
            </Box>
        </Box>
    );
};

const handleShowGateManagementApprovedModal = (securityCode: number) => {
    return newModal({
        Body: GateManagementApprovedModal,
        id: GateManagementApprovedModal.name,
        data: {
            securityCode
        }
    });
};

export default handleShowGateManagementApprovedModal;
