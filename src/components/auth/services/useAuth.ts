import { useRedirectOnEnterOnRole } from 'src/routes/index';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useCallback, useReducer, useState } from 'react';
import {
    fbSignInFacebookToken,
    fbSignInGoogleToken,
    fbSignInToken,
    fbSignOut,
    fbSignUpToken
} from 'src/auth/firebase';
import firebase from 'firebase/app';
import { useAuthMutation } from 'src/auth/useAuthMutation';
import { onErrorMessage } from 'src/graphql/useHandleCommonError';
import { clearCookie } from '@/utils/storage/cookie';
import { ACCESS_TOKEN_KEY } from '@/utils/storage/constant';
import { useSetUser } from 'src/auth/UserProvider';
import { AuthWithPassword } from 'src/auth/auth.type';
import { getAuth, GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import { useModalState } from '@/components/shared/modal/useModal';
export const authFormInitialValues = {
    email: '',
    password: ''
};
type State = {
    loading: boolean;
    error: string;
};
const initialState: State = {
    loading: false,
    error: ''
};
const slice = createSlice({
    name: 'ImageReducerSlice',
    initialState,
    reducers: {
        setLoading: (state) => {
            state.loading = true;
            state.error = '';
        },
        setError: (state, { payload }: PayloadAction<string>) => {
            state.loading = false;
            if (payload.includes('auth/email-already-in-use')) {
                state.error = 'Email exists!';
            } else if (
                payload.includes('auth/user-not-found') ||
                payload.includes('auth/wrong-password')
            ) {
                state.error = 'Wrong Email or password!';
            } else if (payload.includes('auth/network-request-failed')) {
                state.error = 'Connection Failed! Check you connection.';
            } else if (payload.includes('USER_NOT_FOUND')) {
                state.error = 'Not Invited yet!';
            } else {
                state.error = 'User is not active';
            }
        }
    }
});

export function useAuthPage() {
    const [state, dispatch] = useReducer(slice.reducer, initialState);
    const { onIdTokenFailed, onSignupToken, onIdToken } = useAuthMutation();
    const { redirectUserOnSignup, redirectUserOnLogin, redirectUserOnEnter } =
        useRedirectOnEnterOnRole();

    const setUser = useSetUser();
    const { showLoading } = useModalState();
    // const handleModal = useFullscreenLoader();

    const onAuthenticatePassword = async (values: typeof authFormInitialValues) => {
        try {
            // handleModal(true);
            let idToken;
            // if (isLogin) {
            //     idToken = await fbSignInToken(values.email, values.password);
            // } else {
            //     idToken = await fbSignUpToken(values.email, values.password);
            // }handleShowModal

            const user = await onIdToken(idToken);

            if (user) redirectUserOnLogin(user);

            // handleModal(false);
        } catch (err) {
            dispatch(slice.actions.setError(onErrorMessage(err)));
            // handleModal(false);
            onIdTokenFailed();
        } finally {
            // handleModal(false);
        }
    };

    const login: AuthWithPassword = async (email, password) => {
        try {
            dispatch(slice.actions.setLoading());

            const idToken = await fbSignInToken(email, password);

            const user = await onIdToken(idToken);

            if (user) {
                redirectUserOnEnter(user);
            } else {
                dispatch(slice.actions.setError(onErrorMessage('')));
            }
        } catch (err) {
            dispatch(slice.actions.setError(onErrorMessage(err)));

            onIdTokenFailed();
        } finally {
        }
    };

    const onAuthenticateGoogle = async () => {
        // try {
        //     await fbSignInGoogleToken().then(() => redirectUserOnLogin()).catch(err => console.log('google login', err));

        //     // handleModal(true);
        // } catch (err) {
        //     dispatch(slice.actions.setError(onErrorMessage(err)));
        //     // console.error(err);
        // }
        try {
            await fbSignInGoogleToken();
            showLoading();
        } catch (err) {
            dispatch(slice.actions.setError(onErrorMessage(err)));
        }
    };

    const onAuthenticateFacebook = async () => {
        try {
            await fbSignInFacebookToken()
                .then(() => redirectUserOnLogin())
                .catch((err) => console.log('facebook login', err));

            // handleModal(true);
        } catch (err) {
            dispatch(slice.actions.setError(onErrorMessage(err)));
            // console.error(err);
        }
    };

    const onAuthenticate = async (token) => {
        try {
            const user = await onIdToken(token);

            if (user) {
                redirectUserOnLogin(user);
            }
        } catch (err) {
            dispatch(slice.actions.setError(onErrorMessage(err)));
            console.log(err);
        }
    };

    const [isSignOutLoading, setIsSignOutLoading] = useState(false);
    const signOut = useCallback(async () => {
        setIsSignOutLoading(true);
        try {
            // setLoading(SIGNOUT_KEY);
            await fbSignOut();
            clearCookie(ACCESS_TOKEN_KEY);
            setUser && setUser('NO_USER');
            window.location.href = window.location.origin;
            // redirectUserOnLogin();
        } catch (err) {
            // authSnack('AUTHENTICATION_FAILED', onErrorMessage(err));
            console.error(err);
        } finally {
            // finishLoadingState(SIGNOUT_KEY);
            setIsSignOutLoading(false);
        }
    }, []);

    const signUp = async (email, password) => {
        try {
            dispatch(slice.actions.setLoading());
            let idToken;

            idToken = await fbSignUpToken(email, password);
            const user = await onSignupToken(idToken)
                .then(() => {
                    redirectUserOnEnter(user);
                })
                .catch((err) => {
                    console.error(err, 'err2');
                    dispatch(slice.actions.setError(onErrorMessage('')));
                });
        } catch (err) {
            dispatch(slice.actions.setError(onErrorMessage(err)));
            onIdTokenFailed();
            clearCookie(ACCESS_TOKEN_KEY);
            console.error(err, 'err1');
        } finally {
        }
    };

    return {
        onAuthenticatePassword,
        onAuthenticateFacebook,
        onAuthenticateGoogle,
        state,
        login,
        onAuthenticate,
        signOut,
        isSignOutLoading,
        signUp
    };
}
