import styled from '@emotion/styled';
import { DoubleCardIcon } from 'src/assets/common/DoubleCardIcon';
import { MText } from 'src/components/base/MText';
import { Spacer } from 'src/components/base/spacer';
import shortid from 'shortid';


import { useState } from 'react';

import Title from './Title';
import HospitalCard from './HospitalCard';
import ClinicCard from './ClinicCard';

//TODO: this shadow should be read from theam
const ProviderCardContainer = styled.div({
    boxShadow: '0px 0px 5px 2px #E6E6E6',
    width: '100%',
    borderRadius: '10px',
    padding: '20px',
    backgroundColor: 'white'
});

const HospitalCardContainer = styled.div({
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, 49%)',
    justifyContent: 'space-between',
    gridGap: '10px',
    // '@media(max-width:1280px)': {
    //     gridTemplateColumns: 'repeat(auto-fill, 42%)'
    // },
    '@media(max-width:1050px)': {
        gridTemplateColumns: 'repeat(auto-fill, 98%)'
    }
});
const Item = styled.div({
    width: '100%',
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'column',
});
const Item2 = styled.div({
    width: '100%',
    display: 'flex',
});

const Item3 = styled.div({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
});


const SpaceTextContainer = styled.div({
    display: 'flex',
    width: '100%'
});


function Workspace({ workingTimes, locations, clinicPhotos }
    //     {
    //     id,
    //     hospital = {} as HospitalBaseInput_Input,
    //     subscribePlans
    // }: {
    //     hospital?: HospitalBaseInput_Input;
    //     subscribePlans: any;
    //     id: number;
    // }
) {
    let hospitals = [], clinics = [], mbcs = []
    if (workingTimes) {
        
        hospitals = workingTimes.filter(item => item.hospitalId);
        clinics = workingTimes.filter(item => item.clinicName);
        mbcs = workingTimes.filter(item => item.medicalBeautyCenterId);
    }
    const [collapse, setCollapse] = useState(true)

    const handleCollapse = () => {

        setCollapse(!collapse)

    }
    // const subscribeItems = separateSubscribeItems(subscribePlans);

    return (
        <>
            <Title title="Workspace" handleClick={handleCollapse} collapse={collapse} />

            <Spacer space="12px" />
            {collapse &&
                <>
                    <HospitalCardContainer>

                        {hospitals.length > 0 && <HospitalCard title="Hospitals" hospitals={Object.values(hospitals)}/>}
                        {mbcs.length > 0 && <HospitalCard isMbc={true} title="Medical Beauty Centers" hospitals={Object.values(mbcs)}/>}
                    </HospitalCardContainer>
                    <Spacer space="12px" />
                    {clinics && locations && clinics[0] && <ClinicCard clinicPhotos={clinicPhotos} clinic={clinics} locations={locations}/>}

                </>
            }
        </>
    );
}

export default Workspace;
