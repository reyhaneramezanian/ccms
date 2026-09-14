import { UserType } from 'src/graphql/generated';

const getCustomRoleText = (text: string, isUrl?: boolean): string => {
    return isUrl ? text.split(' ').join('-') : text;
};

const getRoleText = (role: UserType, isUrl?: boolean): string => {
    switch (role) {
        case UserType.None:
            return getCustomRoleText('none', isUrl);

        case UserType.SuperAdmin:
            return getCustomRoleText('admin', isUrl);

        case UserType.Security:
            return getCustomRoleText('security', isUrl);

        case UserType.Resident:
            return getCustomRoleText('resident', isUrl);

        case UserType.Staff:
            return getCustomRoleText('staff', isUrl);

        case UserType.ComplexManager:
            return getCustomRoleText('admin', isUrl);

        case UserType.AuthorizedUser:
            return getCustomRoleText('authorized', isUrl);

        default:
            return getCustomRoleText('Not Role', isUrl);
    }
};

export default getRoleText;
