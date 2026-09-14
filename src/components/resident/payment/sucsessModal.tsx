import { FC } from 'react';
import { Typography, Radio, RadioGroup, Box, Grid } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { MInputFormik } from '@/components/base/input/MInput';
import * as residentstyle from '../resident.style';
import { closeModal, newModal } from 'src/redux/actions/actions';
import { IModalBodyProps } from '@/components/shared/modals/types.modals';
import { RowTable } from '@/components/table/table_layout/types.table.layout';
import { useDispatch, useSelector } from 'react-redux';
import { MSelectFormik } from '@/components/base/input/MSelect';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { tabs } from '../payments/data';
import { setPageData } from 'src/redux/actions/actions';
const sucsessModal: FC<IModalBodyProps<RowTable>> = ({ data }) => {
    const router = useRouter();
    const pageData = useSelector(({ pageData }: any) => pageData);
    const dispatch = useDispatch();
    const handleCancel = () => {
        dispatch(closeModal('1'));
    };
    const onclickhistory = () => {
        dispatch(closeModal('1'));
        let tab = 'Payment history';
        router.push({
            pathname: '/resident/payment-management/',
            query: { tab: tab }
        });
    };
    return (
        <residentstyle.modalbox>
            <residentstyle.textsucsess>
                <img src="/images/tick.png"></img>
            </residentstyle.textsucsess>
            <residentstyle.titelsucsess>Transaction completed!</residentstyle.titelsucsess>

            <residentstyle.modalButtonGroup>
                <Box>
                    <residentstyle.Buttonpayhistory
                        onClick={() => onclickhistory()}
                        variant="contained"
                        type="submit">
                        See payment history
                    </residentstyle.Buttonpayhistory>
                </Box>

                <Box>
                    <residentstyle.MyButton variant="contained" onClick={handleCancel}>
                        <Typography>Done</Typography>
                    </residentstyle.MyButton>
                </Box>
            </residentstyle.modalButtonGroup>
        </residentstyle.modalbox>
    );
};

export default sucsessModal;
