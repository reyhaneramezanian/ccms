import * as residentstyle from '../resident.style';
import { useDispatch } from 'react-redux';
import { closeModal, newModal } from 'src/redux/actions/actions';
import { IModalBodyProps } from '@/components/shared/modals/types.modals';
import { FC } from 'react';
import { Grid, Typography, Button, Radio, RadioGroup, Box, InputAdornment } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { RowTable } from '@/components/table/table_layout/types.table.layout';
import { useInitialProps } from '@/components/table_container/useTableProps';
import Minez from 'src/assets/icons/Minez';
import Plus from 'src/assets/icons/plus';
import SucsessModal from './sucsessModal';
import { CheckoutProvider, Checkout, injectCheckout } from 'paytm-blink-checkout-react';
import {
    usePayment_InitiateChargeWalletMutation,
    RequestEnvironment,
    useResidentUserGetQuery
} from 'src/graphql/generated';
import storageKeys from 'src/data/storageKeys';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';
import { useRouter } from 'next/router';
import { LoadingButton } from '@mui/lab';
import Utils from '@/utils/utils';
const addmodalpayment: FC<IModalBodyProps<RowTable>> = ({ data }) => {
    const { mutate, isLoading } = usePayment_InitiateChargeWalletMutation();
    const mutationErrorHandler = useMutationErrorHandler();
    const [paymentconfig, setpaymentconfig] = useState({});
    const [amount, setamount] = useState();
    const [checkoutJsInstance, setcheckoutJsInstance] = useState(null);
    const [loading, setloading] = useState(false);

    const roter = useRouter();
    const dispatch = useDispatch();

    const [credit, setcredit] = useState([]);
    const residentUser = useResidentUserGetQuery();

    useEffect(() => {
        residentUser?.data?.user_getCurrentResident?.result?.residentFlats?.map((item) => {
            if (item.flat.id == Number(localStorage.getItem(storageKeys.activeResidentFlatId)))
                setcredit(Utils.convertNumberToPrice(item.flat.credit));
        });
    }, [residentUser]);
    const handleCancel = () => {
        dispatch(closeModal('1'));
    };

    const handlpay = () => {
        mutate(
            {
                input: {
                    flatId: Number(localStorage.getItem(storageKeys.activeResidentFlatId)),
                    amount: amount,
                    environment: RequestEnvironment.WebApp
                }
            },
            {
                onSuccess: (result) => {
                    setloading(true);
                    var config = {
                        flow: 'DEFAULT',
                        hidePaymodeLabel: true,
                        data: {
                            orderId: result.payment_initiateChargeWallet.result.orderId,
                            amount: result.payment_initiateChargeWallet.result.amount,
                            token: result.payment_initiateChargeWallet.result.token,
                            tokenType: result.payment_initiateChargeWallet.result.tokenType,
                            /*   useCallback: {
                                requestIdleCallback: function () {
                                    debugger;
                                    console.log('ssd');
                                }
                            },*/

                            userDetail: {
                                mobileNumber: '+919898989898',
                                name: 'asdad'
                            }
                        },
                        /*  payMode: {
                            order: ['UPI', 'CARD']
                        },*/
                        style: {
                            bodyColor: 'green'
                        },

                        merchant: {
                            mid: 'zkzVoY32009242870945',
                            name: 'ccms',
                            redirect: true,
                            logo: '/images/Logo.png'
                        },
                        handler: {
                            notifyMerchant: function (eventType, data) {
                                console.log('notify merchant called', eventType, data);
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
                    mutationErrorHandler(err, 'payment_initiateChargeWallet');
                }
            }
        );
    };

    const handlechangemount = (amount) => {
        setamount(amount);
    };
    const handleplus = () => {
        var mony = Number(amount) + 2000;
        setamount(mony);
    };
    const handleminez = () => {
        var mony = Number(amount) - 2000;
        if (mony < 0) setamount();
        else setamount(mony);
    };
    function Test(props) {
        const checkoutJsInstance = props.checkoutJsInstance;
        return <div>{checkoutJsInstance && <span>checkoutJsInstance.TOKEN</span>}</div>;
    }

    const InjectedComponent = injectCheckout(Test);

    return (
        <residentstyle.modalbox>
            <residentstyle.textpay>My account</residentstyle.textpay>
            <residentstyle.textsucsess>
                <img src="/images/pay.png"></img>
            </residentstyle.textsucsess>

            <residentstyle.textsucsess>
                <residentstyle.modalFormRowFieldWrapper>
                    <residentstyle.rowpagewallet>
                        <residentstyle.textwalet> Wallet balance</residentstyle.textwalet>
                        <residentstyle.textpaywallet>{'INR ' + credit}</residentstyle.textpaywallet>
                    </residentstyle.rowpagewallet>
                </residentstyle.modalFormRowFieldWrapper>
            </residentstyle.textsucsess>
            <residentstyle.modalFormRowFieldpay>
                <residentstyle.modalFormRowFieldWrapper>
                    <residentstyle.btnpay
                        onClick={() => {
                            handlechangemount(1000);
                        }}>
                        INR 1,000
                    </residentstyle.btnpay>
                </residentstyle.modalFormRowFieldWrapper>
                <residentstyle.modalFormRowFieldhalfcenterpay>
                    <residentstyle.btnpay
                        onClick={() => {
                            handlechangemount(5000);
                        }}>
                        INR 5,000
                    </residentstyle.btnpay>
                </residentstyle.modalFormRowFieldhalfcenterpay>
                <residentstyle.modalFormRowFieldWrapper>
                    <residentstyle.btnpay
                        onClick={() => {
                            handlechangemount(10000);
                        }}>
                        INR 10,000
                    </residentstyle.btnpay>
                </residentstyle.modalFormRowFieldWrapper>
            </residentstyle.modalFormRowFieldpay>
            <residentstyle.modalFormRowFieldWrapper>
                <residentstyle.divmountchrge>
                    <residentstyle.btnaddpay
                        type="number"
                        value={amount}
                        /* InputProps={{
                            startAdornment: <InputAdornment position="start">INR</InputAdornment>
                        }}*/
                        onChange={(e) => {
                            setamount(Number(e.target.value) === 0 ? '' : Number(e.target.value));
                        }}></residentstyle.btnaddpay>
                    <residentstyle.minezpay onClick={handleminez}>
                        <Minez />
                    </residentstyle.minezpay>
                    <residentstyle.pluspay onClick={handleplus}>
                        <Plus />
                    </residentstyle.pluspay>
                </residentstyle.divmountchrge>
            </residentstyle.modalFormRowFieldWrapper>

            <residentstyle.modalButtonGroup>
                <Box>
                    <LoadingButton
                        loading={isLoading ? isLoading : loading}
                        type="submit"
                        variant="contained"
                        onClick={handlpay}
                        color="primary">
                        Charge account
                    </LoadingButton>
                </Box>

                <CheckoutProvider config={paymentconfig} openInPopup="true" env="STAGE">
                    <Checkout />
                </CheckoutProvider>
                <Box>
                    <residentstyle.MyButton variant="contained" onClick={handleCancel}>
                        <Typography>Cancel</Typography>
                    </residentstyle.MyButton>
                </Box>
            </residentstyle.modalButtonGroup>
            <residentstyle.boxloading></residentstyle.boxloading>
        </residentstyle.modalbox>
    );
};

export default addmodalpayment;
