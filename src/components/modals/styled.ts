import styled from '@emotion/styled';

export const ModalBlur = styled.div(({ top = 0 }: { top?: number | string }) => ({
    position: 'absolute',
    top,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    border: '1px solid #707070',
    backdropFilter: 'blur(9px)',
    WebkitBackdropFilter: 'blur(9px)',
    zIndex: 10
}));

export const MModalBodyContainer = styled.div({
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#F8F8F8',
    boxShadow: '2px 2px 5px #ADADAD33',
    border: '0.5px solid #E0E0E0',
    borderRadius: '10px',
    minWidth: 50,
    minHeight: 50,
    padding: 15
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
    fontWeight: 'bold'
});

export const ModalBlurWrapper = styled.div({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100
});
