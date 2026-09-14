import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import {
    CardActions,
    CardContent,
    CardMedia,
    Typography,
    Card,
    Button,
    Container,
    Hidden
} from '@mui/material';
import BasicSelect from '../shared/basic-select';
import ReactPaginate from 'react-paginate';
import Tabs from '../tabs/tabs';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { setPageData } from 'src/redux/actions/actions';
import { Select } from '@mui/material';
import Down from 'src/assets/icons/Down';
import MenuItem from '@mui/material/MenuItem';
import * as adminstyle from '../admin/admin.style';

function Listproject(props) {
    const [chartone, setchartone] = useState('Sort');

    const pageData = useSelector(({ pageData }: any) => pageData);
    const { activeTab = props.tabs[0] } = pageData;

    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
    const { data } =
        activeTab.id === 'HUDUr' ? { data: props.datahudu } : { data: props.datalistr };
    const [currentItems, setCurrentItems] = useState();
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 5;

    useEffect(() => {
        // Fetch items from another resources.
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(data?.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(data?.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, data]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % data.length;
        setItemOffset(newOffset);
    };
    const dispatch = useDispatch();

    const handleChangeone = (event) => {
        dispatch(setPageData({ ...pageData, sortDataListerHuduer: { Sort: event.target.value } }));
        setchartone(event.target.value);
    };

    return (
        <>
            <Grid
                style={{ minHeight: `${data?.length == 0 ? '400px' : 0}` }}
                alignItems="left"
                justifyContent="left"
                container
                direction="row">
                <Grid item md={6} sm={12}>
                    <div
                        style={{
                            paddingTop: '20px',
                            display: 'flex',
                            alignItems: 'left !important',
                            flexFlow: 'row wrap',
                            marginLeft: props.adminLayout && !isSmall ? '33px' : null
                        }}>
                        <Tabs
                            onTabChange={(tab) =>
                                dispatch(
                                    setPageData({ ...pageData, activeTab: tab /*activePage: 1*/ })
                                )
                            }
                            // smallTab={smallTab}
                            activeTab={activeTab}
                            //activeTabParent={0}
                            tabs={props.tabs}
                            // fulloverlay={fulloverlay}
                            rows={props.rows}
                        />
                    </div>
                </Grid>
                <Grid item md={6} sm={12}>
                    <div
                        style={{
                            paddingTop: '20px',
                            alignItems: 'rigth !important',
                            direction: 'rtl',
                            paddingRight: '30px'
                        }}>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            style={{ borderRadius: 8, width: 200, direction: 'ltr' }}
                            IconComponent={() => <Down />}
                            size="small"
                            value={pageData.sortDataListerHuduer.Sort}
                            onChange={handleChangeone}
                            MenuProps={{
                                sx: {
                                    '&& .Mui-selected': {
                                        backgroundColor: '#0342FE !important',
                                        color: '#fff !important',
                                        borderColor: '#505871'
                                    },
                                    '&& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
                                        {
                                            borderColor: '#505871 !mportant'
                                        }
                                }
                            }}>
                            <MenuItem value="Sort" selected={true}>
                                Sort
                            </MenuItem>
                            <MenuItem value="LOW_TO_HIGH_BIDS">Low to high bids</MenuItem>
                            <MenuItem value="HIGH_TO_LOW_BIDS">High to low bids</MenuItem>
                            <MenuItem value="NEWEST_TO_OLDEST">Newest to oldest</MenuItem>
                            <MenuItem value="OLDEST_TO_NEWEST">Oldest to newest</MenuItem>
                        </Select>
                    </div>
                </Grid>
            </Grid>
            <Grid alignItems="left" justifyContent="left" container direction="row">
                {currentItems?.map((item) => (
                    <Grid
                        maxWidth={'lg'}
                        item
                        xs={12}
                        sm={6}
                        md={2}
                        lg={2}
                        style={{ margin: '36px 14px 0 24px', alignItems: 'center' }}>
                        <adminstyle.imgcontainer>
                            <adminstyle.imgtext>Time left:{item?.timeleft}</adminstyle.imgtext>
                            <adminstyle.imgtexttop
                                style={{
                                    backgroundColor: `${
                                        item?.biding == 'FINISHED'
                                            ? '#F08A4A'
                                            : item?.biding == 'BIDDING' || item?.biding == 'WAITING'
                                            ? '#E1ECFC'
                                            : item?.biding == 'NOT_LUCKY'
                                            ? '#F8E5E5'
                                            : item?.biding == 'CANCELL'
                                            ? '#DCDFE6'
                                            : '#E1F7E8'
                                    }`,
                                    color: `${
                                        item?.biding == 'FINISHED'
                                            ? '#fff'
                                            : item?.biding == 'BIDDING' || item?.biding == 'WAITING'
                                            ? '#3583EB'
                                            : item?.biding == 'NOT_LUCKY'
                                            ? '#BF1A1A'
                                            : item?.biding == 'CANCELL'
                                            ? '#464646'
                                            : '#1CA24A'
                                    }`
                                }}>
                                {item?.biding === 'BIDDING'
                                    ? 'Bidding'
                                    : item?.biding === 'IN_PROGRESS'
                                    ? 'In progress'
                                    : item?.biding === 'FINISHED'
                                    ? 'Finished'
                                    : item?.biding === 'WAITING'
                                    ? 'Waiting'
                                    : item?.biding === 'NOT_LUCKY'
                                    ? 'Not lucky!'
                                    : item?.biding === 'CANCELL'
                                    ? 'Cancell'
                                    : ''}
                            </adminstyle.imgtexttop>
                            <Card style={{ borderRadius: '7px' }}>
                                <adminstyle.cardproject>
                                    <adminstyle.imgproduct
                                        src={
                                            item?.image != undefined &&
                                            item?.image != null &&
                                            item?.image != ''
                                                ? item?.image
                                                : '/images/galery2.png'
                                        }></adminstyle.imgproduct>
                                    <adminstyle.title>{item?.title}</adminstyle.title>
                                    <adminstyle.span>{item?.description}</adminstyle.span>
                                    <Grid container maxWidth="lg" direction="row">
                                        <Grid item sm={8} md={8}>
                                            <adminstyle.span style={{ color: '#21242F' }}>
                                                {item?.biding === 'FINISHED'
                                                    ? 'award bid'
                                                    : item?.Curent_Low_bid === undefined ||
                                                      item?.Curent_Low_bid === null ||
                                                      item?.Curent_Low_bid === ''
                                                    ? 'Not bid now'
                                                    : activeTab.id === 'HUDUr'
                                                    ? 'Your bid'
                                                    : 'Curent low bid'}
                                            </adminstyle.span>
                                        </Grid>
                                        <Grid item sm={4} md={4}>
                                            <adminstyle.Money>
                                                {item?.Curent_Low_bid === undefined ||
                                                item?.Curent_Low_bid === null ||
                                                item?.Curent_Low_bid === ''
                                                    ? ''
                                                    : '$' + item?.Curent_Low_bid}
                                            </adminstyle.Money>
                                        </Grid>
                                    </Grid>
                                </adminstyle.cardproject>
                            </Card>
                        </adminstyle.imgcontainer>
                    </Grid>
                ))}
            </Grid>
            <Grid maxWidth={'lg'} item xs={12} sm={12} md={12} lg={12}>
                <ReactPaginate
                    breakLabel="..."
                    nextLabel={''}
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    pageCount={pageCount}
                    previousLabel={''}
                    renderOnZeroPageCount={null}
                    containerClassName="paginationlist"
                    pageLinkClassName="page-num"
                    previousLinkClassName="previous_page"
                    nextLinkClassName="next_page"
                    activeLinkClassName="active"
                />
            </Grid>
        </>
    );
}
export default Listproject;
