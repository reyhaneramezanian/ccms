import React, { useEffect, useState } from 'react';
import { styled, Grid, Card, Button } from '@mui/material';
import * as residentstyle from './resident.style';
import Dateicon from 'src/assets/icons/date';
import AddButton from '../addButton';
import { useDispatch } from 'react-redux';
import { newModal } from 'src/redux/actions/actions';
import Addmodalannouncement from './announcement/addModal.announcements';
import { useAnnouncement_GetAnnouncementsQuery } from 'src/graphql/generated';

const Announcements = () => {
    const dispatch = useDispatch();
    const { data: datadashbord } = useAnnouncement_GetAnnouncementsQuery();

    const handlannouncement = () => {
        dispatch(
            newModal({
                closeButton: true,
                Body: Addmodalannouncement,
                title: 'Add announcement',
                topBar: true,
                id: '1',
                data: []
            })
        );
    };
    return (
        <Grid container style={{ backgroundColor: '#fff', borderRadius: 8 }}>
            <Grid item xs={6} sm={6} md={6} lg={6}>
                <residentstyle.Titledashbord>Announcements</residentstyle.Titledashbord>
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={6}>
                <div style={{ margin: '10px 10px 0 0 ' }}>
                    <AddButton onClick={handlannouncement}> Add announcements</AddButton>
                </div>
            </Grid>

            <Grid alignItems="left" justifyContent="left" container direction="row">
                {datadashbord?.announcement_getAnnouncements?.result?.items?.map((item) => (
                    <Grid maxWidth={'lg'} item xs={12} sm={6} md={4} lg={4}>
                        <residentstyle.card>
                            <Grid container>
                                <Grid item xs={12} sm={12} md={8} lg={8}>
                                    <residentstyle.Titledate>
                                        <residentstyle.imgdate>
                                            <Dateicon />
                                        </residentstyle.imgdate>
                                        <residentstyle.Textdate>
                                            {new Date(item.date).toString().slice(4, 11)}
                                        </residentstyle.Textdate>
                                    </residentstyle.Titledate>
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
                                    <residentstyle.Titlecard>{item.title}</residentstyle.Titlecard>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <residentstyle.Textcard>{item.message}</residentstyle.Textcard>
                                </Grid>
                            </Grid>
                        </residentstyle.card>
                    </Grid>
                ))}
            </Grid>
        </Grid>
    );
};
export default Announcements;
