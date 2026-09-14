import Services from '@/components/admin/services';
import AdminLayout from '@/layout/admin';
import Head from 'next/head';

const ServicesPage = () => {
    return (
        <>
            <Head>
                <title>Services</title>
                <meta name="robots" content="noindex, nofollow" />
            </Head>

            <AdminLayout>
                <Services />
            </AdminLayout>
        </>
    );
};

export default ServicesPage;
