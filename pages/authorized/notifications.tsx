import React from 'react';
import Head from 'next/head';
import AdminLayout from '@/layout/admin';
import Notification from '@/components/notifications';

const NotificationPage: React.FC = () => {
    return (
        <>
            <Head>
                <title>Crest gate</title>
                <meta name="robots" content="noindex, nofollow" />
            </Head>
            <AdminLayout>
                <Notification />
            </AdminLayout>
        </>
    );
};

export default NotificationPage;
