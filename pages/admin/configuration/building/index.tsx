import React from 'react';
import Head from 'next/head';
import AdminLayout from '@/layout/admin';
import BuildingConfiguration from '@/components/admin/buildingConfiguration/index';

const BuildingConfigurationPage: React.FC = () => {
    return (
        <>
            <Head>
                <title>Building configuration</title>

                <meta name="robots" content="noindex, nofollow" />
            </Head>

            <AdminLayout>
                <BuildingConfiguration />
            </AdminLayout>
        </>
    );
};

export default BuildingConfigurationPage;
