import React from 'react';
import Head from 'next/head';
import Payments from '@/components/resident/payments/';
import AdminLayout from '@/layout/admin';

const Index: React.FC = () => {
    return (
        <>
            <Head>
                <title>Payment management</title>
                <meta name="robots" content="noindex, nofollow" />
            </Head>
            <AdminLayout>
                <Payments />
            </AdminLayout>
        </>
    );
};

export default Index;
