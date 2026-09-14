import ConfirmationModal from '@/components/confirmationModal';
import { IModalBodyProps } from '@/components/shared/modals/types.modals';
import { RowTable } from '@/components/table/table_layout/types.table.layout';
import { FC } from 'react';
import { newModal, closeModal } from 'src/redux/actions/actions';
import { useSnackbar } from 'notistack';
import { useComplaintType_DeleteMutation } from 'src/graphql/generated';
import { useDispatch, useSelector } from 'react-redux';
import { useQueryClient, QueryClient } from 'react-query';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';

const ComplaintDeleteModal: FC<IModalBodyProps<RowTable>> = ({ data: { rowIds, refetch } }) => {
    const dispatch = useDispatch();
    const { mutate, isLoading } = useComplaintType_DeleteMutation();
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient();
    const mutationErrorHandler = useMutationErrorHandler();

    const handleAccept = async () => {
        await Promise.all(
            rowIds.map((item) =>
                mutate(
                    { entityId: item },
                    {
                        onSuccess: () => {
                            enqueueSnackbar('Operation was successful!', { variant: 'success' }),
                                dispatch(closeModal(ComplaintDeleteModal.name));
                            queryClient.refetchQueries('complaintType_getComplaintTypes');
                        },
                        onError: (err) => {
                            mutationErrorHandler(err, 'complaintType_delete');
                        }
                    }
                )
            )
        );
    };
    return (
        <ConfirmationModal
            id={ComplaintDeleteModal.name}
            type="delete"
            handleAccept={handleAccept}
            isLoading={isLoading}
        />
    );
};

const handleShowComplaintDeleteModal = (refetch, rowIds: number[]) => {
    return newModal({
        closeButton: true,
        Body: ComplaintDeleteModal,
        title: 'Confirmation',
        topBar: true,
        id: ComplaintDeleteModal.name,
        data: {
            refetch,
            rowIds
        }
    });
};

export default handleShowComplaintDeleteModal;
