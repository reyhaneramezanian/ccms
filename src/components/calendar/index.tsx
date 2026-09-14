import { makeStyles } from '@mui/styles';
import { Calendar as MultiCalendar } from 'react-multi-date-picker';

const useStyles = makeStyles((theme) => ({
    custom_calendar: {
        border: 'none !important',
        boxShadow: 'none !important',
        background: 'transparent !important',
        '& .rmdp-week': {
            width: 550,
            height: 75,
            '@media(max-width: 610px)': {
                width: '87vw',
                height: 65
            }
        },
        '& .rmdp-week-day': {
            fontFamily: 'Helvetica',
            fontSize: 25,
            background: '#5293D3',
            borderRadius: '50%',
            width: 60,
            height: 60,
            marginRight: -25,
            color: 'white',
            '@media(max-width: 610px)': {
                fontSize: 20,
                width: 50,
                height: 50,
                marginRight: -15
            }
        },
        '& .rmdp-today.rmdp-day span.sd': {
            fontFamily: 'Helvetica',
            background: '#3E205A',
            color: 'white',
            width: 55,
            height: 55,
            fontSize: 25,
            fontWeight: 'bold',
            borderRadius: '50%',
            '@media(max-width: 610px)': {
                fontSize: 16,
                width: 45,
                height: 45
            }
        },
        '& .rmdp-day.rmdp-selected span.sd': {
            fontFamily: 'Helvetica',
            background: '#3E205A',
            color: 'white',
            width: 55,
            height: 55,
            fontSize: 25,
            fontWeight: 'bold',
            borderRadius: '50%',
            '@media(max-width: 610px)': {
                fontSize: 16,
                width: 45,
                height: 45
            }
        },
        '& .rmdp-day span.sd': {
            fontFamily: 'Helvetica',
            width: 55,
            height: 55,
            fontSize: 25,
            fontWeight: 'bold',
            borderRadius: '50%',
            background: '#CDE5FC',
            color: '#4374A4',
            '@media(max-width: 610px)': {
                fontSize: 16,
                width: 45,
                height: 45
            }
        }
    }
}));

const Calendar = () => {
    const classes = useStyles();
    return <MultiCalendar hideYear hideMonth buttons={false} className={classes.custom_calendar} />;
};

export default Calendar;
