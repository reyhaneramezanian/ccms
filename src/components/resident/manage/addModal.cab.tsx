import { FC } from 'react';
import { Typography, Radio, RadioGroup, Box, FormControlLabel, Button } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { MInputFormik } from '@/components/base/input/MInput';
import * as residentstyle from '../resident.style';
import { closeModal, newModal } from 'src/redux/actions/actions';
import { IModalBodyProps } from '@/components/shared/modals/types.modals';
import { RowTable } from '@/components/table/table_layout/types.table.layout';
import { useDispatch } from 'react-redux';
import { MSelectFormik } from '@/components/base/input/MSelect';
import React, { useState, useEffect } from 'react';
import Radioiconchecked from 'src/assets/icons/radiocheked';
import Radioicon from 'src/assets/icons/radio';
import SucsessModal from '../sucsessModal';
import {
    useGateApproval_CreateCabMutation,
    useGateManagementCabUpdateMutation
} from 'src/graphql/generated';
import Utils from '@/utils/utils';
import { useSnackbar } from 'notistack';
import storageKeys from 'src/data/storageKeys';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';
import { useQueryClient, QueryClient } from 'react-query';
import { LoadingButton } from '@mui/lab';
const today = new Date();
const validationForm = Yup.object({
    // Fromtime: Yup.string().required('This field is required'),
    //Totime: Yup.string().required('This field is required'),
    Startdate: Yup.date()
        .min(new Date(today.setDate(today.getDate() - 1)), 'Date can not be in the past')
        .required('This field is required'),
    Enddate: Yup.date()
        .when(
            'Startdate',
            (Startdate, Yup) =>
                Startdate && Yup.min(Startdate, 'End date cannot be before start date')
        )
        .required('This field is required'),
    CompanyName: Yup.string().required('This field is required'),
    Licenseplate: Yup.string().required('This field is required')
});

const CabAddModal: FC<IModalBodyProps<RowTable>> = ({ data: { row, refetch } }) => {
    const customRadio = (
        <Radio
            style={{ margin: '10px' }}
            disableRipple
            checkedIcon={<Radioiconchecked />}
            icon={<Radioicon />}
        />
    );

    const queryClient = useQueryClient();
    const { mutate, isLoading } = useGateApproval_CreateCabMutation();
    const { mutate: mutateupdate, isLoading: isLoadingupdate } =
        useGateManagementCabUpdateMutation();

    const mutationErrorHandler = useMutationErrorHandler();

    const dispatch = useDispatch();
    const [Curent, setCurent] = useState(false);
    const [typeFrom, settypeFrom] = useState('text');
    const [typeTo, settypeTo] = useState('text');
    const { enqueueSnackbar } = useSnackbar();

    const handleCancel = () => {
        dispatch(closeModal(CabAddModal.name));
    };
    const handlDelivery = (e) => {
        //  debugger;
        // console.log(Utils.convertTimeToTimeSpan(e.Fromtime));
        if (row && row != '') {
            mutateupdate(
                {
                    input: {
                        id: row.id,
                        companyName: e.CompanyName,
                        startDate: e.Startdate,
                        endDate: e.Enddate,
                        startTime: Utils.convertTimeToTimeSpan(e.Fromtime),
                        endTime: Utils.convertTimeToTimeSpan(e.Totime),
                        licensePlate: e.Licenseplate,
                        flatId: Number(localStorage.getItem(storageKeys.activeResidentFlatId))
                        // gateApprovalType: 'NONE' as any
                        // approvalStatus: 'PENDING' as any
                    }
                },
                {
                    onSuccess: (result) => {
                        dispatch(closeModal(CabAddModal.name));
                        if (typeof refetch === 'function') {
                            refetch();
                        }
                    },
                    onError: (err) => {
                        mutationErrorHandler(err, 'gateapproval_getcabs');
                    }
                }
            );
        } else
            mutate(
                {
                    input: {
                        companyName: e.CompanyName,
                        startDate: e.Startdate,
                        endDate: e.Enddate,
                        startTime: Utils.convertTimeToTimeSpan(e.Fromtime),
                        endTime: Utils.convertTimeToTimeSpan(e.Totime),
                        licensePlate: e.Licenseplate,
                        flatId: Number(localStorage.getItem(storageKeys.activeResidentFlatId))
                        //gateApprovalType: 'NONE' as any
                        // approvalStatus: 'PENDING' as any
                    }
                },
                {
                    onSuccess: (result) => {
                        dispatch(closeModal(CabAddModal.name));
                        if (typeof refetch === 'function') {
                            refetch();
                        }
                        queryClient.refetchQueries('gateapproval_getcabs');
                        dispatch(
                            newModal({
                                closeButton: true,
                                Body: SucsessModal,
                                title: '',
                                topBar: true,
                                id: '1',
                                data: [
                                    'Cab approved!',
                                    'Please share this passcode with',
                                    'the approved party.',
                                    result?.gateApproval_createCab?.result?.securityCode
                                ]
                            })
                        );
                    },
                    onError: (err) => {
                        mutationErrorHandler(err, 'gateapproval_getcabs');
                    }
                }
            );
    };

    return (
        <residentstyle.modalbox>
            <Formik
                enableReinitialize
                onSubmit={(data) => {
                    handlDelivery(data);
                }}
                initialValues={{
                    CompanyName: row?.companyName || '',
                    Licenseplate: row?.licensePlate || '',
                    Startdate: row?.startDates || new Date().toJSON().slice(0, 10),
                    Enddate: row?.endDates || new Date().toJSON().slice(0, 10),
                    Totime: row?.endTime || '',
                    Fromtime: row?.startTime || ''
                }}
                validationSchema={validationForm}>
                <Form>
                    <residentstyle.modalFormRowWrapper>
                        <residentstyle.modalFormRowFieldWrapper>
                            <MInputFormik
                                style={{ width: '100%' }}
                                name="CompanyName"
                                label="Company name"
                                placeholder=""
                                fullWidth
                            />
                        </residentstyle.modalFormRowFieldWrapper>
                        <residentstyle.modalFormRowFieldWrapper>
                            <MInputFormik
                                style={{ width: '100%' }}
                                name="Licenseplate"
                                label="License plate"
                                placeholder="e.g. AP 21 BP 7331"
                                fullWidth
                            />
                        </residentstyle.modalFormRowFieldWrapper>
                        <residentstyle.modalFormRowFieldWrapper>
                            <MInputFormik
                                style={{ width: '100%' }}
                                name="Startdate"
                                label="Start date"
                                placeholder=""
                                fullWidth
                                type="date"
                            />
                        </residentstyle.modalFormRowFieldWrapper>
                        <residentstyle.modalFormRowFieldWrapper>
                            <MInputFormik
                                style={{ width: '100%' }}
                                name="Enddate"
                                label="End date"
                                placeholder=""
                                fullWidth
                                type="date"
                            />
                        </residentstyle.modalFormRowFieldWrapper>
                        <residentstyle.modalFormRowFieldWrapper>
                            <Typography style={{ fontSize: 16, fontFamily: 'Poppins' }}>
                                Choose time
                            </Typography>
                        </residentstyle.modalFormRowFieldWrapper>
                        <residentstyle.modalFormRowFieldWrapperhalf>
                            <residentstyle.modalFormRowFieldhalfright>
                                <MInputFormik
                                    style={{ width: '100%' }}
                                    name="Totime"
                                    label=""
                                    placeholder="To"
                                    fullWidth
                                    type={typeTo}
                                    onFocus={() => {
                                        settypeTo('time');
                                    }}
                                />
                            </residentstyle.modalFormRowFieldhalfright>
                            <residentstyle.modalFormRowFieldhalfleft>
                                <MInputFormik
                                    style={{ width: '100%' }}
                                    name="Fromtime"
                                    label=""
                                    placeholder="From"
                                    fullWidth
                                    type={typeFrom}
                                    onFocus={() => {
                                        settypeFrom('time');
                                    }}
                                />
                            </residentstyle.modalFormRowFieldhalfleft>
                        </residentstyle.modalFormRowFieldWrapperhalf>
                    </residentstyle.modalFormRowWrapper>

                    <residentstyle.modalButtonGroup>
                        <Box>
                            <LoadingButton
                                loading={isLoading}
                                type="submit"
                                variant="contained"
                                color="primary">
                                {row === undefined ? 'Add' : 'Save'}
                            </LoadingButton>
                        </Box>

                        <Box>
                            <Button variant="outlined" color="grey3" onClick={handleCancel}>
                                Cancel
                            </Button>
                        </Box>
                    </residentstyle.modalButtonGroup>
                </Form>
            </Formik>
        </residentstyle.modalbox>
    );
};

const handleShowCabAddModal = (refetch, row?: RowTable) => {
    return newModal({
        Body: CabAddModal,
        title: row === undefined ? 'Pre-approved cab' : 'Edit cab',
        topBar: true,
        id: CabAddModal.name,
        data: { refetch, row },
        isNotCloseModal: true
    });
};

export default handleShowCabAddModal;
