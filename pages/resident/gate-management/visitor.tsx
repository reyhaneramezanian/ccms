import React from 'react';
import Head from 'next/head';
import AdminLayout from '@/layout/admin';
import GateManagementVisitor from '@/components/resident/gateManagementVisitor';

const GateManagementVisitorPage: React.FC = () => {
    return (
        <>
            <Head>
                <title>Gate management</title>
                <meta name="robots" content="noindex, nofollow" />
            </Head>
            <AdminLayout>
                <GateManagementVisitor />
            </AdminLayout>
        </>
    );
};

export default GateManagementVisitorPage;
