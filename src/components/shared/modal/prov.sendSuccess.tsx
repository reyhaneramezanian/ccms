import { MModalContent, renderBackdrop } from '@/components/base/modal';
import SendSuccessModal from '@/components/base/modal/forget-password';
import { BaseModal } from '@/components/base/modal/styled';
import SuccessEmailModal from '@/components/base/modal/forget-password/successEmail';
import styled from '@emotion/styled';
import React, { createContext, useCallback, useContext } from 'react';

import { modalContextChecker, useModalState } from './useModal';

const SendSuccessModalContext = createContext({} as (show: boolean) => void);
const Modal = styled(BaseModal)({
    backgroundColor: 'transparent',
    boxShadow:'none'
});

export const SendSuccessModalProvider = ({ children }: AppCommonChild) => {
    const { show, handleShowModal, handleCloseModal } = useModalState();
    const handleModal = useCallback((show: boolean) => {
        if (show) {
            handleShowModal();
        } else {
            handleCloseModal();
        }
    }, []);

    return (
        <SendSuccessModalContext.Provider value={handleModal}>
            {children}
            <Modal
                max_width="xs"
                // sm="true"
                show={show}
                onBackdropClick={handleCloseModal}
                renderBackdrop={renderBackdrop}
                aria-labelledby="modal-label">
                <SuccessEmailModal />
            </Modal>
        </SendSuccessModalContext.Provider>
    );
};

export function useSendSuccessModal() {
    const handleShowModal = useContext(SendSuccessModalContext);
    modalContextChecker(handleShowModal);

    return handleShowModal;
}
