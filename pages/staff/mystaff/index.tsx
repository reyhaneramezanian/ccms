import React from 'react';
import Head from 'next/head';
import Mystaff from '@/components/staff/mystaff';
import AdminLayout from '@/layout/admin';

const Index: React.FC = () => {
    return (
        <>
            <Head>
                <title>My staff</title>
                <meta name="robots" content="noindex, nofollow" />
            </Head>

            <AdminLayout>
                <Mystaff />
            </AdminLayout>
        </>
    );
};

export default Index;
