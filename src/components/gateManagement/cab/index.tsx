import { MSelect } from '@/components/base/input/MSelect';
import Utils from '@/utils/utils';
import { Box, Button, FormControlLabel, Grid, RadioGroup } from '@mui/material';
import { useDispatch } from 'react-redux';
import {
    GateApprovalType,
    UserType,
    useGateManagementCabCreateMutation,
    useGateManagementCabUpdateMutation,
    useUser_GetCurrentSecurityQuery
} from 'src/graphql/generated';
import useUserFloorLocation from 'src/hooks/useUserFloorLocation';
import { closeModal, newModal } from 'src/redux/actions/actions';
import { visitorModalInitialForm, visitorModalValidationForm } from './data';
import * as GS from '@/components/style';
import { MInput } from '@/components/base/input/MInput';
import SPACING from '@/utils/theme/spacing';
import { useGetUser } from 'src/auth/UserProvider';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';
import storageKeys from 'src/data/storageKeys';
import React, { useState, useEffect } from 'react';

const GateManagementCabModal = ({ data: { refetch, row } }) => {
    const dispatch = useDispatch();
    const cabCreateMutation = useGateManagementCabCreateMutation();
    const cabUpdateMutation = useGateManagementCabUpdateMutation();
    const user = useGetUser();
    const [typeFrom, settypeFrom] = useState('text');
    const [typeTo, settypeTo] = useState('text');
    const { data: datacurentsecurity } = useUser_GetCurrentSecurityQuery();

    const visitorModalInitialForm = (row) => ({
        complexId: datacurentsecurity?.user_getCurrentSecurity?.result?.complexId || undefined,
        blockId: row?.blockId || undefined,
        floorId: row?.floorId || undefined,
        flatId: row?.flatId || undefined,
        companyName: row?.companyName || '',
        licensePlate: row?.licensePlate || '',
        startDate: row?.startDate || Utils.convertDateTimeToInputDateValue(),
        endDate: row?.endDate || Utils.convertDateTimeToInputDateValue(),
        startTime: row?.startTime || undefined,
        endTime: row?.endTime || undefined
    });
    const initialValues = visitorModalInitialForm(row);
    const hasUser = typeof user === 'object' && user !== null;
    const { formik, complexes, blocks, floors, flats } = useUserFloorLocation({
        initialValues,
        onSubmit,
        enableReinitialize: true,
        validationSchema: hasUser && visitorModalValidationForm(user.userType)
    });

    const mutationErrorHandler = useMutationErrorHandler();

    const handleCancel = () => {
        dispatch(closeModal(GateManagementCabModal.name));
    };

    function onSubmit(data) {
        if (row) {
            cabUpdateMutation.mutate(
                {
                    input: {
                        id: row.id,
                        //gateApprovalType: GateApprovalType.Cab,
                        companyName: data.companyName,
                        licensePlate: data.licensePlate,
                        flatId: data.flatId,
                        startDate: data.startDate,
                        endDate: data.endDate,
                        startTime: Utils.convertTimeToTimeSpan(data.startTime),
                        endTime: Utils.convertTimeToTimeSpan(data.endTime)
                    }
                },
                {
                    onSuccess: () => {
                        handleCancel();

                        refetch();
                    },
                    onError: (err) => {
                        mutationErrorHandler(err, 'gateApproval_createFrequentVisitor');
                    }
                }
            );
        } else {
            cabCreateMutation.mutate(
                {
                    input: {
                        //gateApprovalType: GateApprovalType.Cab,
                        companyName: data.companyName,
                        licensePlate: data.licensePlate,
                        flatId: data.flatId,
                        startDate: data.startDate,
                        endDate: data.endDate,
                        startTime: Utils.convertTimeToTimeSpan(data.startTime),
                        endTime: Utils.convertTimeToTimeSpan(data.endTime)
                    }
                },
                {
                    onSuccess: () => {
                        handleCancel();

                        refetch();
                    },
                    onError: (err) => {
                        mutationErrorHandler(err, 'gateApproval_createFrequentVisitor');
                    }
                }
            );
        }
    }

    if (!hasUser) return null;
    return (
        <Box
            component="form"
            onSubmit={formik.handleSubmit}
            style={{ width: 450, maxWidth: '100%' }}>
            <div style={{ width: '100%' }}>
                <Grid container>
                    {user.userType === UserType.Security && (
                        <>
                            <Grid item lg={12} xs={12}>
                                <MSelect
                                    name="blockId"
                                    label="Block"
                                    options={blocks}
                                    value={formik.values.blockId}
                                    onChange={formik.handleChange}
                                    meta={formik.getFieldMeta('blockId')}
                                    necessary={false}
                                />
                            </Grid>

                            <Grid item lg={12} xs={12}>
                                <MSelect
                                    name="floorId"
                                    label="Floor"
                                    options={floors}
                                    value={formik.values.floorId}
                                    onChange={formik.handleChange}
                                    meta={formik.getFieldMeta('floorId')}
                                    necessary={false}
                                />
                            </Grid>

                            <Grid item lg={12} xs={12}>
                                <MSelect
                                    name="flatId"
                                    label="Flat"
                                    options={flats}
                                    value={formik.values.flatId}
                                    onChange={formik.handleChange}
                                    meta={formik.getFieldMeta('flatId')}
                                    necessary={false}
                                />
                            </Grid>
                        </>
                    )}

                    <Grid item lg={12} xs={12}>
                        <MInput
                            name="companyName"
                            label="Company name"
                            placeholder=""
                            fullWidth
                            value={formik.values.companyName}
                            onChange={formik.handleChange}
                            meta={formik.getFieldMeta('companyName')}
                        />
                    </Grid>

                    <Grid item lg={12} xs={12}>
                        <MInput
                            name="licensePlate"
                            label="License plate"
                            fullWidth
                            value={formik.values.licensePlate}
                            onChange={formik.handleChange}
                            meta={formik.getFieldMeta('licensePlate')}
                            placeholder="e.g. AP 21 BP 7331"
                        />
                    </Grid>

                    <Grid item lg={12} xs={12}>
                        <MInput
                            style={{ width: '100%' }}
                            name="startDate"
                            label="Start date"
                            placeholder=""
                            fullWidth
                            type="date"
                            value={formik.values.startDate}
                            onChange={formik.handleChange}
                            meta={formik.getFieldMeta('startDate')}
                        />
                    </Grid>

                    <Grid item lg={12} xs={12}>
                        <MInput
                            style={{ width: '100%' }}
                            name="endDate"
                            label="End date"
                            placeholder=""
                            fullWidth
                            type="date"
                            value={formik.values.endDate}
                            onChange={formik.handleChange}
                            meta={formik.getFieldMeta('endDate')}
                        />
                    </Grid>

                    <Grid item lg={12} xs={12}>
                        <Box
                            display="grid"
                            gridTemplateColumns="repeat(2, 1fr)"
                            columnGap={SPACING[24]}>
                            <MInput
                                name="startTime"
                                label="Choose time"
                                placeholder="From"
                                fullWidth
                                value={formik.values.startTime}
                                onChange={formik.handleChange}
                                meta={formik.getFieldMeta('startTime')}
                                type={typeFrom}
                                onFocus={() => {
                                    settypeFrom('time');
                                }}
                                necessary={false}
                            />
                            <div style={{ margin: '-10px 0 0 0' }}>
                                <MInput
                                    name="endTime"
                                    placeholder="To"
                                    fullWidth
                                    type={typeTo}
                                    onFocus={() => {
                                        settypeTo('time');
                                    }}
                                    showEmptyLabelBox
                                    value={formik.values.endTime}
                                    onChange={formik.handleChange}
                                    meta={formik.getFieldMeta('endTime')}
                                />
                            </div>
                        </Box>
                    </Grid>
                </Grid>
            </div>

            <GS.modalButtonGroup>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={cabCreateMutation.isLoading}>
                    {row ? 'Save' : 'Add'}
                </Button>

                <Button variant="outlined" color="grey3" onClick={handleCancel}>
                    Cancel
                </Button>
            </GS.modalButtonGroup>
        </Box>
    );
};

const handleShowGateManagementCabModal = (refetch: () => {}, row) => {
    return newModal({
        Body: GateManagementCabModal,
        title: `Walk-in cab`,
        topBar: true,
        id: GateManagementCabModal.name,
        data: {
            row,
            refetch
        }
    });
};

export default handleShowGateManagementCabModal;
