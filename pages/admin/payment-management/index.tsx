import PaymentManagement from '@/components/admin/paymentManagement';
import AdminLayout from '@/layout/admin';
import Head from 'next/head';

const PaymentManagementPage = () => {
    return (
        <>
            <Head>
                <title>Payment management</title>
                <meta name="robots" content="noindex, nofollow" />
            </Head>

            <AdminLayout>
                <PaymentManagement />
            </AdminLayout>
        </>
    );
};

export default PaymentManagementPage;
