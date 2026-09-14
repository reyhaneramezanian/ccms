import { HospitalProviderDto } from 'src/@types/hospital.type';

type ProviderFacilitiesType = {
    id: number;
    title: string;
};

export function initOtherFacilities(initValues?: any) {
    if (initValues) {
        return initValues;
    }
    return [];
}
export function initAmbulances(initValues?: any) {
    if (initValues) {
        return initValues;
    }
    return [];
}
function mapProviderValue({ firstName, lastName, id }: HospitalProviderDto) {
    return { title: `${firstName} ${lastName}`, id };
}
export function initProviders(
    initValues?: Array<HospitalProviderDto>,
    providerName?: HospitalProviderDto['providerName']
): Array<ProviderFacilitiesType> {
    if (initValues) {
        return initValues?.filter((d) => d.providerName === providerName).map(mapProviderValue);
    }
    return [];
}
export function formatProviders(v?: Array<ProviderFacilitiesType>) {
    return v?.map(({ id }) => id) || [];
}

function mapMbcValue(item) {
    return { title: `${item?.provider?.doctor?.firstName} ${item?.provider?.doctor?.lastName}`, id: item?.provider.id };
}
export function initMbcDoctors(
    initValues?: any[],
){
    if (initValues) {
        return initValues?.map((item)=> mapMbcValue(item));
    }
    return [];
}
