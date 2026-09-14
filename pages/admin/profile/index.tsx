import Profile from '@/components/admin/profile';
import AdminLayout from '@/layout/admin';
import Head from 'next/head';

const ProfilePage = () => {
    return (
        <>
            <Head>
                <title>Profile</title>
                <meta name="robots" content="noindex, nofollow" />
            </Head>

            <AdminLayout>
                <Profile />
            </AdminLayout>
        </>
    );
};

export default ProfilePage;
