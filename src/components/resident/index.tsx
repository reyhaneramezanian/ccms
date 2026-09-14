import React, { useEffect, useState } from 'react';
import { styled, Grid, Card, Button } from '@mui/material';
import * as residentstyle from './resident.style';
import Managementgate from 'src/assets/icons/managementgate';
import Makepayment from 'src/assets/icons/makepayment';
import Requestserviceicon from 'src/assets/icons/requestservice';
import Addcomplaint from 'src/assets/icons/addcomplaint';
import Requesticon from 'src/assets/icons/request';
import Dateicon from 'src/assets/icons/date';
import { useDispatch } from 'react-redux';
import { newModal } from 'src/redux/actions/actions';
import ManagegateAddModal from './addModal.managegate';
import Addmodalcomplaint from './complaint/addModal.complaint';
import Addmodalpaymeny from './payment/addModal.payment';
import AddmodalRequest from './Requestservice/addModal.Requestservice';
import {
    useAnnouncement_GetAnnouncementsQuery,
    useTotalbuildingQuery,
    SortEnumType
} from 'src/graphql/generated';
import Link from 'next/link';
import { handleShowSelectGateManagementApprovalTypeModal } from '../gateManagement';
import AddcomplaintModal from './complaint/addModal.complaint';

const Index = () => {
    const dispatch = useDispatch();
    const { data: totalbuilding } = useTotalbuildingQuery();
    const [typecolor, settypecolor] = useState([]);

    const { data: datadashbord } = useAnnouncement_GetAnnouncementsQuery({
        take: totalbuilding?.announcement_getAnnouncements?.result?.totalCount,
        order: { id: SortEnumType.Desc }
    });

    useEffect(() => {
        var js = [],
            sw = 0;
        datadashbord?.announcement_getAnnouncements?.result?.items?.forEach((v, i) => {
            sw = 0;
            js.forEach((item, index) => {
                if (v.announcementType.id === item.typeannonce) sw = 1;
            });
            if (sw === 0) {
                var color = Math.floor(Math.random() * 16777215)
                    .toString(16)
                    .toString();
                js.push({
                    typeannonce: v.announcementType.id,
                    //color: color === 'f2f3f7' || 'db0d6' ? '#573cf7' : '#' + color
                    color: color === 'db0d6' ? '#573cf7' : '#' + color
                });
            }
        });

        settypecolor(js);
    }, [datadashbord]);
    const handlmanage = () => {
        dispatch(
            newModal({
                closeButton: true,
                Body: ManagegateAddModal,
                title: 'Add complaint',
                topBar: true,
                id: '1',
                data: []
            })
        );
        // dispatch(handleShowSelectGateManagementApprovalTypeModal());
    };
    const handlcomplaint = () => {
        dispatch(AddcomplaintModal(''));
    };
    const handlpayment = () => {
        dispatch(
            newModal({
                closeButton: true,
                Body: Addmodalpaymeny,
                title: 'Make a payment',
                topBar: true,
                id: '1',
                data: []
            })
        );
    };
    const handlRequest = () => {
        dispatch(
            newModal({
                closeButton: true,
                Body: AddmodalRequest,
                title: 'Request service',
                topBar: true,
                id: '1',
                data: []
            })
        );
    };
    return (
        <Grid container style={{ backgroundColor: '#fff', borderRadius: 8 }}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
                <residentstyle.Titledashbord>Dashbord</residentstyle.Titledashbord>
            </Grid>
            {/* <Grid item xs={12} sm={12} md={12} lg={12}>
                <residentstyle.Titledashbord>Quick access</residentstyle.Titledashbord>
    </Grid>*/}
            <Grid item xs={12} sm={12} md={3} lg={3}>
                <residentstyle.cardguick onClick={() => handlmanage()}>
                    <residentstyle.imgcardguick>
                        <Managementgate />
                    </residentstyle.imgcardguick>
                    <residentstyle.Textcardguick>Manage gate</residentstyle.Textcardguick>
                </residentstyle.cardguick>
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3}>
                <residentstyle.cardguick onClick={() => handlpayment()}>
                    <residentstyle.imgcardguick>
                        <Makepayment />
                    </residentstyle.imgcardguick>
                    <residentstyle.Textcardguick>Make payment</residentstyle.Textcardguick>
                </residentstyle.cardguick>
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3}>
                <residentstyle.cardguick onClick={() => handlRequest()}>
                    <residentstyle.imgcardguick>
                        <Requesticon />
                    </residentstyle.imgcardguick>
                    <residentstyle.Textcardguick>Request service</residentstyle.Textcardguick>
                </residentstyle.cardguick>
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3}>
                <residentstyle.cardguick onClick={() => handlcomplaint()}>
                    <residentstyle.imgcardguick>
                        <Addcomplaint />
                    </residentstyle.imgcardguick>
                    <residentstyle.Textcardguick>Add complaint</residentstyle.Textcardguick>
                </residentstyle.cardguick>
            </Grid>
            {datadashbord?.announcement_getAnnouncements?.result?.totalCount > 0 ? (
                <>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                        <residentstyle.Titledashbord>Announcements</residentstyle.Titledashbord>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                        {/* <Link href="./resident/announcements">
                    <residentstyle.seemore>See more</residentstyle.seemore>
    </Link>*/}
                    </Grid>
                </>
            ) : (
                ''
            )}
            <Grid alignItems="left" justifyContent="left" container direction="row">
                {datadashbord?.announcement_getAnnouncements?.result?.items?.map((item, index) => (
                    <Grid maxWidth={'lg'} item xs={12} sm={6} md={4} lg={4} key={index}>
                        <residentstyle.card>
                            <Grid container>
                                <Grid item xs={12} sm={12} md={5} lg={5}>
                                    <residentstyle.Titledate>
                                        <residentstyle.imgdate>
                                            <Dateicon />
                                        </residentstyle.imgdate>
                                        <residentstyle.Textdate>
                                            {new Date(item.date).toString().slice(4, 15)}
                                        </residentstyle.Textdate>
                                    </residentstyle.Titledate>
                                </Grid>
                                <Grid item xs={12} sm={12} md={7} lg={7}>
                                    {typecolor.map((item1) =>
                                        item1.typeannonce === item.announcementType.id ? (
                                            <residentstyle.boxtitledashbord
                                                title={item.announcementType.name}
                                                style={{
                                                    backgroundColor: `${item1.color}`
                                                }}>
                                                {item.announcementType.name}
                                            </residentstyle.boxtitledashbord>
                                        ) : (
                                            ''
                                        )
                                    )}
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <residentstyle.Titlecard>{item.title}</residentstyle.Titlecard>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <residentstyle.Textcard title={item.message}>
                                        {item.message}
                                    </residentstyle.Textcard>
                                </Grid>
                            </Grid>
                        </residentstyle.card>
                    </Grid>
                ))}
            </Grid>
        </Grid>
    );
};
export default Index;
