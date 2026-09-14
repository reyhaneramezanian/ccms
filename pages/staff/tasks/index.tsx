import React from 'react';
import Head from 'next/head';
import Tasks from '@/components/staff/tasks';
import AdminLayout from '@/layout/admin';

const Index: React.FC = () => {
    return (
        <>
            <Head>
                <title>Tasks</title>
                <meta name="robots" content="noindex, nofollow" />
            </Head>
            <AdminLayout>
                <Tasks />
            </AdminLayout>
        </>
    );
};

export default Index;
