import React from 'react';
import Head from 'next/head';
import Request from '@/components/staff/Requestmanager';
import AdminLayout from '@/layout/admin';

const Index: React.FC = () => {
    return (
        <>
            <Head>
                <title>Request</title>
                <meta name="robots" content="noindex, nofollow" />
            </Head>
            <AdminLayout>
                <Request />
            </AdminLayout>
        </>
    );
};

export default Index;
