import ConfirmationModal from '@/components/confirmationModal';
import { IModalBodyProps } from '@/components/shared/modals/types.modals';
import { RowTable } from '@/components/table/table_layout/types.table.layout';
import { FC } from 'react';
import { newModal, closeModal } from 'src/redux/actions/actions';
import { useSnackbar } from 'notistack';
import { useGateManagementChangeStatusMutation, GateApprovalStatus } from 'src/graphql/generated';
import { useDispatch, useSelector } from 'react-redux';
import { useQueryClient, QueryClient } from 'react-query';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';
import handleShowGateManagementRejectedModal from '@/components/gateManagement/rejectedModal';

const RejectModal: FC<IModalBodyProps<RowTable>> = ({ data: { row, refetch } }) => {
    const dispatch = useDispatch();
    const gateManagementChangeStatusMutation = useGateManagementChangeStatusMutation();
    const { enqueueSnackbar } = useSnackbar();
    const mutationErrorHandler = useMutationErrorHandler();

    const queryClient = useQueryClient();
    const handleAccept = () => {
        gateManagementChangeStatusMutation.mutateAsync({
            gateApprovalId: row.id,
            gateApprovalStatus: GateApprovalStatus.Rejected
        });

        dispatch(closeModal(RejectModal.name));
        dispatch(handleShowGateManagementRejectedModal());
        if (typeof refetch === 'function') {
            refetch();
        }
    };

    return <ConfirmationModal id={RejectModal.name} type="reject" handleAccept={handleAccept} />;
};

const handleRejectModal = (refetch, row?: RowTable) => {
    return newModal({
        closeButton: true,
        Body: RejectModal,
        title: 'Confirmation',
        topBar: true,
        id: RejectModal.name,
        data: { row, refetch }
    });
};

export default handleRejectModal;
