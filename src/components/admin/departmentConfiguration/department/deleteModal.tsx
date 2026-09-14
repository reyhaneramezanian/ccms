import ConfirmationModal from '@/components/confirmationModal';
import { IModalBodyProps } from '@/components/shared/modals/types.modals';
import { RowTable } from '@/components/table/table_layout/types.table.layout';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useAdminDepartmentTypeDeleteMutation } from 'src/graphql/generated';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';
import { closeModal, newModal } from 'src/redux/actions/actions';

const DepartmentConfigurationDeleteModal: FC<IModalBodyProps<RowTable>> = ({
    data: { refetch, rowIds }
}) => {
    const { mutateAsync, isLoading } = useAdminDepartmentTypeDeleteMutation();
    const mutationErrorHandler = useMutationErrorHandler();

    const dispatch = useDispatch();

    const handleAccept = async () => {
        await Promise.all(
            rowIds.map((item) =>
                mutateAsync(
                    { entityId: item },
                    {
                        onError(err) {
                            mutationErrorHandler(err, 'department_delete');
                        }
                    }
                )
            )
        );

        if (typeof refetch === 'function') {
            refetch();
        }

        dispatch(closeModal(DepartmentConfigurationDeleteModal.name));
    };

    return (
        <ConfirmationModal
            id={DepartmentConfigurationDeleteModal.name}
            type="delete"
            handleAccept={handleAccept}
            isLoading={isLoading}
        />
    );
};

const handleShowDepartmentConfigurationDeleteModal = (refetch, rowIds: number[]) => {
    return newModal({
        closeButton: true,
        Body: DepartmentConfigurationDeleteModal,
        title: 'Confirmation',
        topBar: true,
        id: DepartmentConfigurationDeleteModal.name,
        data: { refetch, rowIds }
    });
};

export default handleShowDepartmentConfigurationDeleteModal;
