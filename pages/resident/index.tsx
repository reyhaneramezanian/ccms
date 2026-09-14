import React from 'react';
import Head from 'next/head';
import Resident from '@/components/resident';
import AdminLayout from '@/layout/admin';

const Index: React.FC = () => {
    return (
        <>
            <Head>
                <title>Crest gate</title>
                <meta name="robots" content="noindex, nofollow" />
            </Head>
            <AdminLayout>
                <Resident />
            </AdminLayout>
        </>
    );
};

export default Index;
