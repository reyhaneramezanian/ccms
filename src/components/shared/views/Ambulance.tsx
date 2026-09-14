import styled from '@emotion/styled';
import shortid from 'shortid';
import { MText } from '../../base/MText';
import { Spacer } from '../../base/spacer';
import { AmbulanceData } from './AmbulanceData';
import { HospitalAmbulanceDto } from 'src/@types/hospital.type';
const AmbulanceContainer = styled.div({
    width: '100%'
});

const AmbulanceBaseCard = styled.div({
    boxShadow: '0px 0px 5px 2px #E6E6E6',
    padding: '30px',
    width: '100%',
    borderRadius: '5px',
    display: 'grid',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    gridGap: '20px',
    gridTemplateColumns: 'repeat(auto-fill, 18%)',
    '@media(max-width:1000px)': {
        gridTemplateColumns: 'repeat(auto-fill, 30%)'
    },
    '@media(max-width:800px)': {
        gridTemplateColumns: 'repeat(auto-fill, 45%)'
    }
});

const AmbulanceCard = styled.div({
    boxShadow: '0px 0px 5px 2px #E6E6E6',
    padding: '15px 0 15px 0',
    width: '100%',
    display: 'flex',
    height: '80px',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    flexDirection: 'column',
    borderRadius: '5px'
});

const AmbulanceContent = styled(MText)({
    flex: '1'
});

function Ambulance({ ambulances }: { ambulances: Array<HospitalAmbulanceDto> }) {
    if (ambulances?.length === 0) return null;

    return (
        <AmbulanceContainer>
            <MText fontWeight="bold">Add Ambulance</MText>
            <Spacer space="12px" />
            <AmbulanceBaseCard>
                {ambulances?.map?.((item, index) => (
                    <AmbulanceCard key={index}>
                        <AmbulanceContent align="center" variant="caption">
                            {item.title}
                        </AmbulanceContent>
                        <AmbulanceContent align="center" variant="caption">
                            {item.telNumber}
                        </AmbulanceContent>
                    </AmbulanceCard>
                ))}
            </AmbulanceBaseCard>
        </AmbulanceContainer>
    );
}

export default Ambulance;
