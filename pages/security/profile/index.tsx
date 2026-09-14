import SecurityProfile from '@/components/security/profile';
import AdminLayout from '@/layout/admin';
import Head from 'next/head';

const SecurityProfilePage = () => {
    return (
        <>
            <Head>
                <title>Profile</title>
                <meta name="robots" content="noindex, nofollow" />
            </Head>

            <AdminLayout>
                <SecurityProfile />
            </AdminLayout>
        </>
    );
};

export default SecurityProfilePage;
