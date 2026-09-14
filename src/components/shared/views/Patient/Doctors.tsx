import styled from '@emotion/styled';
import shortid from 'shortid';
import { MText } from '@/components/base/MText';
import { Spacer } from '@/components/base/spacer';
import { useState } from 'react';
import { MButton } from '@/components/base/MButton';
import { AppoinmentData } from './AppoinmentData';
import { useGetDoctorsOfPatient } from 'src/graphql/doctor/useDoctor';
import { getFullImageUrl } from '@/utils/helper/ui';
const AppointmentsContainer = styled.div({
    width: '100%'
});

const BaseCard = styled.div(({ theme }) => ({
    boxShadow: theme.shadows.light,
    width: '100%',
    borderRadius: '10px',
    padding: '20px',
    backgroundColor: 'white',

}));
const RowContainer = styled.div(({ theme }) => ({
    display: 'flex',
    width: '100%'
}));


const AppointmentCardContainer = styled.div({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, 17%)',
    justifyContent: 'space-around',
    gridGap: '10px',
    paddingTop: '10px',
    overflowY: 'clip',
    overflowX: 'visible',
    '@media(max-width:1050px)': {
        gridTemplateColumns: 'repeat(auto-fill, 46%)'
    }
});

export const getProviderItem = (item: any) => {

    if (item?.providerName == 'DOCTOR') return item.doctor

    if (item?.providerName == 'DENTIST') return item.dentist

    if (item?.providerName == 'NUTRITION_EXPERT') return item.nutritionExpert

    return ''
}

function Doctors(
    { userId }: { userId: number }
) {
    const { data, isLoading } = useGetDoctorsOfPatient(
        {

            userId: userId,
            take: 50,
        }
    );

    const doctors = data?.patient_getDoctorsOfPatient?.result?.items
    const [showMore, setShowMore] = useState(false)

    const handleShowMore = () => {

        setShowMore(!showMore)

    }

    return (
        <AppointmentsContainer>
            <MText fontWeight="bold" variant="h6">Doctors</MText>
            <Spacer space="12px" />

            <BaseCard>
                <RowContainer>
                    <MButton style={{ marginLeft: 'auto' }} onClick={handleShowMore}>
                        <MText color="#4090D0" fontWeight="bold">
                            {showMore ? (<>Show Less</>) : (<>Show More</>)}
                        </MText>
                    </MButton>

                </RowContainer>
                <Spacer space="12px" />
                <AppointmentCardContainer
                    style={{ maxHeight: showMore ? '' : '90px' }}
                >

                    {doctors && doctors.map((item) => {
                        const provider = getProviderItem(item)
                        return (
                            <RowItem
                                key={shortid.generate()}
                                avatar={getFullImageUrl(provider.photoUrl)}
                                name={`${provider.firstName} ${provider.lastName}`}
                            />
                        )
                    }
                    )}

                </AppointmentCardContainer>
            </BaseCard>
        </AppointmentsContainer>
    );
}

export default Doctors;

const AppointmentCard = styled.div(({ theme }) => ({
    boxShadow: theme.shadows.light,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    borderRadius: theme.shape.borderRadius.common

}));


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
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
});
const Avatar = styled.img({
    borderRadius: '50%',
    height: '50px',
    width: '50px'
});

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