import styled from '@emotion/styled';
import { MText } from 'src/components/base/MText';
import { Spacer } from 'src/components/base/spacer';
import { LocationInput_InputType } from 'src/@types/location';
import dynamic from 'next/dynamic';
import { HospitalBaseInput_Input, WorkingTimeDto } from 'src/@types/hospital.type';

const MMap = dynamic(() => import('@/components/base/map/map'), { ssr: false });

//TODO: this shadow should be read from theam
const CardContainer = styled.div({
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
    // overflow: 'hidden',
    '@media(max-width:1280px)': {
        gridTemplateColumns: 'repeat(auto-fill, 42%)'
    },
    '@media(max-width:1050px)': {
        gridTemplateColumns: 'repeat(auto-fill, 98%)'
    }
});
const Item = styled.div({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '220px'
});
const StyledImage = styled.img({
    height: '200px',
    width: '200px'
});
const SpaceTextContainer = styled.div({
    display: 'flex',
    alignItems: 'center'
});
const LastSpaceTextContainer = styled(SpaceTextContainer)({
    alignItems: 'flex-start'
});

function WorkSpace({
    hospital = {} as HospitalBaseInput_Input,
    locations,
    workingTimes
}: {
    hospital: HospitalBaseInput_Input;
    locations: Array<LocationInput_InputType>;
    workingTimes: Array<WorkingTimeDto>;
}) {
    const location = (locations?.[0] || {}) as LocationInput_InputType;
    const [lat = 0, lng = 0] = (location.positionOnMap || '').split(',').map(Number);
    const workingTime = (workingTimes?.[0] || {}) as WorkingTimeDto;

    return (
        <>
            <MText variant="h4" fontWeight="bold">
                Workspace
            </MText>
            <Spacer space="24px" />
            <CardContainer>
                <FirstRow>
                    <Item>
                        <SpaceTextContainer>
                            <MText variant="body3" fontWeight="bold">
                                Working days
                            </MText>
                            <Spacer space="0 5px" />
                            <MText variant="body3" color="gray">
                                {workingTime.dayOfWeek}
                            </MText>
                        </SpaceTextContainer>
                        <SpaceTextContainer>
                            <MText variant="body3" fontWeight="bold">
                                Working hours
                            </MText>
                            <Spacer space="0 10px" />
                            <div>
                                <SpaceTextContainer>
                                    <MText variant="body3">start</MText>
                                    <Spacer space="0 5px" />
                                    <MText variant="body3" color="gray">
                                        {workingTime.startHoure}
                                    </MText>
                                </SpaceTextContainer>
                                <SpaceTextContainer>
                                    <MText variant="body3">end</MText>
                                    <Spacer space="0 5px" />
                                    <MText variant="body3" color="gray">
                                        {workingTime.endHoure}
                                    </MText>
                                </SpaceTextContainer>
                            </div>
                        </SpaceTextContainer>
                        <SpaceTextContainer>
                            <MText variant="body3" fontWeight="bold">
                                Fax
                            </MText>
                            <Spacer space="0 10px" />
                            <MText variant="body3" color="gray">
                                {hospital?.fax}
                            </MText>
                        </SpaceTextContainer>
                        <SpaceTextContainer>
                            <MText variant="body3" fontWeight="bold">
                                Email
                            </MText>
                            <Spacer space="0 10px" />
                            <MText variant="body3" color="gray">
                                {hospital?.email}
                            </MText>
                        </SpaceTextContainer>
                    </Item>
                    <Item>
                        <SpaceTextContainer>
                            <MText variant="body3" fontWeight="bold">
                                Country
                            </MText>
                            <Spacer space="0 5px" />
                            <MText variant="body3" color="gray">
                                {location.country}
                            </MText>
                        </SpaceTextContainer>
                        <SpaceTextContainer>
                            <MText variant="body3" fontWeight="bold">
                                Province
                            </MText>
                            <Spacer space="0 10px" />
                            <MText variant="body3" color="gray">
                                {location.governorate}
                            </MText>
                        </SpaceTextContainer>
                        <SpaceTextContainer>
                            <MText variant="body3" fontWeight="bold">
                                City
                            </MText>
                            <Spacer space="0 10px" />
                            <MText variant="body3" color="gray">
                                {location.city}
                            </MText>
                        </SpaceTextContainer>
                        <SpaceTextContainer>
                            <MText variant="body3" fontWeight="bold">
                                Address
                            </MText>
                            <Spacer space="0 10px" />
                            <MText variant="body3" color="gray">
                                {location.address}
                            </MText>
                        </SpaceTextContainer>
                    </Item>
                    <Item>
                        <LastSpaceTextContainer style={{ alignItems: '' }}>
                            <MText variant="body3" fontWeight="bold">
                                Map
                            </MText>
                            <Spacer space="0 5px" />
                            <MMap style={{height: '200px'}} position={{ lat, lng }} />
                        </LastSpaceTextContainer>
                    </Item>
                </FirstRow>
            </CardContainer>
        </>
    );
}

export default WorkSpace;
