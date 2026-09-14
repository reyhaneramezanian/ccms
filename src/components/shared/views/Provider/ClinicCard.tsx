import styled from '@emotion/styled';
import { MText } from 'src/components/base/MText';
import { Spacer } from 'src/components/base/spacer';
import dynamic from 'next/dynamic';
import { HospitalBaseInput_Input, WorkingTimeDto } from 'src/@types/hospital.type';
import { LocationInput_InputType } from 'src/@types/location';
import { getFullImageUrl } from '@/utils/helper/ui';
import { toTitleCase } from '@/utils/regex/regex';

import shortid from 'shortid';

const MMap = dynamic(() => import('@/components/base/map/map'), { ssr: false });

//TODO: this shadow should be read from theam
const CardContainer = styled.div({
    boxShadow: '0px 0px 5px 2px #E6E6E6',
    width: '100%',
    borderRadius: '10px',
    padding: '20px',
    backgroundColor: 'white'
});
const ClinicRow = styled.div({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, 33%)',
    justifyContent: 'space-between',
    // backgroundColor: 'green',
    minWidth: '300px'
});
const FirstRow = styled.div({
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, 49%)',
    justifyContent: 'space-between',
    gridGap: '10px',
    overflow: 'hidden',
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

const PhotoContainer = styled.div({
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, 24%)',
    justifyContent: 'space-between',
    gridGap: '10px',
    overflow: 'hidden',
    '@media(max-width:1050px)': {
        gridTemplateColumns: 'repeat(auto-fill, 48%)'
    },
});

const ClinicPhotoItem = styled.img({
    borderRadius: '10px',
    width: '100%',
    height: '200px'
})

function ClinicCard({
    clinic,
    locations,
    clinicPhotos
    // hospital = {} as HospitalBaseInput_Input,
    // locations,
    // workingTimes
}
    // : 
    // {
    //     hospital: HospitalBaseInput_Input;
    //     locations: Array<LocationInput_Input>;
    //     workingTimes: Array<WorkingTimeDto>;
    // }
) {

    const location = (locations?.[0] || {}) as LocationInput_InputType;
    const [lat = 0, lng = 0] = (location.positionOnMap || '').split(',').map(Number);
    return (
        
        <>
            <MText variant="h6" fontWeight="bold">
                Clinic
            </MText>
            <Spacer space="12px" />
            <CardContainer>
                <FirstRow>
                    <Item>
                        <MText variant="body3" fontWeight="bold">
                        {clinic[0].clinicName}
                        </MText>
                        <SpaceTextContainer>
                            <MText variant="body3" fontWeight="bold">
                                Working hours
                            </MText>
                            <Spacer space="0 10px" />
                            <div>
                            {clinic.map((item) => (
                                        <ClinicRow key={shortid.generate()}>
                                            <MText variant="body3" color="gray">{toTitleCase(item.dayOfWeek)}</MText>
                                            <SpaceTextContainer>
                                                <MText variant="body3">Start</MText>
                                                <Spacer space="5px" />
                                                <MText variant="body3" color="gray">{item.startHoure}</MText>
                                            </SpaceTextContainer>
                                            <SpaceTextContainer>
                                                <MText variant="body3">End</MText>
                                                <Spacer space="5px" />
                                                <MText variant="body3" color="gray">{item.endHoure}</MText>
                                            </SpaceTextContainer>
                                        </ClinicRow>

                                    ))}
                            </div>
                        </SpaceTextContainer>
                        <SpaceTextContainer>
                            <MText variant="body3" fontWeight="bold">
                                Fax
                            </MText>
                            <Spacer space="0 10px" />
                            <MText variant="body3" color="gray">
                                {/* {hospital?.fax} */}
                                +964 12345678
                            </MText>
                        </SpaceTextContainer>
                        <SpaceTextContainer>
                            <MText variant="body3" fontWeight="bold">
                                Email
                            </MText>
                            <Spacer space="0 10px" />
                            <MText variant="body3" color="gray">
                                {/* {hospital?.email} */}
                                Email@yyy.com
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
                                {toTitleCase(location.country)}
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
                                {/* {location.address} */}
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
                            <MMap position={{ lat, lng }} style={{height: '200px'}} />
                        </LastSpaceTextContainer>
                    </Item>
                </FirstRow>
            </CardContainer>
            <Spacer space="10px" />
            <PhotoContainer>
            {clinicPhotos && clinicPhotos.length > 0 && clinicPhotos.map((item: any) => (<ClinicPhotoItem src={getFullImageUrl(item?.photoUrl)} key={shortid.generate()}/>)) }
            </PhotoContainer>
        </>
    );
}

export default ClinicCard;