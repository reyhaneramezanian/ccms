import React, { useEffect, useState } from 'react';
import { styled, Grid, Card, Button } from '@mui/material';
import * as securitystyle from './security.style';
import Date from 'src/assets/icons/date';
import {
    useAnnouncement_GetAnnouncementsQuery,
    useUser_GetCurrentSecurityQuery
} from 'src/graphql/generated';

const Index = () => {
    const { data: datacurentsecurity } = useUser_GetCurrentSecurityQuery();

    const { data: datadashbord } = useAnnouncement_GetAnnouncementsQuery({
        where: { complexId: { eq: datacurentsecurity?.user_getCurrentSecurity?.result?.complexId } }
    });

    return (
        <Grid container style={{ backgroundColor: '#fff', borderRadius: 8 }}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
                <securitystyle.Titledashbord>Announcements</securitystyle.Titledashbord>
            </Grid>
            <Grid alignItems="left" justifyContent="left" container direction="row">
                {datadashbord?.announcement_getAnnouncements?.result?.items?.map((item) => (
                    <Grid maxWidth={'lg'} item xs={12} sm={6} md={4} lg={4}>
                        <securitystyle.card>
                            <Grid container>
                                <Grid item xs={12} sm={12} md={8} lg={8}>
                                    <securitystyle.Titledate>
                                        <securitystyle.imgdate>
                                            <Date />
                                        </securitystyle.imgdate>
                                        <securitystyle.Textdate>
                                            {new Date(item.date).toString().slice(4, 11)}
                                        </securitystyle.Textdate>
                                    </securitystyle.Titledate>
                                </Grid>
                                <Grid item xs={12} sm={12} md={4} lg={4}>
                                    <Button
                                        style={{
                                            backgroundColor: `${
                                                item.announcementType.name === 'Events'
                                                    ? '#3DCC79'
                                                    : item.announcementType.name === 'Function'
                                                    ? '#E6BF4C'
                                                    : '#4DA5FF'
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
                                    <securitystyle.Titlecard>{item.title}</securitystyle.Titlecard>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <securitystyle.Textcard>{item.message}</securitystyle.Textcard>
                                </Grid>
                            </Grid>
                        </securitystyle.card>
                    </Grid>
                ))}
            </Grid>
        </Grid>
    );
};
export default Index;
