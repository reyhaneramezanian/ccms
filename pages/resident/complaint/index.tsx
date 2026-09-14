import React from 'react';
import Head from 'next/head';
import AdminLayout from '@/layout/admin';
import Complaint from '@/components/resident/complaint';

const ComplaintPage: React.FC = () => {
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

export default ComplaintPage;
