import Signin from '@/components/auth/signIn';
import AuthLayout from '@/layout/auth';
import { useRouter } from 'next/router';
import NotFoundPage from 'pages/404';
import getRoleText from 'src/data/roleText';
import { UserType } from 'src/graphql/generated';
import Head from 'next/head';

const SinginPage = () => {
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

            <AuthLayout type="signin">
                <Signin />
            </AuthLayout>
        </>
    );

    /*  default:
            return <NotFoundPage />;
    }*/
};

export default SinginPage;
