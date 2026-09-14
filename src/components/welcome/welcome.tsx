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
    const [activePage, setActivePage] = useState<WelcomeActivePage>('');
    const router = useRouter();

    const data = [
        /*  {
            imageUrl: '/images/admin.svg',
            title: 'adminpanel',
            url: UserType.SuperAdmin
        },*/
        {
            imageUrl: '/images/resident.svg',
            title: 'resident',
            url: UserType.Resident
        },
        {
            imageUrl: '/images/security.svg',
            title: 'security',
            url: UserType.Security
        },
        {
            imageUrl: '/images/staff.svg',
            title: 'staff',
            url: UserType.Staff
        }
    ];

    const onchangesign = (url) => {
        if (UserType.Resident === url)
            router.push({
                pathname: '/signup/resident'
                //query: { role: getRoleText(url) }
            });
        else
            router.push({
                pathname: '/[role]/signup',
                query: { role: getRoleText(url) }
            });
    };
    return (
        <S.WelcomeWrapper activePage={activePage}>
            <Box>
                <Typography variant="h2" color={COLORS.black3}>
                    Who are you?
                </Typography>

                <S.WelcomeDescription textAlign="left">
                    Choose your role to continue...
                </S.WelcomeDescription>

                <S.WelcomeRoleContainer>
                    <Grid container spacing={SPACING[24]}>
                        {data.map((item, index) => (
                            <Grid item key={index} lg={4}>
                                <S.WelcomeRoleItem onClick={() => onchangesign(item.url)}>
                                    <div>
                                        <img src={item.imageUrl} alt="Image" />
                                    </div>

                                    <S.WelcomeRoleItemTitle>
                                        {item.title.toUpperCase()}
                                    </S.WelcomeRoleItemTitle>
                                </S.WelcomeRoleItem>
                            </Grid>
                        ))}
                    </Grid>
                </S.WelcomeRoleContainer>
            </Box>
            <Footer />
        </S.WelcomeWrapper>
    );
};

export default Welcome;
