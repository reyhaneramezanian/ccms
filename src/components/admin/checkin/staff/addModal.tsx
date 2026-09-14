import { FC } from 'react';
import { Typography, Button, Radio, RadioGroup, Box, FormControlLabel } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { MInputFormik } from '@/components/base/input/MInput';
import * as adminstyle from '../../admin.style';
import { closeModal, newModal } from 'src/redux/actions/actions';
import { IModalBodyProps } from '@/components/shared/modals/types.modals';
import { RowTable } from '@/components/table/table_layout/types.table.layout';
import { useDispatch } from 'react-redux';
import { MSelectFormik } from '@/components/base/input/MSelect';
import { useQueryClient, QueryClient } from 'react-query';
import { useSnackbar } from 'notistack';
import {
    useAttendance_StaffCheckInMutation,
    useAttendance_StaffCheckOutMutation
} from 'src/graphql/generated';
import Radioiconchecked from 'src/assets/icons/radiocheked';
import Radioicon from 'src/assets/icons/radio';
import React, { useState, useEffect } from 'react';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';

const StaffAddModal: FC<IModalBodyProps<RowTable>> = ({ data: { row, refetch } }) => {
    const dispatch = useDispatch();
    const { mutate, isLoading } = useAttendance_StaffCheckInMutation();
    const { mutate: mutateout, isLoading: isLoadingout } = useAttendance_StaffCheckOutMutation();
    const mutationErrorHandler = useMutationErrorHandler();

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
        <adminstyle.modalbox>
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
                    <adminstyle.modalFormRowWrapper>
                        <adminstyle.modalFormRowFieldWrapper>
                            <MInputFormik
                                style={{ width: '100%' }}
                                name="StaffID"
                                label="Staff id"
                                placeholder="Staff ID"
                                fullWidth
                            />
                        </adminstyle.modalFormRowFieldWrapper>
                        <adminstyle.modalFormRowFieldWrapper>
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
                        </adminstyle.modalFormRowFieldWrapper>
                    </adminstyle.modalFormRowWrapper>
                    <adminstyle.modalButtonGroup>
                        <Box>
                            <Button type="submit" variant="contained" color="primary">
                                Save
                            </Button>
                        </Box>

                        <Box>
                            <Button variant="outlined" color="grey3" onClick={handleCancel}>
                                Cancel
                            </Button>
                        </Box>
                    </adminstyle.modalButtonGroup>
                </Form>
            </Formik>
        </adminstyle.modalbox>
    );
};

const handleShowStaffAddModal = (refetch, row?: RowTable) => {
    return newModal({
        Body: StaffAddModal,
        title: `${typeof row === 'undefined' ? 'Add' : 'Edit'} Complaint`,
        topBar: true,
        id: StaffAddModal.name,
        data: { row, refetch }
    });
};

export default handleShowStaffAddModal;
