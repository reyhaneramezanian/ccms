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
import Seeicon from 'src/assets/icons/seeprofile';

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

const CustomDiv = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: '70px'
});

const Seeprofile = ({ value }) => {
    const dispatch = useDispatch();
    const pageData = useSelector(({ pageData }: any) => pageData);
    const router = useRouter();

    const handleModalsee = () => {
        router.push({
            pathname: '/staff/mystaff/viewstaff',
            query: { pid: value }
        });
    };

    return (
        <>
            <CustomDiv style={{ float: 'right', margin: '0 20px 0 0' }}>
                <Custom onClick={() => handleModalsee()}>
                    <Seeicon />
                </Custom>
            </CustomDiv>
        </>
    );
};

export default Seeprofile;
