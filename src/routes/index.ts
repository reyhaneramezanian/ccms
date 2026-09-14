import { SuperAdmin } from './../graphql/generated';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { getInitialLocale } from '@/i18n/getInitialLocale';
import { NO_QUERY_ID } from './route.constant';
import { MaybeUser, useGetUser } from 'src/auth/UserProvider';
import getRoleText from 'src/data/roleText';
import { UserType } from 'src/graphql/generated';

export function useRedirectOnEnterOnRole() {
    const router = useRouter();
    const lang = getInitialLocale();
    //  debugger
    const user = useGetUser();

    const redirectUserOnSignup = useCallback(() => {
        router.push(`/`, undefined, { shallow: true });
    }, [lang, router]);

    const redirectToDashboard = (newUser: MaybeUser = user) => {
        if (typeof newUser !== 'object') return;

        switch (newUser.userType) {
            case UserType.SuperAdmin:
                router.push(`/${getRoleText(newUser.userType as any, true)}`, undefined, {
                    shallow: true
                });
                break;

            case UserType.Staff:
                router.push(`/${getRoleText(newUser.userType as any, true)}/checkin`, undefined, {
                    shallow: true
                });
                break;

            case UserType.Resident:
                break;

            case UserType.Security:
                router.push(
                    `/${getRoleText(newUser.userType as any, true)}/gate-management`,
                    undefined,
                    {
                        shallow: true
                    }
                );
                break;
        }
    };

    const redirectUserOnEnter = (newUser: any) => {
        redirectToDashboard(newUser);
    };

    const redirectUserOnToken = () => {
        redirectToDashboard();
    };
    const redirectUserOnLogin = (passedUser?: UserType) => {
        redirectToDashboard();
    };

    return { redirectUserOnEnter, redirectUserOnLogin, redirectUserOnToken, redirectUserOnSignup };
}

export const useGetIdFromUrl = () => {
    const router = useRouter();
    const id = router.query['id'];
    if (id) return +id;
    return NO_QUERY_ID;
};

export function getRootPath(path) {
    return path.match(/\[lang\]\/(.*?)(\/|$)/)?.[1] || 'dashboard';
}

export function useRedirectToPage() {
    const router = useRouter();
    const dir = getRootPath(router.pathname);
    const rootPath = `/${router.query.lang}/${dir}/`;

    function redirectToRootPage() {
        redirect(rootPath);
    }

    function redirectToAddPage() {
        redirect(`${rootPath}add/`);
    }

    function redirectToEditPage(id: number | string) {
        redirect(`${rootPath}edit/${id ? `?id=${id}` : ''}`);
    }

    function redirectToViewPage(id: number | string) {
        redirect(`${rootPath}view/${id ? `?id=${id}` : ''}`);
    }

    function redirect(path: string) {
        router.push(path, undefined, { shallow: true });
    }

    return {
        redirectToRootPage,
        redirectToAddPage,
        redirectToEditPage,
        redirectToViewPage,
        redirect
    };
}
