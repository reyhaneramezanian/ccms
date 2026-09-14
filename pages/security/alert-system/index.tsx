import SecurityAlertSystem from '@/components/security/alertSystem';
import AdminLayout from '@/layout/admin';
import Head from 'next/head';

const AlertSystemPage = () => {
    return (
        <>
            <Head>
                <title>Alert system</title>
                <meta name="robots" content="noindex, nofollow" />
            </Head>

            <AdminLayout>
                <SecurityAlertSystem />
            </AdminLayout>
        </>
    );
};

export default AlertSystemPage;
