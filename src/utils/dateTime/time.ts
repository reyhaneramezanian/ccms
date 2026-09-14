import dayjs from 'dayjs';

export const HOUR_POST_FIX = 'H';
export const MIN_POST_FIX = 'M';
export const AMPM_POST_FIX = 'ampm';
export const YEAR_POST_FIX = 'Y';
export const MONTH_POST_FIX = 'MO';
export const DATE_POST_FIX = 'D';

export function createDateOnSeprateInput(day: {
    [YEAR_POST_FIX]: number;
    [MONTH_POST_FIX]: number;
    [DATE_POST_FIX]: number;
}) {
    try {

        return dayjs()
            .set('date', day[DATE_POST_FIX])
            .set('month', day[MONTH_POST_FIX])
            .set('year', day[YEAR_POST_FIX])
            .toISOString();
    } catch {
        return null
    }
}
export function extractDateToSeprateInput(dateString) {
    const date = dayjs(dateString);
    return {
        [YEAR_POST_FIX]: date.get('year'),
        [MONTH_POST_FIX]: date.get('month'),
        [DATE_POST_FIX]: date.get('date')
    };
}
const VISIT_TIME_SPLIT = ':';
export function createMaxVisitTime(time: { [HOUR_POST_FIX]: number; [MIN_POST_FIX]: number }) {
    return `${time[HOUR_POST_FIX]}${VISIT_TIME_SPLIT}${time[MIN_POST_FIX]}`;
}
export function extractMaxVisitTime(time: string) {
    if(!time) {
        return {
            [HOUR_POST_FIX]: null,
            [MIN_POST_FIX]: null
        };
    }
    const t = time.split(VISIT_TIME_SPLIT);
    return {
        [HOUR_POST_FIX]: +t[0],
        [MIN_POST_FIX]: +t[1]
    };
}

export function getWorkHourInputName(name: string) {
    return {
        hourName: `${name}${HOUR_POST_FIX}`,
        minName: `${name}${MIN_POST_FIX}`,
        ampmName: `${name}${AMPM_POST_FIX}`
    };
}

export function createHourByJoin(value: { h: any; m: any; a: any }) {
    if (!isNaN(+value.h) && !isNaN(+value.m)) {
        if (value.h === '' && value.m === '') return '';
        let hour = +value.h;
        if (hour < 12 && value.a === 'PM') {
            hour += 12;
        } else if (hour === 12 && value.a === 'AM') {
            hour -= 12;
        }
        return `${+hour}:${+value.m}`;
    }
}
export function createHourByJoinSoft(value: { h: any; m: any; a: any }) {
    if (value.h === '' && value.m === '') return '';
    let hour = !isNaN(+value.h) ? +value.h : 0;
    const minute = !isNaN(+value.m) ? +value.m : 0;
    if (hour < 12 && value.a === 'PM') {
        hour += 12;
    } else if (hour === 12 && value.a === 'AM') {
        hour -= 12;
    }
    return `${+hour}:${minute}`;
}
export function createHourByJoinSoft12(value: { h: any; m: any; a: any }) {
    if (value.h === '' && value.m === '') return '';
    let hour = !isNaN(+value.h) ? +value.h : 0;
    const minute = !isNaN(+value.m) ? +value.m : 0;
    // if (hour < 12 && value.a === 'PM') {
    //     hour += 12;
    // } else if (hour === 12 && value.a === 'AM') {
    //     hour -= 12;
    // }
    return `${+hour}:${minute} ${value.a}`;
}

export const DEFAULT_WORK_HOUR_INPUTS = {
    startHour: '',
    startMinute: '',
    startampm: '',
    endHour: '',
    endMinute: '',
    endampm: ''
};

export function parseHourString(time: string, name: string) {
    const t = time && dayjs(time).isValid() ? dayjs(time) : undefined;
    return {
        [`${name}${HOUR_POST_FIX}`]: t?.format('hh') || '',
        [`${name}${MIN_POST_FIX}`]: t?.format('mm') || '',
        [`${name}${AMPM_POST_FIX}`]: t?.format('A') || ''
    };
}
export function createHourObjectFromValues(h, m, a, name: string) {
    return {
        [`${name}${HOUR_POST_FIX}`]: h,
        [`${name}${MIN_POST_FIX}`]: m,
        [`${name}${AMPM_POST_FIX}`]: a
    };
}
export function extractHourValues(values: Record<string, any>, name: string) {
    return {
        h: `${name}${HOUR_POST_FIX}` in values ? values[`${name}${HOUR_POST_FIX}`] : '',
        m: `${name}${MIN_POST_FIX}` in values ? values[`${name}${MIN_POST_FIX}`] : '',
        a: `${name}${AMPM_POST_FIX}` in values ? values[`${name}${AMPM_POST_FIX}`] : ''
    };
}
