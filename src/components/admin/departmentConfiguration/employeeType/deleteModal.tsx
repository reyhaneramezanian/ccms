import { IModalBodyProps } from '@/components/shared/modals/types.modals';
import { FC } from 'react';
import { closeModal, newModal } from 'src/redux/actions/actions';
import { RowTable } from '@/components/table/table_layout/types.table.layout';
import ConfirmationModal from '@/components/confirmationModal';
import { useAdminEmployeeTypeDeleteMutation } from 'src/graphql/generated';
import { useDispatch } from 'react-redux';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';

const EmployeeTypeDepartmentConfigurationDeleteModal: FC<IModalBodyProps<RowTable>> = ({
    data: { rowIds, refetch }
}) => {
    const { mutateAsync, isLoading } = useAdminEmployeeTypeDeleteMutation();
    const mutationErrorHandler = useMutationErrorHandler();

    const dispatch = useDispatch();

    const handleAccept = async () => {
        await Promise.all(
            rowIds.map((item) =>
                mutateAsync(
                    { entityId: item },
                    {
                        onError(err) {
                            mutationErrorHandler(err, 'employeeType_delete');
                        }
                    }
                )
            )
        );

        if (typeof refetch === 'function') {
            refetch();
        }

        dispatch(closeModal(EmployeeTypeDepartmentConfigurationDeleteModal.name));
    };

    return (
        <ConfirmationModal
            type="delete"
            id={EmployeeTypeDepartmentConfigurationDeleteModal.name}
            handleAccept={handleAccept}
            isLoading={isLoading}
        />
    );
};

const handleShowEmployeeTypeDepartmentConfigurationDeleteModal = (refetch, rowIds: number[]) => {
    return newModal({
        Body: EmployeeTypeDepartmentConfigurationDeleteModal,
        title: 'Confirmation',
        topBar: true,
        id: EmployeeTypeDepartmentConfigurationDeleteModal.name,
        data: { rowIds, refetch }
    });
};

export default handleShowEmployeeTypeDepartmentConfigurationDeleteModal;
