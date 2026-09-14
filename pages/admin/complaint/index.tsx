import React from 'react';
import Head from 'next/head';
import Complaint from '@/components/admin/complaint/index';
import AdminLayout from '@/layout/admin';

const Index: React.FC = () => {
    return (
        <>
            <Head>
                <title>Complaint</title>
                <meta name="robots" content="noindex, nofollow" />
            </Head>
            <AdminLayout>
                <Complaint />
            </AdminLayout>
        </>
    );
};

export default Index;
