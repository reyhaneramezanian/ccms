import { MSelect } from '@/components/base/input/MSelect';
import Utils from '@/utils/utils';
import { Box, Button, FormControlLabel, Grid, RadioGroup } from '@mui/material';
import {
    GateApprovalType,
    PackageLeavingLocation,
    useGateManagementDeliveryCreateMutation,
    useGateManagementDeliveryUpdateMutation,
    UserType,
    useUser_GetCurrentSecurityQuery
} from 'src/graphql/generated';
import useUserFloorLocation from 'src/hooks/useUserFloorLocation';
import { closeModal, newModal } from 'src/redux/actions/actions';
import { deliveryModalFormValidation, deliveryModalInitialForm } from './data';
import * as GS from '@/components/style';
import { MInput } from '@/components/base/input/MInput';
import SPACING from '@/utils/theme/spacing';
import RadioControl from '@/components/base/radioControl';
import { useGetUser } from 'src/auth/UserProvider';
import storageKeys from 'src/data/storageKeys';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';
import { RowTable } from '@/components/table/table_layout/types.table.layout';
import { useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';

const GateManagementDeliveryModal = ({ data: { refetch, row } }) => {
    const dispatch = useDispatch();
    const deliveryCreateMutation = useGateManagementDeliveryCreateMutation();
    const deliveryUpdateMutation = useGateManagementDeliveryUpdateMutation();
    const [typeFrom, settypeFrom] = useState('text');
    const [typeTo, settypeTo] = useState('text');
    const user = useGetUser();
    const mutationErrorHandler = useMutationErrorHandler();
    const hasUser = typeof user === 'object' && user !== null;
    const { data: datacurentsecurity } = useUser_GetCurrentSecurityQuery();
    const deliveryModalInitialForm = (row?: RowTable) => ({
        complexId: datacurentsecurity?.user_getCurrentSecurity?.result?.complexId || undefined,
        blockId: row?.blockId || undefined,
        flatId: row?.flatId || undefined,
        floorId: row?.floorId || undefined,
        date: row?.date || Utils.convertDateTimeToInputDateValue(),
        fromTime: row?.fromTime || undefined,
        toTime: row?.toTime || undefined,
        companyName: row?.companyName || '',
        additionalInformation: row?.additionalInformation || undefined,
        packageLeavingLocation: row?.packageLeavingLocation || PackageLeavingLocation.AtTheGate
    });

    const { formik, complexes, blocks, floors, flats } = useUserFloorLocation({
        initialValues: deliveryModalInitialForm(row),
        onSubmit,
        enableReinitialize: true,
        validationSchema: hasUser && deliveryModalFormValidation(user.userType)
    });

    const handleCancel = () => {
        dispatch(closeModal(GateManagementDeliveryModal.name));
    };

    function onSubmit(data) {
        if (row) {
            deliveryUpdateMutation.mutate(
                {
                    input: {
                        id: row.id,
                        dateOfDelivery: data.date,
                        companyName: data.companyName,
                        startTime: Utils.convertTimeToTimeSpan(data.fromTime),
                        endTime: Utils.convertTimeToTimeSpan(data.toTime),
                        additionalInformation: data.additionalInformation,
                        // gateApprovalType: GateApprovalType.Delivery,
                        packageLeavingLocation: data.packageLeavingLocation,
                        flatId: data.flatId
                    }
                },
                {
                    onSuccess: () => {
                        handleCancel();

                        refetch();
                    },
                    onError: (error) => {
                        mutationErrorHandler(error, 'gateApproval_createDelivery');
                    }
                }
            );
        } else {
            deliveryCreateMutation.mutate(
                {
                    input: {
                        dateOfDelivery: data.date,
                        companyName: data.companyName,
                        startTime: Utils.convertTimeToTimeSpan(data.fromTime),
                        endTime: Utils.convertTimeToTimeSpan(data.toTime),
                        additionalInformation: data.additional,
                        //gateApprovalType: GateApprovalType.Delivery,
                        packageLeavingLocation: data.packageLeavingLocation,
                        flatId: data.flatId
                    }
                },
                {
                    onSuccess: () => {
                        handleCancel();

                        refetch();
                    },
                    onError: (error) => {
                        mutationErrorHandler(error, 'gateApproval_createDelivery');
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
                                    label="Block "
                                    options={blocks}
                                    value={formik.values.blockId}
                                    onChange={formik.handleChange}
                                    meta={formik.getFieldMeta('blockId')}
                                />
                            </Grid>

                            <Grid item lg={12} xs={12}>
                                <MSelect
                                    name="floorId"
                                    label="Floor "
                                    options={floors}
                                    value={formik.values.floorId}
                                    onChange={formik.handleChange}
                                    meta={formik.getFieldMeta('floorId')}
                                />
                            </Grid>

                            <Grid item lg={12} xs={12}>
                                <MSelect
                                    name="flatId"
                                    label="Flat "
                                    options={flats}
                                    value={formik.values.flatId}
                                    onChange={formik.handleChange}
                                    meta={formik.getFieldMeta('flatId')}
                                />
                            </Grid>
                        </>
                    )}

                    <Grid item lg={12} xs={12}>
                        <MInput
                            style={{ width: '100%' }}
                            name="date"
                            label="Date of delivery"
                            placeholder=""
                            fullWidth
                            type="date"
                            value={formik.values.date}
                            onChange={formik.handleChange}
                            meta={formik.getFieldMeta('date')}
                        />
                    </Grid>

                    <Grid item lg={12} xs={12}>
                        <Box
                            display="grid"
                            gridTemplateColumns="repeat(2, 1fr)"
                            columnGap={SPACING[24]}>
                            <MInput
                                name="fromTime"
                                label="Choose time"
                                placeholder="From"
                                fullWidth
                                type={typeFrom}
                                onFocus={() => {
                                    settypeFrom('time');
                                }}
                                value={formik.values.fromTime}
                                onChange={formik.handleChange}
                                meta={formik.getFieldMeta('fromTime')}
                                necessary={false}
                            />
                            <div style={{ margin: '-10px 0 0 0' }}>
                                <MInput
                                    name="toTime"
                                    placeholder="To"
                                    fullWidth
                                    showEmptyLabelBox
                                    value={formik.values.toTime}
                                    onChange={formik.handleChange}
                                    meta={formik.getFieldMeta('toTime')}
                                    type={typeTo}
                                    onFocus={() => {
                                        settypeTo('time');
                                    }}
                                />
                            </div>
                        </Box>
                    </Grid>

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
                            name="additionalInformation"
                            label="Additional information"
                            placeholder=""
                            fullWidth
                            multiline
                            maxRows={3}
                            value={formik.values.additionalInformation}
                            onChange={formik.handleChange}
                            meta={formik.getFieldMeta('additionalInformation')}
                            necessary={false}
                        />
                    </Grid>

                    <Grid item lg={12} xs={12}>
                        <RadioGroup
                            row
                            aria-labelledby="packageLeavingLocation"
                            value={formik.values.packageLeavingLocation}
                            name="packageLeavingLocation"
                            onChange={formik.handleChange}>
                            <FormControlLabel
                                value={PackageLeavingLocation.AtTheGate}
                                label="Leave at the gate"
                                control={<RadioControl />}
                            />

                            <FormControlLabel
                                value={PackageLeavingLocation.AtTheDoor}
                                label="Leave at the door"
                                control={<RadioControl />}
                            />
                        </RadioGroup>
                    </Grid>
                </Grid>
            </div>

            <GS.modalButtonGroup>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={deliveryCreateMutation.isLoading || deliveryUpdateMutation.isLoading}>
                    {row ? 'Save' : 'Add'}
                </Button>

                <Button variant="outlined" color="grey3" onClick={handleCancel}>
                    Cancel
                </Button>
            </GS.modalButtonGroup>
        </Box>
    );
};

const handleShowGateManagementDeliveryModal = (refetch: () => void, row?: RowTable) => {
    return newModal({
        Body: GateManagementDeliveryModal,
        title: `Walk-in delivery`,
        topBar: true,
        id: GateManagementDeliveryModal.name,
        data: { refetch, row }
    });
};

export default handleShowGateManagementDeliveryModal;
