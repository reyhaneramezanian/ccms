import React from 'react';
import Head from 'next/head';
import AdminLayout from '@/layout/admin';
import SecurityGateManagement from '@/components/security/gateManagement';

const SecurityGateManagementPage: React.FC = () => {
    return (
        <>
            <Head>
                <title>Gate management</title>
                <meta name="robots" content="noindex, nofollow" />
            </Head>

            <AdminLayout>
                <SecurityGateManagement />
            </AdminLayout>
        </>
    );
};

export default SecurityGateManagementPage;
