import { Select, MenuItem, Box, Button, FormControlLabel, Checkbox } from '@mui/material';
import { Formik, Form, useField, Field } from 'formik';
import * as Yup from 'yup';
import { MInputFormik } from '@/components/base/input/MInput';
import * as adminstyle from '@/components/admin/admin.style';
import { useDispatch } from 'react-redux';
import { closeModal, newModal } from 'src/redux/actions/actions';
import { IModalBodyProps } from '@/components/shared/modals/types.modals';
import { FC } from 'react';
import useManageTab from 'src/hooks/useManageTab';
import React, { useEffect, useState } from 'react';
import Checkicon from 'src/assets/icons/checkicon';
import { MSelectFormik } from '@/components/base/input/MSelect';
import { useQueryClient, QueryClient } from 'react-query';
import { useSnackbar } from 'notistack';
import {
    useComplaint_ConvertComplaintToRequestMutation,
    useComplaint_GetComplaintsQuery,
    useComplaintType_GetComplaintTypesQuery,
    useResidentFlat_GetResidentFlatsQuery,
    useServiceType_GetServiceTypesQuery,
    useDepartment_GetDepartmentsQuery,
    ActiveStatus,
    useTotalbuildingQuery
} from 'src/graphql/generated';
import Down from 'src/assets/icons/Down';
import Utils from '@/utils/utils';
import { RowTable } from '@/components/table/table_layout/types.table.layout';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';
import moment from 'moment';

const ComplaintServiceModal: FC<IModalBodyProps<RowTable>> = ({ data: { row, refetch } }) => {
    const dispatch = useDispatch();
    const { mutate, isLoading } = useComplaint_ConvertComplaintToRequestMutation();
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient();
    const [resident, setresident] = useState([]);
    const [TypeComplaint, setTypeComplaint] = useState([]);
    const [Departmentselect, setDepartmentselect] = useState(0);
    const [TypeDepartment, setTypeDepartment] = useState([]);
    const mutationErrorHandler = useMutationErrorHandler();
    const { data: totalbuilding } = useTotalbuildingQuery();

    const { data: Department } = useDepartment_GetDepartmentsQuery({
        take: totalbuilding?.department_getDepartments?.result?.totalCount,
        where: { activeStatus: { eq: ActiveStatus.Active } }
    });

    const { data: dataresident } = useResidentFlat_GetResidentFlatsQuery({
        where: { flatId: { eq: Number(row.flatId) }, resident: { accountDeleted: { eq: false } } }
    });

    const { data: datatypecomplaint } = useServiceType_GetServiceTypesQuery({
        take: totalbuilding?.serviceType_getServiceTypes?.result?.totalCount,
        where: {
            activeStatus: { eq: ActiveStatus.Active },
            departmentId: { eq: Number(Departmentselect) }
        }
    });
    useEffect(() => {
        var js = [],
            jsresident = [],
            jscomplaint = [],
            jsdepartment = [];
        Department?.department_getDepartments?.result?.items?.map((item) => {
            jsdepartment.push({ option: item.name, value: item.id });
        });
        setTypeDepartment(jsdepartment);

        datatypecomplaint?.serviceType_getServiceTypes?.result?.items?.map((item) => {
            js.push({ option: item.name, value: item.id });
        });
        setTypeComplaint(js);

        dataresident?.residentFlat_getResidentFlats?.result?.items.map((item) => {
            jsresident.push({
                option: item.resident.firstName + ' ' + item.resident.lastName,
                value: item.id
            });
        });
        setresident(jsresident);
    }, [datatypecomplaint, dataresident, Department]);

    const FormSelect = ({ name, options }) => {
        const [field, meta, helpers] = useField(name);
        return (
            <>
                <adminstyle.label>
                    <adminstyle.rowpage>
                        <adminstyle.cellvalid>Department</adminstyle.cellvalid>
                        <adminstyle.cellvalid style={{ color: '#eb5c75', margin: '0 0 0 5px' }}>
                            *
                        </adminstyle.cellvalid>
                    </adminstyle.rowpage>
                </adminstyle.label>
                <Select
                    name={name}
                    style={{
                        borderRadius: 8,
                        border: 'none',
                        width: '96%',
                        margin: '-4px 0 20px 0',
                        height: '48px',
                        backgroundColor: '#F2F3F7'
                    }}
                    value={Departmentselect}
                    onChange={(e) => {
                        setDepartmentselect(e.target.value);
                    }}
                    IconComponent={() => <Down />}
                    variant="outlined">
                    {options.map((item) => (
                        <MenuItem value={item.value}>{item.option}</MenuItem>
                    ))}
                </Select>
            </>
        );
    };

    const handleCancel = () => {
        dispatch(closeModal(ComplaintServiceModal.name));
    };
    const handelsave = (e) => {
        mutate(
            {
                input: {
                    emergency: e.emergency,
                    serviceTypeId: e.serviceTypeId,
                    startDate: e.startDate,
                    endDate: e.endDate,
                    startTime: Utils.convertTimeToTimeSpan(e.startTime),
                    endTime: Utils.convertTimeToTimeSpan(e.endTime),
                    complaintId: row.id,
                    residentFlatId: e.Resident
                }
            },
            {
                onSuccess: () => {
                    enqueueSnackbar('Operation was successful!', { variant: 'success' }),
                        dispatch(closeModal(ComplaintServiceModal.name));
                    queryClient.refetchQueries('complaint_getComplaints');
                },
                onError: (err) => {
                    mutationErrorHandler(err, 'complaint_convertComplaintToRequest');
                }
            }
        );
    };

    return (
        <adminstyle.modalbox>
            <Formik
                enableReinitialize
                onSubmit={(v, handlers) => {
                    handelsave(v);
                }}
                initialValues={{
                    emergency: true,
                    serviceTypeId: '',
                    startDate: new Date().toJSON().slice(0, 10),
                    endDate: new Date().toJSON().slice(0, 10),
                    startTime: '',
                    endTime: '',
                    Resident: ''
                }}
                validationSchema={Yup.object({
                    Resident: Yup.string().required('This field is required'),
                    serviceTypeId: Yup.string().required('This field is required'),
                    startDate: Yup.string().required('This field is required'),
                    endDate: Yup.string().required('This field is required'),
                    startTime: Yup.string().required('This field is required'),
                    endTime: Yup.string().required('This field is required')
                })}>
                <Form>
                    <adminstyle.rowpage>
                        <adminstyle.cellpage>
                            <MSelectFormik
                                style={{ width: '96%' }}
                                options={resident}
                                name="Resident"
                                label="Resident"
                                placeholder="Type"
                            />
                        </adminstyle.cellpage>
                        <adminstyle.cellpage>
                            <FormSelect name="Department" options={TypeDepartment} />
                        </adminstyle.cellpage>
                    </adminstyle.rowpage>
                    <adminstyle.rowpage>
                        <adminstyle.cellpage>
                            <MSelectFormik
                                style={{ width: '96%' }}
                                options={TypeComplaint}
                                name="serviceTypeId"
                                label="Service type"
                                placeholder="Type"
                            />
                        </adminstyle.cellpage>
                        <adminstyle.cellpage>
                            <div style={{ width: '96%' }}>
                                <MInputFormik
                                    name="startDate"
                                    label="Start date"
                                    fullWidth
                                    type="date"
                                />
                            </div>
                        </adminstyle.cellpage>
                    </adminstyle.rowpage>
                    <adminstyle.rowpage>
                        <adminstyle.cellpage>
                            <div style={{ width: '96%' }}>
                                <MInputFormik
                                    name="endDate"
                                    label="End date"
                                    fullWidth
                                    type="date"
                                />
                            </div>
                        </adminstyle.cellpage>
                        <adminstyle.cellpage>
                            <div style={{ width: '96%' }}>
                                <MInputFormik
                                    name="startTime"
                                    label="Start Time"
                                    fullWidth
                                    type="time"
                                />
                            </div>
                        </adminstyle.cellpage>
                    </adminstyle.rowpage>
                    <adminstyle.rowpage>
                        <adminstyle.cellpage>
                            <div style={{ width: '96%' }}>
                                <MInputFormik
                                    style={{ width: '100%' }}
                                    name="endTime"
                                    label="End time"
                                    fullWidth
                                    type="time"
                                />
                            </div>
                        </adminstyle.cellpage>
                        <adminstyle.cellpage>
                            <Field
                                style={{ padding: '20px 0 0 0' }}
                                as={FormControlLabel}
                                type="checkbox"
                                name="emergency"
                                control={<Checkbox defaultChecked checkedIcon={<Checkicon />} />}
                                label="Emergency"
                            />
                        </adminstyle.cellpage>
                    </adminstyle.rowpage>

                    <adminstyle.modalButtonGroup>
                        <Box>
                            <Button type="submit" variant="contained" color="primary">
                                Convert to service
                            </Button>
                        </Box>

                        <Box>
                            <Button variant="outlined" color="grey3" onClick={handleCancel}>
                                Cancel
                            </Button>
                        </Box>
                    </adminstyle.modalButtonGroup>
                </Form>
            </Formik>
        </adminstyle.modalbox>
    );
};

const handleShowComplaintserviceModal = (refetch, row?: RowTable) => {
    return newModal({
        Body: ComplaintServiceModal,
        title: 'Convert to service',
        topBar: true,
        id: ComplaintServiceModal.name,
        data: { row, refetch }
    });
};

export default handleShowComplaintserviceModal;
