import { FC } from 'react';
import { Box, Button, Grid } from '@mui/material';
import { MInput } from '@/components/base/input/MInput';
import { MSelect } from '@/components/base/input/MSelect';
import * as adminstyle from '@/components/admin/admin.style';
import { closeModal, newModal } from 'src/redux/actions/actions';
import { IModalBodyProps } from '@/components/shared/modals/types.modals';
import { RowTable } from '@/components/table/table_layout/types.table.layout';
import { useDispatch } from 'react-redux';
import useUserFloorLocation from 'src/hooks/useUserFloorLocation';
import SPACING from '@/utils/theme/spacing';
import Utils from '@/utils/utils';
import { gateManagementFilterInitialForm } from './data';
import useGetApprovalStatusOptions from 'src/hooks/useGetApprovalStatusOptions';
import { ApprovalStatus } from 'src/graphql/generated';

const GateManagementFilterModal: FC<IModalBodyProps<RowTable>> = ({
    data: { state, setState }
}) => {
    const { formik, complexes, blocks, floors, flats } = useUserFloorLocation({
        initialValues: state,
        onSubmit,
        enableReinitialize: true
    });
    const approvalStatusOptions = useGetApprovalStatusOptions();

    const dispatch = useDispatch();

    const handleCancel = () => {
        dispatch(closeModal(GateManagementFilterModal.name));
    };

    async function onSubmit(data) {
        setState({
            ...data,
            start: data.start ? Utils.convertInputDateValueToDateTime(data.start) : undefined,
            end: data.end ? Utils.convertInputDateValueToDateTime(data.end) : undefined,
            securityCode:
                typeof data.securityCode === 'string' && data.securityCode !== ''
                    ? data.securityCode.trim()
                    : undefined
        });

        handleCancel();
    }

    const handleResetFilters = () => {
        setState(gateManagementFilterInitialForm());

        handleCancel();
    };

    return (
        <Box style={{ width: 1440, maxWidth: '90vw' }}>
            <form onSubmit={formik.handleSubmit}>
                <Grid container columnSpacing={{ md: SPACING[24] }}>
                    <Grid item lg={3} xs={12}>
                        <adminstyle.modalFormRowFieldWrapper>
                            <MSelect
                                name="complexId"
                                label="Complex Name"
                                options={complexes}
                                value={formik.values.complexId}
                                onChange={formik.handleChange}
                                meta={formik.getFieldMeta('complexId')}
                            />
                        </adminstyle.modalFormRowFieldWrapper>
                    </Grid>

                    <Grid item lg={3} xs={12}>
                        <adminstyle.modalFormRowFieldWrapper>
                            <MSelect
                                name="blockId"
                                label="Block Name"
                                options={blocks}
                                value={formik.values.blockId}
                                onChange={formik.handleChange}
                                meta={formik.getFieldMeta('blockId')}
                            />
                        </adminstyle.modalFormRowFieldWrapper>
                    </Grid>

                    <Grid item lg={3} xs={12}>
                        <adminstyle.modalFormRowFieldWrapper>
                            <MSelect
                                name="floorId"
                                label="Floor Name"
                                options={floors}
                                value={formik.values.floorId}
                                onChange={formik.handleChange}
                                meta={formik.getFieldMeta('floorId')}
                            />
                        </adminstyle.modalFormRowFieldWrapper>
                    </Grid>

                    <Grid item lg={3} xs={12}>
                        <adminstyle.modalFormRowFieldWrapper>
                            <MSelect
                                name="flatId"
                                label="Flat Number"
                                options={flats}
                                value={formik.values.flatId}
                                onChange={formik.handleChange}
                                meta={formik.getFieldMeta('flatId')}
                            />
                        </adminstyle.modalFormRowFieldWrapper>
                    </Grid>

                    <Grid item lg={3} xs={12}>
                        <adminstyle.modalFormRowFieldWrapper>
                            <MInput
                                name="securityCode"
                                label="Code"
                                placeholder="Text"
                                value={formik.values.securityCode}
                                onChange={formik.handleChange}
                                meta={formik.getFieldMeta('securityCode')}
                            />
                        </adminstyle.modalFormRowFieldWrapper>
                    </Grid>

                    <Grid item lg={3} xs={12}>
                        <adminstyle.modalFormRowFieldWrapper>
                            <MInput
                                type="date"
                                name="start"
                                label="From date"
                                value={Utils.convertDateTimeToInputDateValue(formik.values.start)}
                                onChange={formik.handleChange}
                                meta={formik.getFieldMeta('start')}
                            />
                        </adminstyle.modalFormRowFieldWrapper>
                    </Grid>

                    <Grid item lg={3} xs={12}>
                        <adminstyle.modalFormRowFieldWrapper>
                            <MInput
                                type="date"
                                name="end"
                                label="To date"
                                value={Utils.convertDateTimeToInputDateValue(formik.values.end)}
                                onChange={formik.handleChange}
                                meta={formik.getFieldMeta('end')}
                            />
                        </adminstyle.modalFormRowFieldWrapper>
                    </Grid>

                    <Grid item lg={3} xs={12}>
                        <adminstyle.modalFormRowFieldWrapper>
                            <MSelect
                                name="approvalStatus"
                                label="Status"
                                options={approvalStatusOptions.filter(
                                    (item) => item.value !== ApprovalStatus.Pending
                                )}
                                value={formik.values.approvalStatus}
                                onChange={formik.handleChange}
                                meta={formik.getFieldMeta('approvalStatus')}
                            />
                        </adminstyle.modalFormRowFieldWrapper>
                    </Grid>
                </Grid>

                <Box display="flex" alignItems="flex-end" justifyContent="space-between">
                    <Button onClick={handleResetFilters}>Reset filter</Button>

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
                </Box>
            </form>
        </Box>
    );
};

const handleShowGateManagementFilterModal = (state: any, setState: (data: any) => void) => {
    return newModal({
        Body: GateManagementFilterModal,
        title: `Filter`,
        topBar: true,
        id: GateManagementFilterModal.name,
        data: {
            setState,
            state
        }
    });
};

export default handleShowGateManagementFilterModal;
