import styled from '@emotion/styled';
import { MText } from 'src/components/base/MText';
import { Spacer } from 'src/components/base/spacer';
import { ProviderFacilityDto } from 'src/@types/provider';

const OtherFacilitiesContainer = styled.div({
    width: '100%'
});

const OtherFacilitiesBaseCard = styled.div({
    boxShadow: '0px 0px 5px 2px #E6E6E6',
    padding: '30px',
    width: '100%',
    display: 'grid',
    borderRadius: '5px',
    gridGap: '20px',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    gridTemplateColumns: 'repeat(auto-fill, 48%)',
    '@media(max-width:1050px)': {
        gridTemplateColumns: 'repeat(auto-fill, 90%)'
    }
});

const OtherFacilitiesCard = styled.div({
    boxShadow: '0px 0px 5px 2px #E6E6E6',
    padding: '10px',
    width: '100%',
    display: 'flex',
    backgroundColor: '#f8f8f8',
    flexDirection: 'column',
    borderRadius: '5px'
});

const OtherFacilitiesContent = styled(MText)({
    flex: '1'
});

function OtherFacilities({ otherFacilities }: { otherFacilities?: Array<ProviderFacilityDto> }) {
    return (
        <OtherFacilitiesContainer>
            <MText fontWeight="bold">Other facilities</MText>
            <Spacer space="12px" />
            <OtherFacilitiesBaseCard>
                {otherFacilities?.map?.((item, index) => (
                    <OtherFacilitiesCard key={index}>
                        <OtherFacilitiesContent variant="body1">
                            {item.title}
                        </OtherFacilitiesContent>
                        <Spacer space="12px" />
                        <OtherFacilitiesContent variant="caption">
                            {item.description}
                        </OtherFacilitiesContent>
                    </OtherFacilitiesCard>
                ))}
            </OtherFacilitiesBaseCard>
        </OtherFacilitiesContainer>
    );
}

export default OtherFacilities;
