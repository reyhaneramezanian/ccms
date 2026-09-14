import ConfirmationModal from '@/components/confirmationModal';
import { IModalBodyProps } from '@/components/shared/modals/types.modals';
import { RowTable } from '@/components/table/table_layout/types.table.layout';
import { FC } from 'react';
import { newModal, closeModal } from 'src/redux/actions/actions';
import { useSnackbar } from 'notistack';
import { useRequest_AssignToMeMutation, useUser_GetCurrentStaffQuery } from 'src/graphql/generated';
import { useDispatch, useSelector } from 'react-redux';
import { useQueryClient, QueryClient } from 'react-query';
import { Typography, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';

const StaffAcceptModal: FC<IModalBodyProps<RowTable>> = ({ data: { rowIds, refetch } }) => {
    const dispatch = useDispatch();
    const mutationErrorHandler = useMutationErrorHandler();
    const { data: datacurentstaff } = useUser_GetCurrentStaffQuery();

    const { mutate, isLoading } = useRequest_AssignToMeMutation();
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient();
    const handleCancel = () => {
        dispatch(closeModal(StaffAcceptModal.name));
    };
    const handleAccept = () => {
        mutate(
            {
                entityId: Number(rowIds[0])
            },
            {
                onSuccess: () => {
                    enqueueSnackbar('Operation was successful!', { variant: 'success' }),
                        dispatch(closeModal(StaffAcceptModal.name));
                    queryClient.refetchQueries('request_getNotAssignedRequests');
                },
                onError: (err) => {
                    mutationErrorHandler(err, 'request_assignToMe');
                }
            }
        );
    };
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '70px' }}>
            <LoadingButton
                loading={isLoading}
                sx={{
                    textTransform: 'none',
                    width: '170px',
                    height: '36px',
                    marginRight: '28px',
                    backgroundColor: '#2B368F',
                    borderRadius: '4px',
                    color: '#fff' /*':hover': { backgroundColor: '#A587C2' } */
                }}
                onClick={handleAccept}>
                <Typography
                    sx={{ fontSize: '15px', color: '#D6E1FF', fontFamily: 'Helvetica Neue' }}>
                    Yes, Accept
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
                    border: '1px solid #2B368F',
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

const handleShowStaffAcceptModal = (refetch, rowIds: number[]) => {
    return newModal({
        closeButton: true,
        Body: StaffAcceptModal,
        title: 'Are you sure accept this item?',
        topBar: true,
        id: StaffAcceptModal.name,
        data: {
            refetch,
            rowIds
        }
    });
};

export default handleShowStaffAcceptModal;
