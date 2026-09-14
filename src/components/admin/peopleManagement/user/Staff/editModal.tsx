import { Formik, Form, FieldArray, Field, useField } from 'formik';
import * as Yup from 'yup';
import { MInputFormik } from '@/components/base/input/MInput';
import * as adminstyle from '@/components/admin/admin.style';
import { closeModal, newModal } from 'src/redux/actions/actions';
import { IModalBodyProps } from '@/components/shared/modals/types.modals';
import { FC } from 'react';
import {
    Select,
    MenuItem,
    Input,
    Checkbox,
    Grid,
    FormControlLabel,
    Button,
    Box
} from '@mui/material';
import useManageTab from 'src/hooks/useManageTab';
import React, { useEffect, useState } from 'react';
import Delete from 'src/assets/icons/Deletelist';
import { Custom } from 'src/components/shared/share/tick-close';
import { RowTable } from '@/components/table/table_layout/types.table.layout';
import { useQueryClient, QueryClient } from 'react-query';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { MSelectFormik } from '@/components/base/input/MSelect';
import Checkicon from 'src/assets/icons/checkicon';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';

import {
    useUser_UpdateStaffProfileMutation,
    useDepartment_GetDepartmentsQuery,
    useEmploymentType_GetEmploymentTypesQuery,
    useComplex_GetComplexesQuery,
    useTotalbuildingQuery,
    UserType,
    useUser_GetCurrentComplexManagerQuery
} from 'src/graphql/generated';
import Utils from '@/utils/utils';
import { PHONE_VALIDATIONIndia, PHONE_VALIDATIONUsa } from '@/utils/helper/regexes';
import Down from 'src/assets/icons/Down';
import { LoadingButton } from '@mui/lab';
import { MSelectmultiFormik } from '@/components/base/input/selectmulti';
import { useGetUser } from 'src/auth/UserProvider';

const PeaplemanagementAddModal: FC<IModalBodyProps<RowTable>> = ({ data: { row, refetch } }) => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient();
    const { mutate, isLoading } = useUser_UpdateStaffProfileMutation();
    const mutationErrorHandler = useMutationErrorHandler();
    const { data: totalbuilding } = useTotalbuildingQuery();
    const user = useGetUser();
    const hasUser = typeof user === 'object' && user !== null;

    const complexUser = useUser_GetCurrentComplexManagerQuery(undefined, {
        enabled: hasUser && user.userType === UserType.ComplexManager
    });
    const { data: datacomplex } = useComplex_GetComplexesQuery(
        {
            take: totalbuilding?.complex_getComplexes?.result?.totalCount,
            where: { activeStatus: { eq: 'ACTIVE' as any } }
        },
        {
            keepPreviousData: false,
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchInterval: false
        }
    );

    const [complexlist, setcomplexlist] = useState([]);
    const [Departmentlist, setDepartmentlist] = useState([]);
    const [employtypelist, setemploytypelist] = useState([]);
    const [complexselect, setcomplexselect] = useState([]);

    useEffect(() => {
        var js = [],
            jscomplex = [];
        if (user.userType !== UserType.ComplexManager)
            datacomplex?.complex_getComplexes?.result?.items.map((item) => {
                js.push({ option: item.name, value: item.id });
                row?.complexId.map((items) => {
                    if (items.complexId === item.id) jscomplex.push(item.name);
                });
            });
        else
            complexUser?.data?.user_getCurrentComplexManager?.result?.complexManagerComplexes?.forEach(
                (item, i) => {
                    js.push({ option: item.complex.name, value: item.complex.id });
                    row?.complexId.map((items) => {
                        if (items.complexId === item.id) jscomplex.push(item.name);
                    });
                }
            );
        setcomplexselect(jscomplex);
        setcomplexlist(js);
    }, [datacomplex]);

    const { data: dataemploy } = useEmploymentType_GetEmploymentTypesQuery({
        take: totalbuilding?.employmentType_getEmploymentTypes?.result?.totalCount,
        where: { activeStatus: { eq: 'ACTIVE' as any } }
    });
    const handleChange = (event) => {
        const {
            target: { value }
        } = event;
        setcomplexselect(typeof value === 'string' ? value.split(',') : value);
    };

    const { data: dataDepartment } = useDepartment_GetDepartmentsQuery({
        take: totalbuilding?.department_getDepartments?.result?.totalCount,
        where: { activeStatus: { eq: 'ACTIVE' as any } }
    });
    useEffect(() => {
        var js = [],
            jsemploy = [];
        dataDepartment?.department_getDepartments?.result?.items.forEach((item, i) => {
            js.push({ option: item.name, value: item.id });
        });
        dataemploy?.employmentType_getEmploymentTypes?.result?.items.forEach((item, i) => {
            jsemploy.push({ option: item.name, value: item.id });
        });
        setemploytypelist(jsemploy);
        setDepartmentlist(js);
    }, [dataDepartment, dataemploy]);

    const handleCancel = () => {
        dispatch(closeModal(PeaplemanagementAddModal.name));
    };

    const handelsave = (e) => {
        var jscomplex = [];
        e.Complex.forEach((v, i) => {
            complexlist.forEach((item, index) => {
                if (v === item.option) jscomplex.push(item.value);
            });
        });
        mutate(
            {
                input: {
                    employmentTypeId: e.Employeetype,
                    headOfDepertment: e.Head,
                    // role: e.Role as any,
                    gender: e.Gender,
                    activeStatus: e.Status,
                    firstName: e.Firstname,
                    lastName: e.Surname,
                    dateOfBirth: e.Dateofbirth,
                    phoneNumber: e.Primaryphone,
                    // email: e.Primaryemail,
                    departmentId: e.Department,
                    middleName: e.Middlename,
                    alternatePhone: e.Alternativephone,
                    alternateEmail: e.Alternativeemail,
                    dateOfJoining: e.Dateofjoining,
                    dateOfTermination: e.Dateofterminaition,
                    address: e.Address,
                    id: row.id,
                    complexIdList: jscomplex,
                    photoUrl: row.photoUrl
                }
            },
            {
                onSuccess: () => {
                    enqueueSnackbar('Operation was successful!', { variant: 'success' }),
                        dispatch(closeModal(PeaplemanagementAddModal.name)),
                        queryClient.refetchQueries('user_getStaffs');
                },
                onError: (err) => {
                    mutationErrorHandler(err, 'user_updateStaffProfile');
                }
            }
        );
    };

    return (
        <Box style={{ width: 1440, maxWidth: '90vw' }}>
            <Grid item>
                <adminstyle.headdetail>Personal information</adminstyle.headdetail>
            </Grid>
            <Formik
                enableReinitialize
                onSubmit={(v, handlers) => {
                    handelsave(v);
                }}
                initialValues={{
                    Head: row.head,

                    Status: row.activeStatus,
                    Firstname: row.firstName,
                    Surname: row.lastName,
                    Middlename: row.middleName,
                    Gender: row.gender,
                    Dateofbirth: row.dateOfBirth,
                    Primaryphone: row.Phone,
                    Alternativephone: row.alternatePhone,
                    Primaryemail: row.Email,
                    Alternativeemail: row.alternateEmail,
                    Address: row.address,
                    Department: row.Departmentid,
                    // Role: row.role,
                    Dateofjoining: row.dateOfJoining,
                    Employeetype: row.employmentTypeId,
                    Dateofterminaition: row.dateOfTermination,
                    Complex: complexselect,
                    photoUrl: row.photoUrl
                }}
                validationSchema={Yup.object({
                    Status: Yup.string().required('This field is required'),
                    Firstname: Yup.string().required('This field is required'),
                    Surname: Yup.string().required('This field is required'),
                    Complex: Yup.array().required('This field is required'),
                    //Gender: Yup.string().required('This field is required'),
                    Dateofbirth: Yup.date()
                        .max(new Date(), 'Date can not be in the future')
                        .required('This field is required'),
                    Primaryphone: Yup.string()
                        .required('This field is required')
                        .matches(PHONE_VALIDATIONIndia, 'Please enter invalid number'),
                    Alternativephone: Yup.string()
                        .required('This field is required')
                        .notOneOf(
                            [Yup.ref('Primaryphone'), null],
                            'Alternate phone must not match with primary phone'
                        )
                        .matches(PHONE_VALIDATIONIndia, 'Please enter invalid number'),
                    Primaryemail: Yup.string()
                        .required('This field is required')
                        .email('Must be a valid email'),
                    Alternativeemail: Yup.string()
                        .required('This field is required')
                        .notOneOf(
                            [Yup.ref('Primaryemail'), null],
                            'Alternate email must not match with email'
                        )
                        .email('Must be a valid email'),
                    Address: Yup.string().required('This field is required'),

                    Department: Yup.string().required('This field is required'),
                    // Role: Yup.string().required('This field is required'),
                    Dateofjoining: Yup.string().required('This field is required'),
                    //Dateofterminaition: Yup.string().required('This field is required'),
                    Employeetype: Yup.string().required('This field is required')
                })}>
                <Form>
                    <adminstyle.modalFormRowWrapper>
                        <Grid container>
                            <Grid item xs={12} sm={12} md={3} lg={3}>
                                <div style={{ width: '96%' }}>
                                    <MInputFormik
                                        name="Firstname"
                                        label="First name"
                                        placeholder="First name"
                                        fullWidth
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={3} lg={3}>
                                <div style={{ width: '96%' }}>
                                    <MInputFormik
                                        style={{ width: '96%' }}
                                        name="Middlename"
                                        label="Middle name"
                                        placeholder="Middle name"
                                        fullWidth
                                        necessary={false}
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={3} lg={3}>
                                <div style={{ width: '96%' }}>
                                    <MInputFormik
                                        style={{ width: '96%' }}
                                        name="Surname"
                                        label="Surname"
                                        placeholder="Surname"
                                        fullWidth
                                    />
                                </div>
                            </Grid>

                            <Grid item xs={12} sm={12} md={3} lg={3}>
                                <MSelectFormik
                                    style={{ width: '96%' }}
                                    options={[
                                        { option: 'None', value: null },
                                        { option: 'Male', value: 'MALE' },
                                        { option: 'Female', value: 'FEMALE' }
                                    ]}
                                    name="Gender"
                                    label="Gender"
                                    placeholder="Gender"
                                    necessary={false}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={3} lg={3}>
                                <div style={{ width: '96%' }}>
                                    <MInputFormik
                                        style={{ width: '96%' }}
                                        name="Dateofbirth"
                                        type="date"
                                        label="Date of birth"
                                        placeholder="Date of birth"
                                        fullWidth
                                    />
                                </div>
                            </Grid>

                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <adminstyle.headdetail>Contact information</adminstyle.headdetail>
                            </Grid>
                            <Grid item xs={12} sm={12} md={3} lg={3}>
                                <div style={{ width: '96%' }}>
                                    <MInputFormik
                                        style={{ width: '96%' }}
                                        name="Primaryphone"
                                        label="Primary phone"
                                        placeholder="Primary phone"
                                        fullWidth
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={3} lg={3}>
                                <div style={{ width: '96%' }}>
                                    <MInputFormik
                                        style={{ width: '96%' }}
                                        name="Alternativephone"
                                        label="Alternative phone"
                                        placeholder="Alternative phone"
                                        fullWidth
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={3} lg={3}>
                                <div style={{ width: '96%' }}>
                                    <MInputFormik
                                        style={{ width: '96%' }}
                                        name="Primaryemail"
                                        label="Primary email"
                                        placeholder="Primary email"
                                        fullWidth
                                        disabled
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={3} lg={3}>
                                <div style={{ width: '96%' }}>
                                    <MInputFormik
                                        style={{ width: '96%' }}
                                        name="Alternativeemail"
                                        label="Alternative email"
                                        placeholder="Alternative email"
                                        fullWidth
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <div style={{ width: '96%' }}>
                                    <MInputFormik
                                        style={{ width: '100%' }}
                                        name="Address"
                                        label="Address"
                                        placeholder="Address"
                                        fullWidth
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <adminstyle.headdetail>Property information</adminstyle.headdetail>
                            </Grid>
                            <Grid item xs={12} sm={12} md={3} lg={3}>
                                <MSelectmultiFormik
                                    style={{ width: '96%' }}
                                    options={complexlist}
                                    name="Complex"
                                    label="Complex"
                                    placeholder="Complex"
                                    values={complexselect}
                                />
                            </Grid>

                            <Grid item xs={12} sm={12} md={3} lg={3}>
                                <MSelectFormik
                                    style={{ width: '96%' }}
                                    options={Departmentlist}
                                    name="Department"
                                    label="Department"
                                    placeholder="Department"
                                />
                            </Grid>

                            <Grid item xs={12} sm={12} md={3} lg={3}>
                                <MSelectFormik
                                    style={{ width: '96%' }}
                                    options={employtypelist}
                                    name="Employeetype"
                                    label="Employment type"
                                    placeholder="Employment type"
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={3} lg={3}>
                                <div style={{ width: '96%' }}>
                                    <MInputFormik
                                        style={{ width: '96%' }}
                                        name="Dateofjoining"
                                        type="date"
                                        label="Date of joining"
                                        placeholder="Date of joining"
                                        fullWidth
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={3} lg={3}>
                                <div style={{ width: '96%' }}>
                                    <MInputFormik
                                        style={{ width: '96%' }}
                                        name="Dateofterminaition"
                                        type="date"
                                        label="Date of termination"
                                        placeholder="Date of termination"
                                        fullWidth
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={3} lg={3}>
                                <MSelectFormik
                                    style={{ width: '96%' }}
                                    options={[
                                        { option: 'Active', value: 'ACTIVE' },

                                        { option: 'Inactivate', value: 'INACTIVE' }
                                    ]}
                                    name="Status"
                                    label="Status"
                                    placeholder="Status"
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <div style={{ margin: '20px 0 0 0 ' }}>
                                    <Field
                                        as={FormControlLabel}
                                        type="checkbox"
                                        name="Head"
                                        control={
                                            <Checkbox defaultChecked checkedIcon={<Checkicon />} />
                                        }
                                        label="Head of department"
                                    />
                                </div>
                            </Grid>
                        </Grid>
                    </adminstyle.modalFormRowWrapper>
                    <adminstyle.modalButtonGroup>
                        <Box>
                            <LoadingButton
                                loading={isLoading}
                                type="submit"
                                variant="contained"
                                color="primary">
                                Save
                            </LoadingButton>
                        </Box>

                        <Box>
                            <Button variant="outlined" color="grey3" onClick={handleCancel}>
                                Cancel
                            </Button>
                        </Box>
                    </adminstyle.modalButtonGroup>
                </Form>
            </Formik>
        </Box>
    );
};

const handleStaffAddModal = (refetch, row?: RowTable) => {
    return newModal({
        Body: PeaplemanagementAddModal,
        title: 'Edit staff',
        topBar: true,
        id: PeaplemanagementAddModal.name,
        data: { row, refetch }
    });
};

export default handleStaffAddModal;
