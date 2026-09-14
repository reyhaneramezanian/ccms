import { capitalizeProvider } from '@/utils/helper/providers';
import { GenderType } from 'src/@types/util.type';
import {
    ActiveStatus,
    AlertType,
    Gender,
    OwnershipStatus,
    PaymentStatus
} from 'src/graphql/generated';

export const GenderOption: Array<{ option: string; value: GenderType }> = [
    { option: 'None', value: null },
    {
        option: 'Male',
        value: Gender.Male
    },
    {
        option: 'Female',
        value: Gender.Female
    }
];

export const PaymentStatusOption: Array<{ option: string; value: PaymentStatus }> = [
    {
        option: 'Paid',
        value: PaymentStatus.Paid
    },
    {
        option: 'Unpaid',
        value: PaymentStatus.Unpaid
    }
];

export const AlertTypeOptions: Array<{ option: string; value: AlertType }> = [
    { option: 'ANIMAL_THREAT', value: AlertType.AnimalThreat },
    { option: 'FIRE', value: AlertType.Fire },
    { option: 'LOST_CHILDREN', value: AlertType.LostChildren },
    { option: 'OTHER', value: AlertType.Other },
    { option: 'STUCK_IN_ELEVATOR', value: AlertType.StuckInElevator },
    { option: 'THIEF', value: AlertType.Thief },
    { option: 'VISITOR_THREAT', value: AlertType.VisitorThreat }
];

// export const MaritalOptions: Array<{ option: string; value: MaritalStatus }> = [
//     {
//         option: 'Married',
//         value: MaritalStatus.Married
//     },
//     {
//         option: 'Single',
//         value: MaritalStatus.Single
//     }
// ];

export const HOUR_OPTIONS = Array.from(Array(13), (_, i) => i).map((hour) => ({
    option: hour,
    value: hour
}));

export const MIN_OPTIONS = [0, 15, 30, 45].map((min) => ({ option: min, value: min }));

export const LANGUAGES_OPTIONS = [
    { value: 'en', optionName: 'English' },
    { value: 'curdi', optionName: 'کوردی' },
    { value: 'ar', optionName: 'العربية' }
];

export const ACTIVE_STATUS = [
    {
        value: ActiveStatus.Active,
        option: 'Active'
    },
    {
        value: ActiveStatus.Inactive,
        option: 'Inactivate'
    }
];

export const OWNERSHIP_STATUS_OPTIONS = [
    {
        value: OwnershipStatus.Owner,
        option: 'Owner'
    },
    {
        value: OwnershipStatus.Renter,
        option: 'Renter'
    }
];

export const STAFF_ROLE_OPTIONS = [
    {
        value: OwnershipStatus.Renter,
        option: 'Renter'
    }
];

export const OperatorRoleConst = [
    'ADMIN',
    'PATIENT',
    'DOCTOR',
    'DENTIST',
    'HOSPITAL_CLINIC',
    'LABORATORY',
    'NUTRITION_EXPERT',
    'VETERINARIAN',
    'PHARMACY',
    'MEDICAL_BEAUTY_CENTER'
] as const;

export const OperationOptions = OperatorRoleConst.map((role) => ({
    option: capitalizeProvider(role),
    value: role
}));
