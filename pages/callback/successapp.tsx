import React from 'react';
import Head from 'next/head';
import Admin from '@/components/callback/successapp';

const Successapp: React.FC = () => {
    return (
        <>
            <Head>
                <title>Crest gate</title>

                <meta name="robots" content="noindex, nofollow" />
            </Head>
            <Admin />
        </>
    );
};

export default Successapp;
