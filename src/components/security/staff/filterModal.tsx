import { FC } from 'react';
import { Typography, Box, Button } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { MInput } from '@/components/base/input/MInput';
import * as securitystyle from '../security.style';
import { closeModal, newModal } from 'src/redux/actions/actions';
import { IModalBodyProps } from '@/components/shared/modals/types.modals';
import { RowTable } from '@/components/table/table_layout/types.table.layout';
import { useDispatch, useSelector } from 'react-redux';
import { MSelectFormik } from '@/components/base/input/MSelect';
import { useQueryClient, QueryClient } from 'react-query';
import React, { useEffect, useState } from 'react';
import { setPageData } from 'src/redux/actions/actions';
import {
    useDepartment_GetDepartmentsQuery,
    useUser_GetCurrentSecurityQuery
} from 'src/graphql/generated';
import Utils from '@/utils/utils';
import { staffFilterInitialForm, ValidationForm } from './data';
import useUserFloorLocation from 'src/hooks/useUserFloorLocation';

const StafFilterModal: FC<IModalBodyProps<RowTable>> = ({ data: { state, setState } }) => {
    const dispatch = useDispatch();
    const { data: datadepartment } = useDepartment_GetDepartmentsQuery();
    const { data: datacurentsecurity } = useUser_GetCurrentSecurityQuery();

    const [departmentname, setdepartmentname] = useState([]);
    const pageData = useSelector(({ pageData }: any) => pageData);

    const { formik, complexes, blocks, floors, flats } = useUserFloorLocation({
        initialValues: state,
        onSubmit,
        enableReinitialize: true,
        validationSchema: ValidationForm
    });
    useEffect(() => {
        var js = [];
        datadepartment?.department_getDepartments?.result?.items.map((item) => {
            js.push({ option: item.name, value: item.id });
        });
        setdepartmentname(js);
    }, [datadepartment]);

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
            ...data,
            complexId: datacurentsecurity?.user_getCurrentSecurity?.result?.complexId,
            securityId: -1
        });

        dispatch(closeModal(StafFilterModal.name));
    }

    return (
        <securitystyle.modalbox>
            <Formik enableReinitialize onSubmit={formik.handleSubmit} initialValues={state}>
                <Form>
                    <securitystyle.rowpage>
                        <securitystyle.cellpage>
                            <MSelectFormik
                                style={{ width: '96%' }}
                                options={departmentname}
                                name="departmentId"
                                label="Department name"
                                value={formik.values.departmentId}
                                onChange={formik.handleChange}
                                meta={formik.getFieldMeta('departmentId')}
                                necessary={false}
                            />
                        </securitystyle.cellpage>

                        <securitystyle.cellpage>
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
                        </securitystyle.cellpage>
                    </securitystyle.rowpage>
                    <securitystyle.rowpage>
                        <securitystyle.cellpage>
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
                        </securitystyle.cellpage>
                        <securitystyle.cellpage></securitystyle.cellpage>
                    </securitystyle.rowpage>
                    <securitystyle.modalButtonGroup>
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
                        <securitystyle.boxReset>
                            <securitystyle.ResetButton onClick={handelReset}>
                                Reset filter
                            </securitystyle.ResetButton>
                        </securitystyle.boxReset>
                    </securitystyle.modalButtonGroup>
                </Form>
            </Formik>
        </securitystyle.modalbox>
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
