import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import { ModalCloseButton } from 'src/components/base/modal/modal.buttons';
import { Modal } from './types';
import {
    ModalBlur,
    MModalBodyContainer,
    ModalTitleBar,
    ModalTitle,
    ModalBlurWrapper
} from './styled';

var _modals = [],
    updateModal,
    isUpdateModalFunction = () => typeof updateModal === 'function',
    div;

export default function Modals() {
    const [modals, setModals] = useState(_modals);

    useEffect(() => {
        if (isUpdateModalFunction()) return;

        updateModal = function (modals) {
            setModals(modals);
        };

        div = document.createElement('div');
        document.body.appendChild(div);

        return () => {
            updateModal = undefined;
            document.body.removeChild(div);
        };
    }, []);

    const allModals = modals.map((modal, index) => <ModalComponent key={index} {...modal} />);

    return div ? createPortal(allModals, div) : <>{allModals}</>;
}

export function useModal() {
    function newModal<T>(modal: Modal & T) {
        if (!isUpdateModalFunction()) return;
        if (!modal.id) modal.id = `${Date.now()}-${_modals.length}`;

        _modals = [..._modals, modal];

        updateModal(_modals);
    }

    function closeModal(id: string | number) {
        if (!isUpdateModalFunction()) return;

        _modals = _modals.filter((modal) => modal.id !== id);

        updateModal(_modals);
    }

    return { newModal, closeModal };
}

function ModalComponent({
    Body,
    Container = MModalBodyContainer,
    title,
    id,
    closeButton,
    navbarModal,
    ...rest
}) {
    const { closeModal } = useModal();

    return (
        <ModalBlurWrapper id="modal-blur-wrapper" onClick={handleClickoOutside}>
            <ModalBlur
                top={navbarModal ? '55px' : '0'}
                id="modal-blur-component"
                onClick={handleClickoOutside}>
                <Container>
                    {(title || closeButton) && (
                        <ModalTitleBar>
                            <ModalTitle>{title ?? ''}</ModalTitle>
                            {closeButton && <ModalCloseButton handleCloseModal={handleClose} />}
                        </ModalTitleBar>
                    )}
                    <Body id={id} closeModal={handleClose} {...rest} />
                </Container>
            </ModalBlur>
        </ModalBlurWrapper>
    );

    function handleClose() {
        closeModal(id);
    }

    function handleClickoOutside(e) {
        if (['modal-blur-wrapper', 'modal-blur-component'].includes(e.target.id)) handleClose();
    }
}
