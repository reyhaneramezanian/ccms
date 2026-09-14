import { PrimarySpinner } from '@/components/base/loader/spinner';
import { renderBackdrop } from '@/components/base/modal';
import { BSModal } from '@/components/base/modal/styled';
import styled from '@emotion/styled';

const Modal = styled(BSModal)({
    backgroundColor: 'transparent'
});

export function ViewsLoading({ children, isLoading }: AppCommonChild & { isLoading: boolean }) {
    return (
        <>
            {isLoading && (
                <Modal
                    sm="true"
                    show={isLoading}
                    // renderBackdrop={renderBackdrop}
                    aria-labelledby="modal-label">
                    <PrimarySpinner />
                </Modal>
            )}
            {children}
        </>
    );
}
