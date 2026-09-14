import React from 'react';
import Head from 'next/head';
import Welcome from '@/components/welcome/welcome';
import BaseLayout from '@/layout/base';

const Index: React.FC = () => {
    return (
        <>
            <Head>
                <title>Crest gate</title>
                <meta name="robots" content="noindex, nofollow" />
            </Head>

            <BaseLayout>
                <Welcome />
            </BaseLayout>
        </>
    );
};

export default Index;
