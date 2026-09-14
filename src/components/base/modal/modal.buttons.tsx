import React from 'react';
import styled from '@emotion/styled';
import { MButton } from '../MButton';
import { MText } from '../MText';

import { CloseIcon } from 'src/assets/common/CloseIcon';
import { MButtonProps } from '../MButton/types.button';

const ActionButton = styled(MButton)(({ theme }) => ({
    backgroundColor: theme.palette.primary['main'],
    color: 'white',
    borderRadius: '5px',
    width: '100%',
    alignSelf: 'flex-end',
    padding: 4
}));
const CanselButton = styled(MButton)(({ theme }) => ({
    // flex: '1',
    width: '100%',
    backgroundColor: 'white',
    color: theme.palette.primary['main'],
    padding: 4
    // borderRadius: '5px',
    // border: `2px solid ${theme.palette.primary['main']}`
}));

export const ModalActionButton = ({
    children,
    ...props
}: { children: React.ReactNode } & MButtonProps) => {
    return (
        <ActionButton type="submit" containerStyle={{ width: '100%' }} {...props}>
            <MText color="#D6E1FF" fontWeight="bold" align="center">
                {children}
            </MText>
        </ActionButton>
    );
};

export const ModalSecondaryButton = ({
    children,
    onClick
}: {
    children: React.ReactNode;
    onClick?: () => void;
}) => {
    return (
        <CanselButton
            hoverEffect="none"
            palette="primary"
            degree="main"
            variant="outlined"
            onClick={onClick}>
            <MText
                color="inherit"
                fontWeight="bold"
                align="center"
                style={{ whiteSpace: 'nowrap' }}>
                {children}
            </MText>
        </CanselButton>
    );
};

const StyledCloseIcon = styled(CloseIcon)(({ theme }) => ({
    position: 'absolute',
    top: '10px',
    right: '10px',
    cursor: 'pointer'
}));
export const ModalCloseButton = ({ handleCloseModal }: { handleCloseModal: (e: any) => void }) => {
    return <StyledCloseIcon onClick={handleCloseModal} />;
};

const InviteButton = styled(MButton)(({ theme }) => ({
    // flex: '1',
    backgroundColor: 'white',
    color: theme.palette.primary['main'],
    padding: '2px',
    borderRadius: '5px',
    border: `2px solid ${theme.palette.primary['main']}`
}));

export const ModalInviteButton = ({ children }: { children: React.ReactNode }) => {
    return (
        <InviteButton>
            <MText
                palette="primary"
                degree="main"
                fontWeight="bold"
                variant="caption2"
                align="center">
                {children}
            </MText>
        </InviteButton>
    );
};

const ConfirmButton = styled(MButton)(({ theme }) => ({
    backgroundColor: theme.palette.primary['main'],
    color: 'white',
    padding: '2px',
    borderRadius: '5px'
}));

export const ModalConfirmButton = ({
    children,
    handleCloseModal
}: {
    children: React.ReactNode;
    handleCloseModal: () => void;
}) => {
    return (
        <ConfirmButton onClick={handleCloseModal}>
            <MText color="white" fontWeight="bold" variant="caption2" align="center">
                {children}
            </MText>
        </ConfirmButton>
    );
};
