import { Select, Box, Button, MenuItem, Typography } from '@mui/material';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import * as adminstyle from '@/components/admin/admin.style';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, newModal } from 'src/redux/actions/actions';
import { IModalBodyProps } from '@/components/shared/modals/types.modals';
import { FC } from 'react';
import useManageTab from 'src/hooks/useManageTab';
import React, { useEffect, useState } from 'react';
import * as staffstyle from '../staff.style';
import { FilterInitialForm } from './data';
import { MSelect } from '@/components/base/input/MSelect';
import useUserFloorLocation from 'src/hooks/useUserFloorLocation';
import { MInput } from '@/components/base/input/MInput';
import { RowTable } from '@/components/table/table_layout/types.table.layout';

const FilterModal: FC<IModalBodyProps<RowTable>> = ({ data: { state, setState } }) => {
    const dispatch = useDispatch();

    const { formik, complexes, blocks, floors, flats } = useUserFloorLocation({
        initialValues: state,
        onSubmit,
        enableReinitialize: true
    });
    const handleCancel = () => {
        dispatch(closeModal(FilterModal.name));
    };
    const handelReset = () => {
        setState(FilterInitialForm());
        dispatch(closeModal(FilterModal.name));
    };
    async function onSubmit(data) {
        debugger;
        setState({
            ...data
        });

        dispatch(closeModal(FilterModal.name));
    }

    return (
        <staffstyle.modalbox>
            <Formik enableReinitialize onSubmit={formik.handleSubmit} initialValues={state}>
                <Form>
                    <adminstyle.rowpage>
                        <adminstyle.cellpage>
                            <div style={{ width: '96%' }}>
                                <MInput
                                    name="Datefilter"
                                    label="From"
                                    placeholder="Date"
                                    fullWidth
                                    type="date"
                                    value={formik.values.Datefilter}
                                    onChange={formik.handleChange}
                                    meta={formik.getFieldMeta('Datefilter')}
                                    necessary={false}
                                />
                            </div>
                        </adminstyle.cellpage>
                        <adminstyle.cellpage>
                            <div style={{ width: '96%' }}>
                                <MInput
                                    name="Dateendfilter"
                                    label="To"
                                    placeholder="Date"
                                    fullWidth
                                    type="date"
                                    value={formik.values.Dateendfilter}
                                    onChange={formik.handleChange}
                                    meta={formik.getFieldMeta('Dateendfilter')}
                                    necessary={false}
                                />
                            </div>
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
        </staffstyle.modalbox>
    );
};

const handleShowFilterModal = (state: any, setState: (data: any) => void) => {
    return newModal({
        Body: FilterModal,
        title: 'Filter',
        topBar: true,
        id: FilterModal.name,
        data: {
            setState,
            state
        }
    });
};

export default handleShowFilterModal;
