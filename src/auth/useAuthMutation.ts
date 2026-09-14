import { useRouter } from 'next/router';

import { useCallback, useRef } from 'react';

import { useSetUser } from 'src/auth/UserProvider';
import { user_signInFetcher, user_signInType, user_signUpFetcher, user_signUpType } from './gql';
import { fbGetToken, fbSignOut } from './firebase';
import { UserType } from 'src/@types/user.type';

import { getInitialLocale } from '@/i18n/getInitialLocale';

import { ACCESS_TOKEN_KEY } from '@/utils/storage/constant';
import { useMutation } from 'react-query';
import { clearCookie } from '@/utils/storage/cookie';

import { setAuthHeader } from '@/utils/http/graphql.client';
import { useRedirectOnEnterOnRole } from 'src/routes';
import { RES_STATUS } from '@/utils/http/constant';

export function useAuthMutation() {
    const router = useRouter();
    const setUser = useSetUser();
    const { redirectUserOnSignup } = useRedirectOnEnterOnRole();
    const signUp = useMutation<user_signUpType['res']>(user_signUpFetcher);
    const signIn = useMutation<user_signInType['res']>(user_signInFetcher);

    const onIdTokenFailed = useCallback(() => {
        setUser('NO_USER');
    }, [setUser]);

    const onIdToken = useCallback((idToken: any): Promise<user_signInType['res'] | any> => {
        return new Promise(async (resolve, reject) => {
            try {
                // TODO change
                if (typeof idToken === 'string') {
                    setAuthHeader(idToken);

                    const res = await signIn.mutateAsync();

                    if (res.user_getCurrentUser.status.value === RES_STATUS.success) {
                        let user = res?.user_getCurrentUser?.result;

                        setUserIfSuccess(user);
                        resolve(user);
                    }
                }
                console.error('id token !== string', 'err5');
                reject('FAIL');
            } catch (err) {
                // if (err?.user_signIn?.status === 'USER_NOT_FOUND') {
                //     resolve(onSignupToken(idToken));
                // } else
                if (err?.user_signIn?.status === 'USER_HAS_NOT_JOINED') {
                    console.error(err, 'err4');
                    resolve(onIdToken(idToken));
                } else {
                    console.log('FAIL', err?.user_signIn?.status);
                    reject(err?.user_signIn?.status);
                }
            }
        });
    }, []);

    const onSignupToken = useCallback(async (idToken) => {
        return new Promise(async (resolve, reject) => {
            try {
                if (typeof idToken === 'string') {
                    setAuthHeader(idToken);

                    const res = await signUp.mutateAsync({
                        input: { userTypes: 'HEALER', loginType: 'GOOGLE' }
                    });

                    if (res.user_signUp.status === 'SUCCESS') {
                        setUserIfSuccess(res?.user_signUp?.result);
                        redirectUserOnSignup();
                        resolve(res);
                    }
                    console.error('status !== success', 'err');
                }
                console.error('id token !== string in on sign up token', 'err');
                reject('Failed');
            } catch (err) {
                console.error(err, 'err8');
                reject(err);
            }
        });
    }, []);

    function setUserIfSuccess(user: UserType) {
        setUser(user);
    }

    const refreshToken = useCallback(async () => {
        try {
            const idToken = await fbGetToken();

            if (typeof idToken === 'string') {
                onIdToken(idToken);
            } else {
                onIdTokenFailed();
            }
        } catch (err) {
            onIdTokenFailed();
            // authSnack("AUTHENTICATION_FAILED", onErrorMessage(err));
            console.error(err);
        } finally {
        }
    }, []);

    const signOut = useCallback(async () => {
        try {
            const lang = getInitialLocale();
            // setLoading(SIGNOUT_KEY);
            await fbSignOut();
            clearCookie(ACCESS_TOKEN_KEY);
            setUser && setUser('NO_USER');
            router.push(`/${lang}/signin/`, undefined, { shallow: true });
        } catch (err) {
            // authSnack('AUTHENTICATION_FAILED', onErrorMessage(err));
            console.error(err);
        } finally {
            // finishLoadingState(SIGNOUT_KEY);
        }
    }, []);

    return {
        onIdToken,
        onSignupToken,
        onIdTokenFailed,
        refreshToken,
        signOut
    };
}
