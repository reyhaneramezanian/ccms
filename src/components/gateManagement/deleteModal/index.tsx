import ConfirmationModal from '@/components/confirmationModal';
import { useDispatch } from 'react-redux';
import {
    GateApprovalType,
    useGateManagementCabDeleteMutation,
    useGateManagementDeliveryDeleteMutation,
    useGateManagementFrequentVisitorDeleteMutation,
    useGateManagementOneTimeVisitorDeleteMutation
} from 'src/graphql/generated';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';
import { closeModal, newModal } from 'src/redux/actions/actions';

const GateManagementDeleteModal = ({ data: { refetch, rowsId, approvalType } }) => {
    const dispatch = useDispatch();
    const deliveryDeleteMutation = useGateManagementDeliveryDeleteMutation();
    const frequentVisitorDeleteMutation = useGateManagementFrequentVisitorDeleteMutation();
    const oneTimeVisitorDeleteMutation = useGateManagementOneTimeVisitorDeleteMutation();
    const cabVisitorDeleteMutation = useGateManagementCabDeleteMutation();
    const mutationErrorHandler = useMutationErrorHandler();

    const mutations = {
        [GateApprovalType.Delivery]: {
            mutation: deliveryDeleteMutation,
            key: 'gateApproval_deleteDelivery'
        },
        [GateApprovalType.FrequentVisitor]: {
            mutation: frequentVisitorDeleteMutation,
            key: 'gateApproval_deleteFrequentVisitor'
        },
        [GateApprovalType.OneTimeVisitor]: {
            mutation: oneTimeVisitorDeleteMutation,
            key: 'gateApproval_deleteOneTimeVisitor'
        },
        [GateApprovalType.Cab]: {
            mutation: cabVisitorDeleteMutation,
            key: 'gateApproval_deleteCab'
        }
    };

    const handleAccept = async () => {
        await Promise.all(
            rowsId.map((item) =>
                mutations[approvalType as GateApprovalType].mutation.mutateAsync(
                    { entityId: item },
                    {
                        onError(err) {
                            mutationErrorHandler(
                                err,
                                mutations[approvalType as GateApprovalType].key
                            );
                        }
                    }
                )
            )
        );

        if (typeof refetch === 'function') {
            refetch();
        }

        dispatch(closeModal(GateManagementDeleteModal.name));
    };

    return (
        <ConfirmationModal
            id={GateManagementDeleteModal.name}
            handleAccept={handleAccept}
            type="delete"
            isLoading={mutations[approvalType as GateApprovalType].mutation.isLoading}
        />
    );
};

const handleShowGateManagementDeleteModal = (
    refetch: () => void,
    rowsId: number[],
    approvalType: GateApprovalType
) => {
    return newModal({
        closeButton: true,
        Body: GateManagementDeleteModal,
        title: 'Confirmation',
        topBar: true,
        id: GateManagementDeleteModal.name,
        data: {
            refetch,
            rowsId,
            approvalType
        }
    });
};

export default handleShowGateManagementDeleteModal;
