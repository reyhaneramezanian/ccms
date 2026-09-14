import ConfirmationModal from '@/components/confirmationModal';
import { IModalBodyProps } from '@/components/shared/modals/types.modals';
import { RowTable } from '@/components/table/table_layout/types.table.layout';
import { FC } from 'react';
import { newModal, closeModal } from 'src/redux/actions/actions';
import { useSnackbar } from 'notistack';
import { useRequest_ChangeEmergencyStatusMutation } from 'src/graphql/generated';
import { useDispatch, useSelector } from 'react-redux';
import { useQueryClient, QueryClient } from 'react-query';
import { Typography, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';

const StaffRejectModal: FC<IModalBodyProps<RowTable>> = ({ data: { rowIds, refetch } }) => {
    const dispatch = useDispatch();
    const { mutate, isLoading } = useRequest_ChangeEmergencyStatusMutation();
    const { enqueueSnackbar } = useSnackbar();
    const mutationErrorHandler = useMutationErrorHandler();

    const queryClient = useQueryClient();
    const handleCancel = () => {
        dispatch(closeModal(StaffRejectModal.name));
    };
    const handleAccept = async () => {
        await Promise.all(
            rowIds.map((item) =>
                mutate(
                    { entityId: item, emergencyStatus: false },
                    {
                        onSuccess: () => {
                            enqueueSnackbar('Operation was successful!', { variant: 'success' }),
                                dispatch(closeModal(StaffRejectModal.name));
                            queryClient.refetchQueries('complaint_getComplaints');
                        },
                        onError: (err) => {
                            mutationErrorHandler(err, 'request_changeEmergencyStatus');
                        }
                    }
                )
            )
        );
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
                    backgroundColor: '#2B368F',
                    borderRadius: '4px',
                    color: '#fff' /*':hover': { backgroundColor: '#A587C2' } */
                }}
                onClick={handleAccept}>
                <Typography
                    sx={{ fontSize: '15px', color: '#D6E1FF', fontFamily: 'Helvetica Neue' }}>
                    Yes, Reject
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

const handleShowStaffRejectModal = (refetch, rowIds: number[]) => {
    return newModal({
        closeButton: true,
        Body: StaffRejectModal,
        title: 'Confirmation',
        topBar: true,
        id: StaffRejectModal.name,
        data: {
            refetch,
            rowIds
        }
    });
};

export default handleShowStaffRejectModal;
