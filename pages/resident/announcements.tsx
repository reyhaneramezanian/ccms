import React from 'react';
import Head from 'next/head';
import Announcements from '@/components/resident/announcements';
import AdminLayout from '@/layout/admin';

const Index: React.FC = () => {
    return (
        <>
            <Head>
                <title>Crest gate</title>
                <meta name="robots" content="noindex, nofollow" />
            </Head>
            <AdminLayout>
                <Announcements />
            </AdminLayout>
        </>
    );
};

export default Index;
