import { FC } from 'react';
import { Typography, Radio, RadioGroup, Box, Grid } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { MInputFormik } from '@/components/base/input/MInput';
import * as residentstyle from './resident.style';
import { closeModal, newModal } from 'src/redux/actions/actions';
import { IModalBodyProps } from '@/components/shared/modals/types.modals';
import { RowTable } from '@/components/table/table_layout/types.table.layout';
import { useDispatch } from 'react-redux';
import { MSelectFormik } from '@/components/base/input/MSelect';
import React, { useState, useEffect } from 'react';

const sucsessModal: FC<IModalBodyProps<RowTable>> = ({ data }) => {
    const dispatch = useDispatch();
    const handleCancel = () => {
        dispatch(closeModal('1'));
    };

    return (
        <residentstyle.modalbox>
            <residentstyle.textsucsess>
                <img src="/images/tick.png"></img>
            </residentstyle.textsucsess>
            <residentstyle.titelsucsess>{data[0]}</residentstyle.titelsucsess>
            <residentstyle.textsucsess>{data[1]}</residentstyle.textsucsess>
            <residentstyle.textsucsess>{data[2]}</residentstyle.textsucsess>
            {data[3] !== '' ? (
                <residentstyle.textsucsess>
                    <residentstyle.code>{data[3]}</residentstyle.code>
                </residentstyle.textsucsess>
            ) : (
                ''
            )}
            <residentstyle.textsucsess>
                <Box>
                    <residentstyle.CancelButton
                        onClick={handleCancel}
                        variant="contained"
                        type="submit">
                        Ok
                    </residentstyle.CancelButton>
                </Box>
            </residentstyle.textsucsess>
        </residentstyle.modalbox>
    );
};

export default sucsessModal;
