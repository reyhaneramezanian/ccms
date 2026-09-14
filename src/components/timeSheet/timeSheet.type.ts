import { DayOfWeekType } from 'src/@types/util.type';

export interface ITimeSheetDaysOfWeek {
    dayOfWeek: DayOfWeekType;
    enable: boolean;
}

export interface ITimeSheetDaysOfWeekItem {
    dayOfWeek: DayOfWeekType;
    from: string;
    to: string;
}
