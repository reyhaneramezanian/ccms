import {
    createHourByJoinSoft12,
    createHourObjectFromValues,
    extractHourValues,
    parseHourString
} from '@/utils/dateTime/time';
import { WorkingTimeDto } from 'src/@types/hospital.type';
import { DayOfWeekType, WorkingTimeInput_InputType } from 'src/@types/util.type';
import { N_WORKINGHOUR, WORKING_DAYS } from '../input.constant';
import * as C from '../input.constant';
import { DOCTOR_INITIAL_VALUES } from '@/components/doctors/ui.useDoctor';
import { DoctorInput_Input } from 'src/@types/doctor.type';

const INIT_CLINIC = [{ [C.MULTIPLE_W_DAYS]: initWorkingDay(), clinicName: '' }];
export function initMultipleWorkingDay(initValues?: Array<WorkingTimeDto>) {
    const INIT_VALUE = {
        [C.HOSPITAL_PREFIX]: [],
        [C.BEAUTY_PREFIX]: [],
        [C.CLINIC_PREFIX]: INIT_CLINIC
    };

    if (initValues) {
        const allDistincSpace = initValues?.reduce(
            (acc, cur) => {
                const hId = cur.hospitalId;
                const mId = cur.medicalBeautyCenterId;
                const cN = cur.clinicName;
                if (typeof hId === 'number') {
                    const h = acc.h;
                    h[hId] ? h[hId].push(cur) : (h[hId] = [cur]);
                } else if (typeof mId === 'number') {
                    const m = acc.m;
                    m[mId] ? m[mId].push(cur) : (m[mId] = [cur]);
                } else if (typeof cN === 'string') {
                    const c = acc.c;
                    c[cN] ? c[cN].push(cur) : (c[cN] = [cur]);
                }
                return acc;
            },
            { h: {}, m: {}, c: {} }
        );

        const values = {
            [C.HOSPITAL_PREFIX]: Object.keys(allDistincSpace.h).map((key) => {
                return {
                    hospitalId: +key,
                    [C.MULTIPLE_W_DAYS]: initWorkingDay(allDistincSpace.h[key])
                };
            }),
            [C.BEAUTY_PREFIX]: Object.keys(allDistincSpace.m).map((key) => {
                return {
                    medicalBeautyCenterId: +key,
                    [C.MULTIPLE_W_DAYS]: initWorkingDay(allDistincSpace.m[key])
                };
            }),
            [C.CLINIC_PREFIX]:
                Object.keys(allDistincSpace.c)?.length > 0
                    ? Object.keys(allDistincSpace.c).map((key) => {
                          return {
                              clinicName: key,
                              [C.MULTIPLE_W_DAYS]: initWorkingDay(allDistincSpace.c[key])
                          };
                      })
                    : INIT_CLINIC
        };

        return values;
    }

    return INIT_VALUE;
}

export function formatMultipleWorkingDay(
    v: typeof DOCTOR_INITIAL_VALUES['workingTimes']
): DoctorInput_Input['workingTimes'] {
    const hospitalSpace = v.HOSPITAL.flatMap((value) =>
        formatWorkingDay(value[C.MULTIPLE_W_DAYS], { hospitalId: value.hospitalId })
    );
    const beautySpace = v.BEAUTY.flatMap((value) =>
        formatWorkingDay(value[C.MULTIPLE_W_DAYS], {
            medicalBeautyCenterId: value.medicalBeautyCenterId
        })
    );
    const clinicSpace = v.CLINIC.flatMap((value) =>
        formatWorkingDay(value[C.MULTIPLE_W_DAYS], { clinicName: value.clinicName })
    );

    return [...hospitalSpace, ...beautySpace, ...clinicSpace];
}

const INIT_VALUE = initWorkingDay();
export function formatWorkingDay(
    v: typeof INIT_VALUE,
    meta: Partial<Pick<WorkingTimeDto, 'hospitalId' | 'medicalBeautyCenterId' | 'clinicName'>> = {}
): Array<WorkingTimeInput_InputType> {
    const days = Object.keys(v)
        .filter((day) => v[day].dayOfWeek)
        .map((day) => {
            const startH = extractHourValues(v[day], C.N_WORKINGHOUR.startHoure);
            const endH = extractHourValues(v[day], C.N_WORKINGHOUR.endHoure);
            return {
                ...meta,
                dayOfWeek: day as any,
                startHoure: createHourByJoinSoft12(startH),
                endHoure: createHourByJoinSoft12(endH)
            };
        });
    return days;
}

export function initWorkingDay(initValues?: Array<WorkingTimeDto>) {
    return WORKING_DAYS.reduce((acc, cur) => {
        const date = initValues && initValues?.findIndex((d) => d?.dayOfWeek === cur.d);
        return {
            ...acc,
            [cur.d]:
                initValues && date !== -1
                    ? initSingleWorktime(initValues[date])
                    : initSingleWorktime()
        };
    }, {} as Record<DayOfWeekType, { dayOfWeek: boolean }>);
}

export function initSingleWorktime(initValues?: WorkingTimeDto) {
    if (initValues) {
        const [startH, startMAMPM] = initValues?.startHoure?.split(':') || [undefined, undefined];
        const [startM, startAmpm] = startMAMPM ? startMAMPM.split(' ') : [undefined, undefined];
        const [endH, endMAMPM] = initValues?.endHoure?.split(':') || [undefined, undefined];
        const [endM, endAmpm] = endMAMPM ? endMAMPM.split(' ') : [undefined, undefined];
        
        return {
            ...initValues,
            [N_WORKINGHOUR.dayOfWeek]: true,
            ...createHourObjectFromValues(
                +startH,
                +startM,
                +startAmpm?.includes('PM') ? 'PM' : 'AM',
                N_WORKINGHOUR.startHoure
            ),
            ...createHourObjectFromValues(
                +endH,
                +endM,
                +endAmpm?.includes('PM') ? 'PM' : 'AM',
                N_WORKINGHOUR.endHoure
            )
        };
    }
    return {
        ...parseHourString(undefined, N_WORKINGHOUR.startHoure),
        ...parseHourString(undefined, N_WORKINGHOUR.endHoure),
        [N_WORKINGHOUR.dayOfWeek]: false
    };
}
