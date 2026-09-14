import styled from '@emotion/styled';
import React from 'react';
import { CloseBulkIcon } from 'src/assets/common/CloseIcon';
import { MButton } from '../MButton';
import { MText } from '../MText';

import { Backdrop, SModalTitle } from './styled';

export const renderBackdrop = (props: any) => <Backdrop {...props} />;

const IconButton = styled(MButton)({
    alignSelf: 'flex-end'
});

export const CCModalHeader = ({
    children,
    title,
    closeModal,
    WrapperComponent = SModalTitle
}: Partial<AppCommonChild> & {
    title?: string;
    closeModal: () => void;
    WrapperComponent?: AppStyledComponent<any>;
}) => {
    return (
        <WrapperComponent>
            <IconButton onClick={closeModal}>
                <CloseBulkIcon width={36} height={36} />
            </IconButton>
            {children ? (
                children
            ) : (
                <MText variant="h4" fontWeight="bold">
                    {title}
                </MText>
            )}
        </WrapperComponent>
    );
};

const StyledIcone = styled.img({
    width: '10px',
    height: '10px',
    position: 'absolute',
    right: '10px',
    top: '10px',
    cursor: 'pointer'
    // backgroundColor: 'green'
});

const Content = styled.div({
    overflow: 'auto',
    maxHeight: '200px',
    margin: '10px'
});

export const Title = styled(MText)(({}) => ({
    fontWeight: 'bold',
    padding: '10px'
}));

const Center = styled.div({
    margin: 'auto',
    width: '100px'
});

export const MModalContent = (props) => {
    return (
        <>
            {props.hasClose && (
                <StyledIcone src="/images/icons/cross.png" onClick={props.handleClose} />
            )}
            <Title>{props.title}</Title>
            <Content>{props.children}</Content>
            {props.hasSubmit && (
                <Center>
                    <MButton palette={'primary'} degree={'main'}>
                        <MText color="white">Submit</MText>
                    </MButton>
                </Center>
            )}
        </>
    );
};
