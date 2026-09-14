import React, { useEffect, useState } from 'react';
import { styled, Grid, Card, Button } from '@mui/material';
import * as staffstyle from '../staff.style';
import Date from 'src/assets/icons/date';
import {
    useRequest_GetMyRequestsQuery,
    useRequest_ChangeRequestStatusMutation,
    SortEnumType
} from 'src/graphql/generated';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ReactPaginate from 'react-paginate';
import { closeModal, newModal } from 'src/redux/actions/actions';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { useQueryClient, QueryClient } from 'react-query';
import Utils from '@/utils/utils';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 3
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};
const Index = () => {
    const { data: datarequest } = useRequest_GetMyRequestsQuery({
        order: { startDate: SortEnumType.Asc }
    });
    const { mutate, isLoading } = useRequest_ChangeRequestStatusMutation();
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient();

    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [currentItems, setCurrentItems] = useState();
    const [isActiveone, setisActiveone] = useState('todo');
    const [isActivetwo, setisActivetwo] = useState('todo');
    const [isActivethree, setisActivethree] = useState('todo');
    const mutationErrorHandler = useMutationErrorHandler();

    const [listdate, setlistdate] = useState([]);
    const [listone, setlistone] = useState([]);
    const [listtwo, setlisttwo] = useState([]);
    const [listthree, setlistthree] = useState([]);
    const [dateone, setdateone] = useState('');
    const [datetwo, setdatetwo] = useState('');
    const [datethree, setdatethree] = useState('');
    const [datefor, setdatefor] = useState('');

    const itemsPerPage = 3;
    const { data: datarequestone } = useRequest_GetMyRequestsQuery({
        where: {
            startDate: { eq: dateone },

            requestStatus: {
                eq:
                    isActiveone === 'todo'
                        ? ('STAFF_ASIGNED' as any)
                        : isActiveone === 'Pending'
                        ? ('MARKED_AS_DONE' as any)
                        : ('DONE' as any)
            }
        }
    });
    const { data: datarequesttwo } = useRequest_GetMyRequestsQuery({
        where: {
            startDate: { eq: datetwo },

            requestStatus: {
                eq:
                    isActivetwo === 'todo'
                        ? ('STAFF_ASIGNED' as any)
                        : isActivetwo === 'Pending'
                        ? ('MARKED_AS_DONE' as any)
                        : ('DONE' as any)
            }
        }
    });
    const { data: datarequestthree } = useRequest_GetMyRequestsQuery({
        where: {
            startDate: { eq: datethree },

            requestStatus: {
                eq:
                    isActivethree === 'todo'
                        ? ('STAFF_ASIGNED' as any)
                        : isActivethree === 'Pending'
                        ? ('MARKED_AS_DONE' as any)
                        : ('DONE' as any)
            }
        }
    });

    useEffect(() => {
        var js = [],
            jstwo = [],
            jsthree = [];
        datarequestone?.request_getMyRequests?.result?.items?.forEach((item, index) => {
            js.push({
                id: item.id,
                requestStatus: item?.requestStatus,
                fullName:
                    item?.residentFlat?.resident?.firstName +
                    ' ' +
                    item?.residentFlat?.resident?.lastName,
                time:
                    Utils.convertTimeSpanToTime(item?.startTime) +
                    ' - ' +
                    Utils.convertTimeSpanToTime(item?.endTime),
                address:
                    item?.residentFlat?.flat?.floor?.block?.complex?.name +
                    ' , ' +
                    item?.residentFlat?.flat?.floor?.block?.name +
                    ' , ' +
                    item?.residentFlat?.flat?.floor?.name +
                    ' , ' +
                    item?.residentFlat?.flat?.name
            });
        });
        setlistone(js);
        datarequesttwo?.request_getMyRequests?.result?.items?.forEach((item, index) => {
            jstwo.push({
                id: item.id,
                requestStatus: item?.requestStatus,
                fullName:
                    item?.residentFlat?.resident?.firstName +
                    ' ' +
                    item?.residentFlat?.resident?.lastName,
                time:
                    Utils.convertTimeSpanToTime(item?.startTime) +
                    ' - ' +
                    Utils.convertTimeSpanToTime(item?.endTime),
                address:
                    item?.residentFlat?.flat?.floor?.block?.complex?.name +
                    ' , ' +
                    item?.residentFlat?.flat?.floor?.block?.name +
                    ' , ' +
                    item?.residentFlat?.flat?.floor?.name +
                    ' , ' +
                    item?.residentFlat?.flat?.name
            });
        });
        setlisttwo(jstwo);
        datarequestthree?.request_getMyRequests?.result?.items?.forEach((item, index) => {
            jsthree.push({
                id: item.id,
                requestStatus: item?.requestStatus,
                fullName:
                    item?.residentFlat?.resident?.firstName +
                    ' ' +
                    item?.residentFlat?.resident?.lastName,
                time:
                    Utils.convertTimeSpanToTime(item?.startTime) +
                    ' - ' +
                    Utils.convertTimeSpanToTime(item?.endTime),
                address:
                    item?.residentFlat?.flat?.floor?.block?.complex?.name +
                    ' , ' +
                    item?.residentFlat?.flat?.floor?.block?.name +
                    ' , ' +
                    item?.residentFlat?.flat?.floor?.name +
                    ' , ' +
                    item?.residentFlat?.flat?.name
            });
        });
        setlistthree(jsthree);
    }, [datarequestone, datarequesttwo, datarequestthree]);

    useEffect(() => {
        var js = [],
            sw = 0;
        datarequest?.request_getMyRequests?.result?.items?.forEach((item, index) => {
            if (index == 0) js.push(item.startDate);
            else {
                sw = 0;
                js.forEach((v, i) => {
                    if (item.startDate === v) sw = 1;
                });
                if (sw === 0) js.push(item.startDate);
            }
        });
        // Fetch items from another resources.
        setlistdate(js);
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(js?.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(js?.length / itemsPerPage));
        if (js?.slice(itemOffset, endOffset).length > 0)
            setdateone(js?.slice(itemOffset, endOffset)[0].slice(0, 10));
        else setdateone('');
        if (js?.slice(itemOffset, endOffset).length > 1)
            setdatetwo(js?.slice(itemOffset, endOffset)[1].slice(0, 10));
        else setdatetwo('');
        if (js?.slice(itemOffset, endOffset).length > 2)
            setdatethree(js?.slice(itemOffset, endOffset)[2].slice(0, 10));
        else setdatethree('');
        if (js?.slice(itemOffset, endOffset).length > 3)
            setdatefor(js?.slice(itemOffset, endOffset)[3].slice(0, 10));
        else setdatefor('');
    }, [itemOffset, itemsPerPage, datarequest]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % listdate.length;
        setItemOffset(newOffset);
    };

    const handeldone = (id, type) => {
        mutate(
            {
                entityId: Number(id),
                newStatus: type == 'Done' ? ('MARKED_AS_DONE' as any) : ('STAFF_ASIGNED' as any)
            },
            {
                onSuccess: () => {
                    dispatch(closeModal('1'));
                    enqueueSnackbar('Operation was successful!', { variant: 'success' });
                    queryClient.refetchQueries('request_getMyRequests');
                },
                onError: (err) => {
                    mutationErrorHandler(err, 'request_getMyRequests');
                }
            }
        );
    };

    return (
        <Grid container style={{ backgroundColor: '#fff', borderRadius: 8 }}>
            <staffstyle.rowpage>
                <staffstyle.Titledashbord>Tasks</staffstyle.Titledashbord>
            </staffstyle.rowpage>
            <Grid alignItems="left" justifyContent="left" container direction="row">
                <Grid alignItems="left" justifyContent="left" container direction="row">
                    {currentItems?.map((item) => (
                        <Grid
                            maxWidth={'lg'}
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            lg={4}
                            style={{ alignItems: 'center', textAlign: 'center' }}>
                            <staffstyle.Titlecardtask>{item.slice(0, 10)}</staffstyle.Titlecardtask>
                        </Grid>
                    ))}
                </Grid>
                <staffstyle.rowpage>
                    <staffstyle.cellpage>
                        <ReactPaginate
                            breakLabel="..."
                            nextLabel={''}
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={0}
                            pageCount={pageCount}
                            previousLabel={''}
                            renderOnZeroPageCount={null}
                            containerClassName="paginationlist"
                            pageLinkClassName="page-num"
                            previousLinkClassName="previous_page"
                            nextLinkClassName="next_page"
                        />
                    </staffstyle.cellpage>
                </staffstyle.rowpage>

                <Grid maxWidth={'lg'} item xs={12} sm={6} md={4} lg={4}>
                    <staffstyle.rowpage>
                        <staffstyle.cellpagetask>
                            <staffstyle.tasktodo
                                isActive={isActiveone === 'todo' ? true : false}
                                onClick={() => {
                                    setisActiveone('todo');
                                }}>
                                To do
                            </staffstyle.tasktodo>
                        </staffstyle.cellpagetask>
                        <staffstyle.cellpagetask>
                            <staffstyle.taskpending
                                isActive={isActiveone === 'Pending' ? true : false}
                                onClick={() => {
                                    setisActiveone('Pending');
                                }}>
                                Pending
                            </staffstyle.taskpending>
                        </staffstyle.cellpagetask>
                        <staffstyle.cellpagetask>
                            <staffstyle.taskdone
                                isActive={isActiveone === 'Done' ? true : false}
                                onClick={() => {
                                    setisActiveone('Done');
                                }}>
                                Done
                            </staffstyle.taskdone>
                        </staffstyle.cellpagetask>
                    </staffstyle.rowpage>
                    {listone?.map((item) => (
                        <staffstyle.card
                            style={{
                                borderTop: `${
                                    item.requestStatus === 'STAFF_ASIGNED'
                                        ? '8px solid #409FFF'
                                        : item.requestStatus === 'MARKED_AS_DONE'
                                        ? '8px solid #E6BF4C'
                                        : '8px solid #3DCC79'
                                }`
                            }}>
                            <staffstyle.rowpage>
                                <staffstyle.cellpage>
                                    <staffstyle.Titletime>
                                        <staffstyle.imgdate>
                                            <Date />
                                        </staffstyle.imgdate>
                                        <staffstyle.Textdate>{item.time}</staffstyle.Textdate>
                                    </staffstyle.Titletime>
                                </staffstyle.cellpage>
                            </staffstyle.rowpage>
                            <staffstyle.rowpage>
                                <staffstyle.cellpage>
                                    <staffstyle.Titlecardtask>
                                        {item.address}
                                    </staffstyle.Titlecardtask>
                                </staffstyle.cellpage>
                            </staffstyle.rowpage>
                            <staffstyle.rowpage>
                                <staffstyle.cellpage>
                                    <staffstyle.Textcardtask>
                                        {item.fullName}
                                    </staffstyle.Textcardtask>
                                </staffstyle.cellpage>
                            </staffstyle.rowpage>
                            <staffstyle.rowpage>
                                <staffstyle.cellpage>
                                    {item.requestStatus === 'STAFF_ASIGNED' ? (
                                        <staffstyle.btntask
                                            onClick={() => {
                                                handeldone(item.id, 'Done');
                                            }}>
                                            Mark as Done
                                        </staffstyle.btntask>
                                    ) : item.requestStatus === 'MARKED_AS_DONE' ? (
                                        <staffstyle.btntaskwating
                                            onClick={() => {
                                                handeldone(item.id, 'Pendding');
                                            }}>
                                            Waiting
                                        </staffstyle.btntaskwating>
                                    ) : (
                                        <staffstyle.btntaskdone>Task Done</staffstyle.btntaskdone>
                                    )}
                                </staffstyle.cellpage>
                            </staffstyle.rowpage>
                        </staffstyle.card>
                    ))}
                </Grid>
                <Grid maxWidth={'lg'} item xs={12} sm={6} md={4} lg={4}>
                    <staffstyle.rowpage>
                        <staffstyle.cellpagetask>
                            <staffstyle.tasktodo
                                isActive={isActivetwo === 'todo' ? true : false}
                                onClick={() => {
                                    setisActivetwo('todo');
                                }}>
                                To do
                            </staffstyle.tasktodo>
                        </staffstyle.cellpagetask>
                        <staffstyle.cellpagetask>
                            <staffstyle.taskpending
                                isActive={isActivetwo === 'Pending' ? true : false}
                                onClick={() => {
                                    setisActivetwo('Pending');
                                }}>
                                Pending
                            </staffstyle.taskpending>
                        </staffstyle.cellpagetask>
                        <staffstyle.cellpagetask>
                            <staffstyle.taskdone
                                isActive={isActivetwo === 'Done' ? true : false}
                                onClick={() => {
                                    setisActivetwo('Done');
                                }}>
                                Done
                            </staffstyle.taskdone>
                        </staffstyle.cellpagetask>
                    </staffstyle.rowpage>
                    {listtwo?.map((item) => (
                        <staffstyle.card
                            style={{
                                borderTop: `${
                                    item.requestStatus === 'STAFF_ASIGNED'
                                        ? '8px solid #409FFF'
                                        : item.requestStatus === 'MARKED_AS_DONE'
                                        ? '8px solid #E6BF4C'
                                        : '8px solid #3DCC79'
                                }`
                            }}>
                            <staffstyle.rowpage>
                                <staffstyle.cellpage>
                                    <staffstyle.Titletime>
                                        <staffstyle.imgdate>
                                            <Date />
                                        </staffstyle.imgdate>
                                        <staffstyle.Textdate>{item.time}</staffstyle.Textdate>
                                    </staffstyle.Titletime>
                                </staffstyle.cellpage>
                            </staffstyle.rowpage>
                            <staffstyle.rowpage>
                                <staffstyle.cellpage>
                                    <staffstyle.Titlecardtask>
                                        {item.address}
                                    </staffstyle.Titlecardtask>
                                </staffstyle.cellpage>
                            </staffstyle.rowpage>
                            <staffstyle.rowpage>
                                <staffstyle.cellpage>
                                    <staffstyle.Textcardtask>
                                        {item.fullName}
                                    </staffstyle.Textcardtask>
                                </staffstyle.cellpage>
                            </staffstyle.rowpage>
                            <staffstyle.rowpage>
                                <staffstyle.cellpage>
                                    {item.requestStatus === 'STAFF_ASIGNED' ? (
                                        <staffstyle.btntask
                                            onClick={() => {
                                                handeldone(item.id, 'Done');
                                            }}>
                                            Mark as Done
                                        </staffstyle.btntask>
                                    ) : item.requestStatus === 'MARKED_AS_DONE' ? (
                                        <staffstyle.btntaskwating
                                            onClick={() => {
                                                handeldone(item.id, 'Pendding');
                                            }}>
                                            Waiting
                                        </staffstyle.btntaskwating>
                                    ) : (
                                        <staffstyle.btntaskdone>Task Done</staffstyle.btntaskdone>
                                    )}
                                </staffstyle.cellpage>
                            </staffstyle.rowpage>
                        </staffstyle.card>
                    ))}
                </Grid>
                <Grid maxWidth={'lg'} item xs={12} sm={6} md={4} lg={4}>
                    <staffstyle.rowpage>
                        <staffstyle.cellpagetask>
                            <staffstyle.tasktodo
                                isActive={isActivethree === 'todo' ? true : false}
                                onClick={() => {
                                    setisActivethree('todo');
                                }}>
                                To do
                            </staffstyle.tasktodo>
                        </staffstyle.cellpagetask>
                        <staffstyle.cellpagetask>
                            <staffstyle.taskpending
                                isActive={isActivethree === 'Pending' ? true : false}
                                onClick={() => {
                                    setisActivethree('Pending');
                                }}>
                                Pending
                            </staffstyle.taskpending>
                        </staffstyle.cellpagetask>
                        <staffstyle.cellpagetask>
                            <staffstyle.taskdone
                                isActive={isActivethree === 'Done' ? true : false}
                                onClick={() => {
                                    setisActivethree('Done');
                                }}>
                                Done
                            </staffstyle.taskdone>
                        </staffstyle.cellpagetask>
                    </staffstyle.rowpage>
                    {listthree?.map((item) => (
                        <staffstyle.card
                            style={{
                                borderTop: `${
                                    item.requestStatus === 'STAFF_ASIGNED'
                                        ? '8px solid #409FFF'
                                        : item.requestStatus === 'MARKED_AS_DONE'
                                        ? '8px solid #E6BF4C'
                                        : '8px solid #3DCC79'
                                }`
                            }}>
                            <staffstyle.rowpage>
                                <staffstyle.cellpage>
                                    <staffstyle.Titletime>
                                        <staffstyle.imgdate>
                                            <Date />
                                        </staffstyle.imgdate>
                                        <staffstyle.Textdate>{item.time}</staffstyle.Textdate>
                                    </staffstyle.Titletime>
                                </staffstyle.cellpage>
                            </staffstyle.rowpage>
                            <staffstyle.rowpage>
                                <staffstyle.cellpage>
                                    <staffstyle.Titlecardtask>
                                        {item.address}
                                    </staffstyle.Titlecardtask>
                                </staffstyle.cellpage>
                            </staffstyle.rowpage>
                            <staffstyle.rowpage>
                                <staffstyle.cellpage>
                                    <staffstyle.Textcardtask>
                                        {item.fullName}
                                    </staffstyle.Textcardtask>
                                </staffstyle.cellpage>
                            </staffstyle.rowpage>
                            <staffstyle.rowpage>
                                <staffstyle.cellpage>
                                    {item.requestStatus === 'STAFF_ASIGNED' ? (
                                        <staffstyle.btntask
                                            onClick={() => {
                                                handeldone(item.id, 'Done');
                                            }}>
                                            Mark as Done
                                        </staffstyle.btntask>
                                    ) : item.requestStatus === 'MARKED_AS_DONE' ? (
                                        <staffstyle.btntaskwating
                                            onClick={() => {
                                                handeldone(item.id, 'Pendding');
                                            }}>
                                            Waiting
                                        </staffstyle.btntaskwating>
                                    ) : (
                                        <staffstyle.btntaskdone>Task Done</staffstyle.btntaskdone>
                                    )}
                                </staffstyle.cellpage>
                            </staffstyle.rowpage>
                        </staffstyle.card>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
};
export default Index;
