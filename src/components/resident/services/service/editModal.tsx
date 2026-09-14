import { FC } from 'react';
import { Select, Typography, Grid, Checkbox, Box, FormControlLabel, MenuItem } from '@mui/material';
import { Formik, Form, Field, useField } from 'formik';
import * as Yup from 'yup';
import { MInputFormik } from '@/components/base/input/MInput';
import * as residentstyle from '../../resident.style';
import { closeModal, newModal } from 'src/redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import { MSelectFormik } from '@/components/base/input/MSelect';
import React, { useState, useEffect } from 'react';
import { RowTable } from '@/components/table/table_layout/types.table.layout';

import {
    useServiceType_GetServiceTypesQuery,
    useResidentMyServiceUpdateMutation,
    useDepartment_GetDepartmentsQuery,
    useTotalbuildingQuery
} from 'src/graphql/generated';
import { useQueryClient, QueryClient } from 'react-query';
import SucsessModal from '../../sucsessModal';
import Checkicon from 'src/assets/icons/checkicon';
import { useSnackbar } from 'notistack';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Utils from '@/utils/utils';
import storageKeys from 'src/data/storageKeys';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';
import { IModalBodyProps } from '@/components/shared/modals/types.modals';
import Down from 'src/assets/icons/Down';

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};
const validationForm = Yup.object({
    Startdate: Yup.string().required('This field is required'),
    //Fromtimeservice: Yup.string().required('This field is required'),
    // Totime: Yup.string().required('This field is required'),
    Enddate: Yup.date()
        .when(
            'Startdate',
            (Startdate, Yup) =>
                Startdate && Yup.min(Startdate, 'End time cannot be before start time')
        )
        .required('This field is required'),
    service: Yup.string().required('This field is required')
});

const ServiceEditModal: FC<IModalBodyProps<RowTable>> = ({ data: { row, refetch } }) => {
    const dispatch = useDispatch();
    const mutationErrorHandler = useMutationErrorHandler();
    const queryClient = useQueryClient();

    const [typeFrom, settypeFrom] = useState('text');
    const [typeTo, settypeTo] = useState('text');
    const [typeservice, settypeservice] = useState([]);
    const [typeselect, settypeselect] = useState(row.departmentId);
    const [serviceselect, setserviceselect] = useState(row.serviceId);
    const [departmentlist, setdepartmentlist] = useState([]);
    const { data: datadepartment } = useDepartment_GetDepartmentsQuery({
        take: 1000
    });
    const { data: datatype } = useServiceType_GetServiceTypesQuery({
        take: 1000,
        where: {
            departmentId: { eq: typeselect },
            activeStatus: { eq: 'ACTIVE' as any }
        }
    });
    const { mutate, isLoading } = useResidentMyServiceUpdateMutation();
    const { enqueueSnackbar } = useSnackbar();
    useEffect(() => {
        var js = [],
            jsdepartment = [];
        datadepartment?.department_getDepartments?.result?.items.forEach((item, i) => {
            jsdepartment.push({ option: item.name, value: item.id });
        });
        setdepartmentlist(jsdepartment);
        if (jsdepartment.length > 0)
            settypeselect(
                row?.departmentId != undefined ? row?.departmentId : jsdepartment[0].value
            );
    }, [datadepartment]);

    useEffect(() => {
        var js = [],
            jsdepartment = [];
        datatype?.serviceType_getServiceTypes?.result?.items.forEach((item, i) => {
            js.push({ option: item.name, value: item.id });
        });
        settypeservice(js);
    }, [datatype]);

    const DepartmentSelect = ({ name, options }) => {
        const [field, meta, helpers] = useField(name);
        return (
            <Grid container>
                <Grid md={12} sm={12}>
                    <residentstyle.label>Department</residentstyle.label>
                </Grid>
                <Grid md={12} sm={12}>
                    <Select
                        name={name}
                        style={{
                            borderRadius: 8,
                            border: 'none',
                            width: '100%',
                            margin: '0 0 20px 0',
                            height: '48px',
                            backgroundColor: '#F2F3F7'
                        }}
                        value={typeselect}
                        onChange={(e) => settypeselect(e.target.value)}
                        IconComponent={() => <Down />}
                        variant="outlined">
                        {departmentlist.map((item) => (
                            <MenuItem value={item.value}>{item.option}</MenuItem>
                        ))}
                    </Select>
                </Grid>
            </Grid>
        );
    };
    const handleCancel = () => {
        dispatch(closeModal(ServiceEditModal.name));
    };
    const handelsave = (e) => {
        debugger;
        mutate(
            {
                input: {
                    startDate: e.Startdate,
                    endDate: e.Enddate,
                    startTime: Utils.convertTimeToTimeSpan(e.Fromtimeservice),
                    endTime: Utils.convertTimeToTimeSpan(e.Totime),
                    emergency: false, //pageData?.flatId,
                    serviceTypeId: e.service, //typeselect,
                    flatId: Number(localStorage.getItem(storageKeys.activeResidentFlatId)),
                    id: row.id
                }
            },
            {
                onSuccess: () => {
                    dispatch(closeModal(ServiceEditModal.name));
                    queryClient.refetchQueries('request_getMyRequests');
                },
                onError: (err) => {
                    mutationErrorHandler(err, 'request_update');
                }
            }
        );
    };

    return (
        <residentstyle.modalbox>
            <Formik
                enableReinitialize
                onSubmit={(data) => {
                    handelsave(data);
                }}
                initialValues={{
                    Emergencycheck: false,
                    Startdate: row.startDate,
                    Enddate: row.endDate,
                    Totime: row.endTime,
                    Fromtimeservice: row.startTime,
                    service: serviceselect
                }}
                validationSchema={validationForm}>
                <Form>
                    <residentstyle.modalFormRowWrapper>
                        <residentstyle.modalFormRowFieldWrapper>
                            <Field
                                as={FormControlLabel}
                                type="select"
                                name="Department"
                                control={<DepartmentSelect />}
                                label=""
                                style={{ width: '100%', margin: '0 0 0 0' }}
                            />
                        </residentstyle.modalFormRowFieldWrapper>
                        <residentstyle.modalFormRowFieldWrapper>
                            <MSelectFormik
                                style={{ width: '100%' }}
                                options={typeservice}
                                name="service"
                                label="Choose a service"
                            />
                        </residentstyle.modalFormRowFieldWrapper>

                        <residentstyle.modalFormRowFieldWrapper>
                            <MInputFormik
                                style={{ width: '100%' }}
                                name="Startdate"
                                label="Start date"
                                placeholder=""
                                fullWidth
                                type="date"
                            />
                        </residentstyle.modalFormRowFieldWrapper>
                        <residentstyle.modalFormRowFieldWrapper>
                            <MInputFormik
                                style={{ width: '100%' }}
                                name="Enddate"
                                label="End date"
                                placeholder=""
                                fullWidth
                                type="date"
                            />
                        </residentstyle.modalFormRowFieldWrapper>
                        <residentstyle.modalFormRowFieldWrapper>
                            <Typography style={{ fontSize: 16, fontFamily: 'Poppins' }}>
                                <div style={{ float: 'left' }}>Choose time</div>
                            </Typography>
                        </residentstyle.modalFormRowFieldWrapper>
                        <residentstyle.modalFormRowFieldWrapperhalf style={{ clear: 'both' }}>
                            <residentstyle.modalFormRowFieldhalfright>
                                <MInputFormik
                                    style={{ width: '100%' }}
                                    name="Totime"
                                    label=""
                                    placeholder="To"
                                    fullWidth
                                    type={typeTo}
                                    onFocus={() => {
                                        settypeTo('time');
                                    }}
                                />
                            </residentstyle.modalFormRowFieldhalfright>
                            <residentstyle.modalFormRowFieldhalfleft>
                                <MInputFormik
                                    style={{ width: '100%' }}
                                    name="Fromtimeservice"
                                    label=""
                                    placeholder="From"
                                    fullWidth
                                    type={typeFrom}
                                    onFocus={() => {
                                        settypeFrom('time');
                                    }}
                                />
                            </residentstyle.modalFormRowFieldhalfleft>
                        </residentstyle.modalFormRowFieldWrapperhalf>
                        <residentstyle.modalFormRowFieldWrapper>
                            {/*  <Field
                                as={FormControlLabel}
                                type="checkbox"
                                name="Emergencycheck"
                                control={<Checkbox defaultChecked checkedIcon={<Checkicon />} />}
                                label="Emergency"
                                style={{ margin: '0 5px 0 0' }}
                                />*/}
                        </residentstyle.modalFormRowFieldWrapper>
                    </residentstyle.modalFormRowWrapper>

                    <residentstyle.modalButtonGroup>
                        <Box>
                            <residentstyle.CancelButton variant="contained" type="submit">
                                save
                            </residentstyle.CancelButton>
                        </Box>

                        <Box>
                            <residentstyle.MyButton variant="contained" onClick={handleCancel}>
                                <Typography>Cancel</Typography>
                            </residentstyle.MyButton>
                        </Box>
                    </residentstyle.modalButtonGroup>
                </Form>
            </Formik>
        </residentstyle.modalbox>
    );
};

const handleShowServiceEditModal = (refetch, row?: RowTable) => {
    return newModal({
        Body: ServiceEditModal,
        title: 'Edit request service',
        topBar: true,
        id: ServiceEditModal.name,
        data: { refetch, row }
    });
};

export default handleShowServiceEditModal;
