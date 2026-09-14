import { Formik, Form, FieldArray, Field } from 'formik';
import * as Yup from 'yup';
import { MInputFormik } from '@/components/base/input/MInput';
import * as residentstyle from '../resident.style';
import { useDispatch } from 'react-redux';
import { closeModal, newModal } from 'src/redux/actions/actions';
import { IModalBodyProps } from '@/components/shared/modals/types.modals';
import { FC } from 'react';
import { Grid, Typography, Button, Radio, RadioGroup, Box, FormControlLabel } from '@mui/material';
import useManageTab from 'src/hooks/useManageTab';
import React, { useEffect, useState } from 'react';
import Delete from 'src/assets/icons/Deletelist';
import { Custom } from 'src/components/shared/share/tick-close';
import { RowTable } from '@/components/table/table_layout/types.table.layout';
import { MSelectFormik } from '@/components/base/input/MSelect';
import Radioiconchecked from 'src/assets/icons/radiocheked';
import Radioicon from 'src/assets/icons/radio';
import AddModalacount from './addModal.acount';
import AddModalcharge from './addModal.chargeacount';
import {
    usePayment_GetPaymentBillsQuery,
    usePayment_GetPaymentMiscellaneousMaintenancesQuery,
    PaymentMode,
    PaymentStatus
} from 'src/graphql/generated';
import storageKeys from 'src/data/storageKeys';
import Utils from '@/utils/utils';
const addmodalpayment: FC<IModalBodyProps<RowTable>> = ({ data }) => {
    const customRadio = (
        <Radio
            style={{ margin: '10px', fontFamily: 'Poppins', fontSize: '12' }}
            disableRipple
            checkedIcon={<Radioiconchecked />}
            icon={<Radioicon />}
        />
    );
    const dispatch = useDispatch();
    const [Curent, setCurent] = useState(
        localStorage.getItem(storageKeys.paymentModeComplex) === PaymentMode.PrePaid
            ? 'Miscellaneous'
            : 'Utility'
    );
    const [datapay, setdatapay] = useState([]);
    const [titel, settitel] = useState(
        localStorage.getItem(storageKeys.paymentModeComplex) === PaymentMode.PrePaid
            ? 'Miscellaneous type'
            : 'Utility type'
    );
    const [totalAmount, settotalAmount] = useState(0);
    const { data: datapaymentMaintenances } = usePayment_GetPaymentMiscellaneousMaintenancesQuery({
        take: 1000,
        where: {
            flatId: {
                eq: Number(localStorage.getItem(storageKeys.activeResidentFlatId))
            },
            paymentStatus: { eq: PaymentStatus.Unpaid }
        }
    });
    const { data: datapayment } = usePayment_GetPaymentBillsQuery({
        take: 1000,
        where: {
            flatId: {
                eq: Number(localStorage.getItem(storageKeys.activeResidentFlatId))
            },
            paymentStatus: { eq: PaymentStatus.Unpaid }
        }
    });

    useEffect(() => {
        debugger;
        var js = [],
            jsMaintenances = [],
            amount = 0,
            amountMaintenances = 0;
        datapayment?.payment_getPaymentBills?.result?.items?.forEach((item) => {
            js.push({
                maintenanceType: Utils.convertoLowerCase(item.utilityType),
                Amount: item.amount,
                Month: new Date(item.dueDate).toString().slice(4, 7),
                Duedate: item.dueDate.slice(0, 10),
                id: item.id
            });
            amount = amount + item.amount;
        });
        datapaymentMaintenances?.payment_getPaymentMiscellaneousMaintenances?.result?.items?.forEach(
            (item) => {
                jsMaintenances.push({
                    maintenanceType: item.maintenanceType.name,
                    Amount: item.amount,
                    Month: new Date(item.dueDate).toString().slice(4, 7),
                    Duedate: item.dueDate.slice(0, 10),
                    id: item.id
                });
                amountMaintenances = amountMaintenances + item.amount;
            }
        );

        if (Curent === 'Utility') {
            setdatapay(js);
            settotalAmount(amount);
        } else {
            setdatapay(jsMaintenances);
            settotalAmount(amountMaintenances);
        }
    }, [datapayment, datapaymentMaintenances, Curent]);

    const handleCancel = () => {
        dispatch(closeModal('1'));
    };
    const onchangeradio = (e) => {
        if (e.target.defaultValue === 'Miscellaneous') {
            setCurent('Miscellaneous');
            settitel('Maintenance type');
        } else if (e.target.defaultValue === 'Utility') {
            setCurent('Utility');
            settitel('Utility type');
        } else {
            setCurent('Chargeaccount');
            settitel('Charge account');

            dispatch(closeModal('1'));

            dispatch(
                newModal({
                    closeButton: true,
                    Body: AddModalcharge,
                    title: 'Make a payment',
                    topBar: true,
                    id: '1',
                    data: [0]
                })
            );
        }
    };
    const handlpay = () => {
        dispatch(closeModal('1'));

        dispatch(
            newModal({
                closeButton: true,
                Body: AddModalacount,
                title: 'Make a payment',
                topBar: true,
                id: '1',
                data: [datapay, Curent]
            })
        );
    };
    const remove = (id) => {
        var js = [],
            amount = totalAmount;
        datapay.forEach((item) => {
            if (item.id != id) js.push(item);
            else amount = Number(amount) - Number(item.Amount);
        });
        setdatapay(js);
        settotalAmount(amount);
    };
    return (
        <div style={{ width: '100%' }}>
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
                                onChange={onchangeradio}
                                checked={Curent == 'Utility' ? true : false}
                                value="Utility"
                                control={customRadio}
                                label="Utility"
                            />
                        )}
                        <FormControlLabel
                            onChange={onchangeradio}
                            checked={Curent == 'Miscellaneous' ? true : false}
                            value="Miscellaneous"
                            control={customRadio}
                            label="Miscellaneous maintenance"
                        />
                        <FormControlLabel
                            onChange={onchangeradio}
                            checked={Curent == 'Chargeaccount' ? true : false}
                            value="Chargeaccount"
                            control={customRadio}
                            label="Charge account"
                        />
                    </RadioGroup>
                </residentstyle.modalFormRowFieldWrapper>
                <Grid container>
                    <React.Fragment>
                        {datapay.map((item, index) => (
                            <>
                                {index !== 0 ? (
                                    <residentstyle.rowpage>
                                        <residentstyle.cellpage>
                                            <residentstyle.line />
                                        </residentstyle.cellpage>
                                    </residentstyle.rowpage>
                                ) : (
                                    ''
                                )}

                                <residentstyle.rowpayment>
                                    <residentstyle.cellpayment>
                                        {index === 0 ? (
                                            <Typography
                                                style={{
                                                    fontSize: 14,
                                                    fontFamily: 'Poppins',
                                                    width: '100%'
                                                }}>
                                                {titel}
                                            </Typography>
                                        ) : (
                                            ''
                                        )}
                                        <residentstyle.inputpayment>
                                            {item.maintenanceType}
                                        </residentstyle.inputpayment>
                                    </residentstyle.cellpayment>
                                    <residentstyle.cellpayment>
                                        {index === 0 ? (
                                            <Typography
                                                style={{
                                                    fontSize: 14,
                                                    fontFamily: 'Poppins',
                                                    width: '100%'
                                                }}>
                                                Month
                                            </Typography>
                                        ) : (
                                            ''
                                        )}
                                        <residentstyle.inputpayment>
                                            {item.Month}
                                        </residentstyle.inputpayment>
                                    </residentstyle.cellpayment>
                                    <residentstyle.cellpayment>
                                        {index === 0 ? (
                                            <Typography
                                                style={{
                                                    fontSize: 14,
                                                    fontFamily: 'Poppins',
                                                    width: '100%'
                                                }}>
                                                Due date
                                            </Typography>
                                        ) : (
                                            ''
                                        )}
                                        <residentstyle.inputpayment>
                                            {item.Duedate.replaceAll('-', '/')}
                                        </residentstyle.inputpayment>
                                    </residentstyle.cellpayment>
                                    <residentstyle.cellpayment>
                                        {index === 0 ? (
                                            <Typography
                                                style={{
                                                    fontSize: 14,
                                                    fontFamily: 'Poppins',
                                                    width: '100%'
                                                }}>
                                                Amount
                                            </Typography>
                                        ) : (
                                            ''
                                        )}
                                        <residentstyle.inputpayment>
                                            {item.Amount}
                                        </residentstyle.inputpayment>
                                    </residentstyle.cellpayment>
                                    <residentstyle.cellpayment>
                                        {datapay.length !== 1 ? (
                                            <Custom
                                                onClick={() => {
                                                    remove(item.id);
                                                }}
                                                style={{
                                                    margin: `${
                                                        index == 0 ? '30px 0 0 2px' : '10px 0 0 2px'
                                                    }`
                                                }}>
                                                <Delete />
                                            </Custom>
                                        ) : (
                                            ''
                                        )}
                                    </residentstyle.cellpayment>
                                </residentstyle.rowpayment>
                            </>
                        ))}
                    </React.Fragment>
                </Grid>
                <residentstyle.modalFormRowWrapper>
                    <Typography
                        style={{
                            fontSize: 14,
                            fontFamily: 'Poppins',
                            width: '100%'
                        }}>
                        Total amount
                    </Typography>
                    <residentstyle.inputpayment>{totalAmount}</residentstyle.inputpayment>
                </residentstyle.modalFormRowWrapper>
                <residentstyle.modalButtonGroup>
                    <Box>
                        <residentstyle.CancelButton
                            variant="contained"
                            type="submit"
                            onClick={handlpay}>
                            Pay
                        </residentstyle.CancelButton>
                    </Box>

                    <Box>
                        <residentstyle.MyButton variant="contained" onClick={handleCancel}>
                            <Typography>Cancel</Typography>
                        </residentstyle.MyButton>
                    </Box>
                </residentstyle.modalButtonGroup>
            </residentstyle.modalFormRowWrapper>
        </div>
    );
};

export default addmodalpayment;
