import React, { useState, useEffect } from 'react';
import Tick from 'src/assets/icons/Tick';
import Reject from 'src/assets/icons/Reject';
import {
    TextField,
    styled,
    Modal,
    Grid,
    Box,
    Typography,
    Card,
    Button,
    Container
} from '@mui/material';
import { Custom } from './tick-close';
import { closeModal, newModal } from 'src/redux/actions/actions';

import { useSnackbar } from 'notistack';
import { useQueryClient, QueryClient } from 'react-query';
import { LoadingButton } from '@mui/lab';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { setPageData } from 'src/redux/actions/actions';
import {
    useUser_ChangeApprovalStatusMutation,
    useResidentFlat_ChangeApprovalStatusMutation
} from 'src/graphql/generated';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';

const CustomDiv = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: '70px'
});

const EditDelete = ({ value }) => {
    const dispatch = useDispatch();
    const pageData = useSelector(({ pageData }: any) => pageData);
    const mutationErrorHandler = useMutationErrorHandler();

    const handleModal = () => {
        dispatch(
            newModal({
                closeButton: true,
                Body: BodyModals,
                title: 'Are you sure you want to reject ' + value[2] + '?',
                topBar: window.location.pathname === '/admin/' && true,
                id: '1'
            })
        );
    };
    function BodyModals() {
        const { mutate, isLoading } =
            value[1] === 'propertyapproval'
                ? useResidentFlat_ChangeApprovalStatusMutation()
                : useUser_ChangeApprovalStatusMutation();
        const { enqueueSnackbar } = useSnackbar();
        const queryClient = useQueryClient();
        const handleDectiveUser = () => {
            mutate(
                {
                    entityId: Number(value[0]),
                    approvalStatus: 'REJECTED' as any
                },
                {
                    onSuccess: () => {
                        dispatch(closeModal('1'));
                        enqueueSnackbar('Operation was successful!', { variant: 'success' });
                        if (value[1] === 'propertyapproval')
                            queryClient.refetchQueries('residentFlat_getResidentFlats');
                        else queryClient.refetchQueries('user_getUsers');
                    },
                    onError: (err) => {
                        value[1] === 'propertyapproval'
                            ? mutationErrorHandler(err, 'residentFlat_changeApprovalStatus')
                            : mutationErrorHandler(err, 'user_changeApprovalStatus');
                    }
                }
            );
        };

        const handleCancel = () => {
            dispatch(closeModal('1'));
        };

        return (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '50px' }}>
                <Box></Box>
                <LoadingButton
                    loading={isLoading}
                    sx={{
                        textTransform: 'none',
                        width: '170px',
                        height: '36px',
                        marginRight: '28px',
                        backgroundColor: '#e63c49',
                        borderRadius: '4px',
                        color: '#fff' /*':hover': { backgroundColor: '#A587C2' } */
                    }}
                    onClick={handleDectiveUser}>
                    <Typography
                        sx={{ fontSize: '15px', color: '#fff', fontFamily: 'Helvetica Neue' }}>
                        Yes
                    </Typography>
                </LoadingButton>
                <Button
                    sx={{
                        textTransform: 'none',
                        width: '170px',
                        height: '36px',
                        backgroundColor: '#fff',
                        borderRadius: '4px',
                        color: '#A587C2',
                        border: '1px solid #b0b0b0',
                        ':hover': { backgroundColor: '#fff' }
                    }}
                    onClick={handleCancel}>
                    <Typography
                        sx={{ fontSize: '15px', color: '#767676', fontFamily: 'Helvetica Neue' }}>
                        No
                    </Typography>
                </Button>
            </div>
        );
    }
    const handleModalApprove = () => {
        dispatch(
            newModal({
                closeButton: true,
                Body: BodyModalsApprove,
                title: 'Are you sure you want to approve ' + value[2] + '?',
                topBar: window.location.pathname === '/admin/' && true,
                id: '1'
            })
        );
    };
    function BodyModalsApprove() {
        const { mutate, isLoading } =
            value[1] === 'propertyapproval'
                ? useResidentFlat_ChangeApprovalStatusMutation()
                : useUser_ChangeApprovalStatusMutation();
        const { enqueueSnackbar } = useSnackbar();
        const queryClient = useQueryClient();
        const handleDectiveUser = () => {
            mutate(
                {
                    entityId: Number(value[0]),
                    approvalStatus: 'APPROVED' as any
                },
                {
                    onSuccess: () => {
                        dispatch(closeModal('1'));
                        enqueueSnackbar('Operation was successful!', { variant: 'success' });
                        if (value[1] === 'propertyapproval')
                            queryClient.refetchQueries('residentFlat_getResidentFlats');
                        else queryClient.refetchQueries('user_getUsers');
                    },
                    onError: (err) => {
                        value[1] === 'propertyapproval'
                            ? mutationErrorHandler(err, 'residentFlat_changeApprovalStatus')
                            : mutationErrorHandler(err, 'user_changeApprovalStatus');
                    }
                }
            );
        };

        const handleCancel = () => {
            dispatch(closeModal('1'));
        };

        return (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '50px' }}>
                <Box></Box>
                <LoadingButton
                    loading={isLoading}
                    sx={{
                        textTransform: 'none',
                        width: '170px',
                        height: '36px',
                        marginRight: '28px',
                        backgroundColor: '#2B368F',
                        borderRadius: '4px',
                        color: '#fff' /*':hover': { backgroundColor: '#A587C2' } */
                    }}
                    onClick={handleDectiveUser}>
                    <Typography
                        sx={{ fontSize: '15px', color: '#D6E1FF', fontFamily: 'Helvetica Neue' }}>
                        Yes
                    </Typography>
                </LoadingButton>
                <Button
                    sx={{
                        textTransform: 'none',
                        width: '170px',
                        height: '36px',
                        backgroundColor: '#fff',
                        borderRadius: '4px',
                        color: '#A587C2',
                        border: '1px solid #b0b0b0',
                        ':hover': { backgroundColor: '#fff' }
                    }}
                    onClick={handleCancel}>
                    <Typography
                        sx={{ fontSize: '15px', color: '#767676', fontFamily: 'Helvetica Neue' }}>
                        No
                    </Typography>
                </Button>
            </div>
        );
    }
    return (
        <>
            <CustomDiv>
                <Custom onClick={() => handleModalApprove()}>
                    <Tick />
                </Custom>
                <Custom onClick={() => handleModal()}>
                    <Reject />
                </Custom>
            </CustomDiv>
        </>
    );
};

export default EditDelete;
