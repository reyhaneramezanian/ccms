import styled from '@emotion/styled';
import { MText } from 'src/components/base/MText';
import shortid from 'shortid';
import { Spacer } from 'src/components/base/spacer';
import { useState } from 'react';
import { HospitalProviderDto } from 'src/@types/hospital.type';
import { getFullImageUrl } from '@/utils/helper/ui';

const FacilitiesCardContainer = styled.div({
    width: '100%'
});
const FacilitiesBaseCard = styled.div({
    boxShadow: '0px 0px 5px 2px #E6E6E6',
    padding: '30px',
    width: '100%',
    backgroundColor: 'white',
    borderRadius: '5px'
});
//TODO: scroll needs to be styled.
const Table = styled.div({
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, 45%)',
    justifyContent: 'revert',
    gridGap: '10px',
    maxHeight: '350px',
    overflow: 'auto',
    alignItems: 'flex-start',
    '@media(max-width:1050px)': {
        gridTemplateColumns: 'repeat(auto-fill, 90%)'
    }
});

const Item = styled.div({
    boxShadow: '0px 0px 5px 2px #E6E6E6',
    borderRadius: '5px',
    margin: '5px',
    padding: '5px',
    paddingRight: '20px',
    display: 'flex',
    width: '100%',
    height: '70px',
    alignItems: 'center'
});
const AvatarContainer = styled.div({
    height: '100%'
});
const Avatar = styled.img({
    borderRadius: '50%',
    height: '60px',
    width: '60px'
});
function FacilityCard({ title, data }: { title: string; data: Array<HospitalProviderDto> }) {
    return (
        <FacilitiesCardContainer>
            <MText fontWeight="bold">{title} List</MText>
            <Spacer space="5px" />
            <FacilitiesBaseCard>
                <Table>
                    {data.map((item) => (
                        <RowItem
                            key={shortid.generate()}
                            avatar={item.photoUrl}
                            name={`${item.firstName || ''} ${item.lastName || ''}`}
                        />
                    ))}
                </Table>
            </FacilitiesBaseCard>
        </FacilitiesCardContainer>
    );
}

function RowItem({ avatar, name }: { avatar: string; name: string }) {
    const [stateAvatar, setStateAvatar] = useState(avatar);
    return (
        <Item key={shortid.generate()}>
            <AvatarContainer>
                <Avatar
                    width="60px"
                    height="60px"
                    onError={(e) => {
                        setStateAvatar('/images/empty_profile.png');
                    }}
                    src={avatar ? getFullImageUrl(avatar): '/images/empty_profile.png'}
                />
            </AvatarContainer>
            <Spacer space="5px" />
            <MText variant="caption">{name}</MText>
        </Item>
    );
}

export default FacilityCard;
