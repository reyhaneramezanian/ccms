import { StyledRow } from '@/components/base/view-container/Row';
import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';
import { EditIcon } from 'src/assets/common/Pencil';

import { MButton } from 'src/components/base/MButton';
import { MText } from 'src/components/base/MText';
import { useDeleteHospital, useDeactivateHospital } from 'src/graphql/hospital/useHospital';
import { useIsAdmin } from 'src/graphql/useAuthorization';
import { useRedirectToPage } from 'src/routes';
import { closeModal, newModal } from 'src/redux/actions/actions';
import ForgetPasswordModal, { FORGOT_MODAL_ID } from '@/components/base/modal/forget-password';
import ConfirmDeleteModal from '@/components/base/modal/confirm-delete';

// const TitleContainer = styled(StyledRow)(({ theme }) => ({
//     [theme.breakpoints.down.md]: {
//         flexDirection: 'column'
//     }
//     // display: 'grid',
//     // gridTemplateColumns: 'auto ',
//     // justifyContent: 'space-between',
//     // gridGap: '10px',
//     // '@media(max-width:1000px)': {
//     //     gridTemplateColumns: 'repeat(auto-fill, 98%)'
//     // }
// }));

// const ButtonContainer = styled(StyledRow)(({ theme }) => ({
//     display: 'flex',
//     flex: 1,
//     justifyContent: 'flex-end',

//     flexWrap: 'wrap',
//     alignItems: 'center',
//     '&>button': {
//         margin: 16,
//         padding: '8px 64px',
//         [theme.breakpoints.down.sm]: {
//             padding: 8
//         }
//     },
//     '& svg': {
//         margin: '0 8px'
//     }

// }));
const TitleContainer = styled.div({
    display: 'grid',
    width: '100%',
    gridTemplateColumns: 'repeat(auto-fill, 48%)',
    justifyContent: 'space-between',
    gridGap: '10px',
    '@media(max-width:1000px)': {
        gridTemplateColumns: 'repeat(auto-fill, 98%)'
    }
});

const ButtonContainer = styled.div(({isAdmin}:{isAdmin?: boolean}) => ({
    display: 'grid',
    gridTemplateColumns: isAdmin ? 'repeat(auto-fill, 30%)' : 'repeat(auto-fill, 45%)',
    justifyContent: 'space-between',
    alignItems: 'center'
    // backgroundColor: 'green'
}));
//TODO: this color should be in palette
const DeactiveButton = styled(MButton)(({  }) => ({
    width: '100%',
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
    transform: 'scale(0.7)'
}));

function Title({
    deleteAction,
    deactiveAction,
    redirectAction,
    activeAction,
    isActivate,
}: {
    deleteAction?: () => void,
    deactiveAction?: () => void,
    redirectAction?: () => void,
    activeAction?: () => void,
    isActivate?: boolean,
}) {
    const dispatch = useDispatch();
    const isAdmin = useIsAdmin();


    return (
        <TitleContainer>
            <MText variant="h4" fontWeight="bold">
                View details
            </MText>
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
                {isAdmin && 
                (<RemoveButton
                    onClick={() => {
                        dispatch(
                            newModal({
                                text: 'delete',
                                id: FORGOT_MODAL_ID,
                                closeButton: true,
                                onSubmit: () => deleteAction(),
                                Body: ConfirmDeleteModal,
                            })
                        );
                    }}>
                    <MText variant="caption2" color="#cc1010" fontWeight="bold" align="center">
                        Remove
                    </MText>
                </RemoveButton>)}
                <EditButton
                    onClick={() => redirectAction()}
                >
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
        </TitleContainer>
    );
}

export default Title;
