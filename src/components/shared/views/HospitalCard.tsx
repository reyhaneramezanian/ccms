import styled from '@emotion/styled';
import { DoubleCardIcon } from 'src/assets/common/DoubleCardIcon';
import { MText } from 'src/components/base/MText';
import { Spacer } from 'src/components/base/spacer';
import { HospitalBaseInput_Input } from 'src/@types/hospital.type';
import { getFullImageUrl } from '@/utils/helper/ui';
import { separateSubscribeItems } from 'src/graphql/shared/useGetPlans';

//TODO: this shadow should be read from theam
const HospitalCardContainer = styled.div({
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
    width: '100%'
    // height: '200px',
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
    flex: '30%',
    minWidth: '150px',
    height: '100px'
});
const BottomSectionBody = styled.div({
    flex: '70%',
    display: 'flex',
    justifyContent: 'space-between',
    border: '1px solid black',
    borderRadius: '10px',
    padding: '5px'
});

const Item2 = styled.div({
    width: '30%',
    textAlign: 'center',
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

function HospitalCard({
    id,
    hospital = {} as HospitalBaseInput_Input,
}: {
    hospital?: HospitalBaseInput_Input;
    id: number;
}) {

    return (
        <HospitalCardContainer>
            <FirstRow>
                <Item>
                    <StyledImage alt="alt image" src={getFullImageUrl(hospital.photoUrl)} />
                </Item>
                <Item>
                    <MText fontWeight="bold">{hospital.title}</MText>
                    <Spacer space="10px" />
                    <SpaceTextContainer>
                        <MText>ID</MText>
                        <Spacer space="0 5px" />
                        <MText variant="caption2">{id}</MText>
                        <Spacer space="0 5px" />
                        <DoubleCardIcon
                            width="24"
                            height="22"
                            style={{
                                transform: 'scale(0.7)'
                            }}
                            onClick={() => {
                                navigator.clipboard.writeText(id.toString());
                            }}
                        />
                    </SpaceTextContainer>
                    <Spacer space="10px" />
                    <SpaceTextContainer>
                        <MText fontWeight="bold">Tel number</MText>
                        <Spacer space="0 10px" />
                        <MText variant="caption2">{hospital.telNumber}</MText>
                    </SpaceTextContainer>
                </Item>
                <Item>
                    <MText fontWeight="bold">Account</MText>
                    <Spacer space="10px" />
                    <MText variant="caption">{hospital.userName}</MText>
                    <Spacer space="10px" />
                    <EmailContainer>
                        <MText variant="caption">{hospital.email}</MText>
                    </EmailContainer>
                    <Spacer space="10px" />
                    <MText fontWeight="bold">About Hospital</MText>
                    <MText variant="caption">{hospital.about}</MText>
                </Item>
            </FirstRow>
        </HospitalCardContainer>
    );
}

export default HospitalCard;
