import { MModalContent, renderBackdrop } from '@/components/base/modal';
import SendSuccessModal from '@/components/base/modal/forget-password';
import { BaseModal } from '@/components/base/modal/styled';
import SuccessEmailModal from '@/components/base/modal/forget-password/successEmail';
import styled from '@emotion/styled';
import React, { createContext, useCallback, useContext } from 'react';

import { modalContextChecker, useModalState } from './useModal';
import DownloadTemplateModal from '@/components/base/modal/download-template';

const ImportFileModalContext = createContext({} as (show: boolean) => void);
const Modal = styled(BaseModal)({
    backgroundColor: 'transparent',
    boxShadow:'none'
});

export const ImportFileModalProvider = ({ children }: AppCommonChild) => {
    const { show, handleShowModal, handleCloseModal } = useModalState();
    const handleModal = useCallback((show: boolean) => {
        if (show) {
            handleShowModal();
        } else {
            handleCloseModal();
        }
    }, []);

    return (
        <ImportFileModalContext.Provider value={handleModal}>
            {children}
            <Modal
                max_width="xs"
                // sm="true"
                show={show}
                onBackdropClick={handleCloseModal}
                renderBackdrop={renderBackdrop}
                aria-labelledby="modal-label">
                <DownloadTemplateModal />
            </Modal>
        </ImportFileModalContext.Provider>
    );
};

export function useImportFileModal() {
    const handleShowModal = useContext(ImportFileModalContext);
    modalContextChecker(handleShowModal);

    return handleShowModal;
}
