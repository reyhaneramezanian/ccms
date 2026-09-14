import styled from '@emotion/styled';
import { PrimarySpinner } from './spinner';

const Container = styled.div({
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
});

export const AppLoadingPage = () => {
    return (
        <Container>
            <PrimarySpinner />
        </Container>
    );
};
export const AppOverlayLoadingPage = () => {
    return (
        <Container>
            <PrimarySpinner />
        </Container>
    );
};
