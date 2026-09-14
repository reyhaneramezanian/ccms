import { Typography, Radio, RadioGroup, Box, Grid } from '@mui/material';
import * as residentstyle from '../resident.style';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Success from 'src/assets/icons/success';
import { usePayment_VerifyOnlinePaymentMutation } from 'src/graphql/generated';
import storageKeys from 'src/data/storageKeys';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';
import { useRouter } from 'next/router';
import Error from 'src/assets/icons/error';
import { useSnackbar } from 'notistack';

const sucsessModal = () => {
    const mutationErrorHandler = useMutationErrorHandler();
    const router = useRouter();
    const [errormsg, seterrormsg] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if (router.query.status === 'Success')
            enqueueSnackbar('Operation was successful!', { variant: 'success' });
        else mutationErrorHandler('Payment faild');
    }, []);
    return (
        <Grid
            alignItems="center"
            justifyContent="center"
            container
            direction="row"
            style={{ backgroundColor: '#fff', borderRadius: 8 }}>
            <Grid item xs={12} sm={12} md={3} lg={3}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    {errormsg ? <Error /> : <Success />}
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    {errormsg ? (
                        <residentstyle.textsucsess>Transaction faild!</residentstyle.textsucsess>
                    ) : (
                        <residentstyle.textsucsess>
                            Transaction completed!
                        </residentstyle.textsucsess>
                    )}
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Link href="/resident/payment-management/">
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
                            See payment history
                        </div>
                    </Link>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default sucsessModal;
