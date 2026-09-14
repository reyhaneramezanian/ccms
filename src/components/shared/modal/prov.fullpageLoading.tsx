
import { PrimarySpinner, } from '@/components/base/loader/spinner';
import { renderBackdrop } from '@/components/base/modal';
import { BSModal } from '@/components/base/modal/styled';

import React, { createContext, useCallback, useContext } from 'react';
import styled from '@emotion/styled';
import { modalContextChecker, useModalState } from './useModal';
const Modal = styled(BSModal)({
    backgroundColor: 'transparent'
});
const LoadingModalContext = createContext({} as (show: boolean) => void);

export const ModalFullscreenLoader = ({ children }: AppCommonChild) => {
    const { show, handleShowModal, handleCloseModal } = useModalState();
    const handleModal = useCallback((show: boolean) => {
        if (show) {
            handleShowModal();
        } else {
            handleCloseModal();
        }
    }, []);
    return (
        <LoadingModalContext.Provider value={handleModal}>
            {children}
            <Modal
                sm="true"
                show={show}
                renderBackdrop={renderBackdrop}
                aria-labelledby="modal-label">
                <PrimarySpinner />
            </Modal>
        </LoadingModalContext.Provider>
    );
};

export function useFullscreenLoader() {
    const handleShowModal = useContext(LoadingModalContext);
    modalContextChecker(handleShowModal);

    return handleShowModal;
}
