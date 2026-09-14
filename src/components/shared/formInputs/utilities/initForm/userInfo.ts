import {
    createDateOnSeprateInput,
    createMaxVisitTime,
    DATE_POST_FIX,
    extractMaxVisitTime,
    HOUR_POST_FIX,
    MIN_POST_FIX,
    MONTH_POST_FIX,
    YEAR_POST_FIX
} from '@/utils/dateTime/time';
import dayjs from 'dayjs';
import { DentistInput_Input, DentistType } from 'src/@types/dentist.type';
import { DoctorDetailsDto, DoctorInput_Input } from 'src/@types/doctor.type';
import { BaseProviderProps } from 'src/@types/provider';
import { GenderType } from 'src/@types/util.type';
import * as C from '../input.constant';

const INITIAL_VALUES = {
    [C.N_USER_INFO.photoUrl]: undefined,
    [C.N_USER_INFO.certificate]: undefined,
    [C.N_USER_INFO.firstName]: '',
    [C.N_USER_INFO.lastName]: '',
    [C.N_USER_INFO.about]: '',
    [C.N_USER_INFO.gender]: 'MALE' as GenderType,
    [C.N_USER_INFO.langueage]: {},
    [C.N_USER_INFO.phoneNumber]: '',
    [C.N_USER_INFO.securityNumber]: '',
    [C.N_USER_INFO.insuranceCovered]: '',
    [C.N_USER_INFO.city]: '',
    [C.N_USER_INFO.fax]: '',
    [C.N_USER_INFO.email]: '',
    [C.N_USER_INFO.clinicName]: '',
    [C.N_USER_INFO.maxTimeVisit]: {
        [HOUR_POST_FIX]: 0,
        [MIN_POST_FIX]: 0
    },
    [C.N_USER_INFO.isHaveInPerson]: false,
    [C.N_USER_INFO.subSpecialty]: '',
    [C.N_USER_INFO.specialty]: '',
    [C.N_USER_INFO.regularBooking]: 0,
    [C.N_USER_INFO.urgentBooking]: '',
    [C.N_USER_INFO.birthday]: {
        [YEAR_POST_FIX]: 1970,
        [MONTH_POST_FIX]: 11,
        [DATE_POST_FIX]: 1
    }
};
export function initBaseUserInfo(initValues?: BaseProviderProps) {
    const userInfo = JSON.parse(JSON.stringify(initValues));
    const birthday = dayjs(userInfo.birthday);
    const languages = userInfo.langueage
        ? userInfo.langueage
              .split(C.LANGUAGE_SPLITTER)
              .filter((v) => v)
              .reduce(
                  (acc, v) => ({
                      ...acc,
                      [v]: true
                  }),
                  {}
              )
        : null;

    const visitTime = extractMaxVisitTime(userInfo.maxTimeVisit);
    return {
        ...userInfo,
        ...(birthday.isValid() && {
            [C.N_USER_INFO.birthday]: {
                [YEAR_POST_FIX]: birthday.year(),
                [MONTH_POST_FIX]: birthday.month(),
                [DATE_POST_FIX]: birthday.date()
            }
        }),
        ...(languages && { [C.N_USER_INFO.langueage]: languages }),
        ...(visitTime && {
            [C.N_USER_INFO.maxTimeVisit]: visitTime
        })
    };
}

export function formatBaseUserInfo(info: typeof INITIAL_VALUES, clinicName?: string) {
    const copiesInfo: typeof INITIAL_VALUES = JSON.parse(JSON.stringify(info));
    const userInfo: Omit<DoctorInput_Input['doctor'], 'doctorSpecialty'> = {
        ...copiesInfo,
        ...{ certificate: copiesInfo.certificate ?? '' },
        langueage: Object.keys(info['langueage'])
            .filter((v) => info['langueage']?.[v])
            .join(C.LANGUAGE_SPLITTER),
        ...(clinicName && { clinicName }),
        birthday: createDateOnSeprateInput(info['birthday']),
        maxTimeVisit: createMaxVisitTime(info['maxTimeVisit']),
        isActive: true,
        regularBooking: Number(info['regularBooking']),
        urgentBooking: Number(info['urgentBooking'])
    };
    // userInfo['regularBooking'] = Number(userInfo['regularBooking'])
    delete userInfo['id'];
    delete userInfo['specialty'];
    return userInfo as Omit<DoctorInput_Input['doctor'], 'doctorSpecialty'>;
}

export function initDoctorUserInfo(initValues?: DoctorDetailsDto['doctor']) {
    if (initValues) {
        return {
            ...initBaseUserInfo(initValues),
            [C.N_USER_INFO.specialty]: initValues.doctorSpecialty
        };
    }
    return { ...INITIAL_VALUES, [C.N_USER_INFO.specialty]: '' };
}
export function formatDoctorUserInfo(
    values?: typeof INITIAL_VALUES,
    clinicName?: string
): DoctorInput_Input['doctor'] {
    let doctorSpecialty = values.specialty;

    return {
        ...formatBaseUserInfo(values, clinicName),
        doctorSpecialty
    };
}
export function formatVetUserInfo(
    values?: typeof INITIAL_VALUES,
    clinicName?: string
): DoctorInput_Input['doctor'] {
    const data = formatBaseUserInfo(values, clinicName);
    delete data['providerId'];
    return {
        ...data
        // doctorSpecialty: values.specialty as any
    };
}

export function initDentistsUserInfo(initValues?: DentistType) {
    if (initValues) {
        return {
            ...initBaseUserInfo(initValues),
            [C.N_USER_INFO.specialty]: initValues.dentistSpecialty
        };
    }
    return { ...INITIAL_VALUES, [C.N_USER_INFO.specialty]: '' };
}
export function formatDentistsUserInfo(
    values?: typeof INITIAL_VALUES,
    clinicName?: string
): DentistInput_Input['dentist'] {
    let dentistSpecialty = values.specialty;

    return {
        ...formatBaseUserInfo(values, clinicName),
        dentistSpecialty
    };
}
