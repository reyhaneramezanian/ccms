import COLORS from '@/utils/theme/colors';
import { Box, Button, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { closeModal, newModal } from 'src/redux/actions/actions';

const GateManagementRejectedModal = () => {
    const dispatch = useDispatch();

    const handleCancel = () => {
        dispatch(closeModal(GateManagementRejectedModal.name));
    };

    return (
        <Box style={{ width: 450, maxWidth: '100%' }}>
            <Box display="flex" justifyContent="center">
                <img src="/images/reject.png" alt="" />
            </Box>

            <Typography
                variant="h5"
                color={COLORS.danger}
                textAlign="center"
                style={{ marginTop: 24 }}>
                Rejected
            </Typography>

            <Box marginTop="32px" display="flex" justifyContent="center">
                <Button variant="contained" color="primary" onClick={handleCancel}>
                    Ok
                </Button>
            </Box>
        </Box>
    );
};

const handleShowGateManagementRejectedModal = () => {
    return newModal({
        Body: GateManagementRejectedModal,
        id: GateManagementRejectedModal.name
    });
};

export default handleShowGateManagementRejectedModal;
