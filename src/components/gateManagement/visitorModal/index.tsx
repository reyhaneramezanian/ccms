import { MSelect } from '@/components/base/input/MSelect';
import Utils from '@/utils/utils';
import { Box, Button, FormControlLabel, Grid, RadioGroup } from '@mui/material';
import { useDispatch } from 'react-redux';
import {
    GateApprovalType,
    useGateManagementFrequentVisitorCreateMutation,
    useGateManagementFrequentVisitorUpdateMutation,
    useGateManagementOneTimeVisitorCreateMutation,
    useGateManagementOneTimeVisitorUpdateMutation,
    UserType,
    useUser_GetCurrentSecurityQuery
} from 'src/graphql/generated';
import useUserFloorLocation from 'src/hooks/useUserFloorLocation';
import { closeModal, newModal } from 'src/redux/actions/actions';
import { visitorModalValidationForm } from './data';
import * as GS from '@/components/style';
import { MInput } from '@/components/base/input/MInput';
import SPACING from '@/utils/theme/spacing';
import RadioControl from '@/components/base/radioControl';
import { useGetUser } from 'src/auth/UserProvider';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';
import storageKeys from 'src/data/storageKeys';
import { RowTable } from '@/components/table/table_layout/types.table.layout';
import React, { useState, useEffect } from 'react';

const GateManagementVisitorModal = ({ data: { refetch, approvalType, row } }) => {
    const dispatch = useDispatch();
    const frequentVisitorCreateMutation = useGateManagementFrequentVisitorCreateMutation();
    const frequentVisitorUpdateMutation = useGateManagementFrequentVisitorUpdateMutation();
    const frequentOneTimeVisitorCreateMutation = useGateManagementOneTimeVisitorCreateMutation();
    const frequentOneTimeVisitorUpdateMutation = useGateManagementOneTimeVisitorUpdateMutation();
    const user = useGetUser();
    const [typeFrom, settypeFrom] = useState('text');
    const [typeTo, settypeTo] = useState('text');

    const { data: datacurentsecurity } = useUser_GetCurrentSecurityQuery();

    const visitorModalInitialForm = (row?: RowTable, approvalType?: GateApprovalType) => {
        return {
            complexId: datacurentsecurity?.user_getCurrentSecurity?.result?.complexId || undefined,
            blockId: row?.blockId || undefined,
            floorId: row?.floorId || undefined,
            flatId: row?.flatId || undefined,
            visitorFirstName: row?.visitorFirstName || '',
            visitorLastName: row?.visitorLastName || '',
            visitorPhoneNumber: row?.visitorPhoneNumber || '',
            licensePlate: row?.licensePlate || '',
            gateApprovalType: approvalType || GateApprovalType.FrequentVisitor,
            startDate: row?.startDate || Utils.convertDateTimeToInputDateValue(),
            endDate: row?.endDate || Utils.convertDateTimeToInputDateValue(),
            dateOfVisit: row?.date || Utils.convertDateTimeToInputDateValue(),
            startTime: row?.fromTime || undefined,
            endTime: row?.toTime || undefined
        };
    };
    const initialValues = visitorModalInitialForm(row, approvalType);
    const [gateApprovalType, setGateApprovalType] = useState(initialValues.gateApprovalType);

    const hasUser = typeof user === 'object' && user !== null;
    const { formik, complexes, blocks, floors, flats } = useUserFloorLocation({
        initialValues,
        onSubmit,
        enableReinitialize: true,
        validationSchema:
            hasUser && visitorModalValidationForm(user.userType, gateApprovalType as any)
    });
    const mutationErrorHandler = useMutationErrorHandler();

    useEffect(() => {
        setGateApprovalType(formik.values.gateApprovalType);
    }, [formik.values.gateApprovalType]);

    const handleCancel = () => {
        dispatch(closeModal(GateManagementVisitorModal.name));
    };

    function onSubmit(data) {
        debugger;
        if (gateApprovalType === GateApprovalType.FrequentVisitor) {
            if (row) {
                frequentVisitorUpdateMutation.mutate(
                    {
                        input: {
                            id: row.id,
                            visitorFirstName: data.visitorFirstName,
                            visitorLastName: data.visitorFirstName,
                            visitorPhoneNumber: data.visitorPhoneNumber,
                            licensePlate: data.licensePlate,
                            // gateApprovalType: data.gateApprovalType,
                            flatId: data.flatId,
                            startDate: data.startDate,
                            endDate: data.endDate
                        }
                    },
                    {
                        onSuccess: () => {
                            handleCancel();

                            refetch();
                        },
                        onError: (err) => {
                            mutationErrorHandler(err, 'gateApproval_createOneTimeVisitor');
                        }
                    }
                );
            } else {
                frequentVisitorCreateMutation.mutate(
                    {
                        input: {
                            visitorFirstName: data.visitorFirstName,
                            visitorLastName: data.visitorFirstName,
                            visitorPhoneNumber: data.visitorPhoneNumber,
                            licensePlate: data.licensePlate,
                            // gateApprovalType: data.gateApprovalType,
                            flatId: data.flatId,
                            startDate: data.startDate,
                            endDate: data.endDate
                        }
                    },
                    {
                        onSuccess: () => {
                            handleCancel();

                            refetch();
                        },
                        onError: (err) => {
                            mutationErrorHandler(err, 'gateApproval_createOneTimeVisitor');
                        }
                    }
                );
            }

            return;
        }

        if (row) {
            frequentOneTimeVisitorUpdateMutation.mutate(
                {
                    input: {
                        id: row.id,
                        visitorFirstName: data.visitorFirstName,
                        visitorLastName: data.visitorFirstName,
                        visitorPhoneNumber: data.visitorPhoneNumber,
                        licensePlate: data.licensePlate,
                        // gateApprovalType: data.gateApprovalType,
                        flatId: data.flatId,
                        dateOfVisit: data.dateOfVisit,
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
            frequentOneTimeVisitorCreateMutation.mutate(
                {
                    input: {
                        visitorFirstName: data.visitorFirstName,
                        visitorLastName: data.visitorFirstName,
                        visitorPhoneNumber: data.visitorPhoneNumber,
                        licensePlate: data.licensePlate,
                        // gateApprovalType: data.gateApprovalType,
                        flatId: data.flatId,
                        dateOfVisit: data.dateOfVisit,
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
                            name="visitorFirstName"
                            label="Visitor first name"
                            fullWidth
                            value={formik.values.visitorFirstName}
                            onChange={formik.handleChange}
                            meta={formik.getFieldMeta('visitorFirstName')}
                        />
                    </Grid>

                    <Grid item lg={12} xs={12}>
                        <MInput
                            name="visitorLastName"
                            label="Visitor last name"
                            fullWidth
                            value={formik.values.visitorLastName}
                            onChange={formik.handleChange}
                            meta={formik.getFieldMeta('visitorLastName')}
                        />
                    </Grid>

                    <Grid item lg={12} xs={12}>
                        <MInput
                            name="visitorPhoneNumber"
                            label="Visitor phone number"
                            fullWidth
                            value={formik.values.visitorPhoneNumber}
                            onChange={formik.handleChange}
                            meta={formik.getFieldMeta('visitorPhoneNumber')}
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

                    {typeof approvalType === 'undefined' && (
                        <Grid item lg={12} xs={12}>
                            <RadioGroup
                                style={{ marginBottom: 24 }}
                                row
                                aria-labelledby="gateApprovalType"
                                value={formik.values.gateApprovalType}
                                name="gateApprovalType"
                                onChange={formik.handleChange}>
                                <FormControlLabel
                                    value={GateApprovalType.FrequentVisitor}
                                    label="Frequent visitor"
                                    control={<RadioControl />}
                                />

                                <FormControlLabel
                                    value={GateApprovalType.OneTimeVisitor}
                                    label="One time visitor"
                                    control={<RadioControl />}
                                />
                            </RadioGroup>
                        </Grid>
                    )}

                    {gateApprovalType === GateApprovalType.FrequentVisitor && (
                        <>
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
                        </>
                    )}

                    {gateApprovalType === GateApprovalType.OneTimeVisitor && (
                        <>
                            <Grid item lg={12} xs={12}>
                                <MInput
                                    style={{ width: '100%' }}
                                    name="dateOfVisit"
                                    label="Date of visit"
                                    placeholder=""
                                    fullWidth
                                    type="date"
                                    value={formik.values.dateOfVisit}
                                    onChange={formik.handleChange}
                                    meta={formik.getFieldMeta('dateOfVisit')}
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
                        </>
                    )}
                </Grid>
            </div>

            <GS.modalButtonGroup>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={
                        frequentOneTimeVisitorCreateMutation.isLoading ||
                        frequentVisitorCreateMutation.isLoading ||
                        frequentOneTimeVisitorUpdateMutation.isLoading ||
                        frequentVisitorUpdateMutation.isLoading
                    }>
                    {row ? 'Save' : 'Add'}
                </Button>

                <Button variant="outlined" color="grey3" onClick={handleCancel}>
                    Cancel
                </Button>
            </GS.modalButtonGroup>
        </Box>
    );
};

const handleShowGateManagementVisitorModal = (
    refetch: () => {},
    row?: RowTable,
    approvalType?: GateApprovalType
) => {
    return newModal({
        Body: GateManagementVisitorModal,
        title: `Walk-in visitor`,
        topBar: true,
        id: GateManagementVisitorModal.name,
        data: {
            refetch,
            approvalType,
            row
        }
    });
};

export default handleShowGateManagementVisitorModal;
