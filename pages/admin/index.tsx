import React from 'react';
import Head from 'next/head';
import Admin from '@/components/admin';
import AdminLayout from '@/layout/admin';

const Index: React.FC = () => {
    return (
        <>
            <Head>
                <title>Crest gate</title>

                <meta name="robots" content="noindex, nofollow" />
            </Head>
            <AdminLayout>
                <Admin />
            </AdminLayout>
        </>
    );
};

export default Index;
