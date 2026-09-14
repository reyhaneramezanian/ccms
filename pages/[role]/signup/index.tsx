import ResidentSignUp from '@/components/auth/residentSignup';
import SecuritySignUp from '@/components/auth/securitySignUp';
import StaffSignUp from '@/components/auth/staffSignup';
import AdminSignup from '@/components/auth/adminSignup';
import AuthLayout from '@/layout/auth';
import { useRouter } from 'next/router';
import NotFoundPage from 'pages/404';
import { FC } from 'react';
import getRoleText from 'src/data/roleText';
import { UserType } from 'src/graphql/generated';

const Signup = () => {
    const router = useRouter();
    const { role } = router.query;

    if (typeof role === 'undefined') return null;

    let Component: FC;
    switch (role) {
        case getRoleText(UserType.Security):
            Component = SecuritySignUp;
            break;

        case getRoleText(UserType.Resident):
            Component = ResidentSignUp;
            break;

        case getRoleText(UserType.Staff):
            Component = StaffSignUp;
            break;
        case getRoleText(UserType.SuperAdmin):
            Component = AdminSignup;
            break;
        default:
            return <NotFoundPage />;
    }

    return (
        <AuthLayout type="signup" role={role}>
            <Component />
        </AuthLayout>
    );
};

export default Signup;
