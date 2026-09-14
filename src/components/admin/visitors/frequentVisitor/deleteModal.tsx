import ConfirmationModal from '@/components/confirmationModal';
import { IModalBodyProps } from '@/components/shared/modals/types.modals';
import { RowTable } from '@/components/table/table_layout/types.table.layout';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useAdminVisitorDeleteMutation } from 'src/graphql/generated';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';
import { closeModal, newModal } from 'src/redux/actions/actions';

const FrequentVisitorModal: FC<IModalBodyProps<RowTable>> = ({ data: { refetch, rowIds } }) => {
    const { mutateAsync, isLoading } = useAdminVisitorDeleteMutation();
    const dispatch = useDispatch();
    const mutationErrorHandler = useMutationErrorHandler();

    const handleAccept = async () => {
        await Promise.all(
            rowIds.map((item) =>
                mutateAsync(
                    { entityId: item },
                    {
                        onError(err) {
                            mutationErrorHandler(err, 'frequentVisitor_delete');
                        }
                    }
                )
            )
        );

        if (typeof refetch === 'function') {
            refetch();
        }

        dispatch(closeModal(FrequentVisitorModal.name));
    };

    return (
        <ConfirmationModal
            id={FrequentVisitorModal.name}
            type="delete"
            handleAccept={handleAccept}
            isLoading={isLoading}
        />
    );
};

const handleShowFrequentVisitorConfigurationDeleteModal = (refetch, rowIds) => {
    return newModal({
        closeButton: true,
        Body: FrequentVisitorModal,
        title: 'Confirmation',
        topBar: true,
        id: FrequentVisitorModal.name,
        data: {
            refetch,
            rowIds
        }
    });
};

export default handleShowFrequentVisitorConfigurationDeleteModal;
