import ConfirmationModal from '@/components/confirmationModal';
import { IModalBodyProps } from '@/components/shared/modals/types.modals';
import { RowTable } from '@/components/table/table_layout/types.table.layout';
import { FC } from 'react';
import { newModal, closeModal } from 'src/redux/actions/actions';
import { useSnackbar } from 'notistack';
import { useUser_DeleteSuperAdminMutation } from 'src/graphql/generated';
import { useDispatch, useSelector } from 'react-redux';
import { useQueryClient, QueryClient } from 'react-query';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';

const DeleteModal: FC<IModalBodyProps<RowTable>> = ({ data: { rowIds, refetch } }) => {
    const dispatch = useDispatch();
    const { mutate, isLoading } = useUser_DeleteSuperAdminMutation();
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient();
    const mutationErrorHandler = useMutationErrorHandler();

    const handleAccept = async () => {
        await Promise.all(
            rowIds.map((item) =>
                mutate(
                    { superAdminId: item },
                    {
                        onSuccess: () => {
                            enqueueSnackbar('Operation was successful!', { variant: 'success' }),
                                dispatch(closeModal(DeleteModal.name));
                            queryClient.refetchQueries('user_getSuperAdmins');
                        },
                        onError: (err) => {
                            mutationErrorHandler(err, 'user_deleteSuperAdmin');
                        }
                    }
                )
            )
        );
    };

    return <ConfirmationModal id={DeleteModal.name} type="delete" handleAccept={handleAccept} />;
};

const handleDeleteModal = (refetch, rowIds?: RowTable) => {
    return newModal({
        closeButton: true,
        Body: DeleteModal,
        title: 'Confirmation',
        topBar: true,
        id: DeleteModal.name,
        data: { rowIds, refetch }
    });
};

export default handleDeleteModal;
