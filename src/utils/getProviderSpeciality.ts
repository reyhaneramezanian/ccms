export const getProviderSpeciality = (provider: any) => {

    if(provider?.doctorSpecialty) return provider.doctorSpecialty

    if(provider?.dentistSpecialty) return provider.dentistSpecialty

    return ''
}