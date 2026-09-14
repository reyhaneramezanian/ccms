import styled from '@emotion/styled';
import { Button } from '@mui/material';

export const Flex = styled.div(({ gap = 20 }: { gap?: number }) => ({
    display: 'flex',
    margin: 'auto 0',
    gap
}));

export const Flex1 = styled.div({ flex: 1 });

export const PriceContainer = styled.div({
    backgroundColor: 'white',
    width: '100px',
    boxShadow: '1px 3px 8px #A8A8A8',
    textAlign: 'center'
});

export const SessionInfoContainer = styled(Flex1)({
    padding: '10px 5px',
    display: 'flex',
    flexDirection: 'column'
});

export const SessionDetailsContainer = styled.div({
    padding: '30px',
    maxWidth: '1500px',
    margin: 'auto'
});

export const SessionRow = styled(Flex)({
    '&:not(:first-of-type)': {
        marginTop: '30px'
    },
    '@media (max-width: 1150px)': {
        flexDirection: 'column'
    }
});

export const SessionTimeContainer = styled.div({
    backgroundColor: '#F5F8FC',
    borderRadius: '15px',
    boxShadow: '0 0 5px #ccc',
    width: '500px',
    height: '450px',
    padding: '20px',
    '@media (max-width: 1150px)': {
        width: 'unset'
    }
});

export const HealerImage = styled.img({
    width: '450px',
    objectFit: 'cover',
    borderRadius: '15px',
    '@media (max-width: 1150px)': {
        width: '100%',
        height: '350px'
    }
});

export const SignButton = styled(Button)({
    borderRadius: '15px',
    backgroundColor: '#E3E3E3',
    margin: 'auto',
    display: 'block',
    width: '250px',
    marginTop: '15px'
});

export const DateWrapper = styled(Flex)({
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
    padding: '10px 20px',
    borderRadius: '15px',
    flex: 1,
    overflow: 'hidden'
});

export const SessionsContainer = styled(Flex)({ overflow: 'auto', padding: '10px 0' });

export const SessionTimes = styled.div({
    maxWidth: '400px',
    display: 'flex',
    flexWrap: 'wrap',
    padding: '20px 0',
    gap: '15px'
});

export const SessionTimeItem = styled.div({
    width: '100px',
    height: '50px',
    borderRadius: '15px',
    border: '3px solid #CECCCC',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
});
