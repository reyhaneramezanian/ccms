import dayjs, { Dayjs } from 'dayjs';
import { capitalizeProvider } from '../helper/providers';

export function formatJustTime(d: Dayjs) {
    return d.format('h A');
}

export function formatJustDate(d?: string) {
    if (!d) return '';

    return dayjs(d).format('DD/MM/YYYY');
}
export function today() {
    const day = dayjs();
    return `${day.format('dddd, D')}th ${day.format('MMMM')}`;
}

export const extractAppointmentDate = (date: string) => {
    try {
        const dateArray = dayjs(date)
        const pattern = new RegExp('\\S{3}\\s\\S{3}\\s\\d{2}\\s\\d{4}')
        return pattern.exec(dateArray['$d'])[0]
    } catch {
        return ''
    }
}
export const extractAppointmentTime = (date: string) => {
    try {
        const dateArray = dayjs(date)
        const pattern = new RegExp('(\\d{1,2}:\\d{1,2}):\\d{1,2}')
        return pattern.exec(dateArray['$d'])[1]
    } catch {
        return ''
    }
}
export const extractAppointmentProvider = (provider: any) => {
    try {
        if (provider.doctor) return {
            providerName: 'Doctor',
            fullName: `${provider.doctor.firstName} ${provider.doctor.firstName}`,
            specialty: capitalizeProvider(provider.doctor.doctorSpecialty)
        }
        if (provider.dentist) return {
            providerName: 'Dentist',
            fullName: `${provider.dentist.firstName} ${provider.dentist.firstName}`,
            specialty: capitalizeProvider(provider.dentist.dentistSpecialty)
        }
        if (provider.nutritionExpert) return {
            providerName: 'Nutrition Expert',
            fullName: `${provider.nutritionExpert.firstName} ${provider.nutritionExpert.firstName}`,
            specialty: ''
        }
        if (provider.nutritionExpert) return {
            providerName: 'Nutrition Expert',
            fullName: `${provider.nutritionExpert.firstName} ${provider.nutritionExpert.firstName}`,
            specialty: ''
        }
        if (provider.veterinarian) return {
            providerName: 'Veterinarian',
            fullName: `${provider.veterinarian.firstName} ${provider.veterinarian.firstName}`,
            specialty: ''
        }
        if (provider.hospital) return {
            providerName: 'Hospital',
            fullName: `${provider.hospital.title}`,
            specialty: ''
        }
        if (provider.medicalBeautyCenter) return {
            providerName: 'Medical Beauty Center',
            fullName: `${provider.medicalBeautyCenter.title}`,
            specialty: ''
        }
        if (provider.pharmacy) return {
            providerName: 'Pharmacy',
            fullName: `${provider.pharmacy.title}`,
            specialty: ''
        }
        if (provider.lab) return {
            providerName: 'Labratory',
            fullName: `${provider.lab.title}`,
            specialty: ''
        }
        return {
            providerName: '',
            fullName: '',
            specialty: ''
        }
    } catch {
        return {
            providerName: '',
            fullName: '',
            specialty: ''
        }
    }
}
