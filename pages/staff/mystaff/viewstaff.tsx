import React from 'react';
import Head from 'next/head';
import Viewstaff from '@/components/staff/mystaff/viewstaff';
import AdminLayout from '@/layout/admin';

const Index: React.FC = () => {
    return (
        <>
            <Head>
                <title>My staff</title>
                <meta name="robots" content="noindex, nofollow" />
            </Head>

            <AdminLayout>
                <Viewstaff />
            </AdminLayout>
        </>
    );
};

export default Index;
