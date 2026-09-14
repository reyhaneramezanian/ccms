import { DentistSpecialtyType } from 'src/@types/dentist.type';
import { DoctorSpecialtyType } from './../@types/doctor.type';

export const providers = [
    { option: 'Patient', value: 'PATIENT' },
    { option: 'Doctor', value: 'DOCTOR' },
    { option: 'Clinic', value: 'CLINIC' },
    { option: 'Hospital / Clinic', value: 'HOSPITAL' },
    { option: 'Lab', value: 'LAB' },
    { option: 'Pharmacy', value: 'PHARMACY' },
    { option: 'Dentist', value: 'DENTIST' },
    { option: 'Medical Beauty Center', value: 'MEDICAL_BEAUTY_CENTER' },
    { option: 'Veterinarian', value: 'VETERINARIAN' },
    { option: 'Nutrition Expert', value: 'NUTRITION_EXPERT' },
    { option: 'Home Service', value: 'HOME_SERVICE' },
    { option: 'Ambulance', value: 'AMBULANCE' }
];

export const DOCTOR_SPECIALITIES_CONST = [
    'INTERNAL_MEDICINE',
    'GENERAL_SURGERY',
    'HEART_SPECIALIST',
    'ENDOCRINOLOGY',
    'ONCOLOGY',
    'STOMACH_SPECIALIST',
    'BLOOD_SPECIALIST',
    'PATHOLOGY',
    'NEUROLOGY',
    'FAMILY_MEDICINE',
    'BONE_AND_JOINT_SPECIALIST',
    'LUNGS_SPECIALIST',
    'EARS_NOSE_THROAT',
    'PLASTIC_SURGERY',
    'EYE_SPECIALIST',
    'UROLOGY',
    'FACIOMAXILLARY_SURGERY',
    'INTERVENTIONAL_RADIOLOGY',
    'OBSTETRICS_GYNECOLOGY',
    'KIDNEY_SPECIALIST',
    'CHILD_SPECIALIST',
    'SKIN_AND_HAIR_SPECIALIST'
] as const;

function formatSpecialtyName(name: string) {
    const newName = name.replace('_', ' ');
    return `${newName[0]}${newName.slice(1).toLowerCase()}`;
}
export const DoctorSpecialitiesOptions: Array<{ value: DoctorSpecialtyType; option: string }> =
    DOCTOR_SPECIALITIES_CONST.map((specialty) => ({
        value: specialty,
        option: formatSpecialtyName(specialty)
    }));

export const DENTIST_SPECIALITIES_CONST = [
    'SURGERY_AND_IMPLANTOLOGY',
    'COSMETIC_DENTISTRY',
    'ORTHODONTICS',
    'ENDOCRINOLOGY',
    'GENERAL_DENTISTRY'
] as const;
export const DentistsSpecialitiesOptions: Array<{ value: DentistSpecialtyType; option: string }> =
    DENTIST_SPECIALITIES_CONST.map((specialty) => ({
        value: specialty,
        option: formatSpecialtyName(specialty)
    }));
