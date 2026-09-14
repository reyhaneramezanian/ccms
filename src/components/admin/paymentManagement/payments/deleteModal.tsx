import ConfirmationModal from '@/components/confirmationModal';
import { IModalBodyProps } from '@/components/shared/modals/types.modals';
import { RowTable } from '@/components/table/table_layout/types.table.layout';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useAdminPaymentManagementDeleteMutation } from 'src/graphql/generated';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';
import { closeModal, newModal } from 'src/redux/actions/actions';

const PaymentsDeleteModal: FC<IModalBodyProps<RowTable>> = ({ data: { refetch, rowIds } }) => {
    const { mutateAsync, isLoading } = useAdminPaymentManagementDeleteMutation();
    const dispatch = useDispatch();
    const mutationErrorHandler = useMutationErrorHandler();

    const handleAccept = async () => {
        await Promise.all(
            rowIds.map((item) =>
                mutateAsync(
                    { id: item },
                    {
                        onError(err) {
                            mutationErrorHandler(err, 'payment_delete');
                        }
                    }
                )
            )
        );

        if (typeof refetch === 'function') {
            refetch();
        }

        dispatch(closeModal(PaymentsDeleteModal.name));
    };

    return (
        <ConfirmationModal
            id={PaymentsDeleteModal.name}
            type="delete"
            handleAccept={handleAccept}
            isLoading={isLoading}
        />
    );
};

const handleShowPaymentsConfigurationDeleteModal = (refetch, rowIds) => {
    return newModal({
        closeButton: true,
        Body: PaymentsDeleteModal,
        title: 'Confirmation',
        topBar: true,
        id: PaymentsDeleteModal.name,
        data: {
            refetch,
            rowIds
        }
    });
};

export default handleShowPaymentsConfigurationDeleteModal;
