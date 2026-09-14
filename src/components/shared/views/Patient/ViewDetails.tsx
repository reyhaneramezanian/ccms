import { Spacer } from '@/components/base/spacer';
import styled from '@emotion/styled';
import { MText } from 'src/components/base/MText';
import dynamic from 'next/dynamic';
import { PatientDetailDto, PatientInput } from 'src/@types/patients.type';
import { getFullImageUrl } from '@/utils/helper/ui';
import { toTitleCase } from '@/utils/regex/regex';
const MMap = dynamic(() => import('@/components/base/map/map'), { ssr: false });

const ShortDetails = styled.div({
    display: 'flex',
    width: '100%',

});
const ShortDetailsText = styled.div({
    display: 'flex',
    flexDirection: 'column',
    width: '70%',
    paddingLeft: '10px',
    justifyContent: 'space-between'
});
const ContactContainer = styled.div({
    display: 'flex',
    alignItems: 'center',
    height: '100px',
    width: '100%',
    paddingLeft: '10px',
    justifyContent: 'space-between'
});
const ContactContent = styled.div({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '40px',
    width: '100%',
    paddingLeft: '10px',
    justifyContent: 'space-between'
});
const Avatar = styled.img({
    height: '100px',
    width: '100px',
    borderRadius: '50%',
});

const SpaceTextContainer = styled.div({
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap'
});

const DetailsContainer = styled.div(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',

}));
const ProfileContent = styled.div(({ theme }) => ({
    minHeight: '200px',
    padding: '10px',
    width: '35%',
    backgroundColor: 'white',
    borderRadius: theme.shape.borderRadius.common,
    boxShadow: theme.shadows.light,
    '@media(max-width:1200px)': {
        width: '100%',
    }
}));
const LocationContent = styled.div(({ theme }) => ({
    minHeight: '200px',
    width: '60%',
    borderRadius: theme.shape.borderRadius.common,
    boxShadow: theme.shadows.light,
    backgroundColor: 'white',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, 45%)',
    padding: '10px',
    justifyContent: 'space-between',
    gridGap: '10px',
    '@media(max-width:1200px)': {
        gridTemplateColumns: 'repeat(auto-fill, 100%)',
        width: '100%'
    }
}));
const AddressGrid = styled.div(({ theme }) => ({
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, 30%)',
}));
const LocationContainer = styled.div(({ theme }) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%'
}));

const getLocation = (data) => {
    try {
        return data.provider.locations[0]
    } catch {
        return null
    }
}

function ViewDetails({ data = {} as PatientDetailDto }: { data?: PatientDetailDto }) {
    const locations = getLocation(data)
    return (
        <DetailsContainer>
            <ProfileContent>
                <ShortDetails>
                    {data.photoUrl ? (
                        <Avatar src={getFullImageUrl(data.photoUrl)} />) :
                        (<Avatar src='/images/empty_profile.png' />)}


                    <ShortDetailsText>
                        <MText variant="body3" fontWeight="bold">
                            {data.firstName + ' ' + data.lastName}
                        </MText>
                        <SpaceTextContainer>
                            <MText variant="caption">
                                Point:
                            </MText>
                            <Spacer space="0 5px" />
                            <MText color="green" variant="caption">
                                {data?.pointCount || 0}
                            </MText>
                        </SpaceTextContainer>
                        <SpaceTextContainer>
                            <MText variant="caption" fontWeight="bold">
                                User ID:
                            </MText>
                            <Spacer space="0 5px" />
                            <MText color="gray" variant="caption">
                                {data.id}
                            </MText>
                            <Spacer space="0 5px" />
                            <MText variant="caption" fontWeight="bold">
                                Language
                            </MText>
                            <Spacer space="0 5px" />
                            <MText color="gray" variant="caption">
                                {toTitleCase(data.language)}
                            </MText>
                        </SpaceTextContainer>
                    </ShortDetailsText>

                </ShortDetails>

                <ContactContainer>
                    <SpaceTextContainer>
                        <MText variant="caption" fontWeight="bold">
                            Contact:
                        </MText>
                        <Spacer space="25px" />
                        <ContactContent>
                            <MText color="blue" variant="caption">
                                {data.mobile}
                            </MText>
                            <MText color="blue" variant="caption">
                                {data.email}
                            </MText>
                        </ContactContent>
                    </SpaceTextContainer>
                </ContactContainer>

            </ProfileContent>
            <Spacer space="10px 10px" />
            { locations &&
                <LocationContent>
                    <LocationContainer>
                        <MText variant="body2" fontWeight="bold">
                            Location
                        </MText>
                        <AddressGrid>
                            <div>
                                <MText variant="body2" fontWeight="bold">
                                    Country
                                </MText>
                                <MText variant="body2">
                                    {locations.country}
                                </MText>
                            </div>
                            <div>
                                <MText variant="body2" fontWeight="bold">
                                    City
                                </MText>
                                <MText variant="body2">
                                {locations.city}
                                </MText>
                            </div>
                            <div>
                                <MText variant="body2" fontWeight="bold">
                                    Province
                                </MText>
                                <MText variant="body2">
                                {locations.province}
                                </MText>
                            </div>
                        </AddressGrid>
                        <div>
                            <MText variant="caption" fontWeight="bold">
                                Address
                            </MText>
                            <Spacer space="3px" />
                            <MText variant="caption">
                            {locations.address}
                            </MText>
                        </div>
                    </LocationContainer>
                    <LocationContainer>
                        <MMap position={{ lat: 55, lng: 36 }} style={{ height: '160px' }} />
                    </LocationContainer>
                </LocationContent>
            }
        </DetailsContainer>
    )
}

export default ViewDetails
