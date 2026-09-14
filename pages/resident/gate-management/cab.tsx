import React from 'react';
import Head from 'next/head';
import AdminLayout from '@/layout/admin';
import GateManagementCab from '@/components/resident/gateManagementCab';

const GateManagementDeliveryPage: React.FC = () => {
    return (
        <>
            <Head>
                <title>Gate management</title>
                <meta name="robots" content="noindex, nofollow" />
            </Head>
            <AdminLayout>
                <GateManagementCab />
            </AdminLayout>
        </>
    );
};

export default GateManagementDeliveryPage;
