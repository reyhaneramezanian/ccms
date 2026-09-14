import styled from '@emotion/styled';

export const ModalBlur = styled.div(
    ({ top = 70, topBar = 'false' }: { top?: number | string; topBar?: string }) => ({
        position: 'absolute',
        top: topBar === 'true' ? 0 : 70,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
        border: '1px solid #707070',
        backdropFilter: 'blur(9px)',
        WebkitBackdropFilter: 'blur(9px)',
        zIndex: 10
    })
);

export const MModalBodyContainer = styled.div({
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff',
    boxShadow: '2px 2px 5px #ADADAD33',
    border: '0.5px solid #E0E0E0',
    borderRadius: '10px',
    minWidth: 50,
    minHeight: 50,
    padding: 15,
    maxHeight: '90%',
    overflowY: 'scroll',
    overflowX: 'hidden',
    ['@media (max-width:500px)']: {
        minWidth: '100%'
    }
});

export const ModalTitleBar = styled.div({
    display: 'flex',
    marginBottom: 10,
    '& > svg': {
        alignSelf: 'center',
        cursor: 'pointer',
        '&:hover path': {
            stroke: '#9f0b0b'
        }
    }
});

export const ModalTitle = styled.div({
    flex: 1,
    fontFamily: 'Poppins',
    fontSize: 18,
    marginTop: '20px'
    //margin: '0 0 0 5px'
    //fontWeight: 'bold'
});

export const ModalBlurWrapper = styled.div({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100
});
