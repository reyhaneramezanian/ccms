import VisitorsConfiguration from '@/components/admin/visitors';
import AdminLayout from '@/layout/admin';
import Head from 'next/head';

const VisitorsConfigurationPage = () => {
    return (
        <div>
            <Head>
                <title>Frequent visitor</title>
                <meta name="robots" content="noindex, nofollow" />
            </Head>

            <AdminLayout>
                <VisitorsConfiguration />
            </AdminLayout>
        </div>
    );
};

export default VisitorsConfigurationPage;
