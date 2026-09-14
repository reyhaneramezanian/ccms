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
import { gateManagementHistoryFilterInitialForm } from './data';
import useGetApprovalStatusOptions from 'src/hooks/useGetApprovalStatusOptions';
import { ApprovalStatus } from 'src/graphql/generated';

const GateManagementHistoryFilterModal: FC<IModalBodyProps<RowTable>> = ({
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
        dispatch(closeModal(GateManagementHistoryFilterModal.name));
    };

    async function onSubmit(data) {
        debugger;
        setState({
            ...data,

            securityCode:
                typeof data.securityCode === 'string' && data.securityCode !== ''
                    ? data.securityCode.trim()
                    : undefined
        });

        handleCancel();
    }

    const handleResetFilters = () => {
        setState(gateManagementHistoryFilterInitialForm());

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
                                label="Complex "
                                options={complexes}
                                value={formik.values.complexId}
                                onChange={formik.handleChange}
                                meta={formik.getFieldMeta('complexId')}
                                necessary={false}
                            />
                        </adminstyle.modalFormRowFieldWrapper>
                    </Grid>

                    <Grid item lg={3} xs={12}>
                        <adminstyle.modalFormRowFieldWrapper>
                            <MSelect
                                name="blockId"
                                label="Block "
                                options={blocks}
                                value={formik.values.blockId}
                                onChange={formik.handleChange}
                                meta={formik.getFieldMeta('blockId')}
                                necessary={false}
                            />
                        </adminstyle.modalFormRowFieldWrapper>
                    </Grid>

                    <Grid item lg={3} xs={12}>
                        <adminstyle.modalFormRowFieldWrapper>
                            <MSelect
                                name="floorId"
                                label="Floor "
                                options={floors}
                                value={formik.values.floorId}
                                onChange={formik.handleChange}
                                meta={formik.getFieldMeta('floorId')}
                                necessary={false}
                            />
                        </adminstyle.modalFormRowFieldWrapper>
                    </Grid>

                    <Grid item lg={3} xs={12}>
                        <adminstyle.modalFormRowFieldWrapper>
                            <MSelect
                                name="flatId"
                                label="Flat "
                                options={flats}
                                value={formik.values.flatId}
                                onChange={formik.handleChange}
                                meta={formik.getFieldMeta('flatId')}
                                necessary={false}
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
                                necessary={false}
                            />
                        </adminstyle.modalFormRowFieldWrapper>
                    </Grid>

                    <Grid item lg={3} xs={12}>
                        <adminstyle.modalFormRowFieldWrapper>
                            <MInput
                                type="date"
                                name="start"
                                label="From date"
                                value={formik.values.start}
                                onChange={formik.handleChange}
                                meta={formik.getFieldMeta('start')}
                                necessary={false}
                            />
                        </adminstyle.modalFormRowFieldWrapper>
                    </Grid>

                    <Grid item lg={3} xs={12}>
                        <adminstyle.modalFormRowFieldWrapper>
                            <MInput
                                type="date"
                                name="end"
                                label="To date"
                                value={formik.values.end}
                                onChange={formik.handleChange}
                                meta={formik.getFieldMeta('end')}
                                necessary={false}
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
                                necessary={false}
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

const handleShowGateManagementHistoryFilterModal = (state: any, setState: (data: any) => void) => {
    return newModal({
        Body: GateManagementHistoryFilterModal,
        title: `Filter`,
        topBar: true,
        id: GateManagementHistoryFilterModal.name,
        data: {
            setState,
            state
        }
    });
};

export default handleShowGateManagementHistoryFilterModal;
