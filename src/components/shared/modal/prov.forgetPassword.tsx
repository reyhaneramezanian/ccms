import { MModalContent, renderBackdrop } from '@/components/base/modal';
import ForgetPasswordModal from '@/components/base/modal/forget-password';
import { BaseModal } from '@/components/base/modal/styled';

import React, { createContext, useCallback, useContext } from 'react';
import { SendSuccessModalProvider } from './prov.sendSuccess';

import { modalContextChecker, useModalState } from './useModal';

const ForgetPasswordModalContext = createContext({} as (show: boolean) => void);

export const ForgetPasswordModalProvider = ({ children }: AppCommonChild) => {
    const { show, handleShowModal, handleCloseModal } = useModalState();
    const handleModal = useCallback((show: boolean) => {
        if (show) {
            handleShowModal();
        } else {
            handleCloseModal();
        }
    }, []);

    return (
        <SendSuccessModalProvider>
            <ForgetPasswordModalContext.Provider value={handleModal}>
                {children}
                <BaseModal
                    max_width="xs"
                    // sm="true"
                    show={show}
                    onBackdropClick={handleCloseModal}
                    renderBackdrop={renderBackdrop}
                    aria-labelledby="modal-label">
                    <ForgetPasswordModal handleCloseModal={handleCloseModal} />
                </BaseModal>
            </ForgetPasswordModalContext.Provider>
        </SendSuccessModalProvider>
    );
};

export function useForgetPasswordModal() {
    const handleShowModal = useContext(ForgetPasswordModalContext);
    modalContextChecker(handleShowModal);

    return handleShowModal;
}
