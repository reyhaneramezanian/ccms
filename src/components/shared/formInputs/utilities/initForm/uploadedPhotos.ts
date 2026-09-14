import { DoctorDetailsDto, DoctorInput_Input } from 'src/@types/doctor.type';

export function initUploadedPhotos(initValues?: DoctorDetailsDto['clinicPhotos']) {
    if (initValues) {
        return initValues.filter(({ photoUrl }) => photoUrl).map(({ photoUrl }) => photoUrl);
    }
    return [];
}

export function formateUploadedPhotos(photos: Array<string>): DoctorInput_Input['clinicPhotos'] {
    return photos.filter(v=>v).map((photoUrl) => ({
        photoUrl,
        clinicId: 0
    }));
}
