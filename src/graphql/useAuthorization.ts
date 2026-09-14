import { useGetUser } from 'src/auth/UserProvider';

export function useIsAdmin() {
    const user = useGetUser();
    return !(user.operatorRole !== 'ADMIN');
}
