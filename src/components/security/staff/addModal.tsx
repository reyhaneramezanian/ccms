import { FC } from 'react';
import { Typography, Button, Radio, RadioGroup, Box, FormControlLabel } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { MInputFormik } from '@/components/base/input/MInput';
import * as security from '../security.style';
import { closeModal, newModal } from 'src/redux/actions/actions';
import { IModalBodyProps } from '@/components/shared/modals/types.modals';
import { RowTable } from '@/components/table/table_layout/types.table.layout';
import { useDispatch } from 'react-redux';
import { MSelectFormik } from '@/components/base/input/MSelect';
import { useQueryClient, QueryClient } from 'react-query';
import { useSnackbar } from 'notistack';
import {
    useAttendance_StaffCheckInMutation,
    useAttendance_StaffCheckOutMutation,
    useUser_GetCurrentSecurityQuery,
    useUser_GetStaffsQuery,
    useTotalbuildingQuery,
    useUser_GetStaffstotalQuery,
    ApprovalStatus
} from 'src/graphql/generated';
import Radioiconchecked from 'src/assets/icons/radiocheked';
import Radioicon from 'src/assets/icons/radio';
import React, { useState, useEffect } from 'react';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';
import { LoadingButton } from '@mui/lab';

const StaffAddModal: FC<IModalBodyProps<RowTable>> = ({ data: { row, refetch } }) => {
    const dispatch = useDispatch();
    const { mutate, isLoading } = useAttendance_StaffCheckInMutation();
    const { mutate: mutateout, isLoading: isLoadingout } = useAttendance_StaffCheckOutMutation();
    const mutationErrorHandler = useMutationErrorHandler();
    const { data: totalbuilding } = useTotalbuildingQuery();
    const [securitylist, setsecuritylist] = useState([]);
    const { data: totalstaff } = useUser_GetStaffstotalQuery();

    const { data: datacurentsecurity } = useUser_GetCurrentSecurityQuery();
    const { data: datasecuity } = useUser_GetStaffsQuery({
        take: totalstaff?.user_getStaffs?.result?.totalCount,
        where: {
            activeStatus: { eq: 'ACTIVE' as any },
            approvalStatus: { eq: ApprovalStatus.Approved },
            staffComplexes: {
                some: {
                    complexId: {
                        eq: datacurentsecurity?.user_getCurrentSecurity?.result?.complexId
                    }
                }
            }
        }
    });
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient();
    const [Curent, setCurent] = useState(false);

    const customRadio = (
        <Radio
            style={{ margin: '10px' }}
            disableRipple
            checkedIcon={<Radioiconchecked />}
            icon={<Radioicon />}
        />
    );

    useEffect(() => {
        var js = [],
            jssecurity = [];
        datasecuity?.user_getStaffs?.result?.items.forEach((item, i) => {
            jssecurity.push({
                option: item.firstName + ' ' + item.lastName + ' (' + item.staffId + ')',
                value: item.staffId
            });
        });

        setsecuritylist(jssecurity);
    }, [datasecuity]);
    const handleCancel = () => {
        dispatch(closeModal(StaffAddModal.name));
    };
    const handelsave = (e) => {
        if (Curent === false)
            mutate(
                {
                    staffId: e.StaffID as any
                },
                {
                    onSuccess: () => {
                        enqueueSnackbar('Operation was successful!', { variant: 'success' }),
                            queryClient.refetchQueries('attendance_getStaffAttendances');
                        dispatch(closeModal(StaffAddModal.name));
                    },
                    onError: (err) => {
                        mutationErrorHandler(err, 'attendance_staffCheckIn');
                    }
                }
            );
        else
            mutateout(
                {
                    staffId: e.StaffID as any
                },
                {
                    onSuccess: () => {
                        enqueueSnackbar('Operation was successful!', { variant: 'success' }),
                            queryClient.refetchQueries('attendance_getStaffAttendances');
                        dispatch(closeModal(StaffAddModal.name));
                    },
                    onError: (err) => {
                        mutationErrorHandler(err, 'attendance_staffCheckOut');
                    }
                }
            );
    };
    const onchangeradio = (e) => {
        if (e.target.defaultValue === 'out') setCurent(true);
        else setCurent(false);
    };
    return (
        <security.modalbox>
            <Formik
                enableReinitialize
                onSubmit={(v, handlers) => {
                    handelsave(v);
                }}
                initialValues={{ StaffID: '', check: '' }}
                validationSchema={Yup.object({
                    StaffID: Yup.string().required('This field is required')
                })}>
                <Form>
                    <security.modalFormRowWrapper>
                        <security.modalFormRowFieldWrapper>
                            <MSelectFormik
                                options={securitylist}
                                name="StaffID"
                                label="Staff"
                                placeholder="Staff"
                            />
                        </security.modalFormRowFieldWrapper>
                        <security.modalFormRowFieldWrapper>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="check">
                                <FormControlLabel
                                    checked={Curent ? false : true}
                                    value="in"
                                    control={customRadio}
                                    label="check-in"
                                    onChange={onchangeradio}
                                />
                                <FormControlLabel
                                    checked={Curent ? true : false}
                                    value="out"
                                    control={customRadio}
                                    label="check-out"
                                    onChange={onchangeradio}
                                />
                            </RadioGroup>
                        </security.modalFormRowFieldWrapper>
                    </security.modalFormRowWrapper>
                    <security.modalButtonGroup>
                        <Box>
                            <LoadingButton
                                loading={isLoading}
                                type="submit"
                                variant="contained"
                                color="primary">
                                Save
                            </LoadingButton>
                        </Box>

                        <Box>
                            <Button variant="outlined" color="grey3" onClick={handleCancel}>
                                Cancel
                            </Button>
                        </Box>
                    </security.modalButtonGroup>
                </Form>
            </Formik>
        </security.modalbox>
    );
};

const handleShowStaffAddModal = (refetch, row?: RowTable) => {
    return newModal({
        Body: StaffAddModal,
        title: 'Check-In / Check-Out',
        topBar: true,
        id: StaffAddModal.name,
        data: { row, refetch }
    });
};

export default handleShowStaffAddModal;
