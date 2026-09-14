import Signup from '@/components/auth/residentSignup';
import AuthLayout from '@/layout/auth';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { UserType } from 'src/graphql/generated';
const SignupPage = () => {
    const router = useRouter();
    /* const { role } = router.query;

    switch (role) {
        case getRoleText(UserType.SuperAdmin):
        case getRoleText(UserType.Security):
        case getRoleText(UserType.Resident):
        case getRoleText(UserType.Staff):*/
    return (
        <>
            <Head>
                <title>Crest gate</title>
                <meta name="robots" content="noindex, nofollow" />
            </Head>

            <AuthLayout type="signup" role={'resident'}>
                <Signup />
            </AuthLayout>
        </>
    );

    /*  default:
            return <NotFoundPage />;
    }*/
};

export default SignupPage;
