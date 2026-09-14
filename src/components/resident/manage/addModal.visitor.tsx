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
import { LoadingButton } from '@mui/lab';
import {
    useGateApproval_CreateFrequentVisitorMutation,
    useGateApproval_CreateOneTimeVisitorMutation,
    useGateManagementOneTimeVisitorUpdateMutation,
    useGateManagementFrequentVisitorUpdateMutation
} from 'src/graphql/generated';
import Utils from '@/utils/utils';
import { useSnackbar } from 'notistack';
import storageKeys from 'src/data/storageKeys';
import { PHONE_VALIDATIONIndia, PHONE_VALIDATIONUsa } from '@/utils/helper/regexes';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';
import { useQueryClient, QueryClient } from 'react-query';
import { EGateManagementVisitorTabsKey } from '../gateManagementVisitor/data';
import moment from 'moment';

const AddModalvisitor: FC<IModalBodyProps<RowTable>> = ({ data: { row, refetch, tab } }) => {
    const customRadio = (
        <Radio
            style={{ margin: '10px' }}
            disableRipple
            checkedIcon={<Radioiconchecked />}
            icon={<Radioicon />}
        />
    );
    const today = new Date();
    const mutationErrorHandler = useMutationErrorHandler();
    const queryClient = useQueryClient();

    const { mutate, isLoading } = useGateApproval_CreateFrequentVisitorMutation();

    const { mutate: mutatetime, isLoading: isLoadingtime } =
        useGateApproval_CreateOneTimeVisitorMutation();
    const { mutate: mutateupdatefrequent, isLoading: isLoadingupdatefrequent } =
        useGateManagementFrequentVisitorUpdateMutation();

    const { mutate: mutatetimeupdate, isLoading: isLoadingtimeupdate } =
        useGateManagementOneTimeVisitorUpdateMutation();
    const dispatch = useDispatch();
    const [Curent, setCurent] = useState(
        tab === EGateManagementVisitorTabsKey.OneTimeVisitor ? true : false
    );
    const [typeFrom, settypeFrom] = useState('text');
    const [typeTo, settypeTo] = useState('text');
    const { enqueueSnackbar } = useSnackbar();

    const handleCancel = () => {
        dispatch(closeModal(AddModalvisitor.name));
    };
    const handlDelivery = (e) => {
        if (row && row != '') {
            mutateupdatefrequent(
                {
                    input: {
                        id: row.id,
                        visitorFirstName: e.visitorFirstName,
                        visitorLastName: e.lastname,
                        visitorPhoneNumber: e.phonenumber,
                        startDate: e.Startdate,
                        endDate: e.Enddate,
                        licensePlate: e.Licenseplate
                        // flatId: Number(localStorage.getItem(storageKeys.activeResidentFlatId))
                        // gateApprovalType: 'NONE' as any
                        // approvalStatus: 'PENDING' as any
                    }
                },
                {
                    onSuccess: (result) => {
                        if (typeof refetch === 'function') {
                            refetch();
                        }
                        dispatch(closeModal(AddModalvisitor.name));

                        queryClient.refetchQueries('gateApproval_getFrequentVisitors');
                    },
                    onError: (err) => {
                        mutationErrorHandler(err, 'gateApproval_getFrequentVisitors');
                    }
                }
            );
        } else
            mutate(
                {
                    input: {
                        visitorFirstName: e.visitorFirstName,
                        visitorLastName: e.lastname,
                        visitorPhoneNumber: e.phonenumber,
                        startDate: e.Startdate,
                        endDate: e.Enddate,
                        licensePlate: e.Licenseplate,
                        flatId: Number(localStorage.getItem(storageKeys.activeResidentFlatId))
                        // gateApprovalType: 'NONE' as any
                        // approvalStatus: 'PENDING' as any
                    }
                },
                {
                    onSuccess: (result) => {
                        dispatch(closeModal(AddModalvisitor.name));
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
                                    'Visitor approved!',
                                    'Please share this passcode with',
                                    'the approved party.',
                                    '23652'
                                ]
                            })
                        );
                        if (typeof refetch === 'function') {
                            refetch();
                        }
                        queryClient.refetchQueries('gateApproval_getFrequentVisitors');
                    },
                    onError: (err) => {
                        mutationErrorHandler(err, 'gateApproval_getFrequentVisitors');
                    }
                }
            );
    };
    const handlDeliveryTime = (e) => {
        console.log(Number(localStorage.getItem(storageKeys.activeResidentFlatId)));
        if (row && row != '') {
            mutatetimeupdate(
                {
                    input: {
                        id: row.id,
                        visitorFirstName: e.visitorFirstName,
                        visitorLastName: e.lastname,
                        visitorPhoneNumber: e.phonenumber,
                        dateOfVisit: e.Dateofvisit,
                        startTime: Utils.convertTimeToTimeSpan(e.Fromtime),
                        endTime: Utils.convertTimeToTimeSpan(e.Totime),
                        licensePlate: e.Licenseplate,
                        //  isPreApproved: true,
                        //gateApprovalType: 'NONE' as any,
                        flatId: Number(localStorage.getItem(storageKeys.activeResidentFlatId))
                        // approvalStatus: 'PENDING' as any
                    }
                },
                {
                    onSuccess: (result) => {
                        if (typeof refetch === 'function') {
                            refetch();
                        }
                        dispatch(closeModal(AddModalvisitor.name));
                        queryClient.refetchQueries('gateApproval_getOneTimeVisitors');
                    },
                    onError: (err) => {
                        mutationErrorHandler(err, 'gateApproval_getOneTimeVisitors');
                    }
                }
            );
        } else
            mutatetime(
                {
                    input: {
                        visitorFirstName: e.visitorFirstName,
                        visitorLastName: e.lastname,
                        visitorPhoneNumber: e.phonenumber,
                        dateOfVisit: e.Dateofvisit,
                        startTime: Utils.convertTimeToTimeSpan(e.Fromtime),
                        endTime: Utils.convertTimeToTimeSpan(e.Totime),
                        licensePlate: e.Licenseplate,
                        //  isPreApproved: true,
                        // gateApprovalType: 'NONE' as any,
                        flatId: Number(localStorage.getItem(storageKeys.activeResidentFlatId))
                        // approvalStatus: 'PENDING' as any
                    }
                },
                {
                    onSuccess: (result) => {
                        dispatch(closeModal(AddModalvisitor.name));
                        if (typeof refetch === 'function') {
                            refetch();
                        }
                        queryClient.refetchQueries('gateApproval_getOneTimeVisitors');
                        dispatch(
                            newModal({
                                closeButton: true,
                                Body: SucsessModal,
                                title: '',
                                topBar: true,
                                id: '1',
                                data: [
                                    'Visitor approved!',
                                    'Please share this passcode with',
                                    'the approved party.',
                                    '23652'
                                ]
                            })
                        );
                    },
                    onError: (err) => {
                        mutationErrorHandler(err, 'gateApproval_getOneTimeVisitors');
                    }
                }
            );
    };
    const onchangeradio = (e) => {
        if (e.target.defaultValue === 'One') setCurent(true);
        else setCurent(false);
    };
    return (
        <residentstyle.modalbox>
            <Formik
                enableReinitialize
                onSubmit={(data) => {
                    if (Curent === false) handlDelivery(data);
                    else handlDeliveryTime(data);
                }}
                initialValues={{
                    visitorFirstName: row?.visitorFirstName || '',
                    lastname: row?.visitorLastName || '',
                    phonenumber: row?.phoneNumber || '',
                    Licenseplate: row?.licensePlate || '',
                    Startdate: row?.startDates || new Date().toJSON().slice(0, 10),
                    Enddate: row?.endDates || new Date().toJSON().slice(0, 10),
                    Dateofvisit: row?.dates || new Date().toJSON().slice(0, 10),
                    Totime: row?.toTime || '',
                    Fromtime: row?.fromTime || ''
                }}
                validationSchema={
                    Curent
                        ? Yup.object({
                              visitorFirstName: Yup.string().required('This field is required'),
                              lastname: Yup.string().required('This field is required'),
                              phonenumber: Yup.string()
                                  .required('This field is required')
                                  .matches(PHONE_VALIDATIONIndia, 'Please enter invalid number'),
                              // Licenseplate: Yup.string().required('This field is required'),
                              Dateofvisit: Yup.date()
                                  .min(
                                      new Date(today.setDate(today.getDate() - 1)),
                                      'Date can not be in the past'
                                  )
                                  .required('This field is required'),
                              Totime: Yup.string().when('Fromtime', {
                                  is: (Fromtime) => Fromtime !== undefined,
                                  then: Yup.string().test(
                                      'is-greater',
                                      'End time should be greater',
                                      function (value) {
                                          const { Fromtime } = this.parent;
                                          return moment(value, 'HH:mm').isSameOrAfter(
                                              moment(Fromtime, 'HH:mm')
                                          );
                                      }
                                  )
                              })
                              // Fromtime: Yup.string().required('This field is required')
                          })
                        : Yup.object({
                              visitorFirstName: Yup.string().required('This field is required'),
                              lastname: Yup.string().required('This field is required'),
                              phonenumber: Yup.string()
                                  .required('This field is required')
                                  .matches(PHONE_VALIDATIONIndia, 'Please enter invalid number'),
                              //  Licenseplate: Yup.string().required('This field is required'),
                              Startdate: Yup.date()
                                  .min(
                                      new Date(today.setDate(today.getDate() - 1)),
                                      'Date can not be in the past'
                                  )
                                  .required('This field is required'),
                              Enddate: Yup.date()
                                  .when(
                                      'Startdate',
                                      (Startdate, Yup) =>
                                          Startdate &&
                                          Yup.min(Startdate, 'End time cannot be before start time')
                                  )
                                  .required('This field is required')
                          })
                }>
                <Form>
                    <residentstyle.modalFormRowWrapper>
                        <residentstyle.modalFormRowFieldWrapper>
                            <MInputFormik
                                style={{ width: '100%' }}
                                name="visitorFirstName"
                                label="Visitor first name"
                                placeholder=""
                                fullWidth
                                type="text"
                            />
                        </residentstyle.modalFormRowFieldWrapper>
                        <residentstyle.modalFormRowFieldWrapper>
                            <MInputFormik
                                style={{ width: '100%' }}
                                name="lastname"
                                label="Visitor last name"
                                placeholder=""
                                fullWidth
                                type="text"
                            />
                        </residentstyle.modalFormRowFieldWrapper>
                        <residentstyle.modalFormRowFieldWrapper>
                            <MInputFormik
                                style={{ width: '100%' }}
                                name="phonenumber"
                                label="Visitor phone number"
                                placeholder=""
                                fullWidth
                                type="text"
                            />
                        </residentstyle.modalFormRowFieldWrapper>
                        <residentstyle.modalFormRowFieldWrapper>
                            <MInputFormik
                                style={{ width: '100%' }}
                                name="Licenseplate"
                                label="License plate"
                                placeholder="e.g. AP 21 BP 7331"
                                fullWidth
                                type="text"
                                necessary={false}
                            />
                        </residentstyle.modalFormRowFieldWrapper>
                        <residentstyle.modalFormRowFieldWrapper>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group">
                                <FormControlLabel
                                    disabled={tab != undefined ? true : false}
                                    onChange={onchangeradio}
                                    checked={Curent ? false : true}
                                    value="Frequent"
                                    control={customRadio}
                                    label="Frequent visitor"
                                />
                                <FormControlLabel
                                    disabled={tab != undefined ? true : false}
                                    onChange={onchangeradio}
                                    checked={Curent ? true : false}
                                    value="One"
                                    control={customRadio}
                                    label="One time visitor"
                                />
                            </RadioGroup>
                        </residentstyle.modalFormRowFieldWrapper>
                        {Curent == false ? (
                            <>
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
                            </>
                        ) : (
                            <>
                                <residentstyle.modalFormRowFieldWrapper>
                                    <MInputFormik
                                        style={{ width: '100%' }}
                                        name="Dateofvisit"
                                        label="Date of visit"
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
                            </>
                        )}
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

const handleShowAddModalvisitor = (refetch, row?: RowTable, tab?: any) => {
    return newModal({
        Body: AddModalvisitor,
        title: row === undefined ? 'Pre-approved visitor' : 'Edit visitor',
        topBar: true,
        id: AddModalvisitor.name,
        data: { refetch, row, tab },
        isNotCloseModal: true
    });
};

export default handleShowAddModalvisitor;
