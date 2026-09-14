import React from 'react';
import { styled, Grid, Box, Typography, Button, useTheme, useMediaQuery } from '@mui/material';
import ChartLineDate from '@/components/shared/share/chart-line-date';
import ChartCircle from '@/components/shared/share/chart-circle';
import { CenterDiv, TitleHeader, CustomPayment, CustomBoxShadow } from '../styled.profile';
import { RowWallet } from '../data-type';
import WalletItems from '@/components/shared/share/wallet-item';
import BasicTable from '@/components/shared/share/basic-table';


const ParentStyle = styled('div')(({ theme }) => ({
    // height: '99%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '10px 25px',
    [theme.breakpoints.down("sm")]: {
        padding: '10px 10px',
    }
}));

const CustomHeightSpicify = styled('div')({
    minHeight: '45vh',
     maxHeight: '45vh',
      overflow: 'hidden'
})

const CustomParent = styled('div')({
    margin: '0 43px',
})

const ShareStyle = {
    padding: '5px 15px',
    margin: 0
}

const CustomLi = styled('li')({
    color: '#707070',
    marginBottom: 17,
    padding: 0
})

const Dashboard = () => {
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
    const propsWallet = {
        rows: RowWallet,
        isLoading: false,
    };

    return (
        <CustomParent>
            <Grid container spacing={4}>
                <Grid item md={7} xs={12}>
                    <ParentStyle><ChartLineDate isSmall={String(isSmall)} title="CLIENT" titleActivity="true" /></ParentStyle>
                </Grid>
                <Grid item md={5} xs={12}>
                    <ParentStyle><CircleChart isSmall={isSmall} /></ParentStyle>
                </Grid>
            </Grid>
            <Grid container sx={{ marginTop: '16px' }} spacing={3}>
                <Grid item md={3} xs={12}>
                    <ParentStyle>
                        <TitleHeader>Notification</TitleHeader>
                        <CustomHeightSpicify>
                            <ol style={{ ...ShareStyle, marginTop: '20px' }}>
                                <CustomLi>Lorem ipsum dolor sit amet,consectetur adipiscing elit</CustomLi>
                                <CustomLi>Lorem ipsum dolor sit amet,consectetur adipiscing elit</CustomLi>
                                <CustomLi>Lorem ipsum dolor sit amet,consectetur adipiscing elit</CustomLi>
                                <CustomLi>Lorem ipsum dolor sit amet,consectetur adipiscing elit</CustomLi>
                                <CustomLi>Lorem ipsum dolor sit amet,consectetur adipiscing elit</CustomLi>
                            </ol>
                        </CustomHeightSpicify>
                        <CenterDiv><CustomButtonSeeMore isSmall={isSmall} /></CenterDiv>
                    </ParentStyle>
                </Grid>
                <Grid item md={4} xs={12}>
                    <ParentStyle>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}><TitleHeader>Wallet</TitleHeader><CustomPayment><Typography>$ 12,340,000</Typography></CustomPayment></div>
                        <CustomHeightSpicify><WalletItems {...propsWallet} /></CustomHeightSpicify>
                        <CenterDiv><CustomButtonSeeMore isSmall={isSmall} /></CenterDiv>
                    </ParentStyle>
                </Grid>
                <Grid item md={5} xs={12}>
                    <ParentStyle>
                        <TitleHeader>Client Request</TitleHeader>
                        <CustomHeightSpicify>
                            <BasicTable />
                        </CustomHeightSpicify>
                        <CenterDiv><CustomButtonSeeMore style={{ width: isSmall ? '100%' : '350px', height: '50px', marginTop: 0 }} /></CenterDiv>
                    </ParentStyle>
                </Grid>
            </Grid>
        </CustomParent>
    )
}


function CircleChart({ isSmall }) {
    return (
        <>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography sx={{ color: '#213950', fontSize: isSmall ? '20px' : '24px' }}>Last Your Session</Typography>
                <CustomBoxShadow>
                    <Typography sx={{ color: '#213950', fontSize: '20px' }}>$300</Typography>
                </CustomBoxShadow>
            </Box>
            <Box sx={{ marginTop: '35px', flexFlow: 'row wrap' }} display="flex" justifyContent="space-between">
                <Box display="flex" flexDirection="column" >
                    <ItemsHealer item="Service Type" value="Yoga" />
                    <ItemsHealer item="Duration" value="20 Days" />
                    <ItemsHealer item="Capacity" value="22" />
                    <ItemsHealer item="Record" value={false} />
                </Box>
                <div style={{ width: '200px', height: '200px' }}><ChartCircle /></div>
            </Box>
            <CustomButtonSeeMore isSmall={isSmall} style={{ marginTop: 0 }} />
        </>
    )
}


export const ItemsHealer = ({ item, value, ChangeAlign = false }: { item: string, value: string | boolean, ChangeAlign?: boolean }) => {
    return (
        <div style={{ display: 'flex', marginBottom: '7px', alignItems: ChangeAlign ? 'flex-start' : 'center', minWidth: '150px' }}>{typeof (value) === "boolean" ? <><Typography sx={{ fontWeight: 'bold', fontSize: '15px', color: '#213950' }}>{item}:</Typography><div style={{ backgroundColor: value === true ? '#349B48' : '#D84444', width: '18px', height: '18px', borderRadius: '50%', marginLeft: '10px' }}></div></> : <Typography sx={{ fontWeight: 'bold', fontSize: '15px', color: '#213950' }}>{item}:<Typography component="span" sx={{ color: '#58636E', marginLeft: '2px' }}> {value}</Typography></Typography>}</div>
    )
}

export function CustomButtonSeeMore({ text = "See More", style, isSmall }: any) {
    return (
        <Button sx={{ textTransform: 'none', backgroundColor: '#A587C2', width: isSmall ? '100%' : '250px', height: '36px', borderRadius: '25px', color: '#fff', ':hover': { backgroundColor: '#A587C2' }, marginTop: '1%', ...style }}>
            {text}
        </Button>
    )
}


export default Dashboard