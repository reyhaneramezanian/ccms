import SecurityAnnouncements from '@/components/security/announcements';
import AdminLayout from '@/layout/admin';
import Head from 'next/head';

const SecurityAnnouncementsPage = () => {
    return (
        <>
            <Head>
                <title>Announcements</title>
                <meta name="robots" content="noindex, nofollow" />
            </Head>

            <AdminLayout>
                <SecurityAnnouncements />
            </AdminLayout>
        </>
    );
};

export default SecurityAnnouncementsPage;
