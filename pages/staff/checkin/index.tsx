import React from 'react';
import Head from 'next/head';
import Gate from '@/components/staff/checkin';
import AdminLayout from '@/layout/admin';

const Index: React.FC = () => {
    return (
        <>
            <Head>
                <title>Check-in/out</title>
                <meta name="robots" content="noindex, nofollow" />
            </Head>
            <AdminLayout>
                <Gate />
            </AdminLayout>
        </>
    );
};

export default Index;
