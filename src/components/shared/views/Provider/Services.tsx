import styled from '@emotion/styled';
import { DoubleCardIcon } from 'src/assets/common/DoubleCardIcon';
import { MText } from 'src/components/base/MText';
import { Spacer } from 'src/components/base/spacer';
import shortid from 'shortid';

import { useState } from 'react';

import Title from './Title';
import { getFullImageUrl } from '@/utils/helper/ui';
import { getProviderSpeciality } from '@/utils/getProviderSpeciality';
import { capitalizeProvider } from '@/utils/helper/providers';

//TODO: this shadow should be read from theam
const ProviderCardContainer = styled.div({
    boxShadow: '0px 0px 5px 2px #E6E6E6',
    width: '100%',
    borderRadius: '10px',
    padding: '20px',
    backgroundColor: 'white'
});

const Row = styled.div({
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, 45%)',
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
    // alignItems: 'center',
    width: '100%'
});


function Services(
    { provider }
) {
    const [collapse, setCollapse] = useState(true)

    const handleCollapse = () => {

        setCollapse(!collapse)

    }
    // const subscribeItems = separateSubscribeItems(subscribePlans);

    
    return (
        <>
            <Title title="Services" handleClick={handleCollapse} collapse={collapse} />

            <Spacer space="12px" />
            {collapse &&
                <ProviderCardContainer>
                    <Row>
                        <Item3>
                            <SpaceTextContainer>
                                <MText variant="body3" fontWeight="bold">Speciality</MText>
                                <Spacer space="0 10px" />
                                <MText variant="body3" color="gray">{
                                capitalizeProvider(getProviderSpeciality(provider))
                                }</MText>
                                <Spacer space="0 10px" />
                                <MText variant="body3" fontWeight="bold">Max time for visit</MText>
                                <Spacer space="0 10px" />
                                <MText variant="body3" color="gray">{provider?.maxTimeVisit}</MText>
                            </SpaceTextContainer>
                            <Spacer space="12px" />
                            <SpaceTextContainer>
                                <MText variant="body3" style={{
                                    width: '250px'
                                }} fontWeight="bold">
                                    Sub Speciality
                                </MText>
                                <Spacer space="0 10px" />
                                <MText variant="caption" color="gray">
                                    {provider?.subSpecialty}
                                </MText>
                            </SpaceTextContainer>
                        </Item3>
                        <Item2>
                            <Item3>
                                <SpaceTextContainer>
                                    <MText variant="body3" fontWeight="bold">
                                        Regular Booking
                                    </MText>
                                    <Spacer space="0 10px" />
                                    <MText variant="body3" color="gray">
                                    {provider?.regularBooking} Dinar
                                    </MText>
                                </SpaceTextContainer>
                                <Spacer space="10px" />
                                <SpaceTextContainer>
                                    <MText variant="body3" fontWeight="bold">
                                        Urgent Booking
                                    </MText>
                                    <Spacer space="0 10px" />
                                    <MText variant="body3" color="gray">
                                    {provider?.urgentBooking} Dinar
                                    </MText>
                                </SpaceTextContainer>
                            </Item3>
                            <Item3>
                                <MText variant="body3" fontWeight="bold">
                                    Certificate
                                </MText>
                                <Spacer space="0 10px" />
                                <div style={{
                                    width: '200px'
                                }} >
                                    <img style={{
                                        width: '100%',
                                        height: 'auto'
                                    }} src={getFullImageUrl(provider?.certificate)} />
                                </div>
                            </Item3>
                        </Item2>
                    </Row>
                    <Spacer space="10px" />

                </ProviderCardContainer>}
        </>
    );
}

export default Services;
