import ConfirmationModal from '@/components/confirmationModal';
import { IModalBodyProps } from '@/components/shared/modals/types.modals';
import { RowTable } from '@/components/table/table_layout/types.table.layout';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useAdminAnnouncementBoardDeleteMutation } from 'src/graphql/generated';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';
import { closeModal, newModal } from 'src/redux/actions/actions';

const AnnouncementsBoardDeleteModal: FC<IModalBodyProps<RowTable>> = ({
    data: { rowIds, refetch }
}) => {
    const { mutateAsync, isLoading } = useAdminAnnouncementBoardDeleteMutation();
    const dispatch = useDispatch();
    const mutationErrorHandler = useMutationErrorHandler();

    const handleAccept = async () => {
        await Promise.all(
            rowIds.map((item) =>
                mutateAsync(
                    { entityId: item },
                    {
                        onError(err) {
                            mutationErrorHandler(err, 'announcement_delete');
                        }
                    }
                )
            )
        );

        if (typeof refetch === 'function') {
            refetch();
        }

        dispatch(closeModal(AnnouncementsBoardDeleteModal.name));
    };

    return (
        <ConfirmationModal
            id={AnnouncementsBoardDeleteModal.name}
            handleAccept={handleAccept}
            type="delete"
            isLoading={isLoading}
        />
    );
};

const handleShowAnnouncementsBoardDeleteModal = (refetch, rowIds) => {
    return newModal({
        closeButton: true,
        Body: AnnouncementsBoardDeleteModal,
        title: 'Confirmation',
        topBar: true,
        id: AnnouncementsBoardDeleteModal.name,
        data: {
            refetch,
            rowIds
        }
    });
};

export default handleShowAnnouncementsBoardDeleteModal;
