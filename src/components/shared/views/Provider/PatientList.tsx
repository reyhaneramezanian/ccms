import styled from '@emotion/styled';

import { Spacer } from 'src/components/base/spacer';
import shortid from 'shortid';

import { useState } from 'react';

import Title from './Title';
import { MText } from '@/components/base/MText';
import { MButton } from '@/components/base/MButton';
import { useGetPatientOfProvider } from 'src/graphql/patient/list/usePatientList';

//TODO: this shadow should be read from theam
const BaseCard = styled.div({
    boxShadow: '0px 0px 5px 2px #E6E6E6',
    width: '100%',
    borderRadius: '10px',
    padding: '20px',
    backgroundColor: 'white'
});
const PatientCardContainer = styled.div({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, 19%)',
    justifyContent: 'space-around',
    gridGap: '10px',
    overflowY: 'clip',
    overflowX: 'visible',
    '@media(max-width:1050px)': {
        gridTemplateColumns: 'repeat(auto-fill, 46%)'
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
    flex: '1',
    height: '100%'
});
const Avatar = styled.img({
    borderRadius: '50%',
    width: '60px',
    height: '60px'
});

function PatientList({ providerId }: { providerId: number }) {
    const [collapse, setCollapse] = useState(true);
    const [showMore, setShowMore] = useState(false);

    const { data, isLoading } = useGetPatientOfProvider({ providerId, take: 100 });

    const patients = data?.patient_getPatients?.result?.items || [];
    // const totalCount = data?.patient_getPatients?.result?.totalCount || 0

    const handleCollapse = () => {
        setCollapse(!collapse);
    };
    const handleShowMore = () => {
        setShowMore(!showMore);
    };
    let length = patients.length;
    return (
        <>
            <Title
                title={`All patient list (${length})`}
                handleClick={handleCollapse}
                collapse={collapse}
            />

            <Spacer space="12px" />
            {collapse && (
                <BaseCard>
                    <MText align="right">
                        <MButton onClick={handleShowMore}>
                            <MText color="#4090D0" fontWeight="bold">
                                {showMore ? <>Show Less</> : <>Show More</>}
                            </MText>
                        </MButton>
                    </MText>
                    <Spacer space="12px" />
                    <PatientCardContainer style={{ maxHeight: showMore ? '' : '80px' }}>
                        {patients &&
                            patients.map((item) => (
                                <RowItem
                                    key={shortid.generate()}
                                    avatar={item.photoUrl || '/images/empty_profile.png'}
                                    name={`${item.firstName} ${item.lastName}`}
                                />
                            ))}
                    </PatientCardContainer>
                </BaseCard>
            )}
        </>
    );
}

export default PatientList;

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
                    src={stateAvatar}
                />
            </AvatarContainer>
            <Spacer space="5px" />
            <MText variant="caption">{name}</MText>
        </Item>
    );
}
