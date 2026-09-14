import { closeModal } from 'src/redux/actions/actions';
import { connect } from 'react-redux';
import { ModalCloseButton } from 'src/components/base/modal/modal.buttons';
import {
    ModalBlur,
    MModalBodyContainer,
    ModalTitleBar,
    ModalTitle,
    ModalBlurWrapper
} from './styled.modals';

function Modals({ modals, closeModal }) {
    return modals.map((modal, index) => (
        <ModalComponent key={index} closeModal={closeModal} {...modal} />
    ));
}

function ModalComponent({
    Body,
    Container = MModalBodyContainer,
    title,
    id,
    topBar,
    closeButton,
    closeModal,
    isNotCloseModal,
    ...rest
}) {
    return (
        <ModalBlurWrapper id="modal-blur-wrapper" onClick={handleClickoOutside}>
            <ModalBlur
                id="modal-blur-component"
                onClick={handleClickoOutside}
                topBar={String(topBar)}>
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
        if (isNotCloseModal) return;

        if (['modal-blur-wrapper', 'modal-blur-component'].includes(e.target.id)) handleClose();
    }
}

const mapStateToProps = ({ modals }) => ({ modals });

const mapDispatchToProps = { closeModal };

export default connect(mapStateToProps, mapDispatchToProps)(Modals);
