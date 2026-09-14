import React, { useState, useEffect } from 'react';
import { ParentMainItem, CustomFlex, CustomTable, CustomBoxShadow } from '../styled.profile';
import { Grid, useMediaQuery, useTheme, Typography } from '@mui/material';
import { CustomButtonSeeMore, ItemsHealer } from './dashboard';
import { useInitialProps } from '@/components/table_container/useTableProps';
import { ColumnClientCurrent, ColumnClientClose, RowClientCurrent, RowClientClose } from '../data-type';
import TableContainer from 'src/components/table_container';
import BasicSelect from '@/components/shared/basic-select';
import { useImageComponent } from '@/components/shared/share/use-image';




const SessionItems = ({ sessionItem }) => {
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down("md"));
    const initialProps = useInitialProps({
        totalCount: 10,
    });
    const [arrSlider, setArrSlider] = useState(['/images/yoga1.jpg','/images/yoga2.jpg','/images/yoga3.jpg','/images/yoga2.jpg','/images/yoga3.jpg'])

    const props = {
        ...initialProps,
        columns: sessionItem === "current" ? ColumnClientCurrent : ColumnClientClose,
        rows: sessionItem === "current" ? RowClientCurrent : RowClientClose,
        sortInput: <BasicSelect />,
        isLoading: false,
        adminLayout: true,
    };
    return (
        <ParentMainItem mobilesize={isSmall ? "true" : "false"}>
            <Grid container flexDirection={isSmall ? 'column-reverse' : 'row'} spacing={4}>
                <Grid item md={6} xs={12}><LeftItem /></Grid>
                <Grid item md={6} xs={12}><RightItem arrSlider={arrSlider} /></Grid>
            </Grid>
            <Typography sx={{ color: '#213950', fontSize: '28px', fontWeight: 'bold', marginTop: '30px' }}>Client</Typography>
            <CustomTable>
                <TableContainer  {...props} />
            </CustomTable>
        </ParentMainItem>
    )

    function LeftItem() {
        return (
            <>
                <CustomFlex>
                    <h1 style={{ fontSize: '40px', margin: 0, color: '#213950' }}>Session Name</h1>
                    <CustomBoxShadow>
                        <Typography sx={{ color: '#213950', fontSize: '20px' }}>$300</Typography>
                    </CustomBoxShadow>
                </CustomFlex>
                <Grid container flexDirection="row" mt={8}>
                    <Grid item md={10} xs={8} flexDirection="column">
                        <Grid item mb={3}><ItemsHealer item="Duration" value="20 Days" /></Grid>
                        <Grid item mb={3}><ItemsHealer item="Capacity" value="22" /></Grid>
                    </Grid>
                    <Grid item md={2} xs={4} flexDirection="column">
                        <Grid item mb={3}><ItemsHealer item="Service Type" value="Yoga" /></Grid>
                        <Grid item mb={3}><ItemsHealer item="Record" value={true} /></Grid>
                    </Grid>
                </Grid>
                <Grid container flexDirection="column">
                    <Grid item md={6} mb={3} ><Grid item><ItemsHealer ChangeAlign={true} item="Describtion" value="Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed  Diam Nonumy Eirmod" /></Grid></Grid>
                    <Grid item md={7} mb={3}><Grid item><ItemsHealer item="Address" value="Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed  Diam Nonumy Eirmod" /></Grid></Grid>
                </Grid>
                {
                    sessionItem === "current" && <CustomButtonSeeMore text="Close Session" style={{ marginTop: '23px', textTransform: 'none' }} />
                }
            </>
        )
    }

    function RightItem({  arrSlider }) {
        const {ImageComponent} = useImageComponent({ arrSlider })
         return ImageComponent()
    }
}








export default SessionItems