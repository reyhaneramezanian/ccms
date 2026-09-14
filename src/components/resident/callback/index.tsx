import { Typography, Radio, RadioGroup, Box, Grid } from '@mui/material';
import * as residentstyle from '../resident.style';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Success from 'src/assets/icons/success';
import { usePayment_VerifyChargeWalletMutation } from 'src/graphql/generated';
import storageKeys from 'src/data/storageKeys';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';
import { useRouter } from 'next/router';
import Error from 'src/assets/icons/error';
import { useSnackbar } from 'notistack';
import { setPageData } from 'src/redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import { tabs } from '../payments/data';
import { Spacer } from 'src/components/base/spacer';
const sucsessModal = () => {
    //const mutationErrorHandler = useMutationErrorHandler();
    const router = useRouter();
    const pageData = useSelector(({ pageData }: any) => pageData);
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if (router.query.status === 'Success')
            enqueueSnackbar('Operation was successful!', { variant: 'success' });
        else enqueueSnackbar('Payment faild', { variant: 'error' });
    }, []);

    const onclickhistory = () => {
        let tab = 'Payment history';
        if (router.pathname.includes('payment-management')) {
            dispatch(setPageData({ ...pageData, activeTab: tabs[1] }));
        }

        if (router.query.type === 'charge') tab = 'My wallet';
        router.push({
            pathname: '/resident/payment-management/',
            query: { tab: tab }
        });
        //router.reload();
    };
    return (
        <Grid
            alignItems="center"
            justifyContent="center"
            container
            direction="row"
            style={{ backgroundColor: '#fff', borderRadius: 8 }}>
            <Grid item xs={12} sm={12} md={3} lg={3}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    {router.query.status !== 'Success' ? <Error /> : <Success />}
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    {router.query.status !== 'Success' ? (
                        <residentstyle.textsucsess>Transaction faild!</residentstyle.textsucsess>
                    ) : (
                        <residentstyle.textsucsess>
                            Transaction completed!
                        </residentstyle.textsucsess>
                    )}
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Box onClick={() => onclickhistory()}>
                        <div
                            style={{
                                width: '100%',
                                height: '40px',
                                borderRadius: '8px',
                                color: '#0342FE',
                                margin: '30px 0 0 0',
                                fontWeight: 'bold',
                                fontSize: '15px',
                                fontFamily: 'Helvetica Neue !important',
                                border: '1px solid #0342FE',
                                backgroundColor: '#fff',
                                textAlign: 'center',
                                padding: '8px 0 0 0',
                                cursor: 'pointer'
                            }}>
                            {router.query.type === 'charge'
                                ? 'See my wallet'
                                : 'See payment history'}
                        </div>
                    </Box>
                    <Spacer space={30} />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default sucsessModal;
