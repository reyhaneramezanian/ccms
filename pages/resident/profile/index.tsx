import React from 'react';
import Head from 'next/head';
import Profile from '@/components/resident/profile/';
import AdminLayout from '@/layout/admin';

const Index: React.FC = () => {
    return (
        <>
            <Head>
                <title>Profile</title>
                <meta name="robots" content="noindex, nofollow" />
            </Head>
            <AdminLayout>
                <Profile />
            </AdminLayout>
        </>
    );
};

export default Index;
