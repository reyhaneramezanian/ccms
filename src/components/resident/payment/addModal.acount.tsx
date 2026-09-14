import * as residentstyle from '../resident.style';
import { useDispatch } from 'react-redux';
import { closeModal, newModal } from 'src/redux/actions/actions';
import { IModalBodyProps } from '@/components/shared/modals/types.modals';
import { FC } from 'react';
import { Grid, Typography, Button, Radio, RadioGroup, Box, FormControlLabel } from '@mui/material';
import useManageTab from 'src/hooks/useManageTab';
import React, { useEffect, useState } from 'react';
import { RowTable } from '@/components/table/table_layout/types.table.layout';
import TableContainer from 'src/components/table_container';
import { useInitialProps } from '@/components/table_container/useTableProps';
import { Columnpay } from '../data';
import sucsessModal from './sucsessModal';
import chargeacount from './addModal.chargeacount';
import { LoadingButton } from '@mui/lab';

import Radioiconchecked from 'src/assets/icons/radiocheked';
import Radioicon from 'src/assets/icons/radio';
import { CheckoutProvider, Checkout, injectCheckout } from 'paytm-blink-checkout-react';
import {
    usePayment_InitiateOnlinePaymentMutation,
    usePayment_PayWithWalletMutation,
    PaymentMode,
    RequestEnvironment
} from 'src/graphql/generated';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';
import storageKeys from 'src/data/storageKeys';
import { useRouter } from 'next/router';
const addmodalpayment: FC<IModalBodyProps<RowTable>> = ({ data }) => {
    const customRadio = (
        <Radio
            style={{ margin: '4px' }}
            disableRipple
            checkedIcon={<Radioiconchecked />}
            icon={<Radioicon />}
        />
    );
    const router = useRouter();
    const { mutate, isLoading } = usePayment_InitiateOnlinePaymentMutation();
    const [loading, setloading] = useState(false);
    const { mutate: mutatewallet, isLoading: isLoadingwallet } = usePayment_PayWithWalletMutation();
    const mutationErrorHandler = useMutationErrorHandler();
    const [Curent, setCurent] = useState(data[1]);
    const [pay, setpay] = useState('cart');
    const [paymentconfig, setpaymentconfig] = useState({});

    const dispatch = useDispatch();
    const handleCancel = () => {
        dispatch(closeModal('1'));
    };

    var totalamont = 0;
    data[0].map((item) => {
        totalamont = item.Amount + totalamont;
    });
    const initialProps = useInitialProps({
        totalCount: data[0].length,
        totalRows: 10
    });
    const Rowresidentoxners = data[0]?.map((item) => ({
        type: item?.maintenanceType != undefined ? item?.maintenanceType : item?.paymentType,
        amount: 'INR ' + (item?.Amount).toString(),
        month: item?.Month
    }));
    const props = {
        ...initialProps,
        columns: Columnpay,
        rows: Rowresidentoxners,
        adminLayout: true,
        centerItem: true
    };
    const onchangeradio = (e) => {
        if (e.target.defaultValue === 'Miscellaneous') {
            setCurent('Miscellaneous');
        } else if (e.target.defaultValue === 'Utility') {
            setCurent('Utility');
        } else {
            setCurent('Chargeaccount');
            dispatch(closeModal('1'));

            dispatch(
                newModal({
                    closeButton: true,
                    Body: chargeacount,
                    title: 'Make a payment',
                    topBar: true,
                    id: '1',
                    data: ['23652']
                })
            );
        }
    };
    const onchangpay = (e) => {
        if (e.target.defaultValue === 'cart') {
            setpay('cart');
        } else if (e.target.defaultValue === 'account') {
            setpay('account');
        }
    };
    const handlpay = () => {
        var js = [];
        data[0].map((item) => {
            js.push(item.id);
        });
        if (pay !== 'cart') {
            mutatewallet(
                {
                    paymentIds: js
                },
                {
                    onSuccess: (result) => {
                        dispatch(closeModal('1'));
                        router.push({
                            pathname: '/resident/callback/',
                            query: { type: 'wallet', status: 'Success' }
                        });
                        /* dispatch(
                            newModal({
                                closeButton: true,
                                Body: sucsessModal,
                                title: 'Make a payment',
                                topBar: true,
                                id: '1',
                                data: ['23652']
                            })
                        );*/
                    },
                    onError: (err) => {
                        mutationErrorHandler(err, 'payment_payWithWallet');
                    }
                }
            );
        } else {
            mutate(
                {
                    input: {
                        paymentIds: js,
                        environment: RequestEnvironment.WebApp
                    }
                },
                {
                    onSuccess: (result) => {
                        setloading(true);
                        var config = {
                            flow: 'DEFAULT',
                            //Optional to hide paymode label when only one paymode is available
                            hidePaymodeLabel: true,
                            data: {
                                orderId: result.payment_initiateOnlinePayment.result.orderId,
                                amount: result.payment_initiateOnlinePayment.result.amount,
                                token: result.payment_initiateOnlinePayment.result.token,
                                tokenType: result.payment_initiateOnlinePayment.result.tokenType,
                                userDetail: {
                                    mobileNumber: '+919898989898',
                                    name: 'asdad'
                                }
                            },
                            payMode: {
                                order: ['UPI', 'CARD']
                            },
                            style: {
                                //Optional: global style that will apply to all paymodes
                                bodyColor: 'green'
                            },

                            merchant: {
                                mid: 'zkzVoY32009242870945',
                                name: 'ccms',
                                redirect: true,
                                logo: '/images/Logo.png'
                            },
                            handler: {
                                transactionStatus: function transactionStatus(paymentStatus) {
                                    console.log(paymentStatus);
                                },
                                notifyMerchant: function notifyMerchant(eventName, data) {
                                    console.log('Closed');
                                }
                            }
                        };
                        setpaymentconfig(config);
                        setTimeout(() => {
                            setloading(false);
                        }, 20000);
                    },
                    onError: (err) => {
                        setloading(false);
                        mutationErrorHandler(err, 'payment_initiateOnlinePayment');
                    }
                }
            );
        }
    };

    return (
        <residentstyle.modalFormRowWrapper>
            <residentstyle.modalFormRowFieldWrapper>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group">
                    {localStorage.getItem(storageKeys.paymentModeComplex) ===
                    PaymentMode.PrePaid ? (
                        ''
                    ) : (
                        <FormControlLabel
                            disabled
                            onChange={onchangeradio}
                            checked={Curent == 'Utility' ? true : false}
                            value="Utility"
                            control={customRadio}
                            label="Utility"
                        />
                    )}
                    <FormControlLabel
                        disabled
                        onChange={onchangeradio}
                        checked={Curent == 'Miscellaneous' ? true : false}
                        value="Miscellaneous"
                        control={customRadio}
                        label="Miscellaneous maintenance"
                    />
                    <FormControlLabel
                        disabled
                        onChange={onchangeradio}
                        checked={Curent == 'Chargeaccount' ? true : false}
                        value="Chargeaccount"
                        control={customRadio}
                        label="Charge account"
                    />
                </RadioGroup>
            </residentstyle.modalFormRowFieldWrapper>
            <residentstyle.titelsucsess>
                <TableContainer {...props}></TableContainer>

                <residentstyle.rowpage>
                    <residentstyle.modalFormRowFieldWrapper>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group">
                            <FormControlLabel
                                onChange={onchangpay}
                                checked={pay == 'cart' ? true : false}
                                value="cart"
                                control={customRadio}
                                label="Pay by credit card"
                            />
                            <FormControlLabel
                                onChange={onchangpay}
                                checked={pay == 'cart' ? false : true}
                                value="account"
                                control={customRadio}
                                label="Pay by wallet"
                            />
                        </RadioGroup>
                    </residentstyle.modalFormRowFieldWrapper>
                </residentstyle.rowpage>
            </residentstyle.titelsucsess>
            <CheckoutProvider config={paymentconfig} openInPopup="true" env="STAGE">
                <Checkout />
            </CheckoutProvider>
            <residentstyle.modalButtonGroup>
                <Box>
                    <LoadingButton
                        loading={isLoading ? isLoading : loading ? loading : isLoadingwallet}
                        type="submit"
                        variant="contained"
                        onClick={handlpay}
                        color="primary">
                        Pay
                    </LoadingButton>
                </Box>

                <Box>
                    <residentstyle.MyButton variant="contained" onClick={handleCancel}>
                        <Typography>Cancel</Typography>
                    </residentstyle.MyButton>
                </Box>
            </residentstyle.modalButtonGroup>
        </residentstyle.modalFormRowWrapper>
    );
};

export default addmodalpayment;
