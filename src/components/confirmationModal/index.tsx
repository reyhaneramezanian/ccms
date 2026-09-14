import { Box, Button } from '@mui/material';
import * as S from './styles.deleteModal';
import * as AdminStyle from '@/components/admin/admin.style';
import { FC } from 'react';
import Alert from 'src/assets/icons/alert';
import { useDispatch } from 'react-redux';
import { closeModal } from 'src/redux/actions/actions';
import { IConfirmationModalProps } from './types.deleteModal';

const ConfirmationModal: FC<IConfirmationModalProps> = ({ id, handleAccept, type, isLoading }) => {
    const dispatch = useDispatch();

    const handleCancel = () => {
        dispatch(closeModal(id));
    };

    return (
        <S.DeleteModalWrapper>
            <Box display="flex">
                <S.DeleteModalIcon>
                    <Alert />
                </S.DeleteModalIcon>

                <S.DeleteModalTitle>
                    {type === 'deactivate' && 'Are you sure you want to inactivate this item?'}
                    {type === 'accept' && 'Are you sure you want to accept this item?'}
                    {type === 'reject' && 'Are you sure you want to reject this item?'}
                    {type === 'delete' && 'Are you sure you want to delete these item(s)?'}
                    {type === 'expire' && 'Are you sure you want to expire this item?'}
                </S.DeleteModalTitle>
            </Box>

            <div style={{ marginTop: 32 }}>
                <AdminStyle.modalButtonGroup>
                    <Button
                        variant="contained"
                        color="danger"
                        type="submit"
                        onClick={handleAccept}
                        disabled={isLoading}>
                        {type === 'deactivate' && 'Inactivate'}
                        {type === 'accept' && 'Accept'}
                        {type === 'reject' && 'Reject'}
                        {type === 'delete' && 'Delete'}
                        {type === 'expire' && 'Expire'}
                    </Button>

                    <Button variant="outlined" color="grey3" onClick={handleCancel}>
                        Cancel
                    </Button>
                </AdminStyle.modalButtonGroup>
            </div>
        </S.DeleteModalWrapper>
    );
};

export default ConfirmationModal;
