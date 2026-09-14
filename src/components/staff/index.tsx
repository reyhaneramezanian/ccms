import React, { useEffect, useState } from 'react';
import { styled, Grid, Card, Button } from '@mui/material';
import * as staffstyle from './staff.style';
import Date from 'src/assets/icons/date';
import { useRouter } from 'next/router';

import {
    useAnnouncement_GetAnnouncementsQuery,
    useUser_GetCurrentSecurityQuery
} from 'src/graphql/generated';

const Index = () => {
    const router = useRouter();
    router.push({
        pathname: '/staff/profile'
    });

    const { data: datacurentsecurity } = useUser_GetCurrentSecurityQuery();

    const { data: datadashbord } = useAnnouncement_GetAnnouncementsQuery({
        where: { complexId: { eq: datacurentsecurity?.user_getCurrentSecurity?.result?.complexId } }
    });

    return (
        <Grid container style={{ backgroundColor: '#fff', borderRadius: 8 }}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
                <staffstyle.Titledashbord>Announcements</staffstyle.Titledashbord>
            </Grid>
            <Grid alignItems="left" justifyContent="left" container direction="row">
                {datadashbord?.announcement_getAnnouncements?.result?.items?.map((item) => (
                    <Grid maxWidth={'lg'} item xs={12} sm={6} md={4} lg={4}>
                        <staffstyle.card>
                            <Grid container>
                                <Grid item xs={12} sm={12} md={8} lg={8}>
                                    <staffstyle.Titledate>
                                        <staffstyle.imgdate>
                                            <Date />
                                        </staffstyle.imgdate>
                                        <staffstyle.Textdate>
                                            {new Date(item.date).toString().slice(4, 11)}
                                        </staffstyle.Textdate>
                                    </staffstyle.Titledate>
                                </Grid>
                                <Grid item xs={12} sm={12} md={4} lg={4}>
                                    <Button
                                        style={{
                                            backgroundColor: `${
                                                item.announcementType.name === 'Events'
                                                    ? '#3DCC79'
                                                    : item.announcementType.name === 'Function'
                                                    ? '#E6BF4C'
                                                    : item.announcementType.name === 'Maintanace'
                                                    ? '#4DA5FF'
                                                    : '#fff'
                                            }`,
                                            borderRadius: '8px',
                                            fontSize: '16px',
                                            fontFamily: 'Poppins',
                                            color: '#fff',
                                            padding: '8px 15px'
                                        }}>
                                        {item.announcementType.name}
                                    </Button>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <staffstyle.Titlecard>{item.title}</staffstyle.Titlecard>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <staffstyle.Textcard>{item.message}</staffstyle.Textcard>
                                </Grid>
                            </Grid>
                        </staffstyle.card>
                    </Grid>
                ))}
            </Grid>
        </Grid>
    );
};
export default Index;
