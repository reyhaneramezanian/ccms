import ConfirmDeleteModal from '@/components/base/modal/confirm-delete';
import { FORGOT_MODAL_ID } from '@/components/base/modal/forget-password';
import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';
import { EditIcon } from 'src/assets/common/Pencil';
import { MButton } from 'src/components/base/MButton';
import { MText } from 'src/components/base/MText';
import { useDeleteHospital, useDeactivateHospital } from 'src/graphql/hospital/useHospital';
import { newModal } from 'src/redux/actions/actions';
import { useRedirectToPage } from 'src/routes';

const TitleContainer = styled.div({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, 48%)',
    justifyContent: 'space-between',
    gridGap: '10px',
    '@media(max-width:1000px)': {
        gridTemplateColumns: 'repeat(auto-fill, 98%)'
    }
});

const ButtonContainer = styled.div({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
    // backgroundColor: 'green'
});
//TODO: this color should be in palette
const DeactiveButton = styled(MButton)(({ theme }) => ({
    width: '48%',
    backgroundColor: 'white',
    color: '#cc1010',
    padding: '0 0 3px 0',
    borderRadius: '5px',
    border: `2px solid #cc1010`
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
    transform: 'scale(0.8)'
}));

type ActionTypes = {
    deactiveAction: () => void;
    deleteAction: () => void;
    activeAction: () => void;
    isActive: boolean
}
function Title(
    { deactiveAction, activeAction, deleteAction, isActive }: ActionTypes
) {
    const dispatch = useDispatch();
    return (
        <TitleContainer>
            <MText variant="h4" fontWeight="bold">
                View details
            </MText>
            <ButtonContainer>
                {isActive ? (
                    <DeactiveButton
                        onClick={() => {
                            dispatch(
                                newModal({
                                    text: 'deactive',
                                    id: FORGOT_MODAL_ID,
                                    closeButton: true,
                                    Body: ConfirmDeleteModal,
                                    onSubmit: () => deactiveAction(),
                                })
                            );
                        }}
                    >
                        <MText variant="caption2" color="#cc1010" fontWeight="bold" align="center">
                            De-activate
                        </MText>
                    </DeactiveButton>) :
                    (
                        <DeactiveButton
                            onClick={() => {
                                dispatch(
                                    newModal({
                                        text: 'active',
                                        id: FORGOT_MODAL_ID,
                                        closeButton: true,
                                        Body: ConfirmDeleteModal,
                                        onSubmit: () => activeAction(),
                                    })
                                );
                            }}
                        >
                            <MText variant="caption2" color="#cc1010" fontWeight="bold" align="center">
                                Activate
                            </MText>
                        </DeactiveButton>)
                }
                <RemoveButton
                    onClick={() => {
                        dispatch(
                            newModal({
                                text: 'delete',
                                id: FORGOT_MODAL_ID,
                                closeButton: true,
                                Body: ConfirmDeleteModal,
                                onSubmit: () => deleteAction(),
                            })
                        );
                    }}
                >
                    <MText variant="caption2" color="#cc1010" fontWeight="bold" align="center">
                        Remove
                    </MText>
                </RemoveButton>
            </ButtonContainer>
        </TitleContainer>
    );
}

export default Title;
