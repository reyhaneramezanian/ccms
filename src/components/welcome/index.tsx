import COLORS from '@/utils/theme/colors';
import SPACING from '@/utils/theme/spacing';
import { Box, Grid, Typography } from '@mui/material';
//import Image from 'next/image';
import { useRouter } from 'next/router';
import WelcomeTextIcon from 'public/icon/welcomeText';
import { useState } from 'react';
import getRoleText from 'src/data/roleText';
import { UserType } from 'src/graphql/generated';
import * as S from './style.welcome';
import { WelcomeActivePage } from './types.welcome';
import Footer from '@/components/footer';
const Welcome = () => {
    const [activePage, setActivePage] = useState<WelcomeActivePage>('welcome');
    const router = useRouter();

    const handleShowChooseRolePage = () => {
        router.push('/signin');
    };

    return (
        <S.WelcomeWrapper activePage={activePage}>
            <WelcomeTextIcon />

            <S.WelcomeDescription textAlign="center">
                Crestgate is an innovative application which not only strongholds the security at
                the gates but also provides a collaborative platform for all the stakeholders to
                communicate seamlessly.
            </S.WelcomeDescription>

            <S.WelcomeButton variant="contained" onClick={handleShowChooseRolePage}>
                {"Let's start"}
            </S.WelcomeButton>

            <S.WelcomeImageWrapper>
                <img src="/images/welcome.svg" alt="" draggable="false" />
            </S.WelcomeImageWrapper>
            <Footer />
        </S.WelcomeWrapper>
    );
};

export default Welcome;
