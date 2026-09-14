import React from 'react';
import Head from 'next/head';
import Checkin from '@/components/admin/checkin';
import AdminLayout from '@/layout/admin';

const Index: React.FC = () => {
    return (
        <>
            <Head>
                <title>Check-in/out</title>
                <meta name="robots" content="noindex, nofollow" />
            </Head>
            <AdminLayout>
                <Checkin />
            </AdminLayout>
        </>
    );
};

export default Index;
