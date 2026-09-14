import { MText } from '@/components/base/MText';
import styled from '@emotion/styled';
import { ProviderArrowIcon } from 'src/assets/common/ProviderArrowIcon';
import { useState } from 'react';

const TitleContainer = styled.div({
    justifyContent: 'space-between',
    display: 'flex'
});

const StyledProviderArrowIcon = styled(ProviderArrowIcon)({
    transform: 'scale(0.7)'
});

const ProviderArrowIconContainer = styled.div({
    cursor: 'pointer',
});


function Title({ title, handleClick, collapse }: { title: string, handleClick: () => void, collapse: boolean }) {

    return (
        <TitleContainer>
            <MText variant="h5" fontWeight="bold">
                {title}
            </MText>
            <ProviderArrowIconContainer>
                { collapse ? (<StyledProviderArrowIcon onClick={handleClick} />) : 
                (<StyledProviderArrowIcon onClick={handleClick} style={{transform: 'rotate(-180deg) scale(0.7)'}}/>)
                }
                
            </ProviderArrowIconContainer>
        </TitleContainer>
    )
}

export default Title
