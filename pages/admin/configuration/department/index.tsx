import React from 'react';
import Head from 'next/head';
import AdminLayout from '@/layout/admin';
import DepartmentConfiguration from '@/components/admin/departmentConfiguration';

const DepartmentConfigurationPage: React.FC = () => {
    return (
        <>
            <Head>
                <title>Department configuration</title>
                <meta name="robots" content="noindex, nofollow" />
            </Head>

            <AdminLayout>
                <DepartmentConfiguration />
            </AdminLayout>
        </>
    );
};

export default DepartmentConfigurationPage;
