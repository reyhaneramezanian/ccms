import ConfirmationModal from '@/components/confirmationModal';
import { IModalBodyProps } from '@/components/shared/modals/types.modals';
import { RowTable } from '@/components/table/table_layout/types.table.layout';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useAdminAnnouncementTypeDeleteMutation } from 'src/graphql/generated';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';
import { closeModal, newModal } from 'src/redux/actions/actions';

const AnnouncementsTypeDeleteModal: FC<IModalBodyProps<RowTable>> = ({
    data: { refetch, rowsId }
}) => {
    const { mutateAsync, isLoading } = useAdminAnnouncementTypeDeleteMutation();
    const dispatch = useDispatch();
    const mutationErrorHandler = useMutationErrorHandler();

    const handleAccept = async () => {
        await Promise.all(
            rowsId.map((item) =>
                mutateAsync(
                    { entityId: item },
                    {
                        onError(err) {
                            mutationErrorHandler(err, 'announcementType_delete');
                        }
                    }
                )
            )
        );

        if (typeof refetch === 'function') {
            refetch();
        }

        dispatch(closeModal(AnnouncementsTypeDeleteModal.name));
    };

    return (
        <ConfirmationModal
            id={AnnouncementsTypeDeleteModal.name}
            handleAccept={handleAccept}
            type="delete"
            isLoading={isLoading}
        />
    );
};

const handleShowAnnouncementsTypeDeleteModal = (refetch, rowsId) => {
    return newModal({
        closeButton: true,
        Body: AnnouncementsTypeDeleteModal,
        title: 'Confirmation',
        topBar: true,
        id: AnnouncementsTypeDeleteModal.name,
        data: {
            refetch,
            rowsId
        }
    });
};

export default handleShowAnnouncementsTypeDeleteModal;
