import React, { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import { FormControlLabel, Switch, Box, Button } from '@mui/material';
import { useUser_UpdateAuthorizedUserMutation } from 'src/graphql/generated';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, newModal } from 'src/redux/actions/actions';
import * as S from '../../confirmationModal/styles.deleteModal';
import Alert from 'src/assets/icons/alert';
import * as AdminStyle from '@/components/admin/admin.style';
import { useQueryClient, QueryClient } from 'react-query';
import { useSnackbar } from 'notistack';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';

const SwitchCase = styled(Switch)({
    padding: 2,
    width: '40px',
    height: '24px',
    '& .MuiSwitch-switchBase': {
        '&.Mui-checked': {
            '& .MuiSwitch-thumb': {
                position: 'absolute',
                left: '2px',
                width: '15px',
                backgroundColor: '#fff',
                top: '4px'
            },
            '& + .MuiSwitch-track': {
                backgroundColor: '#487A9D',
                opacity: '1'
            }
        }
    },
    '& .MuiSwitch-track': {
        backgroundColor: '#C9C9C9',
        borderRadius: '18px'
    },
    '& .MuiSwitch-thumb': {
        boxShadow: 'none',
        width: 15,
        height: 15,
        left: '6px',
        position: 'absolute',
        borderRadius: '50%',
        top: '4px',
        backgroundColor: '#fff'
    }
});

const Swicher = ({ value }) => {
    const mutationErrorHandler = useMutationErrorHandler();

    const dispatch = useDispatch();
    const pageData = useSelector(({ pageData }: any) => pageData);
    const { mutate, isLoading } = useUser_UpdateAuthorizedUserMutation();
    const queryClient = useQueryClient();
    const { enqueueSnackbar } = useSnackbar();

    const handleChangeInactive = () => {
        mutate(
            {
                input: {
                    relation: value[6] as any,
                    residentFlatId: value[7],
                    gender: value[8] as any,
                    activeStatus: value[0] == 'ACTIVE' ? ('INACTIVE' as any) : ('ACTIVE' as any),
                    email: value[4],
                    firstName: value[2],
                    lastName: value[3],
                    dateOfBirth: value[9],
                    phoneNumber: value[5],
                    id: value[1],
                    photoUrl: value[10]
                }
            },
            {
                onSuccess: () => {
                    queryClient.refetchQueries('user_getAuthorizedUsers');
                },
                onError: (err) => {
                    mutationErrorHandler(err, 'user_updateAuthorizedUser');
                }
            }
        );
    };
    const handleChange = () => {
        debugger;
        dispatch(
            newModal({
                closeButton: true,
                Body: BodyModals,
                title: '',
                topBar: window.location.pathname === '/admin/' && true,
                id: '1'
            })
        );
    };
    function BodyModals() {
        const handleCancel = () => {
            dispatch(closeModal('1'));
        };
        const handleAccept = () => {
            debugger;
            mutate(
                {
                    input: {
                        relation: value[6] as any,
                        residentFlatId: value[7],
                        gender: value[8] as any,
                        activeStatus:
                            value[0] == 'ACTIVE' ? ('INACTIVE' as any) : ('ACTIVE' as any),
                        email: value[4],
                        firstName: value[2],
                        lastName: value[3],
                        dateOfBirth: value[9],
                        phoneNumber: value[5],
                        id: value[1],
                        photoUrl: value[10]
                    }
                },
                {
                    onSuccess: () => {
                        queryClient.refetchQueries('user_getAuthorizedUsers');
                        dispatch(closeModal('1'));
                    },
                    onError: (err) => {
                        mutationErrorHandler(err, 'user_getAuthorizedUsers');
                    }
                }
            );
        };
        return (
            <S.DeleteModalWrapper>
                <Box display="flex">
                    <S.DeleteModalIcon>
                        <Alert />
                    </S.DeleteModalIcon>

                    <S.DeleteModalTitle>
                        Are you sure you want inactivate this item?
                    </S.DeleteModalTitle>
                </Box>

                <div style={{ marginTop: 32 }}>
                    <AdminStyle.modalButtonGroup>
                        <Button
                            variant="contained"
                            color="danger"
                            type="submit"
                            onClick={handleAccept}
                            disabled={isLoading}>
                            Inactivate
                        </Button>

                        <Button variant="outlined" color="grey3" onClick={handleCancel}>
                            Cancel
                        </Button>
                    </AdminStyle.modalButtonGroup>
                </div>
            </S.DeleteModalWrapper>
        );
    }
    return (
        <FormControlLabel
            sx={{
                position: 'relative',
                margin: 0
            }}
            control={
                <SwitchCase
                    checked={value[0] == 'ACTIVE' ? true : false}
                    onChange={() => {
                        value[0] == 'ACTIVE' ? handleChange() : handleChangeInactive();
                    }}
                    name="checked"
                />
            }
            label=""
        />
    );
};

export default Swicher;
