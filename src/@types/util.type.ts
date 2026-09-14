export type DayOfWeekType =
    | 'SUNDAY'
    | 'MONDAY'
    | 'TUESDAY'
    | 'WEDNESDAY'
    | 'THURSDAY'
    | 'FRIDAY'
    | 'SATURDAY';
export type WorkingTimeInput_InputType = {
    startHoure: string;
    endHoure: string;
    dayOfWeek: DayOfWeekType;
    hospitalId?: number;
    medicalBeautyCenterId?: number;
    clinicName?: string;
};

export type GenderType = 'MALE' | 'FEMALE';

export type LanguageType = 'ENGLISH' | 'ARABIC' | 'KURDI';

export type InfoReviewStatus = 'WAITING' | 'CONFIRMED' | 'REJECTED';

export type CollectionSegmentInfo = { hasNextPage: boolean; hasPreviousPage: boolean };
