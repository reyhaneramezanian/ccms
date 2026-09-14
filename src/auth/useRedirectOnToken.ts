import { useGetMaybeUser, useSetUser } from './UserProvider';
import { useAuthMutation } from 'src/auth/useAuthMutation';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import { isTokenExpired } from 'src/utils/http/token';
import { getCookieStorage } from 'src/utils/storage/cookie';
import { ACCESS_TOKEN_KEY } from 'src/utils/storage/constant';
import { getInitialLocale } from '@/i18n/getInitialLocale';
import { useRedirectOnEnterOnRole } from 'src/routes';

export function useRedirectOnToken() {
    const { onIdToken, refreshToken } = useAuthMutation();
    const setUser = useSetUser();

    const router = useRouter();

    const isAuthUrls = useCallback(() => {
        return router.asPath.includes('/auth/');
    }, [router]);

    const onEnter = useCallback(async () => {
        const idToken = getCookieStorage(ACCESS_TOKEN_KEY);
        const pagePathWithLoadingUserState = ['/', '/[role]/signin', '/[role]/signup'];
        const isValidPageWithLoadingUserState = pagePathWithLoadingUserState.find(
            (item) => item === router.asPath
        );

        try {
            if (idToken) {
                if (isTokenExpired(idToken)) {
                    await refreshToken();
                } else {
                    await onIdToken(idToken);
                }
            } else if (
                !isAuthUrls() &&
                router.pathname != '/callback/successapp' &&
                router.pathname != '/callback/errorapp'
            ) {
                setUser('NO_USER');

                if (typeof isValidPageWithLoadingUserState === 'undefined') {
                    router.push(`/`, undefined, { shallow: true });
                }
            }
        } catch (err) {
            console.error('error', err);
        }
    }, []);

    useEffect(() => {
        // if (isByPassUrls()) return;
        onEnter();
    }, [onEnter]);
}

export function useOnUserStateChanged() {
    const user = useGetMaybeUser();

    const router = useRouter();

    useEffect(() => {
        const lang = getInitialLocale();

        if (user === 'NO_USER') {
            router.push(`/`, undefined, { shallow: true });
        }
    }, [user]);
}

export function useOnUserEnter() {
    const router = useRouter();
    const { redirectUserOnToken } = useRedirectOnEnterOnRole();

    useEffect(() => {
        const idToken = getCookieStorage(ACCESS_TOKEN_KEY);

        if (idToken) {
            if (!isTokenExpired(idToken)) {
                redirectUserOnToken();
            } else {
                router.push(`/${getInitialLocale()}/signin/`, undefined, { shallow: true });
            }
        } else if (router.asPath === '/') {
            router.push(`/${getInitialLocale()}`, undefined, { shallow: true });
        }
    }, []);
}
