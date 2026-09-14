import ConfirmationModal from '@/components/confirmationModal';
import { IModalBodyProps } from '@/components/shared/modals/types.modals';
import { RowTable } from '@/components/table/table_layout/types.table.layout';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useAdminServiceTypeDeleteMutation } from 'src/graphql/generated';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';
import { closeModal, newModal } from 'src/redux/actions/actions';

const ServiceTypeDepartmentConfigurationDeleteModal: FC<IModalBodyProps<RowTable>> = ({
    data: { rowIds, refetch }
}) => {
    const dispatch = useDispatch();
    const { mutateAsync, isLoading } = useAdminServiceTypeDeleteMutation();
    const mutationErrorHandler = useMutationErrorHandler();

    const handleAccept = async () => {
        await Promise.all(
            rowIds.map((id) =>
                mutateAsync(
                    { entityId: id },
                    {
                        onError(err) {
                            mutationErrorHandler(err, 'serviceType_delete');
                        }
                    }
                )
            )
        );

        if (typeof refetch === 'function') {
            refetch();
        }

        dispatch(closeModal(ServiceTypeDepartmentConfigurationDeleteModal.name));
    };

    return (
        <ConfirmationModal
            id={ServiceTypeDepartmentConfigurationDeleteModal.name}
            handleAccept={handleAccept}
            type="delete"
            isLoading={isLoading}
        />
    );
};

const handleShowServiceTypeDepartmentConfigurationDeleteModal = (refetch, rowIds: number[]) => {
    return newModal({
        closeButton: true,
        Body: ServiceTypeDepartmentConfigurationDeleteModal,
        title: 'Confirmation',
        topBar: true,
        id: ServiceTypeDepartmentConfigurationDeleteModal.name,
        data: { rowIds, refetch }
    });
};

export default handleShowServiceTypeDepartmentConfigurationDeleteModal;
