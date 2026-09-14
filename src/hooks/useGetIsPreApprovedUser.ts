import { useGetUser } from 'src/auth/UserProvider';
import { UserType } from 'src/graphql/generated';

// This method only used for security role or resident role
const useGetIsPreApprovedUser = (): boolean | 'loading' => {
    const user = useGetUser();

    if (typeof user !== 'object' || user === null) return 'loading';

    const userType = user.userType as UserType.Security | UserType.Resident;

    if (userType === UserType.Security) return false;

    return true;
};

export default useGetIsPreApprovedUser;
