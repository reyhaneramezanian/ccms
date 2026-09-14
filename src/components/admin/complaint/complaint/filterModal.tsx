import { Grid, Box, Button, MenuItem, Typography } from '@mui/material';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { MInputFormik } from '@/components/base/input/MInput';
import * as adminstyle from '@/components/admin/admin.style';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, newModal } from 'src/redux/actions/actions';
import { IModalBodyProps } from '@/components/shared/modals/types.modals';
import { FC } from 'react';
import useManageTab from 'src/hooks/useManageTab';
import React, { useEffect, useState } from 'react';
import Delete from 'src/assets/icons/Deletelist';
import { MSelectFormik } from '@/components/base/input/MSelect';
import { useQueryClient, QueryClient } from 'react-query';
import { useSnackbar } from 'notistack';
import {
    useComplaint_CreateMutation,
    useComplex_GetComplexesQuery,
    useBlock_GetBlocksQuery,
    useFloor_GetFloorsQuery,
    useFlat_GetFlatsQuery,
    useComplaintType_GetComplaintTypesQuery
} from 'src/graphql/generated';
import Down from 'src/assets/icons/Down';
import Utils from '@/utils/utils';
import { complaintFilterInitialForm } from '../data';
import { MSelect } from '@/components/base/input/MSelect';
import useUserFloorLocation from 'src/hooks/useUserFloorLocation';
import { MInput } from '@/components/base/input/MInput';
import { RowTable } from '@/components/table/table_layout/types.table.layout';

const ComplaintFilterModal: FC<IModalBodyProps<RowTable>> = ({ data: { state, setState } }) => {
    const dispatch = useDispatch();

    const { formik, complexes, blocks, floors, flats } = useUserFloorLocation({
        initialValues: state,
        onSubmit,
        enableReinitialize: true
    });

    const [TypeComplaint, setTypeComplaint] = useState([]);
    const { data: datatypecomplaint } = useComplaintType_GetComplaintTypesQuery();

    useEffect(() => {
        var js = [];
        datatypecomplaint?.complaintType_getComplaintTypes?.result?.items?.map((item) => {
            js.push({ option: item.name, value: item.id });
        });
        setTypeComplaint(js);
    }, [datatypecomplaint]);

    const handleCancel = () => {
        dispatch(closeModal(ComplaintFilterModal.name));
    };
    const handelReset = () => {
        setState(complaintFilterInitialForm());
        dispatch(closeModal(ComplaintFilterModal.name));
    };
    async function onSubmit(data) {
        setState({
            ...data
            /* date: data.date?.slice(0, 10),
            dateend: data.date?.slice(0, 10)*/
        });

        dispatch(closeModal(ComplaintFilterModal.name));
    }

    return (
        <Box style={{ width: 1440, maxWidth: '90vw' }}>
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
                                name="flatId"
                                label="Flat "
                                options={flats}
                                value={formik.values.flatId}
                                onChange={formik.handleChange}
                                meta={formik.getFieldMeta('flatId')}
                                necessary={false}
                            />
                        </adminstyle.cellpage>
                    </adminstyle.rowpage>
                    <adminstyle.rowpage>
                        <adminstyle.cellpage>
                            <MSelect
                                style={{ width: '96%' }}
                                options={TypeComplaint}
                                name="complaintTypeId"
                                label="Type"
                                placeholder="Type"
                                value={formik.values.complaintTypeId}
                                onChange={formik.handleChange}
                                meta={formik.getFieldMeta('complaintTypeId')}
                                necessary={false}
                            />
                        </adminstyle.cellpage>
                        <adminstyle.cellpage>
                            <div style={{ width: '96%' }}>
                                <MInput
                                    name="date"
                                    label="Date"
                                    placeholder="Date"
                                    fullWidth
                                    type="date"
                                    value={formik.values.date}
                                    onChange={formik.handleChange}
                                    meta={formik.getFieldMeta('date')}
                                    necessary={false}
                                />
                            </div>
                        </adminstyle.cellpage>
                        <adminstyle.cellpage>
                            <MSelectFormik
                                style={{ width: '96%' }}
                                options={[
                                    { option: 'Pending', value: 'PENDING' },
                                    {
                                        option: 'In progress',
                                        value: 'IN_PROGRESS'
                                    },
                                    { option: 'Completed', value: 'COMPLETED' }
                                ]}
                                name="complaintStatus"
                                label="Status"
                                placeholder="Status"
                                value={formik.values.complaintStatus}
                                onChange={formik.handleChange}
                                meta={formik.getFieldMeta('complaintStatus')}
                                necessary={false}
                            />
                        </adminstyle.cellpage>
                        <adminstyle.cellpage></adminstyle.cellpage>
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
        </Box>
    );
};

const handleShowComplaintFilterModal = (state: any, setState: (data: any) => void) => {
    return newModal({
        Body: ComplaintFilterModal,
        title: 'Filter',
        topBar: true,
        id: ComplaintFilterModal.name,
        data: {
            setState,
            state
        }
    });
};

export default handleShowComplaintFilterModal;
