import React from 'react';
import { getAuth, getRedirectResult } from 'firebase/auth';
import { fbGetToken } from 'src/auth/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { useAuthPage } from './useAuth';
import { useModalState } from '@/components/modals/use-modal';

export function useLoginWithGoogle() {
    const dispatch = useDispatch();
    const pageData = useSelector(({ pageData }: any) => pageData);

    const { login, state, onAuthenticate } = useAuthPage();

    const { open, close } = useModalState();

    const LoginGoogleEffect = React.useEffect(() => {
        async function login() {
            open();
            getRedirectResult(getAuth())
                .then((result) => {
                    if (!result) return close();
                    async function login() {
                        let idToken: string = await fbGetToken();
                    }

                    login();
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    close();
                });
        }

        login();

        return () => {
            close();
        };
    }, [pageData.loading]);

    return {
        LoginGoogleEffect,
        state,
        login
    };
}
