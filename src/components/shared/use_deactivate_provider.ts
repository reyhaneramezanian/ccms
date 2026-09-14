import ConfirmModal from '../base/modal/confirm-modal';
import { newModal } from 'src/redux/actions/actions';
import { useDispatch } from 'react-redux';

export default function useUpdateActivation() {
    const dispatch = useDispatch();

    function confirmActivation(isActive, providerName, callback) {
        dispatch(
            newModal({
                closeButton: true,
                title: 'Confirm',
                Body: ConfirmModal,
                isActive,
                message: `Are you sure you want to ${
                    isActive ? 'deactivate' : 'activate'
                } this ${providerName}?`,
                buttons: ['No', 'Yes'],
                onConfirm: (closeModal) => {
                    closeModal();
                    callback?.();
                }
            })
        );
    }

    return { confirmActivation };
}
