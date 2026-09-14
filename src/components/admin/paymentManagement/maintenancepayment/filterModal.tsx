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
import useGetMaintenanceOptions from 'src/hooks/useGetMaintenanceOptions';
import { PaymentStatusOption } from 'src/data/options';
import useGetUtilityRateOptions from 'src/hooks/useGetUtilityRateOptions';
import Utils from '@/utils/utils';
import { MaintenanceFilterInitialForm, ValidationForm } from './data';

const PaymentsFilterModal: FC<IModalBodyProps<RowTable>> = ({ data: { state, setState } }) => {
    const maintenanceTypeOptions = useGetMaintenanceOptions();
    const utilityRateOptions = useGetUtilityRateOptions();
    const { formik, complexes, blocks, floors, flats } = useUserFloorLocation({
        initialValues: state,
        onSubmit,
        enableReinitialize: true,
        validationSchema: ValidationForm
    });
    const dispatch = useDispatch();

    const handleCancel = () => {
        dispatch(closeModal(PaymentsFilterModal.name));
    };

    async function onSubmit(data) {
        setState({
            ...data
            /* createdDate: data.createdDate,

            dueDate: data.dueDate*/
        });

        handleCancel();
    }

    const handleResetFilters = () => {
        setState(MaintenanceFilterInitialForm());

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
                            <MSelect
                                name="maintenanceTypeId"
                                label="Maintenance type"
                                options={maintenanceTypeOptions}
                                value={formik.values.maintenanceTypeId}
                                onChange={formik.handleChange}
                                meta={formik.getFieldMeta('maintenanceTypeId')}
                                necessary={false}
                            />
                        </adminstyle.modalFormRowFieldWrapper>
                    </Grid>

                    <Grid item lg={3} xs={12}>
                        <adminstyle.modalFormRowFieldWrapper>
                            <MInput
                                type="date"
                                name="createdDate"
                                label="From date"
                                value={formik.values.createdDate}
                                onChange={formik.handleChange}
                                meta={formik.getFieldMeta('createdDate')}
                                necessary={false}
                            />
                        </adminstyle.modalFormRowFieldWrapper>
                    </Grid>

                    <Grid item lg={3} xs={12}>
                        <adminstyle.modalFormRowFieldWrapper>
                            <MInput
                                type="date"
                                name="dueDate"
                                label="To date"
                                value={formik.values.dueDate}
                                onChange={formik.handleChange}
                                meta={formik.getFieldMeta('dueDate')}
                                necessary={false}
                            />
                        </adminstyle.modalFormRowFieldWrapper>
                    </Grid>

                    <Grid item lg={3} xs={12}>
                        <adminstyle.modalFormRowFieldWrapper>
                            <MSelect
                                name="paymentStatus"
                                label="Status"
                                options={PaymentStatusOption}
                                value={formik.values.paymentStatus}
                                onChange={formik.handleChange}
                                meta={formik.getFieldMeta('paymentStatus')}
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

const handleShowPaymentsFilterModal = (state: any, setState: (data: any) => void) => {
    return newModal({
        Body: PaymentsFilterModal,
        title: `Filter`,
        topBar: true,
        id: PaymentsFilterModal.name,
        data: {
            setState,
            state
        }
    });
};

export default handleShowPaymentsFilterModal;
