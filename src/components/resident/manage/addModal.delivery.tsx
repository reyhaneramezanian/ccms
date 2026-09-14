import { FC } from 'react';
import { Typography, Radio, RadioGroup, Box, FormControlLabel, Button } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { MInputFormik } from '@/components/base/input/MInput';
import * as residentstyle from '../resident.style';
import { closeModal, newModal } from 'src/redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import { MSelectFormik } from '@/components/base/input/MSelect';
import React, { useState, useEffect } from 'react';
import { RowTable } from '@/components/table/table_layout/types.table.layout';
import {
    useServiceType_GetServiceTypesQuery,
    useGateApproval_CreateDeliveryMutation,
    useGateManagementDeliveryUpdateMutation
} from 'src/graphql/generated';
import { useQueryClient, QueryClient } from 'react-query';
import Checkicon from 'src/assets/icons/checkicon';
import { useSnackbar } from 'notistack';
import Radioiconchecked from 'src/assets/icons/radiocheked';
import Radioicon from 'src/assets/icons/radio';
import SucsessModal from '../sucsessModal';
import Utils from '@/utils/utils';
import storageKeys from 'src/data/storageKeys';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';
import { IModalBodyProps } from '@/components/shared/modals/types.modals';
import moment from 'moment';
import { LoadingButton } from '@mui/lab';
const today = new Date();
const validationForm = Yup.object({
    Date: Yup.date()
        .min(new Date(today.setDate(today.getDate() - 1)), 'Date can not be in the past')
        .required('This field is required'),
    Totime: Yup.string().when('Fromtime', {
        is: (Fromtime) => Fromtime !== undefined,
        then: Yup.string().test('is-greater', 'End time should be greater', function (value) {
            const { Fromtime } = this.parent;
            return moment(value, 'HH:mm').isSameOrAfter(moment(Fromtime, 'HH:mm'));
        })
    }),
    CompanyName: Yup.string().required('This field is required')
});

const DeliveryAddModal: FC<IModalBodyProps<RowTable>> = ({ data: { row, refetch } }) => {
    const customRadio = (
        <Radio
            style={{ margin: '10px' }}
            disableRipple
            checkedIcon={<Radioiconchecked />}
            icon={<Radioicon />}
        />
    );
    const mutationErrorHandler = useMutationErrorHandler();

    const dispatch = useDispatch();
    const [Curent, setCurent] = useState(row?.packageLeavingLocationText === 'Door' ? true : false);
    const [typeFrom, settypeFrom] = useState('text');
    const queryClient = useQueryClient();

    const [typeTo, settypeTo] = useState('text');
    const { mutate, isLoading } = useGateApproval_CreateDeliveryMutation();
    const { mutate: mutateupdate, isLoading: isLoadingupdate } =
        useGateManagementDeliveryUpdateMutation();
    const { enqueueSnackbar } = useSnackbar();

    const handleCancel = () => {
        dispatch(closeModal(DeliveryAddModal.name));
    };
    const handelsave = (e) => {
        if (row && row != '') {
            mutateupdate(
                {
                    input: {
                        id: row.id,
                        dateOfDelivery: e.Date,
                        companyName: e.CompanyName,
                        startTime: Utils.convertTimeToTimeSpan(e.Fromtime),
                        endTime: Utils.convertTimeToTimeSpan(e.Totime),
                        additionalInformation: e.Additional,
                        // gateApprovalType: 'NONE' as any,
                        // flatId: Number(localStorage.getItem(storageKeys.activeResidentFlatId)),
                        // approvalStatus: 'PENDING' as any,
                        packageLeavingLocation: Curent
                            ? ('AT_THE_DOOR' as any)
                            : ('AT_THE_GATE' as any)
                    }
                },
                {
                    onSuccess: (result) => {
                        dispatch(closeModal(DeliveryAddModal.name));
                        if (typeof refetch === 'function') {
                            refetch();
                        }
                    },
                    onError: (err) => {
                        mutationErrorHandler(err, 'gateApproval_getDeliveries');
                    }
                }
            );
        } else {
            mutate(
                {
                    input: {
                        dateOfDelivery: e.Date,
                        companyName: e.CompanyName,
                        startTime: Utils.convertTimeToTimeSpan(e.Fromtime),
                        endTime: Utils.convertTimeToTimeSpan(e.Totime),
                        additionalInformation: e.Additional,
                        //gateApprovalType: 'NONE' as any,
                        flatId: Number(localStorage.getItem(storageKeys.activeResidentFlatId)),
                        // approvalStatus: 'PENDING' as any,
                        packageLeavingLocation: Curent
                            ? ('AT_THE_DOOR' as any)
                            : ('AT_THE_GATE' as any)
                    }
                },
                {
                    onSuccess: (result) => {
                        dispatch(closeModal(DeliveryAddModal.name));
                        if (typeof refetch === 'function') {
                            refetch();
                        }
                        dispatch(
                            newModal({
                                closeButton: true,
                                Body: SucsessModal,
                                title: '',
                                topBar: true,
                                id: '1',
                                data: [
                                    'Delivery approved!',
                                    'Please share this passcode with',
                                    'the approved party.',
                                    result?.gateApproval_createDelivery?.result?.securityCode
                                ]
                            })
                        );
                        queryClient.refetchQueries('gateApproval_getDeliveries');
                    },
                    onError: (err) => {
                        mutationErrorHandler(err, 'gateApproval_getDeliveries');
                    }
                }
            );
        }
    };
    const onchangeradio = (e) => {
        if (e.target.defaultValue === 'door') setCurent(true);
        else setCurent(false);
    };
    return (
        <residentstyle.modalbox>
            <Formik
                enableReinitialize
                onSubmit={(data) => {
                    handelsave(data);
                }}
                initialValues={{
                    Date: row?.dates || new Date().toJSON().slice(0, 10),
                    CompanyName: row?.companyName || '',
                    Totime: row?.toTime || '',
                    Fromtime: row?.fromTime || '',
                    Additional: row?.additionalInformation || ''
                }}
                validationSchema={validationForm}>
                <Form>
                    <residentstyle.modalFormRowWrapper>
                        <residentstyle.modalFormRowFieldWrapper>
                            <MInputFormik
                                style={{ width: '100%' }}
                                name="Date"
                                label="Date of delivery"
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
                                style={{ width: '100%', height: '70px' }}
                                name="Additional"
                                label="Additional information"
                                placeholder=""
                                fullWidth
                                multiline
                                maxRows={3}
                                necessary={false}
                            />
                        </residentstyle.modalFormRowFieldWrapper>
                        <residentstyle.modalFormRowFieldWrapper>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group">
                                <FormControlLabel
                                    onChange={onchangeradio}
                                    checked={Curent ? false : true}
                                    value="gate"
                                    control={customRadio}
                                    label="Leave at the gate"
                                />
                                <FormControlLabel
                                    onChange={onchangeradio}
                                    checked={Curent ? true : false}
                                    value="door"
                                    control={customRadio}
                                    label="Leave at the door"
                                />
                            </RadioGroup>
                        </residentstyle.modalFormRowFieldWrapper>
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

const handleShowDeliveryAddModal = (refetch, row?: RowTable) => {
    return newModal({
        Body: DeliveryAddModal,
        title: row === undefined ? 'Pre-approved delivery' : 'Edit delivery',
        topBar: true,
        id: DeliveryAddModal.name,
        data: { refetch, row },
        isNotCloseModal: true
    });
};

export default handleShowDeliveryAddModal;
