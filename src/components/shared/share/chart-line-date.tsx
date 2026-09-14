import React, { useState, useMemo } from 'react';
import dayjs from 'dayjs';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { CustomFlex, CustomParagraph } from './index';
import { FormControl, MenuItem, Select, Typography } from '@mui/material';
import { useBooking_GetAllBookingsQuery } from 'src/graphql/generated';
import { ArrowDownIcon } from 'src/assets/common/ArrowDownIcon';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


// const labels = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
const arr = [600, 600, 700, 800, 800, 700, 600, 700, 800, 900, 600, 700, 500, 500];



const WINDOW_SIZE = 12;
const today = new Date();
const monthIndex = today.getMonth();
const year = today.getFullYear();
const monthLength = new Date(year, monthIndex + 1, 0).getDate();
const daysInMonth = Array.from(Array(monthLength).keys()).map((index) => index + 1);

function formatDate(d) {
    return d.startOf('month').format('YYYY-MM-DDTHH:mm:ss');
}

const ChartLineDate = ({ title = "Apointment", titleActivity = "false", isSmall = "false" }) => {
    const [date, setDate] = useState<string>(formatDate(dayjs()));
    const [firstDay, setFirstDay] = useState(dayjs(date));
    const { data: dataVisitor } = useBooking_GetAllBookingsQuery();
    const items = dataVisitor?.booking_getAllBookings?.result?.items;
    const [duration, setDuration] = useState('ONE_MONTH');
    const labels = duration === 'ONE_WEEK' ? [1, 2, 3, 4, 5, 6, 7] : daysInMonth;

    const allvisitor = useMemo(() => {
        return items?.reduce((acc, cur) => {
            if (isNaN(new Date(cur.date).getTime())) {
                return acc;
            }
            const key = cur.date.split('T')[0];

            return {
                ...acc,
                [key]: acc[key] ? acc[key] + cur.visitorId : cur.visitorId
            };
        }, {});
    }, [date,dataVisitor]);


    function monthsvisit() {
        const labels = Array.from(Array(monthLength).keys()).map((index) => index + 1);
        const visitorEachDay = [];
        labels.forEach((day, index) => {
            const currentDate = firstDay.add(index, 'day').format('YYYY-MM-DD');
            if (allvisitor && currentDate in allvisitor) {
                visitorEachDay.push(allvisitor[currentDate]);
            } else {
                visitorEachDay.push(0);
            }
            return [0, 0];
        });
        return visitorEachDay
    }

    const data = {
        labels,
        datasets: [
            {
                label: '',
                data: monthsvisit().map((item) => item),
                borderColor: '#35094F',
                backgroundColor: '#fff',
                pointStyle: 'circle',
                pointRadius: 4,
                pointBorderColor: 'red'
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: null,
            title: null,
        },
        scales: {
            y: {
                ticks: {
                    color: '#000000',
                    font: {
                        size: '14px',
                    }
                }
            },
            x: {
                ticks: {
                    color: '#000000',
                    font: {
                        size: '14px',
                    }
                }
            },

        },
        aspectRatio: titleActivity === "true" ? 4 : null
    };

    function handleChange(event) {
        setDuration(event.target.value);
    }

    return (
        <div>
            {titleActivity === "true" && <h2 style={{ fontSize: isSmall ? '20px' : '24', marginTop: 0, color: '#213950', fontWeight: 'normal' }}>Your Activity</h2>}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <p style={{ color: '#213950', fontSize: '16px' }}>{title}</p>
                <FormControl
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '8px',
                            paddingRight: '10px',
                            marginTop: '8px'
                        }
                    }}>
                    <Select
                        sx={{ '& .MuiOutlinedInput-input': { padding: '1px 10px' } }}
                        value={duration}
                        onChange={handleChange}
                        IconComponent={() => <ArrowDownIcon />}>
                        <MenuItem value="ONE_MONTH">1M</MenuItem>
                        <MenuItem value="ONE_WEEK">1W</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <CustomFlex>
                <div style={{ width: '100%' }}><Line options={options} data={data} /></div>
                <CustomParagraph>DATE</CustomParagraph>
            </CustomFlex>

        </div>
    );
}

export default ChartLineDate;
