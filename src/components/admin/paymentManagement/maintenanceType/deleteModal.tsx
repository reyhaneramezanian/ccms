import ConfirmationModal from '@/components/confirmationModal';
import { IModalBodyProps } from '@/components/shared/modals/types.modals';
import { RowTable } from '@/components/table/table_layout/types.table.layout';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useAdminMaintenanceTypeDeleteMutation } from 'src/graphql/generated';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';
import { closeModal, newModal } from 'src/redux/actions/actions';

const MaintenanceTypeDeleteModal: FC<IModalBodyProps<RowTable>> = ({
    data: { refetch, rowIds }
}) => {
    const { mutateAsync, isLoading } = useAdminMaintenanceTypeDeleteMutation();
    const dispatch = useDispatch();
    const mutationErrorHandler = useMutationErrorHandler();

    const handleAccept = async () => {
        await Promise.all(
            rowIds.map((item) =>
                mutateAsync(
                    { enitityId: item },
                    {
                        onError(err) {
                            mutationErrorHandler(err, 'maintenanceType_delete');
                        }
                    }
                )
            )
        );

        if (typeof refetch === 'function') {
            refetch();
        }

        dispatch(closeModal(MaintenanceTypeDeleteModal.name));
    };

    return (
        <ConfirmationModal
            id={MaintenanceTypeDeleteModal.name}
            type="delete"
            handleAccept={handleAccept}
            isLoading={isLoading}
        />
    );
};

const handleShowMaintenanceTypeConfigurationDeleteModal = (refetch, rowIds) => {
    return newModal({
        closeButton: true,
        Body: MaintenanceTypeDeleteModal,
        title: 'Confirmation',
        topBar: true,
        id: MaintenanceTypeDeleteModal.name,
        data: {
            refetch,
            rowIds
        }
    });
};

export default handleShowMaintenanceTypeConfigurationDeleteModal;
