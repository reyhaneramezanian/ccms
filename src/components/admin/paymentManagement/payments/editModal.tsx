import { FC } from 'react';
import { Alert, Box, Button, Grid, Typography } from '@mui/material';
import { MInput } from '@/components/base/input/MInput';
import { MSelect } from '@/components/base/input/MSelect';
import * as adminstyle from '@/components/admin/admin.style';
import { closeModal, newModal } from 'src/redux/actions/actions';
import { IModalBodyProps } from '@/components/shared/modals/types.modals';
import { RowTable } from '@/components/table/table_layout/types.table.layout';
import { useDispatch } from 'react-redux';
import { paymentsInitialForm, paymentsValidationForm } from './data';
import useUserFloorLocation from 'src/hooks/useUserFloorLocation';
import SPACING from '@/utils/theme/spacing';
import useGetMaintenanceOptions from 'src/hooks/useGetMaintenanceOptions';
import {
    useAdminPaymentManagementCreateMutation,
    useAdminPaymentManagementUpdateMutation,
    useTotalbuildingQuery,
    ActiveStatus,
    UserType
} from 'src/graphql/generated';
import INR from 'src/assets/icons/INR';
import Utils from '@/utils/utils';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';
import COLORS from '@/utils/theme/colors';
import { useGetUser } from 'src/auth/UserProvider';
import storageKeys from 'src/data/storageKeys';

const PaymentsEditModal: FC<IModalBodyProps<RowTable>> = ({ data: { row, refetch } }) => {
    const { data: totalbuilding } = useTotalbuildingQuery();
    const user = useGetUser();

    const maintenanceTypeOptions = useGetMaintenanceOptions({
        take: totalbuilding?.maintenanceType_getMaintenanceTypes?.result?.totalCount,
        where: { activeStatus: { eq: ActiveStatus.Active } }
    });
    const { formik, complexes, blocks, floors, flats } = useUserFloorLocation({
        initialValues: paymentsInitialForm(row),
        onSubmit,
        validationSchema: paymentsValidationForm,
        enableReinitialize: true
    });
    const paymentCreateMutation = useAdminPaymentManagementCreateMutation();
    const paymentUpdateMutation = useAdminPaymentManagementUpdateMutation();
    const mutationErrorHandler = useMutationErrorHandler();
    const dispatch = useDispatch();

    async function onSubmit(data) {
        if (row) {
            await paymentUpdateMutation.mutateAsync(
                {
                    input: {
                        id: row?.id,
                        flatId: data.flatId,
                        amount: +data.amount,
                        maintenanceTypeId: data.maintenanceTypeId,
                        dueDate: data.dueDate,
                        comment: data.comment
                    }
                },
                {
                    onError(err) {
                        mutationErrorHandler(err, 'payment_update');
                    }
                }
            );
        } else {
            await paymentCreateMutation.mutateAsync(
                {
                    input: {
                        complexId: data.complexId,
                        blockId: data.blockId,
                        floorId: data.floorId,
                        flatId: data.flatId,
                        amount: +data.amount,
                        maintenanceTypeId: data.maintenanceTypeId,
                        dueDate: data.dueDate,
                        comment: data.comment
                    }
                },
                {
                    onError(err) {
                        mutationErrorHandler(err, 'payment_create');
                    }
                }
            );
        }

        if (typeof refetch === 'function') {
            refetch();
        }

        dispatch(closeModal(PaymentsEditModal.name));
    }

    const handleCancel = () => {
        dispatch(closeModal(PaymentsEditModal.name));
    };

    return (
        <Box style={{ width: 1440, maxWidth: '90vw' }}>
            <Alert
                style={{ background: '#EAF5FD', padding: '15px 24px', marginBottom: 24 }}
                icon={<></>}>
                <Typography variant="body2" color={COLORS.black2}>
                    More description example Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry’s standard dummy text
                    ever since the 1500s, when an unknown printer took a galley of type and
                    scrambled it to
                </Typography>
            </Alert>

            <form onSubmit={formik.handleSubmit}>
                <Grid container columnSpacing={{ md: SPACING[24] }}>
                    <Grid item lg={3} xs={12}>
                        <adminstyle.modalFormRowFieldWrapper>
                            <MSelect
                                name="complexId"
                                label="Complex"
                                options={complexes}
                                value={formik.values.complexId}
                                onChange={formik.handleChange}
                                disabled={row}
                                meta={formik.getFieldMeta('complexId')}
                            />
                        </adminstyle.modalFormRowFieldWrapper>
                    </Grid>

                    <Grid item lg={3} xs={12}>
                        <adminstyle.modalFormRowFieldWrapper>
                            <MSelect
                                name="blockId"
                                label="Block"
                                options={blocks}
                                value={formik.values.blockId}
                                disabled={row}
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
                                label="Floor"
                                options={floors}
                                value={formik.values.floorId}
                                disabled={row}
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
                                label="Flat"
                                options={flats}
                                value={formik.values.flatId}
                                onChange={formik.handleChange}
                                meta={formik.getFieldMeta('flatId')}
                                disabled={row}
                                necessary={false}
                            />
                        </adminstyle.modalFormRowFieldWrapper>
                    </Grid>

                    <Grid item lg={3} xs={12}>
                        <adminstyle.modalFormRowFieldWrapper>
                            <adminstyle.divamountinput>
                                <MInput
                                    name="amount"
                                    type="number"
                                    label="Amount"
                                    value={formik.values.amount}
                                    onChange={formik.handleChange}
                                    meta={formik.getFieldMeta('amount')}
                                    margin={true}
                                />
                                <adminstyle.divamount>
                                    <INR />
                                </adminstyle.divamount>
                            </adminstyle.divamountinput>
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
                            />
                        </adminstyle.modalFormRowFieldWrapper>
                    </Grid>

                    <Grid item lg={3} xs={12}>
                        <adminstyle.modalFormRowFieldWrapper>
                            <MInput
                                type="date"
                                name="dueDate"
                                label="Due date"
                                value={formik.values.dueDate}
                                onChange={formik.handleChange}
                                meta={formik.getFieldMeta('dueDate')}
                                disabled={row}
                            />
                        </adminstyle.modalFormRowFieldWrapper>
                    </Grid>

                    <Grid item xs={12}>
                        <adminstyle.modalFormRowFieldWrapper>
                            <MInput
                                necessary={false}
                                name="comment"
                                label="Comment"
                                value={formik.values.comment}
                                onChange={formik.handleChange}
                                meta={formik.getFieldMeta('comment')}
                            />
                        </adminstyle.modalFormRowFieldWrapper>
                    </Grid>
                </Grid>

                <adminstyle.modalButtonGroup>
                    <Box>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={
                                paymentCreateMutation.isLoading || paymentUpdateMutation.isLoading
                            }>
                            Save
                        </Button>
                    </Box>

                    <Box>
                        <Button variant="outlined" color="grey3" onClick={handleCancel}>
                            Cancel
                        </Button>
                    </Box>
                </adminstyle.modalButtonGroup>
            </form>
        </Box>
    );
};

const handleShowPaymentsEditModal = (refetch, row?: RowTable) => {
    return newModal({
        Body: PaymentsEditModal,
        title: `${row ? 'Edit' : 'Add'} payment`,
        topBar: true,
        id: PaymentsEditModal.name,
        data: { refetch, row }
    });
};

export default handleShowPaymentsEditModal;
