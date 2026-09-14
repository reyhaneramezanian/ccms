import { useNetState } from 'src/graphql/useNetState';
import { useDispatch } from 'react-redux';
import { fbPasswordReset } from 'src/auth/firebase';
import { newModal } from 'src/redux/actions/actions';
import SuccessEmailModal, { SUCCESS_MAIL_ID } from './success-email';

const LOADING_KEY = 'forgot';

export function useChangePassword(onRes?: () => void, onError?: () => void) {
    const dispatch = useDispatch();
    const { setLoading, isLoading, finishLoading } = useNetState();
    const changePassword = async (email: string, handlers) => {
        try {
            setLoading(LOADING_KEY);
            const res = await fbPasswordReset(email);

                dispatch(
                    newModal({
                        id: SUCCESS_MAIL_ID,
                        closeButton: true,
                        Body: SuccessEmailModal
                    })
                );
                
        } catch (err) {
            const { setErrors } = handlers || {};

            if (err.toString().includes('user-not-found')) {
                setErrors?.({ email: 'Email Not Found.' });
            }
            console.error(err);
            onError && onError();
        } finally {
            finishLoading(LOADING_KEY);
        }
    };

    return { changePassword, isLoading, loading: isLoading(LOADING_KEY) };
}
