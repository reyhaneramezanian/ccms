import ConfirmationModal from '@/components/confirmationModal';
import { IModalBodyProps } from '@/components/shared/modals/types.modals';
import { RowTable } from '@/components/table/table_layout/types.table.layout';
import { FC } from 'react';
import { newModal, closeModal } from 'src/redux/actions/actions';
import { useSnackbar } from 'notistack';
import { useUser_DeleteAccountMutation } from 'src/graphql/generated';
import { useDispatch, useSelector } from 'react-redux';
import { useQueryClient, QueryClient } from 'react-query';
import { LoadingButton } from '@mui/lab';
import { Typography, Button } from '@mui/material';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';
import { useAuthPage } from '@/components/auth/services/useAuth';

const DeleteModal: FC<IModalBodyProps<RowTable>> = () => {
    const dispatch = useDispatch();
    const { signOut, isSignOutLoading } = useAuthPage();

    const { mutate, isLoading } = useUser_DeleteAccountMutation();
    const { enqueueSnackbar } = useSnackbar();
    const mutationErrorHandler = useMutationErrorHandler();

    const queryClient = useQueryClient();
    const handleAccept = async () => {
        mutate({});
        dispatch(closeModal(DeleteModal.name));
        signOut();
    };
    const handleCancel = () => {
        dispatch(closeModal(DeleteModal.name));
    };
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '100px' }}>
            <LoadingButton
                loading={isLoading}
                sx={{
                    textTransform: 'none',
                    width: '170px',
                    height: '36px',
                    marginRight: '28px',
                    backgroundColor: '#E63C49',
                    borderRadius: '4px',
                    color: '#fff' /*':hover': { backgroundColor: '#A587C2' } */
                }}
                onClick={handleAccept}>
                <Typography sx={{ fontSize: '15px', color: '#fff', fontFamily: 'Helvetica Neue' }}>
                    Yes, Delete
                </Typography>
            </LoadingButton>
            <Button
                sx={{
                    textTransform: 'none',
                    width: '170px',
                    height: '36px',
                    backgroundColor: '#fff',
                    borderRadius: '4px',
                    color: '#A587C2',
                    border: '1px solid #E63C49',
                    ':hover': { backgroundColor: '#fff' }
                }}
                onClick={handleCancel}>
                <Typography
                    sx={{ fontSize: '15px', color: '#2B368F', fontFamily: 'Helvetica Neue' }}>
                    No
                </Typography>
            </Button>
        </div>
    );
};

const handleShowDeleteModal = () => {
    return newModal({
        closeButton: true,
        Body: DeleteModal,
        title: 'Are you sure for delete account?',
        topBar: true,
        id: DeleteModal.name
    });
};

export default handleShowDeleteModal;
