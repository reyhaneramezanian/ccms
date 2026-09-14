import { MText } from '@/components/base/MText';
import { Spacer } from '@/components/base/spacer';
import styled from '@emotion/styled';
import React, { useState } from 'react'
import { ProviderSubscribePlanType } from 'src/@types/setting';
import SubscriptionSection from '../Subscription/SubscriptionSection';
import Title from './Title';

const ProviderSubscriptionSectionContainer = styled.div({
    width: '100%'
});
const ProviderSubscriptionSection = ({ subscribePlans, providerId }:
    { subscribePlans?: Array<ProviderSubscribePlanType>, providerId?: number }) => {
    const [collapse, setCollapse] = useState(true)
    const handleCollapse = () => {

        setCollapse(!collapse)

    }
    
    return (
        <ProviderSubscriptionSectionContainer>

            <Title title="Subscription history" handleClick={handleCollapse} collapse={collapse} />
            {collapse &&
                <>
                    <Spacer space="12px" />
                    <SubscriptionSection
                        subscribePlans={subscribePlans}
                        providerId={providerId}
                    />
                </>}
        </ProviderSubscriptionSectionContainer>
    )
}

export default ProviderSubscriptionSection
