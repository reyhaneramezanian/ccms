import React, { useState, useEffect } from 'react';
import Tick from 'src/assets/icons/Tick';
import Iconcall from 'src/assets/icons/iconcall';
import Callicon from 'src/assets/icons/callicon';
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
    useGateManagementChangeStatusMutation,
    GateApprovalStatus,
    GateApprovalMode,
    useGateApproval_MakeCallMutation
} from 'src/graphql/generated';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';
import * as residentstyle from '@/components/resident/resident.style';

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
                title: 'Are you sure you want to reject ' + value[1] + '?',
                topBar: window.location.pathname === '/admin/' && true,
                id: '1'
            })
        );
    };
    function BodyModals() {
        const { mutate, isLoading } = useGateManagementChangeStatusMutation();
        const { enqueueSnackbar } = useSnackbar();
        const queryClient = useQueryClient();
        const handleDectiveUser = () => {
            mutate(
                {
                    gateApprovalId: Number(value[0]),
                    gateApprovalStatus: GateApprovalStatus.Rejected
                },
                {
                    onSuccess: () => {
                        dispatch(closeModal('1'));
                        enqueueSnackbar('Operation was successful!', { variant: 'success' });
                        queryClient.refetchQueries('gateApproval_getGateApprovals');
                    },
                    onError: (err) => {
                        mutationErrorHandler(err, 'gateApproval_changeApprovalStatus');
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
                title: 'Are you sure you want to approve ' + value[1] + '?',
                topBar: window.location.pathname === '/admin/' && true,
                id: '1'
            })
        );
    };
    function BodyModalsApprove() {
        const { mutate, isLoading } = useGateManagementChangeStatusMutation();
        const { enqueueSnackbar } = useSnackbar();
        const queryClient = useQueryClient();
        const handleDectiveUser = () => {
            mutate(
                {
                    gateApprovalId: Number(value[0]),
                    gateApprovalStatus: GateApprovalStatus.Approved
                },
                {
                    onSuccess: () => {
                        dispatch(closeModal('1'));
                        enqueueSnackbar('Operation was successful!', { variant: 'success' });
                        queryClient.refetchQueries('gateApproval_getGateApprovals');
                    },
                    onError: (err) => {
                        mutationErrorHandler(err, 'gateApproval_changeApprovalStatus');
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
    const handleModalcall = () => {
        dispatch(
            newModal({
                Body: BodyModalscall,
                title: '',
                topBar: window.location.pathname === '/admin/' && true,
                id: '1',
                isNotCloseModal: true
            })
        );
    };
    function BodyModalscall() {
        const { mutate, isLoading } = useGateApproval_MakeCallMutation();
        const { enqueueSnackbar } = useSnackbar();
        const queryClient = useQueryClient();
        mutate(
            {
                gateApprovalId: Number(value[0])
            },
            {
                onSuccess: () => {
                    dispatch(closeModal('1'));
                    enqueueSnackbar('Operation was successful!', { variant: 'success' });
                    queryClient.refetchQueries('gateApproval_getGateApprovals');
                },
                onError: (err) => {
                    dispatch(closeModal('1'));
                    console.log(err);
                    mutationErrorHandler(err, 'gateApproval_makeCall');
                }
            }
        );

        const handleCancel = () => {
            dispatch(closeModal('1'));
        };

        return (
            <residentstyle.modalbox>
                <residentstyle.textsucsess>
                    <Callicon />
                </residentstyle.textsucsess>
                <residentstyle.titelsucsess>Calling now…</residentstyle.titelsucsess>
                <residentstyle.titelresponse>
                    Awaiting resident’s response
                </residentstyle.titelresponse>
            </residentstyle.modalbox>
        );
    }
    return (
        <>
            <CustomDiv>
                {value[2] !== GateApprovalMode.WalkIn && new Date(value[3]) >= new Date() ? (
                    <Custom onClick={() => handleModalApprove()}>
                        <Tick />
                    </Custom>
                ) : (
                    <Custom onClick={() => handleModalcall()}>
                        <Iconcall />
                    </Custom>
                )}
                <Custom onClick={() => handleModal()}>
                    <Reject />
                </Custom>
            </CustomDiv>
        </>
    );
};

export default EditDelete;
