import React from 'react';
import Head from 'next/head';
import Alert from '@/components/security/alertSystem';
import AdminLayout from '@/layout/admin';

const Index: React.FC = () => {
    return (
        <>
            <Head>
                <title>Alert system</title>
                <meta name="robots" content="noindex, nofollow" />
            </Head>

            <AdminLayout>
                <Alert />
            </AdminLayout>
        </>
    );
};

export default Index;
