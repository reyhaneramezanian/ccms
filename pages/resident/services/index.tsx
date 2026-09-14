import React from 'react';
import Head from 'next/head';
import AdminLayout from '@/layout/admin';
import ResidentServices from '@/components/resident/services';

const ResidentServicesPage: React.FC = () => {
    return (
        <>
            <Head>
                <title>Service request</title>
                <meta name="robots" content="noindex, nofollow" />
            </Head>
            <AdminLayout>
                <ResidentServices />
            </AdminLayout>
        </>
    );
};

export default ResidentServicesPage;
