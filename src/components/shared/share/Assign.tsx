import React, { useState, useEffect } from 'react';
import Assignicon from 'src/assets/icons/assine';
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
    IconButton,
    Menu
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
    useUser_GetMyStaffsQuery,
    useRequest_AssignToStaffMutation,
    useUser_GetCurrentStaffQuery,
    useRequest_AssignToMeMutation
} from 'src/graphql/generated';
import * as S from './action/action.style';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';

const CustomDiv = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: '70px'
});

const Assign = ({ value }) => {
    const dispatch = useDispatch();
    const { mutate: mutateme, isLoading: isLoadingme } = useRequest_AssignToMeMutation();
    const pageData = useSelector(({ pageData }: any) => pageData);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient();
    const mutationErrorHandler = useMutationErrorHandler();
    const { data: datauser } = useUser_GetCurrentStaffQuery();

    /* console.log(value);
    console.log(new Date(value[1] + ' ' + value[2]));*/
    const open = Boolean(anchorEl);
    const { data: datastaff } = useUser_GetMyStaffsQuery({
        requestId: Number(value[0])
    });

    const { mutate, isLoading } = useRequest_AssignToStaffMutation();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onassign = (id) => {
        if (id != 0)
            mutate(
                {
                    entityId: Number(value[0]),
                    staffId: id
                },
                {
                    onSuccess: () => {
                        enqueueSnackbar('Operation was successful!', { variant: 'success' });
                        queryClient.refetchQueries('request_getNotAssignedRequests');
                    },
                    onError: (err) => {
                        mutationErrorHandler(err, 'request_assignToStaff');
                    }
                }
            );
        else
            mutateme(
                {
                    entityId: Number(value[0])
                },
                {
                    onSuccess: () => {
                        enqueueSnackbar('Operation was successful!', { variant: 'success' }),
                            // dispatch(closeModal(StaffAcceptModal.name));
                            queryClient.refetchQueries('request_getNotAssignedRequests');
                    },
                    onError: (err) => {
                        mutationErrorHandler(err, 'request_assignToMe');
                    }
                }
            );
    };
    return (
        <div>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={(event) => {
                    handleClick(event);
                }}>
                <Assignicon />
            </IconButton>

            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button'
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: '200px',
                        width: '20ch'
                    }
                }}>
                <S.MenuItem
                    onClick={() => {
                        onassign(0);
                    }}>
                    Myself
                </S.MenuItem>
                {datastaff?.user_getMyStaffs?.result?.items?.map((item) => (
                    <S.MenuItem
                        onClick={() => {
                            onassign(item.id);
                        }}>
                        {item.firstName + ' ' + item.lastName}
                    </S.MenuItem>
                ))}
            </Menu>
        </div>
    );
};

export default Assign;
