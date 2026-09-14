import React from 'react';
import Head from 'next/head';
import PeopleManagement from '@/components/admin/peopleManagement/admin/index';
import AdminLayout from '@/layout/admin';

const Index: React.FC = () => {
    return (
        <>
            <Head>
                <title>People management</title>
                <meta name="robots" content="noindex, nofollow" />
            </Head>
            <AdminLayout>
                <PeopleManagement />
            </AdminLayout>
        </>
    );
};

export default Index;
