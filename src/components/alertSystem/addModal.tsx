import { FC } from 'react';
import { Box, Button, Grid } from '@mui/material';
import { closeModal, newModal } from 'src/redux/actions/actions';
import { IModalBodyProps } from '@/components/shared/modals/types.modals';
import { RowTable } from '@/components/table/table_layout/types.table.layout';
import { useDispatch } from 'react-redux';
import useUserFloorLocation from 'src/hooks/useUserFloorLocation';
import * as GlobalStyle from '@/components/style';
import { MSelect } from '../base/input/MSelect';
import {
    useAlertSystemCreateMutation,
    useUser_GetCurrentSecurityQuery
} from 'src/graphql/generated';
import useGetAlertSystemType from 'src/hooks/useGetAlertSystemType';
import { MInput } from '../base/input/MInput';
import { alertSystemAddModalInitialForm, alertSystemAddModalFormValidation } from './data';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';
import Utils from '@/utils/utils';

const AlertSystemAddModal: FC<IModalBodyProps<RowTable>> = ({ data: { refetch } }) => {
    const { data: datacurentsecurity } = useUser_GetCurrentSecurityQuery();

    const alertSystemAddModalInitialForm = () => {
        return {
            alertType: undefined,
            date: Utils.convertDateTimeToInputDateValue(),
            description: undefined,
            complexId: datacurentsecurity?.user_getCurrentSecurity?.result?.complexId
        };
    };

    const { formik, complexes, blocks, floors, flats } = useUserFloorLocation({
        initialValues: alertSystemAddModalInitialForm(),
        onSubmit,
        enableReinitialize: true,
        validationSchema: alertSystemAddModalFormValidation()
    });
    const dispatch = useDispatch();
    const alertSystemTypesOption = useGetAlertSystemType();
    const alertSystemCreateMutation = useAlertSystemCreateMutation();
    const mutationErrorHandler = useMutationErrorHandler();

    const handleCancel = () => {
        dispatch(closeModal(AlertSystemAddModal.name));
    };

    async function onSubmit(data) {
        alertSystemCreateMutation.mutate(
            {
                input: {
                    complexId: data.complexId,
                    blockId: data.blockId,
                    floorId: data.blockId,
                    flatId: data.flatId,
                    alertType: data.alertType,
                    date: data.date,
                    description: data.description
                }
            },
            {
                onSuccess() {
                    refetch();

                    handleCancel();
                },
                onError: (error) => {
                    mutationErrorHandler(error, 'alert_create');
                }
            }
        );
    }

    return (
        <Box style={{ width: 440, maxWidth: '90vw' }}>
            <form onSubmit={formik.handleSubmit}>
                <Grid>
                    <Grid item lg={12} xs={12}>
                        <MSelect
                            name="blockId"
                            label="Block "
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
                            label="Floor "
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
                            label="Flat "
                            options={flats}
                            value={formik.values.flatId}
                            onChange={formik.handleChange}
                            meta={formik.getFieldMeta('flatId')}
                            necessary={false}
                        />
                    </Grid>

                    <Grid item lg={12} xs={12}>
                        <MSelect
                            name="alertType"
                            label="Type"
                            options={alertSystemTypesOption}
                            value={formik.values.alertType}
                            onChange={formik.handleChange}
                            meta={formik.getFieldMeta('alertType')}
                        />
                    </Grid>

                    <Grid item lg={12}>
                        <MInput
                            style={{ width: '100%' }}
                            name="date"
                            label="Date"
                            fullWidth
                            type="date"
                            value={formik.values.date}
                            onChange={formik.handleChange}
                            meta={formik.getFieldMeta('date')}
                        />
                    </Grid>

                    <Grid item lg={12} xs={12}>
                        <MInput
                            name="description"
                            label="Additional information"
                            placeholder=""
                            fullWidth
                            multiline
                            maxRows={3}
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            meta={formik.getFieldMeta('description')}
                            necessary={false}
                        />
                    </Grid>
                </Grid>

                <GlobalStyle.modalButtonGroup>
                    <Box>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={alertSystemCreateMutation.isLoading}>
                            Save
                        </Button>
                    </Box>

                    <Box>
                        <Button variant="outlined" color="grey3" onClick={handleCancel}>
                            Cancel
                        </Button>
                    </Box>
                </GlobalStyle.modalButtonGroup>
            </form>
        </Box>
    );
};

const handleShowAlertSystemAddModal = (refetch) => {
    return newModal({
        Body: AlertSystemAddModal,
        title: `Add security alert`,
        topBar: true,
        id: AlertSystemAddModal.name,
        data: {
            refetch
        }
    });
};

export default handleShowAlertSystemAddModal;
