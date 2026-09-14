import React from 'react';
import Head from 'next/head';
import Sucsess from '@/components/resident/callback/callbackpay';
import AdminLayout from '@/layout/admin';

const Index: React.FC = () => {
    return (
        <>
            <Head>
                <title>Crest gate</title>
                <meta name="robots" content="noindex, nofollow" />
            </Head>

            <AdminLayout>
                <Sucsess />
            </AdminLayout>
        </>
    );
};

export default Index;
