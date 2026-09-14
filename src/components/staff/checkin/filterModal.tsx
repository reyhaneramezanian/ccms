import { FC } from 'react';
import { Typography, Box, Button } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { MInput } from '@/components/base/input/MInput';
import * as staffstyle from '../staff.style';
import { closeModal, newModal } from 'src/redux/actions/actions';
import { IModalBodyProps } from '@/components/shared/modals/types.modals';
import { RowTable } from '@/components/table/table_layout/types.table.layout';
import { useDispatch, useSelector } from 'react-redux';
import { MSelectFormik } from '@/components/base/input/MSelect';
import { useQueryClient, QueryClient } from 'react-query';
import React, { useEffect, useState } from 'react';
import { setPageData } from 'src/redux/actions/actions';
import { useComplex_GetComplexesQuery } from 'src/graphql/generated';
import Utils from '@/utils/utils';
import { staffFilterInitialForm, ValidationForm } from './data';
import useUserFloorLocation from 'src/hooks/useUserFloorLocation';

const StafFilterModal: FC<IModalBodyProps<RowTable>> = ({ data: { state, setState } }) => {
    const dispatch = useDispatch();
    const pageData = useSelector(({ pageData }: any) => pageData);

    const { formik, complexes, blocks, floors, flats } = useUserFloorLocation({
        initialValues: state,
        onSubmit,
        enableReinitialize: true,
        validationSchema: ValidationForm
    });

    console.log(complexes);
    const handleCancel = () => {
        setState(staffFilterInitialForm());
        dispatch(closeModal(StafFilterModal.name));
    };
    const handelReset = () => {
        setState(staffFilterInitialForm());
        dispatch(closeModal(StafFilterModal.name));
    };
    async function onSubmit(data) {
        setState({
            ...data
        });

        dispatch(closeModal(StafFilterModal.name));
    }

    return (
        <staffstyle.modalbox>
            <Formik enableReinitialize onSubmit={formik.handleSubmit} initialValues={state}>
                <Form>
                    <staffstyle.rowpage>
                        <staffstyle.cellpage>
                            <MSelectFormik
                                style={{ width: '96%' }}
                                options={complexes}
                                name="complexId"
                                label="Complex "
                                value={formik.values.complexId}
                                onChange={formik.handleChange}
                                meta={formik.getFieldMeta('complexId')}
                                necessary={false}
                            />
                        </staffstyle.cellpage>

                        <staffstyle.cellpage>
                            <div style={{ width: '96%' }}>
                                <MInput
                                    name="checkInDateTime"
                                    label="From date"
                                    placeholder="From date"
                                    fullWidth
                                    type="date"
                                    value={formik.values.checkInDateTime}
                                    onChange={formik.handleChange}
                                    meta={formik.getFieldMeta('checkInDateTime')}
                                    necessary={false}
                                />
                            </div>
                        </staffstyle.cellpage>
                    </staffstyle.rowpage>
                    <staffstyle.rowpage>
                        <staffstyle.cellpage>
                            <div style={{ width: '96%' }}>
                                <MInput
                                    name="checkOutDateTime"
                                    label="To date"
                                    placeholder="To date"
                                    fullWidth
                                    type="date"
                                    value={formik.values.checkOutDateTime}
                                    onChange={formik.handleChange}
                                    meta={formik.getFieldMeta('checkOutDateTime')}
                                    necessary={false}
                                />
                            </div>
                        </staffstyle.cellpage>
                        <staffstyle.cellpage></staffstyle.cellpage>
                    </staffstyle.rowpage>
                    <staffstyle.modalButtonGroup>
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
                        <staffstyle.boxReset>
                            <staffstyle.ResetButton onClick={handelReset}>
                                Reset filter
                            </staffstyle.ResetButton>
                        </staffstyle.boxReset>
                    </staffstyle.modalButtonGroup>
                </Form>
            </Formik>
        </staffstyle.modalbox>
    );
};

const handleShowFilterModal = (state: any, setState: (data: any) => void) => {
    return newModal({
        Body: StafFilterModal,
        title: 'Filter',
        topBar: true,
        id: StafFilterModal.name,
        data: {
            setState,
            state
        }
    });
};

export default handleShowFilterModal;
