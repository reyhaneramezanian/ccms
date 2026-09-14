import { S, Header, Navbar } from './lib';
import BaseLayout from '../base';
import { useEffect, useState } from 'react';
import Footer from '@/components/footer';
import { Spacer } from '@/components/base/spacer';
export const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <BaseLayout>
            <S.Layout>
                <Header />

                <S.Main>
                    <Navbar />

                    <S.MainContent>{children}</S.MainContent>
                    <Spacer space={50} />
                </S.Main>
            </S.Layout>
        </BaseLayout>
    );
};

export default AdminLayout;
