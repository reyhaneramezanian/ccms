import React from 'react';
import Head from 'next/head';
import AdminLayout from '@/layout/admin';
import GateManagementDelivery from '@/components/resident/gateManagementDelivery';

const GateManagementDeliveryPage: React.FC = () => {
    return (
        <>
            <Head>
                <title>Gate management</title>
                <meta name="robots" content="noindex, nofollow" />
            </Head>
            <AdminLayout>
                <GateManagementDelivery />
            </AdminLayout>
        </>
    );
};

export default GateManagementDeliveryPage;
