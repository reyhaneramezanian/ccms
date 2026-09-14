import React from 'react';
import Head from 'next/head';
import Security from '@/components/security/staff';
import AdminLayout from '@/layout/admin';

const Index: React.FC = () => {
    return (
        <>
            <Head>
                <title>Check-in/out</title>
                <meta name="robots" content="noindex, nofollow" />
            </Head>

            <AdminLayout>
                <Security />
            </AdminLayout>
        </>
    );
};

export default Index;
