import { AppLoadingPage } from '@/components/base/loader/LoadingPage';
import { StyledCenter } from '@/components/base/view-container/Center';
import { AutorizeTypes } from 'src/@types/auth.type';
import { useOnUserStateChanged } from 'src/auth/useRedirectOnToken';
import { useGetMaybeUser } from './UserProvider';

export function AuthenticationProvider({ children }: AppCommonChild) {
    const user = useGetMaybeUser();

    useOnUserStateChanged();

    return <>{typeof user === 'object' ? children : <AppLoadingPage />}</>;
}

export function AuthorizaitionProvider({
    children,
    authorizedRole
}: AppCommonChild & { authorizedRole?: AutorizeTypes }) {
    // const user = useGetMaybeUser();

    // useOnUserStateChanged();

    // return <>{typeof user === 'object' ? children : <AppLoadingPage />}</>;

    return <>{children}</>;
}
