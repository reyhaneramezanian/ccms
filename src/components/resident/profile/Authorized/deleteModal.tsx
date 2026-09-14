import ConfirmationModal from '@/components/confirmationModal';
import { IModalBodyProps } from '@/components/shared/modals/types.modals';
import { RowTable } from '@/components/table/table_layout/types.table.layout';
import { FC } from 'react';
import { newModal, closeModal } from 'src/redux/actions/actions';
import { useSnackbar } from 'notistack';
import { useUser_DeleteAuthorizedUserMutation } from 'src/graphql/generated';
import { useDispatch, useSelector } from 'react-redux';
import { useQueryClient, QueryClient } from 'react-query';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';

const AuthorizedDeleteModal: FC<IModalBodyProps<RowTable>> = ({ data: { rowIds, refetch } }) => {
    const dispatch = useDispatch();
    const mutationErrorHandler = useMutationErrorHandler();

    const { mutate, isLoading } = useUser_DeleteAuthorizedUserMutation();
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient();
    const handleAccept = async () => {
        debugger;
        await Promise.all(
            rowIds.map((item) =>
                mutate(
                    { entityId: item },
                    {
                        onSuccess: () => {
                            enqueueSnackbar('Operation was successful!', { variant: 'success' }),
                                dispatch(closeModal(AuthorizedDeleteModal.name));
                            queryClient.refetchQueries('user_getAuthorizedUsers');
                        },
                        onError: (err) => {
                            mutationErrorHandler(err, 'user_deleteAuthorizedUser');
                        }
                    }
                )
            )
        );
    };
    return (
        <ConfirmationModal
            id={AuthorizedDeleteModal.name}
            type="delete"
            handleAccept={handleAccept}
            isLoading={isLoading}
        />
    );
};

const handleAuthorizedDeleteModal = (refetch, rowIds: number[]) => {
    return newModal({
        closeButton: true,
        Body: AuthorizedDeleteModal,
        title: 'Confirmation',
        topBar: true,
        id: AuthorizedDeleteModal.name,
        data: {
            refetch,
            rowIds
        }
    });
};

export default handleAuthorizedDeleteModal;
