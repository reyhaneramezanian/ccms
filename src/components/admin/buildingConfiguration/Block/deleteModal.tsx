import ConfirmationModal from '@/components/confirmationModal';
import { IModalBodyProps } from '@/components/shared/modals/types.modals';
import { RowTable } from '@/components/table/table_layout/types.table.layout';
import { FC } from 'react';
import { newModal, closeModal } from 'src/redux/actions/actions';
import { useSnackbar } from 'notistack';
import { useBlock_DeleteMutation } from 'src/graphql/generated';
import { useDispatch, useSelector } from 'react-redux';
import { useQueryClient, QueryClient } from 'react-query';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';

const BuildingConfigurationDeleteModal: FC<IModalBodyProps<RowTable>> = ({
    data: { rowIds, refetch }
}) => {
    const dispatch = useDispatch();
    const { mutate, isLoading } = useBlock_DeleteMutation();
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient();
    const mutationErrorHandler = useMutationErrorHandler();

    const handleAccept = async () => {
        await Promise.all(
            rowIds.map((item) =>
                mutate(
                    { id: item },
                    {
                        onSuccess: () => {
                            enqueueSnackbar('Operation was successful!', { variant: 'success' }),
                                dispatch(closeModal(BuildingConfigurationDeleteModal.name));
                            queryClient.refetchQueries('block_getBlocks');
                        },
                        onError: (err) => {
                            mutationErrorHandler(err, 'block_delete');
                        }
                    }
                )
            )
        );
    };
    return (
        <ConfirmationModal
            id={BuildingConfigurationDeleteModal.name}
            type="delete"
            handleAccept={handleAccept}
            isLoading={isLoading}
        />
    );
};

const handleShowbuildingConfigurationDeleteModal = (refetch, rowIds: number[]) => {
    return newModal({
        closeButton: true,
        Body: BuildingConfigurationDeleteModal,
        title: 'Confirmation',
        topBar: true,
        id: BuildingConfigurationDeleteModal.name,
        data: {
            refetch,
            rowIds
        }
    });
};

export default handleShowbuildingConfigurationDeleteModal;
