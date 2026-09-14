import { MText } from '@/components/base/MText';
import { Spacer } from '@/components/base/spacer';
import styled from '@emotion/styled';
import React from 'react'
import { ProviderSubscribePlanType } from 'src/@types/setting';
import SubscriptionSection from './Subscription/SubscriptionSection';

const HospitalSubscriptionSectionContainer = styled.div({
    width: '100%'
});
const HospitalSubscriptionSection = ({subscribePlans, providerId} : {subscribePlans : Array<ProviderSubscribePlanType>, providerId: number}) => {
    return (
        <HospitalSubscriptionSectionContainer>
            <MText fontWeight="bold">Subscription history</MText>
            <Spacer space="12px" />
            <SubscriptionSection providerId={providerId} subscribePlans={subscribePlans} />
        </HospitalSubscriptionSectionContainer >
    )
}

export default HospitalSubscriptionSection
