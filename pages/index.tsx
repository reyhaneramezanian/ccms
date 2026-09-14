import React from 'react';
import Welcome from '@/components/welcome';
import BaseLayout from '@/layout/base';
import Head from 'next/head';

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
