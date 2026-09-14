import { FC } from 'react';
import { Box, Button, Grid } from '@mui/material';
import { MInput } from '@/components/base/input/MInput';
import { MSelect } from '@/components/base/input/MSelect';
import { closeModal, newModal } from 'src/redux/actions/actions';
import { IModalBodyProps } from '@/components/shared/modals/types.modals';
import { RowTable } from '@/components/table/table_layout/types.table.layout';
import { useDispatch } from 'react-redux';
import useUserFloorLocation from 'src/hooks/useUserFloorLocation';
import SPACING from '@/utils/theme/spacing';
import { AlertTypeOptions } from 'src/data/options';
import Utils from '@/utils/utils';
import { alertSystemFilterInitialForm } from './data';
import * as GlobalStyle from '@/components/style';

const AlertSystemFilterModal: FC<IModalBodyProps<RowTable>> = ({ data: { state, setState } }) => {
    const { formik, complexes, blocks, floors, flats } = useUserFloorLocation({
        initialValues: state,
        onSubmit,
        enableReinitialize: true
    });
    const dispatch = useDispatch();

    const handleCancel = () => {
        dispatch(closeModal(AlertSystemFilterModal.name));
    };

    async function onSubmit(data) {
        setState({
            ...data
        });

        handleCancel();
    }

    const handleResetFilters = () => {
        setState(alertSystemFilterInitialForm());

        handleCancel();
    };

    return (
        <Box style={{ width: 1440, maxWidth: '90vw' }}>
            <form onSubmit={formik.handleSubmit}>
                <Grid container columnSpacing={{ md: SPACING[24] }}>
                    <Grid item lg={3} xs={12}>
                        <MSelect
                            name="complexId"
                            label="Complex "
                            options={complexes}
                            value={formik.values.complexId}
                            onChange={formik.handleChange}
                            meta={formik.getFieldMeta('complexId')}
                            necessary={false}
                        />
                    </Grid>

                    <Grid item lg={3} xs={12}>
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

                    <Grid item lg={3} xs={12}>
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

                    <Grid item lg={3} xs={12}>
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

                    <Grid item lg={3} xs={12}>
                        <MSelect
                            name="alertType"
                            label="Type"
                            options={AlertTypeOptions}
                            value={formik.values.alertType}
                            onChange={formik.handleChange}
                            meta={formik.getFieldMeta('alertType')}
                            necessary={false}
                        />
                    </Grid>

                    <Grid item lg={3} xs={12}>
                        <MInput
                            type="date"
                            name="date"
                            label="From date"
                            value={formik.values.date}
                            onChange={formik.handleChange}
                            meta={formik.getFieldMeta('date')}
                            necessary={false}
                        />
                    </Grid>
                </Grid>

                <Box display="flex" alignItems="flex-end" justifyContent="space-between">
                    <Button onClick={handleResetFilters}>Reset filter</Button>

                    <GlobalStyle.modalButtonGroup>
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
                    </GlobalStyle.modalButtonGroup>
                </Box>
            </form>
        </Box>
    );
};

const handleShowAlertSystemFilter = (state: any, setState: (data: any) => void) => {
    return newModal({
        Body: AlertSystemFilterModal,
        title: `Filter`,
        topBar: true,
        id: AlertSystemFilterModal.name,
        data: {
            setState,
            state
        }
    });
};

export default handleShowAlertSystemFilter;
