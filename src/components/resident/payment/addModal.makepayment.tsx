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
import AddModalchargeacount from './addModal.chargeacount';

const addmodalpayment: FC<IModalBodyProps<RowTable>> = ({ data }) => {
    const dispatch = useDispatch();
    const handleCancel = () => {
        dispatch(closeModal('1'));
    };

    var totalamont = 0;
    data.map((item) => {
        totalamont = item.Amount + totalamont;
    });
    const initialProps = useInitialProps({
        totalCount: data.length,
        totalRows: 10
    });
    const Rowresidentoxners = data?.map((item) => ({
        type: item?.Maintenancetype,
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
    const handlpay = () => {
        dispatch(closeModal('1'));

        dispatch(
            newModal({
                closeButton: true,
                Body: AddModalchargeacount,
                title: 'Make a payment',
                topBar: true,
                id: '1',
                data: ['23652']
            })
        );
    };
    /*const {mutate,isLoading} = useUser_ActivationUserMutation();
        const { enqueueSnackbar } = useSnackbar();
        const handleDectiveUser = (v)=>{
            mutate({
                userId:Number(value[0]),
                isActive:!value[2]
            },{
                onSuccess:()=>{enqueueSnackbar('Operation was successful!', { variant: 'success' }),queryClient.refetchQueries('user_getUsers'),dispatch(closeModal('1'))

            },
                onError : ()=>{enqueueSnackbar('Operation Failed!', { variant: 'error' })}
            })
        }
        */

    return (
        <residentstyle.modalbox>
            <residentstyle.textpay>My account</residentstyle.textpay>
            <residentstyle.textsucsess>
                <img src="/images/pay.png"></img>
            </residentstyle.textsucsess>
            <residentstyle.textsucsess>
                <residentstyle.code>{'INR ' + totalamont.toString()}</residentstyle.code>
            </residentstyle.textsucsess>
            <residentstyle.titelsucsess>
                <TableContainer {...props}></TableContainer>

                <residentstyle.rowpage>
                    <residentstyle.cellpage style={{ textAlign: 'left' }}>
                        Total
                    </residentstyle.cellpage>
                    <residentstyle.cellpage style={{ textAlign: 'center' }}>
                        {'INR ' + totalamont.toString()}
                    </residentstyle.cellpage>
                </residentstyle.rowpage>
            </residentstyle.titelsucsess>

            <residentstyle.modalButtonGroup>
                <Box>
                    <residentstyle.CancelButton
                        variant="contained"
                        type="submit"
                        onClick={handlpay}>
                        Pay now
                    </residentstyle.CancelButton>
                </Box>

                <Box>
                    <residentstyle.MyButton variant="contained" onClick={handleCancel}>
                        <Typography>Charge account</Typography>
                    </residentstyle.MyButton>
                </Box>
            </residentstyle.modalButtonGroup>
        </residentstyle.modalbox>
    );
};

export default addmodalpayment;
