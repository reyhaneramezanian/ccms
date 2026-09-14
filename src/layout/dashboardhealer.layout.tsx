import { ReactNode } from 'react';
import Navbar from '@/components/navbar/navbar';
import styled from '@emotion/styled';
import { Typography, Rating } from '@mui/material';

const Main = styled.main({ marginTop: '70px',backgroundColor:'#F8FBFD' });

const Section = styled.section({  });

type Props = {
    children: ReactNode;
};

export default function DashboardHealerLayout({ children }: Props) {
    return (
        <>
            <Navbar />
            <Main>
                <Section>{children}</Section>
            </Main>
        </>
    );
}

