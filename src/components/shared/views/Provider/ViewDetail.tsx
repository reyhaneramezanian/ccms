import styled from '@emotion/styled';
import { DoubleCardIcon } from 'src/assets/common/DoubleCardIcon';
import { MText } from 'src/components/base/MText';
import { Spacer } from 'src/components/base/spacer';
import shortid from 'shortid';

import { useState } from 'react';

import Title from './Title';
import { DoctorInput_Input } from 'src/@types/doctor.type';
import { getFullImageUrl } from '@/utils/helper/ui';
import { separateSubscribeItems } from 'src/graphql/shared/useGetPlans';
import dayjs from 'dayjs';
import { extractLanguage, toTitleCase } from '@/utils/regex/regex';

//TODO: this shadow should be read from theam
const ProviderCardContainer = styled.div({
    boxShadow: '0px 0px 5px 2px #E6E6E6',
    width: '100%',
    borderRadius: '10px',
    padding: '20px',
    backgroundColor: 'white'
});

const FirstRow = styled.div({
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, 30%)',
    justifyContent: 'space-between',
    gridGap: '10px',
    '@media(max-width:1280px)': {
        gridTemplateColumns: 'repeat(auto-fill, 42%)'
    },
    '@media(max-width:1050px)': {
        gridTemplateColumns: 'repeat(auto-fill, 98%)'
    }
});
const Item = styled.div({
    width: '100%',
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'column',
    // height: '200px',
});

const ShortDetails = styled.div({
    display: 'flex',
    width: '100%'
});
const ShortDetailsText = styled.div({
    display: 'flex',
    flexDirection: 'column',
    width: '70%',
    paddingLeft: '10px',
    justifyContent: 'center'
});
const Avatar = styled.img({
    height: '100px',
    width: '100px',
    maxWidth: '100px',
    borderRadius: '50%'
});
const StyledImage = styled.img({
    height: 'auto',
    width: '100%'
});
const SpaceTextContainer = styled.div({
    display: 'flex',
    alignItems: 'center'
});

const EmailContainer = styled.div({
    // backgroundColor: '#b0b0b0',
    backgroundColor: '#e0e0e0',
    borderRadius: '10px',
    border: '1px #696969 solid',
    alignItems: 'center',
    padding: '3px 15px 3px 15px',
    width: 'fit-content'
});

const BottomSection = styled.div({
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap'
});

const BottomSectionTitle = styled.div({
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    minWidth: '150px',
    height: '100px'
});
const BottomSectionBody = styled.div({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: '1px solid black',
    borderRadius: '10px',
    padding: '5px',
    margin: '0 50px 0 50px'
});

const Item2 = styled.div({
    width: '30%',
    textAlign: 'center',
    // justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    height: '100px'
});

const Item2Flex = styled.div({
    flex: '1',
    display: 'grid'
});

const names = {
    adItems: 'AD',
    eachPatientItems: 'Each Patient',
    fixedPriceItems: 'Base on fixed price',
    pointSystemItems: 'Point System',
    vipItems: 'VIP'
};

function Plan({ name, items }) {
    return (
        name &&
        items.length > 0 && (
            <Item2>
                <Item2Flex>
                    <MText align="center" variant="caption" fontWeight="bold">
                        {name}
                    </MText>
                </Item2Flex>
                <Item2Flex>
                    {items.map((item, index) => (
                        <MText key={index} align="center" variant="caption">
                            {item.title}
                        </MText>
                    ))}
                </Item2Flex>
            </Item2>
        )
    );
}

const extractBirthday = (birthday: string) => {
    const birthdayArray = dayjs(birthday)
    const pattern = new RegExp('\\S{3}\\s\\d{2}\\s\\d{4}')
    return pattern.exec(birthdayArray['$d'])[0]
}


function ViewDetail({ provider }) {

    const [collapse, setCollapse] = useState(true)

    const handleCollapse = () => {

        setCollapse(!collapse)

    }



    return (
        <>
            <Title title="View Details" handleClick={handleCollapse} collapse={collapse} />

            <Spacer space="12px" />
            {collapse &&
                <ProviderCardContainer>
                    <FirstRow>
                        <Item>
                            <ShortDetails>
                                {
                                    provider?.photoUrl ? (<Avatar
                                        src={getFullImageUrl(provider?.photoUrl)}
                                    />) : (<Avatar
                                        src='/images/empty_profile.png'
                                    />)
                                }

                                <ShortDetailsText>
                                    <MText variant="body3" fontWeight="bold">
                                        {provider?.firstName} {provider?.lastName}
                                    </MText>
                                    <Spacer space="5px" />
                                    <SpaceTextContainer>
                                        <MText>ID</MText>
                                        <Spacer space="0 5px" />
                                        <MText variant="caption2">
                                            {provider?.providerId}
                                        </MText>
                                        <Spacer space="0 5px" />
                                        <DoubleCardIcon
                                            width="24"
                                            height="22"
                                            style={{
                                                transform: 'scale(0.7)',
                                                cursor: 'pointer'
                                            }}
                                        onClick={() => {
                                            navigator.clipboard.writeText(provider?.providerId.toString());
                                        }}
                                        />
                                    </SpaceTextContainer>
                                </ShortDetailsText>

                            </ShortDetails>
                            <Spacer space="12px" />
                            <MText variant="body3" fontWeight="bold">
                                About Doctor
                            </MText>
                            <MText variant="caption2">
                                {provider?.about}
                            </MText>
                        </Item>
                        <Item>
                            <SpaceTextContainer>
                                <MText variant="body3" fontWeight="bold">Language</MText>
                                <Spacer space="0 10px" />
                                <MText variant="body3" color="gray">{extractLanguage(provider?.langueage)}</MText>
                            </SpaceTextContainer>
                            <SpaceTextContainer>
                                <MText variant="body3" fontWeight="bold">Gender</MText>
                                <Spacer space="0 10px" />
                                <MText variant="body3" color="gray">
                                    {toTitleCase(provider?.gender)}
                                </MText>
                            </SpaceTextContainer>
                            <SpaceTextContainer>
                                <MText variant="body3" fontWeight="bold">Birthday</MText>
                                <Spacer space="0 10px" />
                                <MText variant="body3" color="gray">
                                    {provider?.birthday ? extractBirthday(provider?.birthday): null}
                                </MText>
                            </SpaceTextContainer>
                            <SpaceTextContainer>
                                <MText variant="body3" fontWeight="bold">
                                    City
                                </MText>
                                <Spacer space="0 10px" />
                                <MText variant="body3" color="gray">
                                    {provider?.city}
                                </MText>
                            </SpaceTextContainer>
                        </Item>
                        <Item>
                            <Spacer space="24px" />
                            <SpaceTextContainer>
                                <MText variant="body3" fontWeight="bold">
                                    Phone number
                                </MText>
                                <Spacer space="0 10px" />
                                <MText variant="body3" color="gray">
                                    {provider?.phoneNumber}
                                </MText>
                            </SpaceTextContainer>
                            <SpaceTextContainer>
                                <MText variant="body3" fontWeight="bold">
                                    Secretary number
                                </MText>
                                <Spacer space="0 10px" />
                                <MText variant="body3" color="gray">
                                    {provider?.securityNumber}
                                </MText>
                            </SpaceTextContainer>
                            <SpaceTextContainer>
                                <MText variant="body3" fontWeight="bold">
                                    Insurance covered
                                </MText>
                                <Spacer space="0 2px" />
                                <MText variant="body3" color="gray">
                                    {provider?.insuranceCovered}
                                </MText>
                            </SpaceTextContainer>
                        </Item>
                    </FirstRow>
                </ProviderCardContainer>}
        </>
    );
}

export default ViewDetail;
