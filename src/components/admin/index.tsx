import React, { useEffect, useState } from 'react';
import { styled, Grid, Card } from '@mui/material';
import TableContainer from 'src/components/table_container';
import { useInitialProps } from '@/components/table_container/useTableProps';
import { Columnresidentowners } from './data_type';
import { dashbord } from './data';
import * as adminstyle from './admin.style';
import People from 'src/assets/icons/people';
import Daler from 'src/assets/icons/daler';
import Men from 'src/assets/icons/men';
import Complaint from 'src/assets/icons/complaint';
import Announcements from 'src/assets/icons/announcements';
import Alertdashbord from 'src/assets/icons/alertdashbord';
import Next from 'src/assets/icons/next';
import { getFullImageUrl } from '@/utils/helper/ui';
import {
    useCountDashbordQuery,
    useResidentFlat_GetResidentFlatsQuery,
    SortEnumType,
    useUser_GetStaffsQuery,
    useUser_GetSecuritiesQuery,
    useUser_GetSuperAdminsQuery,
    useUser_GetComplexManagersQuery,
    useUser_GetResidentsQuery,
    UserType
} from 'src/graphql/generated';
import { useRouter } from 'next/router';
import storageKeys from 'src/data/storageKeys';
import { useGetUser } from 'src/auth/UserProvider';

const Index = () => {
    const [listresident, setlistresident] = useState([]);
    const [listrenter, setlistrenter] = useState([]);
    const router = useRouter();
    const user = useGetUser();
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const { data: datasuperdamin } = useUser_GetSuperAdminsQuery({});
    const { data: datacomplexmanager } = useUser_GetComplexManagersQuery({});
    const { data: dataresidentcount } = useUser_GetResidentsQuery({});
    const { data: datacount } = useCountDashbordQuery({});

    const { data: dataresident } = useResidentFlat_GetResidentFlatsQuery({
        skip: 0,
        take: datacount?.residentFlat_getResidentFlats?.result?.totalCount,
        where: {
            resident: { accountDeleted: { eq: false } }
        },
        order: { resident: { createdDate: SortEnumType.Desc } }
    });
    const { data: datastaff } = useUser_GetStaffsQuery({
        take: 5,
        where: {
            accountDeleted: { eq: false }
        },
        order: { id: SortEnumType.Desc }
    });
    const { data: datasecurity } = useUser_GetSecuritiesQuery({
        take: 5,
        where: {
            accountDeleted: { eq: false }
        },
        order: { id: SortEnumType.Desc }
    });

    useEffect(() => {
        var jsresident = [],
            jsrented = [];
        var swresident = 0,
            swrenter = 0;
        dataresident?.residentFlat_getResidentFlats?.result?.items.map((item) => {
            var pm = ' PM ';
            if (Number(item?.resident?.createdDate?.slice(11, 13)) < 12) pm = ' AM ';

            if (item.ownershipStatus === ('OWNER' as any) && swresident < 5) {
                swresident = swresident + 1;
                jsresident.push({
                    img: item.resident.photoUrl,
                    fullname: item.resident.firstName + ' ' + item.resident.lastName,
                    lastModifiedDate:
                        item?.resident?.createdDate?.slice(11, 16) +
                        pm +
                        new Date(item?.resident?.createdDate).toString().slice(4, 11),
                    id: item.resident.id,
                    phon: item.resident.phoneNumber
                });
            } else if (item.ownershipStatus === ('RENTER' as any) && swrenter < 5) {
                swrenter = swrenter + 1;
                jsrented.push({
                    img: item.resident.photoUrl,
                    fullname: item.resident.firstName + ' ' + item.resident.lastName,
                    lastModifiedDate:
                        item?.resident?.createdDate?.slice(11, 16) +
                        pm +
                        new Date(item?.resident?.createdDate).toString().slice(4, 11),
                    id: item.resident.id,
                    phon: item.resident.phoneNumber
                });
            }
        });
        setlistrenter(jsrented);
        setlistresident(jsresident);
    }, [dataresident]);

    const changedate = (createdDate) => {
        var pm = ' PM ';
        if (Number(createdDate.slice(11, 13)) < 12) pm = ' AM ';
        return createdDate.slice(11, 16) + pm + new Date(createdDate).toString().slice(4, 11);
    };
    const onclicksemore = (value) => {
        var path = '/admin/people',
            query = {};

        switch (value) {
            case 'staff':
                path = '/admin/people/users';
                query = { tab: 'Staff' };
                break;
            case 'security':
                path = '/admin/people/users';
                query = { tab: 'Security' };
                break;
            case 'people':
                path = '/admin/people/users';
                break;
            case 'complaint':
                path = '/admin/complaint';
                break;
            case 'payment':
                path = '/admin/payment-management';
                break;
            case 'alert':
                path = '/admin/alert-system';
                break;
            default:
                path = '/admin/announcements';
            // code block
        }
        router.push({
            pathname: path,
            query: query
        });
    };

    return (
        <Grid container style={{ backgroundColor: '#fff', borderRadius: 8 }}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
                <adminstyle.Titledashbord>Dashboard</adminstyle.Titledashbord>
            </Grid>
            <Grid alignItems="left" justifyContent="left" container direction="row">
                <adminstyle.containerflex>
                    <adminstyle.carddashbordadmin>
                        <Grid container>
                            <Grid item xs={6} sm={6} md={6} lg={6}>
                                <div style={{ margin: '10px 0 0 10px' }}>
                                    <People />
                                </div>
                            </Grid>
                            <Grid item xs={6} sm={6} md={6} lg={6}>
                                <adminstyle.containerflex>
                                    <adminstyle.rowgrid>
                                        <adminstyle.Titleccms28>
                                            {Number(
                                                dataresidentcount?.user_getResidents?.result
                                                    ?.totalCount
                                            ) +
                                                Number(
                                                    datastaff?.user_getStaffs?.result?.totalCount
                                                ) +
                                                Number(
                                                    datasecurity?.user_getSecurities?.result
                                                        ?.totalCount
                                                ) +
                                                Number(
                                                    datasuperdamin?.user_getSuperAdmins?.result
                                                        ?.totalCount
                                                ) +
                                                Number(
                                                    datacomplexmanager?.user_getComplexManagers
                                                        ?.result?.totalCount
                                                )}
                                        </adminstyle.Titleccms28>
                                    </adminstyle.rowgrid>
                                    <adminstyle.rowgrid>
                                        <adminstyle.Titleccms16>Item(s)</adminstyle.Titleccms16>
                                    </adminstyle.rowgrid>
                                </adminstyle.containerflex>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <adminstyle.Titleccms20>People management</adminstyle.Titleccms20>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <adminstyle.Seemore onClick={() => onclicksemore('people')}>
                                <Next />
                            </adminstyle.Seemore>
                        </Grid>
                    </adminstyle.carddashbordadmin>
                    <adminstyle.carddashbordadmin>
                        <Grid container>
                            <Grid item xs={6} sm={6} md={6} lg={6}>
                                <div style={{ margin: '10px 0 0 10px' }}>
                                    <Daler />
                                </div>
                            </Grid>
                            <Grid item xs={6} sm={6} md={6} lg={6}>
                                <adminstyle.containerflex>
                                    <adminstyle.rowgrid>
                                        <adminstyle.Titleccms28>
                                            {datacount?.payment_getPayments?.result?.totalCount}
                                        </adminstyle.Titleccms28>
                                    </adminstyle.rowgrid>
                                    <adminstyle.rowgrid>
                                        <adminstyle.Titleccms16>Item(s)</adminstyle.Titleccms16>
                                    </adminstyle.rowgrid>
                                </adminstyle.containerflex>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <adminstyle.Titleccms20>Payment management</adminstyle.Titleccms20>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <adminstyle.Seemore onClick={() => onclicksemore('payment')}>
                                <Next />
                            </adminstyle.Seemore>
                        </Grid>
                    </adminstyle.carddashbordadmin>
                    <adminstyle.carddashbordadmin>
                        <Grid container>
                            <Grid item xs={6} sm={6} md={6} lg={6}>
                                <div style={{ margin: '10px 0 0 10px' }}>
                                    <Complaint />
                                </div>
                            </Grid>
                            <Grid item xs={6} sm={6} md={6} lg={6}>
                                <adminstyle.containerflex>
                                    <adminstyle.rowgrid>
                                        <adminstyle.Titleccms28>
                                            {datacount?.complaint_getComplaints?.result?.totalCount}
                                        </adminstyle.Titleccms28>
                                    </adminstyle.rowgrid>
                                    <adminstyle.rowgrid>
                                        <adminstyle.Titleccms16>Item(s)</adminstyle.Titleccms16>
                                    </adminstyle.rowgrid>
                                </adminstyle.containerflex>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <adminstyle.Titleccms20>Complaint</adminstyle.Titleccms20>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <adminstyle.Seemore onClick={() => onclicksemore('complaint')}>
                                <Next />
                            </adminstyle.Seemore>
                        </Grid>
                    </adminstyle.carddashbordadmin>
                    <adminstyle.carddashbordadmin>
                        <Grid container>
                            <Grid item xs={6} sm={6} md={6} lg={6}>
                                <div style={{ margin: '10px 0 0 10px' }}>
                                    <Announcements />
                                </div>
                            </Grid>
                            <Grid item xs={6} sm={6} md={6} lg={6}>
                                <adminstyle.containerflex>
                                    <adminstyle.rowgrid>
                                        <adminstyle.Titleccms28>
                                            {
                                                datacount?.announcement_getAnnouncements?.result
                                                    ?.totalCount
                                            }
                                        </adminstyle.Titleccms28>
                                    </adminstyle.rowgrid>
                                    <adminstyle.rowgrid>
                                        <adminstyle.Titleccms16>Item(s)</adminstyle.Titleccms16>
                                    </adminstyle.rowgrid>
                                </adminstyle.containerflex>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <adminstyle.Titleccms20>Announcement </adminstyle.Titleccms20>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <adminstyle.Seemore onClick={() => onclicksemore('announcement')}>
                                <Next />
                            </adminstyle.Seemore>
                        </Grid>
                    </adminstyle.carddashbordadmin>
                    <adminstyle.carddashbordadmin>
                        <Grid container>
                            <Grid item xs={6} sm={6} md={6} lg={6}>
                                <div style={{ margin: '10px 0 0 10px' }}>
                                    <Alertdashbord />
                                </div>
                            </Grid>
                            <Grid item xs={6} sm={6} md={6} lg={6}>
                                <adminstyle.containerflex>
                                    <adminstyle.rowgrid>
                                        <adminstyle.Titleccms28>
                                            {datacount?.alert_getAlerts?.result?.totalCount}
                                        </adminstyle.Titleccms28>
                                    </adminstyle.rowgrid>
                                    <adminstyle.rowgrid>
                                        <adminstyle.Titleccms16>Item(s)</adminstyle.Titleccms16>
                                    </adminstyle.rowgrid>
                                </adminstyle.containerflex>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <adminstyle.Titleccms20>Alert system</adminstyle.Titleccms20>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <adminstyle.Seemore onClick={() => onclicksemore('alert')}>
                                <Next />
                            </adminstyle.Seemore>
                        </Grid>
                    </adminstyle.carddashbordadmin>
                </adminstyle.containerflex>
            </Grid>

            <adminstyle.containerflex>
                <adminstyle.carddashbordadminGrid>
                    <adminstyle.containerdashbord>
                        <adminstyle.boxsubject>
                            <adminstyle.Titleccms>All resident owners</adminstyle.Titleccms>
                        </adminstyle.boxsubject>
                        <adminstyle.boxmore>
                            <adminstyle.Seemore onClick={() => onclicksemore('people')}>
                                <Next />
                            </adminstyle.Seemore>
                        </adminstyle.boxmore>
                    </adminstyle.containerdashbord>
                    {listresident?.map((item) => (
                        <adminstyle.containerflex>
                            <adminstyle.imageGrid
                                src={
                                    item?.img == '' || item?.img == undefined
                                        ? '/images/men.png'
                                        : getFullImageUrl(item?.img)
                                }
                            />
                            <adminstyle.boxGrid>
                                <adminstyle.fulnameGrid>{item?.fullname}</adminstyle.fulnameGrid>
                                <adminstyle.dateGrid>{item?.lastModifiedDate}</adminstyle.dateGrid>
                            </adminstyle.boxGrid>
                            <adminstyle.boxmobilGrid>
                                <adminstyle.fulnameGrid>{item.phon}</adminstyle.fulnameGrid>
                            </adminstyle.boxmobilGrid>
                        </adminstyle.containerflex>
                    ))}
                </adminstyle.carddashbordadminGrid>
                <adminstyle.carddashbordadminGrid>
                    <adminstyle.containerdashbord>
                        <adminstyle.boxsubject>
                            <adminstyle.Titleccms>All resident renters</adminstyle.Titleccms>
                        </adminstyle.boxsubject>
                        <adminstyle.boxmore>
                            <adminstyle.Seemore onClick={() => onclicksemore('people')}>
                                <Next />
                            </adminstyle.Seemore>
                        </adminstyle.boxmore>
                    </adminstyle.containerdashbord>

                    {listrenter?.map((item) => (
                        <adminstyle.containerflex>
                            <adminstyle.imageGrid
                                src={
                                    item?.img == '' || item?.img == undefined
                                        ? '/images/men.png'
                                        : getFullImageUrl(item?.img)
                                }
                            />
                            <adminstyle.boxGrid>
                                <adminstyle.fulnameGrid>{item?.fullname}</adminstyle.fulnameGrid>
                                <adminstyle.dateGrid>{item?.lastModifiedDate}</adminstyle.dateGrid>
                            </adminstyle.boxGrid>
                            <adminstyle.boxmobilGrid>
                                <adminstyle.fulnameGrid>{item.phon}</adminstyle.fulnameGrid>
                            </adminstyle.boxmobilGrid>
                        </adminstyle.containerflex>
                    ))}
                </adminstyle.carddashbordadminGrid>
                <adminstyle.carddashbordadminGrid>
                    <adminstyle.containerdashbord>
                        <adminstyle.boxsubject>
                            <adminstyle.Titleccms>All staff</adminstyle.Titleccms>
                        </adminstyle.boxsubject>
                        <adminstyle.boxmore>
                            <adminstyle.Seemore onClick={() => onclicksemore('staff')}>
                                <Next />
                            </adminstyle.Seemore>
                        </adminstyle.boxmore>
                    </adminstyle.containerdashbord>
                    {datastaff?.user_getStaffs?.result?.items?.map((item) => (
                        <adminstyle.containerflex>
                            <adminstyle.imageGrid
                                src={
                                    item?.photoUrl == '' || item?.photoUrl == undefined
                                        ? '/images/men.png'
                                        : getFullImageUrl(item?.photoUrl)
                                }
                            />
                            <adminstyle.boxGrid>
                                <adminstyle.fulnameGrid>
                                    {item?.firstName + ' ' + item?.lastName}
                                </adminstyle.fulnameGrid>
                                <adminstyle.dateGrid>
                                    {changedate(item?.createdDate)}
                                </adminstyle.dateGrid>
                            </adminstyle.boxGrid>
                            <adminstyle.boxmobilGrid>
                                <adminstyle.fulnameGrid>{item?.phoneNumber}</adminstyle.fulnameGrid>
                            </adminstyle.boxmobilGrid>
                        </adminstyle.containerflex>
                    ))}
                </adminstyle.carddashbordadminGrid>
                <adminstyle.carddashbordadminGrid>
                    <adminstyle.containerdashbord>
                        <adminstyle.boxsubject>
                            <adminstyle.Titleccms>All securities</adminstyle.Titleccms>
                        </adminstyle.boxsubject>
                        <adminstyle.boxmore>
                            <adminstyle.Seemore onClick={() => onclicksemore('security')}>
                                <Next />
                            </adminstyle.Seemore>
                        </adminstyle.boxmore>
                    </adminstyle.containerdashbord>
                    {datasecurity?.user_getSecurities?.result?.items?.map((item) => (
                        <adminstyle.containerflex>
                            <adminstyle.imageGrid
                                src={
                                    item?.photoUrl == '' || item?.photoUrl == undefined
                                        ? '/images/men.png'
                                        : getFullImageUrl(item?.photoUrl)
                                }
                            />
                            <adminstyle.boxGrid>
                                <adminstyle.fulnameGrid>
                                    {item?.firstName + ' ' + item?.lastName}
                                </adminstyle.fulnameGrid>
                                <adminstyle.dateGrid>
                                    {changedate(item?.createdDate)}
                                </adminstyle.dateGrid>
                            </adminstyle.boxGrid>
                            <adminstyle.boxmobilGrid>
                                <adminstyle.fulnameGrid>{item?.phoneNumber}</adminstyle.fulnameGrid>
                            </adminstyle.boxmobilGrid>
                        </adminstyle.containerflex>
                    ))}
                </adminstyle.carddashbordadminGrid>
            </adminstyle.containerflex>
        </Grid>
    );
};
export default Index;
