import ConfirmationModal from '@/components/confirmationModal';
import { IModalBodyProps } from '@/components/shared/modals/types.modals';
import { RowTable } from '@/components/table/table_layout/types.table.layout';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useResidentMyServiceDeleteMutation } from 'src/graphql/generated';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';
import { closeModal, newModal } from 'src/redux/actions/actions';

const ResidentMyService: FC<IModalBodyProps<RowTable>> = ({ data: { rowIds, refetch } }) => {
    const { mutateAsync, isLoading } = useResidentMyServiceDeleteMutation();
    const dispatch = useDispatch();
    const mutationErrorHandler = useMutationErrorHandler();

    const handleAccept = async () => {
        await Promise.all(
            rowIds.map((item) =>
                mutateAsync(
                    { entityId: item },
                    {
                        onError(err) {
                            mutationErrorHandler(err, 'request_delete');
                        }
                    }
                )
            )
        );

        if (typeof refetch === 'function') {
            refetch();
        }

        dispatch(closeModal(ResidentMyService.name));
    };

    return (
        <ConfirmationModal
            id={ResidentMyService.name}
            handleAccept={handleAccept}
            type="delete"
            isLoading={isLoading}
        />
    );
};

const handleShowResidentMyServiceDeleteModal = (refetch, rowIds) => {
    return newModal({
        closeButton: true,
        Body: ResidentMyService,
        title: 'Confirmation',
        topBar: true,
        id: ResidentMyService.name,
        data: {
            refetch,
            rowIds
        }
    });
};

export default handleShowResidentMyServiceDeleteModal;
