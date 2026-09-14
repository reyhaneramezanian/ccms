import { Formik, Form, FieldArray, Field } from 'formik';
import * as Yup from 'yup';
import { MInputFormik } from '@/components/base/input/MInput';
import * as adminstyle from '@/components/admin/admin.style';
import { closeModal, newModal } from 'src/redux/actions/actions';
import { IModalBodyProps } from '@/components/shared/modals/types.modals';
import { FC } from 'react';
import { Grid, Typography, MenuItem, Select, Button, Box, FormControlLabel } from '@mui/material';
import Down from 'src/assets/icons/Down';
import useManageTab from 'src/hooks/useManageTab';
import React, { useEffect, useState } from 'react';
import Delete from 'src/assets/icons/Deletelist';
import { Custom } from 'src/components/shared/share/tick-close';
import { RowTable } from '@/components/table/table_layout/types.table.layout';
import { useQueryClient, QueryClient } from 'react-query';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { MSelectFormik } from '@/components/base/input/MSelect';
import {
    useUser_UpdateComplexManagerMutation,
    useComplex_GetComplexesQuery,
    useTotalComplexblockfloorflatQuery
} from 'src/graphql/generated';
import { PHONE_VALIDATIONIndia, PHONE_VALIDATIONUsa } from '@/utils/helper/regexes';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';
import { LoadingButton } from '@mui/lab';
import { MSelectmultiFormik } from '@/components/base/input/selectmulti';

const PeaplemanagementEditModal: FC<IModalBodyProps<RowTable>> = ({ data: { row, refetch } }) => {
    const dispatch = useDispatch();
    const [complexlist, setcomplexlist] = useState([]);
    const [complexselect, setcomplexselect] = useState([]);

    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient();
    const { data: totalbuilding } = useTotalComplexblockfloorflatQuery();

    const { mutate, isLoading } = useUser_UpdateComplexManagerMutation();
    const mutationErrorHandler = useMutationErrorHandler();

    const { data: datacomplex } = useComplex_GetComplexesQuery({
        take: totalbuilding?.complex_getComplexes?.result?.totalCount,
        where: { activeStatus: { eq: 'ACTIVE' as any } }
    });
    useEffect(() => {
        var js = [],
            jscomplex = [];
        datacomplex?.complex_getComplexes?.result?.items.forEach((item, i) => {
            js.push({ option: item.name, value: item.id });
        });
        row?.complexId.map((items) => {
            jscomplex.push(items.complex.name);
        });
        setcomplexselect(jscomplex);
        setcomplexlist(js);
    }, [datacomplex]);

    const handleChange = (event) => {
        const {
            target: { value }
        } = event;
        setcomplexselect(typeof value === 'string' ? value.split(',') : value);
    };
    const handleCancel = () => {
        dispatch(closeModal(PeaplemanagementEditModal.name));
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
                    complexIds: jscomplex as any,
                    activeStatus: e.Status,
                    gender: e.Gender,
                    firstName: e.Firstname,
                    lastName: e.Surname,
                    middleName: e.middleName,
                    phoneNumber: e.Phonenumber,
                    dateOfBirth: e.dateOfBirth,
                    id: Number(row.id)
                }
            },
            {
                onSuccess: () => {
                    enqueueSnackbar('Operation was successful!', { variant: 'success' }),
                        dispatch(closeModal(PeaplemanagementEditModal.name)),
                        queryClient.refetchQueries('user_getComplexManagers');
                },
                onError: (err) => {
                    mutationErrorHandler(err, 'user_updateComplexManager');
                }
            }
        );
    };
    return (
        <Box style={{ width: 1440, maxWidth: '90vw' }}>
            <Grid item>
                <adminstyle.headdetail> Personal information</adminstyle.headdetail>
            </Grid>
            <Formik
                enableReinitialize
                onSubmit={(v, handlers) => {
                    handelsave(v);
                }}
                initialValues={{
                    Firstname: row.firstName,
                    Status: row.activeStatus,
                    Complex: complexselect,
                    Surname: row.lastName,
                    Gender: row.gender,
                    Phonenumber: row.Phone,
                    Email: row.Email,
                    dateOfBirth: row.dateOfBirth,
                    middleName: row.middleName
                }}
                validationSchema={Yup.object({
                    Firstname: Yup.string().required('This field is required'),
                    Status: Yup.string().required('This field is required'),
                    Complex: Yup.array().required('This field is required'),
                    Surname: Yup.string().required('This field is required'),
                    //  Gender: Yup.string().required('This field is required'),
                    Phonenumber: Yup.string()
                        .required('This field is required')
                        .matches(PHONE_VALIDATIONIndia, 'Please enter invalid number'),
                    Email: Yup.string()
                        .required('This field is required')
                        .email('Must be a valid email'),
                    dateOfBirth: Yup.date()
                        .max(new Date(), 'Date can not be in the future')
                        .required('This field is required')
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
                                        name="dateOfBirth"
                                        label="Date of birth"
                                        placeholder="dateOfBirth"
                                        fullWidth
                                        type="date"
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
                                        name="Email"
                                        label="Email address"
                                        placeholder="Email address"
                                        fullWidth
                                        disabled
                                    />
                                </div>
                            </Grid>

                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <adminstyle.headdetail> Personal information</adminstyle.headdetail>
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
                                    options={[
                                        {
                                            option: 'Active',
                                            value: 'ACTIVE'
                                        },
                                        {
                                            option: 'Inactivate',
                                            value: 'INACTIVE'
                                        }
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

const handleShowPeapleAddModal = (refetch, row?: RowTable) => {
    return newModal({
        Body: PeaplemanagementEditModal,
        title: 'Edit complex manager',
        topBar: true,
        id: PeaplemanagementEditModal.name,
        data: { row, refetch }
    });
};

export default handleShowPeapleAddModal;
