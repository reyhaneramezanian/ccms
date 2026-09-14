import Announcements from '@/components/admin/announcements';
import AdminLayout from '@/layout/admin';
import Head from 'next/head';

const AnnouncementsPage = () => {
    return (
        <>
            <Head>
                <title>Announcements</title>
                <meta name="robots" content="noindex, nofollow" />
            </Head>

            <AdminLayout>
                <Announcements />
            </AdminLayout>
        </>
    );
};

export default AnnouncementsPage;
