import { MText } from 'src/components/base/MText';
import styled from '@emotion/styled';
import FacilityCard from './FacilityCard';
import shortid from 'shortid';
import { Spacer } from 'src/components/base/spacer';
import { HospitalProviderDto } from 'src/@types/hospital.type';

const FacilitiesContainer = styled.div({
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, 48%)',
    justifyContent: 'space-between',
    gridGap: '10px',
    '@media(max-width:1280px)': {
        gridTemplateColumns: 'repeat(auto-fill, 90%)'
    },
    '@media(max-width:1050px)': {
        gridTemplateColumns: 'repeat(auto-fill, 90%)'
    }
});

type ArrayProvider = Array<HospitalProviderDto>;

type ProviderListType = {
    USER?: ArrayProvider;
    DOCTOR?: ArrayProvider;
    CLINIC?: ArrayProvider;
    HOSPITAL?: ArrayProvider;
    LAB?: ArrayProvider;
    PHARMACY?: ArrayProvider;
    DENTIST?: ArrayProvider;
    MEDICAL_BEAUTY_CENTER?: ArrayProvider;
    VETERINARIAN?: ArrayProvider;
    NUTRITION_EXPERT?: ArrayProvider;
    HOME_SERVICE?: ArrayProvider;
    AMBULANCE?: ArrayProvider;
};

const titles = {
    DOCTOR: 'Doctors',
    LAB: 'Laboratory',
    PHARMACY: 'Pharmacy',
    DENTIST: 'Dentists',
    VETERINARIAN: 'Veterinarian',
    NUTRITION_EXPERT: 'Nutrition expert'
};

function Facilities({ providers }: { providers: Array<HospitalProviderDto> }) {
    const data = separateProviders();

    if (Object.keys(data).length === 0) return null;

    return (
        <>
            <MText variant="h4" fontWeight="bold">
                Facilities
            </MText>
            <Spacer space="24px" />
            <FacilitiesContainer>
                {Object.keys(data).map((key) => (
                    <FacilityCard key={shortid.generate()} data={data[key]} title={titles[key]} />
                ))}
            </FacilitiesContainer>
        </>
    );

    function separateProviders(): ProviderListType {
        const hospitalProviders: ProviderListType = {};

        if (Array.isArray(providers)) {
            providers.forEach((provider) => {
                if (!hospitalProviders[provider.providerName]) {
                    hospitalProviders[provider.providerName] = [];
                }

                hospitalProviders[provider.providerName].push(provider);
            });
        }

        return hospitalProviders;
    }
}

export default Facilities;
