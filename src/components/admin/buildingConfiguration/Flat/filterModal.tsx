import { FC } from 'react';
import { Select, Box, Button, MenuItem, Typography } from '@mui/material';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { MInputFormik } from '@/components/base/input/MInput';
import * as adminstyle from '@/components/admin/admin.style';
import { closeModal, newModal } from 'src/redux/actions/actions';
import { IModalBodyProps } from '@/components/shared/modals/types.modals';
import { RowTable } from '@/components/table/table_layout/types.table.layout';
import { MSelectFormik } from '@/components/base/input/MSelect';
import * as s from '../@styles';
import { useQueryClient, QueryClient } from 'react-query';
import { useSnackbar } from 'notistack';
import {
    useFlat_UpdateMutation,
    useComplex_GetComplexesQuery,
    useBlock_GetBlocksQuery,
    useFloor_GetFloorsQuery
} from 'src/graphql/generated';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import Down from 'src/assets/icons/Down';
import { flatFilterInitialForm } from '../data';
import { MSelect } from '@/components/base/input/MSelect';
import useUserFloorLocation from 'src/hooks/useUserFloorLocation';
const BuildingConfigurationFilterModal: FC<IModalBodyProps<RowTable>> = ({
    data: { state, setState }
}) => {
    const dispatch = useDispatch();

    const { formik, complexes, blocks, floors, flats } = useUserFloorLocation({
        initialValues: state,
        onSubmit,
        enableReinitialize: true
    });

    const handleCancel = () => {
        dispatch(closeModal(BuildingConfigurationFilterModal.name));
    };
    const handelReset = () => {
        setState(flatFilterInitialForm());
        dispatch(closeModal(BuildingConfigurationFilterModal.name));
    };
    async function onSubmit(data) {
        debugger;
        setState({
            ...data
        });

        dispatch(closeModal(BuildingConfigurationFilterModal.name));
    }

    return (
        <adminstyle.modalbox>
            <Formik enableReinitialize onSubmit={formik.handleSubmit} initialValues={state}>
                <Form>
                    <adminstyle.rowpage>
                        <adminstyle.cellpage>
                            <MSelect
                                style={{ width: '96%' }}
                                name="complexId"
                                label="Complex "
                                options={complexes}
                                value={formik.values.complexId}
                                onChange={formik.handleChange}
                                meta={formik.getFieldMeta('complexId')}
                                necessary={false}
                            />
                        </adminstyle.cellpage>
                        <adminstyle.cellpage>
                            <MSelect
                                style={{ width: '96%' }}
                                name="blockId"
                                label="Block "
                                options={blocks}
                                value={formik.values.blockId}
                                onChange={formik.handleChange}
                                meta={formik.getFieldMeta('blockId')}
                                necessary={false}
                            />
                        </adminstyle.cellpage>
                    </adminstyle.rowpage>
                    <adminstyle.rowpage>
                        <adminstyle.cellpage>
                            <MSelect
                                style={{ width: '96%' }}
                                name="floorId"
                                label="Floor "
                                options={floors}
                                value={formik.values.floorId}
                                onChange={formik.handleChange}
                                meta={formik.getFieldMeta('floorId')}
                                necessary={false}
                            />
                        </adminstyle.cellpage>
                        <adminstyle.cellpage>
                            <MSelect
                                style={{ width: '96%' }}
                                name="activeStatus"
                                label="Status"
                                options={[
                                    { option: 'Active', value: 'ACTIVE' },
                                    { option: 'Inactivate', value: 'INACTIVE' }
                                ]}
                                value={formik.values.activeStatus}
                                onChange={formik.handleChange}
                                meta={formik.getFieldMeta('activeStatus')}
                                necessary={false}
                            />
                        </adminstyle.cellpage>
                    </adminstyle.rowpage>

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
                        <adminstyle.boxReset>
                            <adminstyle.ResetButton onClick={handelReset}>
                                Reset filter
                            </adminstyle.ResetButton>
                        </adminstyle.boxReset>
                    </adminstyle.modalButtonGroup>
                </Form>
            </Formik>
        </adminstyle.modalbox>
    );
};

const handleShowBuildingConfigurationFilterModal = (state: any, setState: (data: any) => void) => {
    return newModal({
        Body: BuildingConfigurationFilterModal,
        title: 'Filter',
        topBar: true,
        id: BuildingConfigurationFilterModal.name,
        data: {
            setState,
            state
        }
    });
};

export default handleShowBuildingConfigurationFilterModal;
