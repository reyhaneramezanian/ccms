import ConfirmDeleteModal from '@/components/base/modal/confirm-delete';
import { FORGOT_MODAL_ID } from '@/components/base/modal/forget-password';
import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';
import { EditIcon } from 'src/assets/common/Pencil';
import { MButton } from 'src/components/base/MButton';
import { MText } from 'src/components/base/MText';
import { useDeactivateDoctor } from 'src/graphql/doctor/useDoctor';
import { useIsAdmin } from 'src/graphql/useAuthorization';
import { newModal } from 'src/redux/actions/actions';

const ActionButtonsContainer = styled.div({
    display: 'flex',
    justifyContent: 'flex-end'
});

const ButtonContainer = styled.div(({ isAdmin }: { isAdmin?: boolean }) => ({
    display: 'grid',
    gridTemplateColumns: isAdmin ? 'repeat(auto-fill, 30%)' : 'repeat(auto-fill, 45%)',
    justifyContent: 'space-between',
    width: '500px',
    alignItems: 'center'
    // backgroundColor: 'green'
}));
//TODO: this color should be in palette
const DeactiveButton = styled(MButton)(({ theme }) => ({
    width: '100%',
    backgroundColor: 'white',
    color: '#cc1010',
    padding: '0 0 3px 0',
    borderRadius: '5px',
    border: `2px solid #cc1010`,
    height: '30px'
}));
const RemoveButton = styled(DeactiveButton)(({ theme }) => ({
    backgroundColor: '#f5dddd'
}));
const EditButton = styled(DeactiveButton)(({ theme }) => ({
    color: theme.palette.primary['main'],
    backgroundColor: '#d4d3e3',
    border: `2px solid ${theme.palette.primary['main']}`
}));
const EditButtonText = styled(MText)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}));
const StyledPencil = styled(EditIcon)(({ theme }) => ({
    fill: theme.palette.primary['main'],
    transform: 'scale(0.7)'
}));

type ActionTypes = {
    deactiveAction: () => void;
    deleteAction: () => void;
    redirectAction: () => void;
    activeAction: () => void;
    isActivate: boolean;
};
function ActionButtons({
    deactiveAction,
    activeAction,
    deleteAction,
    redirectAction,
    isActivate
}: ActionTypes) {
    const dispatch = useDispatch();

    const isAdmin = useIsAdmin();
    return (
        <ActionButtonsContainer>
            <ButtonContainer isAdmin={isAdmin}>
                {isActivate ? (
                    <DeactiveButton
                        onClick={() => {
                            dispatch(
                                newModal({
                                    text: 'deactive',
                                    id: FORGOT_MODAL_ID,
                                    closeButton: true,
                                    Body: ConfirmDeleteModal,
                                    onSubmit: () => deactiveAction()
                                })
                            );
                        }}>
                        <MText variant="caption2" color="#cc1010" fontWeight="bold" align="center">
                            De-activate
                        </MText>
                    </DeactiveButton>
                ) : (
                    <DeactiveButton
                        onClick={() => {
                            dispatch(
                                newModal({
                                    text: 'active',
                                    id: FORGOT_MODAL_ID,
                                    closeButton: true,
                                    Body: ConfirmDeleteModal,
                                    onSubmit: () => activeAction()
                                })
                            );
                        }}>
                        <MText variant="caption2" color="#cc1010" fontWeight="bold" align="center">
                            Activate
                        </MText>
                    </DeactiveButton>
                )}
                {isAdmin && (
                    <RemoveButton
                        onClick={() => {
                            dispatch(
                                newModal({
                                    text: 'delete',
                                    id: FORGOT_MODAL_ID,
                                    closeButton: true,
                                    Body: ConfirmDeleteModal,
                                    onSubmit: () => deleteAction()
                                })
                            );
                        }}>
                        <MText variant="caption2" color="#cc1010" fontWeight="bold" align="center">
                            Remove
                        </MText>
                    </RemoveButton>
                )}
                <EditButton onClick={() => redirectAction()}>
                    <EditButtonText
                        variant="caption2"
                        palette="primary"
                        degree="main"
                        fontWeight="bold"
                        align="center">
                        <StyledPencil />
                        Edit Page
                    </EditButtonText>
                </EditButton>
            </ButtonContainer>
        </ActionButtonsContainer>
    );
}

export default ActionButtons;
