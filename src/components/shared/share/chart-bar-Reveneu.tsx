import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { CustomFlex, CustomParagraph } from './index';
import { usePayment_GetAllPaymentsQuery } from 'src/graphql/generated';
import { dataSource } from '../../admin/datachart';
import { Select, Grid } from '@mui/material';
import Down from 'src/assets/icons/Down';
import MenuItem from '@mui/material/MenuItem';
import * as adminstyle from 'src/components/admin/admin.style';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
    responsive: true,
    plugins: {
        legend: null,
        title: null
    },
    scales: {
        y: {
            grid: {
                display: false
            },
            ticks: {
                color: '#213950',
                font: {
                    size: '14px',
                    weight: 'bold'
                }
            }
        },
        x: {
            grid: {
                display: false
            },
            ticks: {
                color: '#213950',
                font: {
                    size: '14px'
                }
            }
        }
    }
};

const monthname = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
];
const weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const ChartBar = () => {
    const [totalqty, settotalqty] = useState(10);
    const [loop, setloop] = useState(0);
    const [firstDay, setfirstDay] = useState('');
    const [lastDay, setlastDay] = useState('');
    const [monthchart, setmonthchart] = useState([]);
    const [chartone, setchartone] = useState('Sort');

    const getDays = (year, month) => {
        return new Date(year, month, 0).getDate();
    };
    const daysIneachmonth = getDays(new Date().getFullYear(), new Date().getMonth());

    const date = new Date();
    const { data: datarevenu } = usePayment_GetAllPaymentsQuery({
        skip: 0,
        take: totalqty,
        where:
            lastDay != null && lastDay != '' && firstDay != null && firstDay != ''
                ? {
                      createdDate: { gte: new Date(firstDay) },
                      createdDate: { lte: new Date(lastDay) }
                  }
                : null

        //{createdDate BETWEEN {contains:firstDay,contains:lastDay} }
    });
    if (loop === 0 && datarevenu?.payment_getAllPayments?.result?.totalCount !== undefined) {
        setloop(1);
        settotalqty(datarevenu?.payment_getAllPayments?.result?.totalCount);
        var dt = new Date(); // current date of week
        var currentWeekDay = dt.getDay();
        var lessDays = currentWeekDay == 0 ? 6 : currentWeekDay - 1;
        var wkStart = new Date(new Date(dt).setDate(dt.getDate() - lessDays));
        setfirstDay(JSON.stringify(wkStart).slice(1, 11));
        setlastDay(
            JSON.stringify(new Date(new Date(wkStart).setDate(wkStart.getDate() + 6))).slice(1, 11)
        );
    }
    useEffect(() => {
        console.log(firstDay, lastDay);
        var month = [],
            chart = [],
            day = [],
            year = [];
        datarevenu?.payment_getAllPayments?.result?.items?.map((item) => {
            var dt = new Date(item?.createdDate);
            var js = year,
                sw = 0;
            if (year.length > 0) {
                year.forEach((v, i) => {
                    if (v.month === dt.getMonth() + 1) {
                        var Qty = v.Qty + item.amount;
                        js.slice(1, i);
                        js.push({ month: dt.getMonth() + 1, Qty: Qty });
                        sw = 1;
                    }
                });
                if (sw === 1) year.push(js);
                else year.push({ month: dt.getMonth() + 1, Qty: item.amount });
            } else year.push({ month: dt.getMonth() + 1, Qty: item.amount });

            day.push({ day: dt.getDay(), Qty: item.amount });
            month.push({ day: dt.getDate(), Qty: item.amount });
        });
        if (chartone === 'Week' || chartone === 'Sort') {
            console.log(day);
            for (var i = 0; i < weekday.length; i++) {
                var sw = 0;
                day.forEach((item) => {
                    if (item.day === i) sw = item.Qty;
                });
                chart.push({ name: weekday[i], totalBids: sw });
            }
        }
        if (chartone === 'Year') {
            for (var i = 1; i < 13; i++) {
                var sw = 0;
                year.forEach((item) => {
                    if (item.month === i) sw = item.Qty;
                });
                chart.push({ name: monthname[i - 1], totalBids: sw });
            }
        }
        if (chartone === 'Month') {
            for (var i = 1; i < daysIneachmonth + 1; i++) {
                var sw = 0;
                month.forEach((item) => {
                    if (item.day === i) sw = item.Qty;
                });
                //chart.push({name:new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+i,totalBids:sw})
                chart.push({ name: i, totalBids: sw });
            }
        }
        setmonthchart(chart);
    }, [datarevenu]);

    useEffect(() => {
        if (chartone === 'Month') {
            setfirstDay(
                date.getFullYear() + '-' + (Number(date.getMonth()) + 1).toString() + '-' + '01'
            );
            setlastDay(
                JSON.stringify(new Date(date.getFullYear(), date.getMonth() + 1, 0)).slice(1, 11)
            );
        } else if (chartone === 'Year') {
            setfirstDay(JSON.stringify(new Date(new Date().getFullYear(), 0, 1)).slice(1, 11));
            setlastDay(JSON.stringify(new Date(new Date().getFullYear(), 11, 31)).slice(1, 11));
        } else if (chartone === 'Week') {
            var dt = new Date(); // current date of week
            var currentWeekDay = dt.getDay();
            var lessDays = currentWeekDay == 0 ? 6 : currentWeekDay - 1;
            var wkStart = new Date(new Date(dt).setDate(dt.getDate() - lessDays));
            setfirstDay(JSON.stringify(wkStart).slice(1, 11));
            setlastDay(
                JSON.stringify(new Date(new Date(wkStart).setDate(wkStart.getDate() + 6))).slice(
                    1,
                    11
                )
            );
        }
    }, [chartone]);

    /* useEffect(() => {
        debugger
        if(totalCount!=0){
            const { data: chartBar } = useBid_GetBidsQuery({ skip: 0, take: totalCount });
            chartBar?.bid_getBids?.result?.items?.map((item)=>{
                console.log(item?.createdDate)
            })
        }
    },[totalCount])*/
    //const data=dataSource
    //const items = datarevenu?.user_getBarChartHealrClient?.result?.items;

    const data = {
        labels: monthchart?.map((item) => item?.name), //items?.map((item)=>item?.name),
        datasets: [
            {
                label: '',
                data: monthchart?.map((item) => item?.totalBids), // items?.map((item)=>item?.totalUsers),
                backgroundColor: '#724F93',
                barThickness: 30,
                borderRadius: 0
            }
        ]
    };
    const handleChangeone = (event) => {
        setchartone(event.target.value);
    };
    return (
        <Grid container>
            <Grid item md={12} xs={12} lg={12} sm={12}>
                <adminstyle.selectdashbord>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        style={{
                            borderRadius: 8,
                            width: '100%',
                            direction: 'ltr',
                            margin: '10px 0 10px 0'
                        }}
                        IconComponent={() => <Down />}
                        size="small"
                        value={chartone}
                        onChange={handleChangeone}
                        MenuProps={{
                            sx: {
                                '&& .Mui-selected': {
                                    backgroundColor: '#0342FE !important',
                                    color: '#fff',
                                    borderColor: '#505871'
                                }
                            }
                        }}>
                        <MenuItem value="Sort" selected={true}>
                            Sort
                        </MenuItem>
                        <MenuItem value="Week">Week</MenuItem>
                        <MenuItem value="Month">Month</MenuItem>
                        <MenuItem value="Year">Year</MenuItem>
                    </Select>
                </adminstyle.selectdashbord>
                <span
                    style={{
                        color: '#213950',
                        fontSize: '23px',
                        float: 'left',
                        margin: '10px 0 40px 0',
                        fontFamily: 'Roboto'
                    }}>
                    {' '}
                    Active revenue
                </span>
            </Grid>
            <Grid item md={12} xs={12} lg={12} sm={12}>
                <adminstyle.imgcontainer>
                    <adminstyle.chartbids>Revenue</adminstyle.chartbids>
                    <adminstyle.chartbidsort>
                        {chartone === 'Sort' || chartone === 'Week' ? 'Week' : chartone}
                    </adminstyle.chartbidsort>
                    <div style={{ width: '92%', float: 'left' }}>
                        <Bar options={options} data={data} />
                    </div>
                </adminstyle.imgcontainer>
            </Grid>
        </Grid>
    );
};

export default ChartBar;
