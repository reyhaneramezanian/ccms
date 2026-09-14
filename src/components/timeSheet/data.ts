import { ITimeSheetDaysOfWeek, ITimeSheetDaysOfWeekItem } from './timeSheet.type';
import * as Yup from 'yup';
import snackbarMessages from 'src/data/snackbarMessages';
import Utils from '@/utils/utils';
import moment from 'moment';
export const initialTimeSheetDaysOfWeekData = (): ITimeSheetDaysOfWeek[] => [
    {
        dayOfWeek: 'MONDAY',
        enable: true
    },
    {
        dayOfWeek: 'TUESDAY',
        enable: false
    },
    {
        dayOfWeek: 'WEDNESDAY',
        enable: false
    },
    {
        dayOfWeek: 'THURSDAY',
        enable: false
    },
    {
        dayOfWeek: 'FRIDAY',
        enable: false
    },
    {
        dayOfWeek: 'SATURDAY',
        enable: false
    },
    {
        dayOfWeek: 'SUNDAY',
        enable: false
    }
];

export const initialTimeSheetDaysOfWeekItemsData = (
    daysOfWeekItems: ITimeSheetDaysOfWeekItem[] = []
): ITimeSheetDaysOfWeekItem[] => {
    const arr = daysOfWeekItems.map((item) => ({
        dayOfWeek: item.dayOfWeek,
        from: Utils.convertTimeSpanToTime(item.from),
        to: Utils.convertTimeSpanToTime(item.to)
    }));

    if (!arr.length) {
        arr.push({
            dayOfWeek: 'MONDAY',
            from: '',
            to: ''
        });
    }

    return arr;
};

export const timeSheetValidationForm = () => {
    const obj = {
        from: Yup.string().required(snackbarMessages.requiredField),
        to: Yup.string()
            .when('from', {
                is: (from) => from !== undefined,
                then: Yup.string().test(
                    'is-greater',
                    'End time should be greater',
                    function (value) {
                        const { from } = this.parent;
                        return moment(value, 'HH:mm').isSameOrAfter(moment(from, 'HH:mm'));
                    }
                )
            })
            .required(snackbarMessages.requiredField)
    };

    return Yup.array().of(Yup.object(obj));
};
