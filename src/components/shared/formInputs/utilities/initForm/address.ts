import { DoctorInput_Input } from 'src/@types/doctor.type';
import { LocationInput_InputType } from 'src/@types/location';
import { MAP_DEFAULT_POSITION } from 'src/constants/value';
import * as C from '../input.constant';

const INITIAL_VALUES = {
    [C.N_ADDRESS.city]: '',
    [C.N_ADDRESS.country]: '',
    [C.N_ADDRESS.governorate]: '',
    [C.N_ADDRESS.address]: '',
    [C.N_ADDRESS.positionOnMap]: MAP_DEFAULT_POSITION
};
export function initAddress(initValues?: Array<LocationInput_InputType>) {
    if (initValues && initValues.length > 0) {
        const pos = initValues[0];
        const positionOnMap = pos?.positionOnMap?.split(',');
        return {
            [C.N_ADDRESS.city]: pos?.city,
            [C.N_ADDRESS.country]: pos?.country,
            [C.N_ADDRESS.governorate]: pos?.governorate,
            [C.N_ADDRESS.address]: pos?.address,
            [C.N_ADDRESS.positionOnMap]:
                positionOnMap.length > 0
                    ? {
                          lat: +positionOnMap[0],
                          lng: +positionOnMap[1]
                      }
                    : MAP_DEFAULT_POSITION
        };
    }
    return INITIAL_VALUES;
}

export function formatAddress(v: typeof INITIAL_VALUES): DoctorInput_Input['locationInput'] {
    return {
        // id: 0,
        city: v.city,
        address: v.address,
        country: v.country,
        governorate: v.governorate,
        ...(v?.positionOnMap?.lat && {
            positionOnMap: `${v.positionOnMap.lat},${v.positionOnMap.lng}`
        })
    };
}
