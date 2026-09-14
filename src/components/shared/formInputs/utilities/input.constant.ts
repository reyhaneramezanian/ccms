import { DayOfWeekType } from 'src/@types/util.type';

export const N_SUBSCRIBE_PLAN = {
    prefix: 'subscribePlan' as const,
    plan: 'plan',
    fixed: 'fixed',
    patient: 'patient',
    adPlan: 'adPlan',
    adCheck: 'adCheck',
    vipPlan: 'vipPlan',
    vipCheck: 'vipCheck'
} as const;
export const SUBSCRIBE_VALUE_RADIO = { fixed: 'basedOnFixed', patient: 'basedOnPatient' } as const;

export const N_WORKINGHOUR = {
    prefix: 'workingTimes',
    startHoure: 'startHoure',
    endHoure: 'endHoure',
    open: 'open',
    dayOfWeek: 'dayOfWeek',
    hospitalId: 'hospitalId',
    providerName: 'providerName',
    medicalBeautyCenterId: 'medicalBeautyCenterId',
    clinicName: 'clinicName'
} as const;
export const WORKING_DAYS: Array<{ d: DayOfWeekType; optionName: string }> = [
    { d: 'SUNDAY', optionName: 'S' },
    { d: 'MONDAY', optionName: 'M' },
    { d: 'TUESDAY', optionName: 'T' },
    { d: 'WEDNESDAY', optionName: 'W' },
    { d: 'THURSDAY', optionName: 'T' },
    { d: 'FRIDAY', optionName: 'F' },
    { d: 'SATURDAY', optionName: 'S' }
];

export const HOSPITAL_PREFIX = 'HOSPITAL' as const;
export const BEAUTY_PREFIX = 'BEAUTY' as const;
export const CLINIC_PREFIX = 'CLINIC' as const;
export const MULTIPLE_W_DAYS = 'MULTIPLE_W_DAYS' as const;

export type WorkspaceInputPrefixType =
    | typeof HOSPITAL_PREFIX
    | typeof BEAUTY_PREFIX
    | typeof CLINIC_PREFIX;

export const N_INFO = {
    id: 'id',
    prefix: 'info',
    fax: 'fax',
    email: 'email',
    telNumber: 'telNumber',
    userName: 'userName',
    photoUrl: 'photoUrl',
    title: 'title',
    about: 'about',
    isActive: 'isActive',
    isOpen: 'isOpen',
    createAt: 'createAt'
} as const;

export const N_USER_INFO = {
    prefix: 'userInfo',
    firstName: 'firstName',
    id: 'id',
    lastName: 'lastName',
    phoneNumber: 'phoneNumber',
    about: 'about',
    photoUrl: 'photoUrl',
    gender: 'gender',
    city: 'city',
    birthday: 'birthday',
    securityNumber: 'securityNumber',
    langueage: 'langueage',
    insuranceCovered: 'insuranceCovered',
    specialty: 'specialty',
    subSpecialty: 'subSpecialty',
    urgentBooking: 'urgentBooking',
    regularBooking: 'regularBooking',
    maxTimeVisit: 'maxTimeVisit',
    isHaveInPerson: 'isHaveInPerson',
    certificate: 'certificate',
    fax: 'fax',
    email: 'email',
    clinicName: 'clinicName'
} as const;
export const LANGUAGE_SPLITTER = ',';

export const N_ADDRESS = {
    prefix: 'addr',
    address: 'address',
    city: 'city',
    governorate: 'governorate',
    country: 'country',
    positionOnMap: 'positionOnMap'
} as const;

export const N_OTHER_FACILITIES = 'otherFacilities' as const;

export const N_DOCTORS = 'doctors';
export const N_AMBULANCES = 'ambulances';
export const N_DENTISTS = 'dentists';
export const N_NUTRITION_EXPERTS = 'nutritionExperts';
export const N_PHAEMACIES = 'pharmacies';
export const N_VETERINARIANS = 'veterinarians';
export const N_LABOATORIES = 'laboatories';

export const N_PHOTOS = {
    clinicPhotos: 'clinicPhotos'
} as const;
