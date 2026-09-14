import { Formik, Form, FieldArray, Field, useField } from 'formik';
import * as Yup from 'yup';
import { MInputFormik } from '@/components/base/input/MInput';
import * as adminstyle from '@/components/admin/admin.style';
import { closeModal, newModal } from 'src/redux/actions/actions';
import { IModalBodyProps } from '@/components/shared/modals/types.modals';
import { FC } from 'react';
import { Select, Checkbox, Grid, FormControlLabel, Button, Box } from '@mui/material';
import useManageTab from 'src/hooks/useManageTab';
import React, { useEffect, useState } from 'react';
import Delete from 'src/assets/icons/Deletelist';
import { Custom } from 'src/components/shared/share/tick-close';
import { RowTable } from '@/components/table/table_layout/types.table.layout';
import { useQueryClient, QueryClient } from 'react-query';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { MSelectFormik } from '@/components/base/input/MSelect';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';

import {
    useUser_UpdateSecurityProfileMutation,
    useComplex_GetComplexesQuery,
    useEmploymentType_GetEmploymentTypesQuery,
    useTotalbuildingQuery,
    UserType
} from 'src/graphql/generated';
import Utils from '@/utils/utils';
import { PHONE_VALIDATIONIndia, PHONE_VALIDATIONUsa } from '@/utils/helper/regexes';
import { LoadingButton } from '@mui/lab';
import { useGetUser } from 'src/auth/UserProvider';
import storageKeys from 'src/data/storageKeys';

const PeaplemanagementAddModal: FC<IModalBodyProps<RowTable>> = ({ data: { row, refetch } }) => {
    const dispatch = useDispatch();
    const { data: totalbuilding } = useTotalbuildingQuery();
    const user = useGetUser();

    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient();
    const [complexlist, setcomplexlist] = useState([]);
    const mutationErrorHandler = useMutationErrorHandler();
    const [employtypelist, setemploytypelist] = useState([]);
    const { data: dataemploy } = useEmploymentType_GetEmploymentTypesQuery({
        take: totalbuilding?.employmentType_getEmploymentTypes?.result?.totalCount,
        where: { activeStatus: { eq: 'ACTIVE' as any } }
    });

    const { mutate, isLoading } = useUser_UpdateSecurityProfileMutation();
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
    useEffect(() => {
        var jsemploy = [];

        dataemploy?.employmentType_getEmploymentTypes?.result?.items.forEach((item, i) => {
            jsemploy.push({ option: item.name, value: item.id });
        });
        setemploytypelist(jsemploy);
    }, [dataemploy]);

    useEffect(() => {
        var js = [];
        datacomplex?.complex_getComplexes?.result?.items.map((item) => {
            js.push({ option: item.name, value: item.id });
        });
        setcomplexlist(js);
    }, [datacomplex]);
    const handleCancel = () => {
        dispatch(closeModal(PeaplemanagementAddModal.name));
    };

    const handelsave = (e) => {
        mutate(
            {
                input: {
                    yearsOfExperience: e.Yearsofexperience,
                    gender: e.Gender,
                    activeStatus: e.Status,
                    firstName: e.Firstname,
                    lastName: e.Surname,
                    dateOfBirth: e.Dateofbirth,
                    phoneNumber: e.Phonenumber,
                    //middleName: e.Emailaddress,
                    id: row.id,
                    complexId: e.Complex,
                    employmentTypeId: e.employeeType,
                    photoUrl: row.photoUrl,
                    middleName: e.middleName,
                    dateOfJoining: e.dateOfJoining,
                    dateOfTermination: e.dateOfTermination
                }
            },
            {
                onSuccess: () => {
                    enqueueSnackbar('Operation was successful!', { variant: 'success' }),
                        dispatch(closeModal(PeaplemanagementAddModal.name)),
                        queryClient.refetchQueries('user_getSecurities');
                },
                onError: (err) => {
                    mutationErrorHandler(err, 'user_updateSecurityProfile');
                }
            }
        );
    };

    return (
        <Box style={{ width: 1440, maxWidth: '90vw' }}>
            <Formik
                enableReinitialize
                onSubmit={(v, handlers) => {
                    handelsave(v);
                }}
                initialValues={{
                    Firstname: row.Firstname,
                    Status: row.activeStatus,
                    Surname: row.Lastname,
                    Dateofbirth: row.dateOfBirth,
                    Gender: row.gender,
                    Phonenumber: row.Phone,
                    Emailaddress: row.Email,
                    Complex: row.complexId,
                    Yearsofexperience: row.Yearsofexperience,
                    employeeType: row.employmentTypeId,
                    dateOfJoining: row.dateOfJoining,
                    dateOfTermination: row.dateOfTermination,
                    middleName: row.middleName
                }}
                validationSchema={Yup.object({
                    Yearsofexperience: Yup.number()
                        .required('This field is required')
                        .min(0, 'Min is 0'),
                    Status: Yup.string().required('This field is required'),
                    //Gender: Yup.string().required('This field is required'),
                    Firstname: Yup.string().required('This field is required'),
                    Surname: Yup.string().required('This field is required'),
                    Dateofbirth: Yup.date()
                        .max(new Date(), 'Date can not be in the future')
                        .required('This field is required'),
                    Phonenumber: Yup.string()
                        .required('This field is required')
                        .matches(PHONE_VALIDATIONIndia, 'Please enter invalid number'),
                    Emailaddress: Yup.string()
                        .required('This field is required')
                        .email('Must be a valid email'),
                    Complex: Yup.string().required('This field is required'),
                    employeeType: Yup.string().required('This field is required'),
                    dateOfTermination: Yup.string().required('This field is required'),
                    dateOfJoining: Yup.string().required('This field is required')
                })}>
                <Form>
                    <adminstyle.modalFormRowWrapper>
                        <Grid container>
                            {user.userType === UserType.ComplexManager ? (
                                ''
                            ) : (
                                <Grid item xs={12} sm={12} md={3} lg={3}>
                                    <MSelectFormik
                                        style={{ width: '96%' }}
                                        options={complexlist}
                                        name="Complex"
                                        label="Complex"
                                        placeholder="Complex"
                                    />
                                </Grid>
                            )}
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
                                        name="middleName"
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
                                        name="Dateofbirth"
                                        type="date"
                                        label="Date of birth"
                                        placeholder="Date of birth"
                                        fullWidth
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={3} lg={3}>
                                <div style={{ width: '96%' }}>
                                    <MInputFormik
                                        name="Yearsofexperience"
                                        type="number"
                                        label="Years of experience"
                                        placeholder="Years of experience"
                                        fullWidth
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={3} lg={3}>
                                <div style={{ width: '96%' }}>
                                    <MInputFormik
                                        name="Phonenumber"
                                        label="Phone number"
                                        placeholder="Phone number"
                                        fullWidth
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={3} lg={3}>
                                <div style={{ width: '96%' }}>
                                    <MInputFormik
                                        name="Emailaddress"
                                        label="Email address"
                                        placeholder="Email address"
                                        fullWidth
                                        disabled
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={3} lg={3}>
                                <MSelectFormik
                                    style={{ width: '96%' }}
                                    options={employtypelist}
                                    name="employeeType"
                                    label="Employment type"
                                    placeholder="Employment type"
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={3} lg={3}>
                                <div style={{ width: '96%' }}>
                                    <MInputFormik
                                        name="dateOfJoining"
                                        type="date"
                                        label="Date of joining"
                                        placeholder="Date of birth"
                                        fullWidth
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={3} lg={3}>
                                <div style={{ width: '96%' }}>
                                    <MInputFormik
                                        name="dateOfTermination"
                                        type="date"
                                        label="Date of termination"
                                        placeholder="Date of birth"
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

const handleSecurityAddModal = (refetch, row?: RowTable) => {
    return newModal({
        Body: PeaplemanagementAddModal,
        title: 'Edit Security',
        topBar: true,
        id: PeaplemanagementAddModal.name,
        data: { row, refetch }
    });
};

export default handleSecurityAddModal;
