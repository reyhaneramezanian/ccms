import ConfirmationModal from '@/components/confirmationModal';
import { useDispatch } from 'react-redux';
import { GateApprovalType, useGateApproval_SetExpiredMutation } from 'src/graphql/generated';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';
import { closeModal, newModal } from 'src/redux/actions/actions';
import { useSnackbar } from 'notistack';

const HandleShowGateManagementExpireModal = ({ data: { refetch, rowsId, approvalType } }) => {
    const dispatch = useDispatch();

    const { enqueueSnackbar } = useSnackbar();
    const mutationErrorHandler = useMutationErrorHandler();
    const { mutate, isLoading } = useGateApproval_SetExpiredMutation();
    const handleAccept = () => {
        mutate(
            { entityId: rowsId },
            {
                onSuccess: () => {
                    enqueueSnackbar('Operation was successful!', { variant: 'success' }),
                        dispatch(closeModal(HandleShowGateManagementExpireModal.name));

                    if (typeof refetch === 'function') {
                        refetch();
                    }
                },
                onError: (err) => {
                    mutationErrorHandler(err, 'gateApproval_setExpired');
                }
            }
        );
    };

    return (
        <ConfirmationModal
            id={HandleShowGateManagementExpireModal.name}
            handleAccept={handleAccept}
            type="expire"
            isLoading={isLoading}
        />
    );
};

const handleShowGateManagementExpireModal = (
    refetch: () => void,
    rowsId: number,
    approvalType: GateApprovalType
) => {
    return newModal({
        closeButton: true,
        Body: HandleShowGateManagementExpireModal,
        title: 'Confirmation',
        topBar: true,
        id: HandleShowGateManagementExpireModal.name,
        data: {
            refetch,
            rowsId,
            approvalType
        }
    });
};

export default handleShowGateManagementExpireModal;
