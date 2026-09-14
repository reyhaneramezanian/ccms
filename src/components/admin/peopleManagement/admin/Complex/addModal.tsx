import { Formik, Form, FieldArray, Field } from 'formik';
import * as Yup from 'yup';
import { MInputFormik } from '@/components/base/input/MInput';
import { MSelectmultiFormik } from '@/components/base/input/selectmulti';
import * as adminstyle from '@/components/admin/admin.style';
import { closeModal, newModal } from 'src/redux/actions/actions';
import { IModalBodyProps } from '@/components/shared/modals/types.modals';
import { FC } from 'react';
import { Grid, MenuItem, Select, Button, Box, FormControlLabel } from '@mui/material';
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
    useUser_CreateComplexManagerMutation,
    useComplex_GetComplexesQuery,
    useTotalComplexblockfloorflatQuery
} from 'src/graphql/generated';
import { PHONE_VALIDATIONIndia, PHONE_VALIDATIONUsa } from '@/utils/helper/regexes';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';
import { LoadingButton } from '@mui/lab';
import Down from 'src/assets/icons/Down';

const PeaplemanagementAddModal: FC<IModalBodyProps<RowTable>> = ({ data }) => {
    const dispatch = useDispatch();
    const [complexlist, setcomplexlist] = useState([]);
    const [complexselect, setcomplexselect] = useState([]);
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient();
    const { mutate, isLoading } = useUser_CreateComplexManagerMutation();
    const mutationErrorHandler = useMutationErrorHandler();
    const { data: totalbuilding } = useTotalComplexblockfloorflatQuery();

    const { data: datacomplex } = useComplex_GetComplexesQuery({
        take: totalbuilding?.complex_getComplexes?.result?.totalCount,
        where: { activeStatus: { eq: 'ACTIVE' as any } }
    });
    useEffect(() => {
        var js = [];
        datacomplex?.complex_getComplexes?.result?.items.forEach((item, i) => {
            js.push({ option: item.name, value: item.id });
        });
        setcomplexlist(js);
    }, [datacomplex]);

    const handleChange = (event) => {
        const {
            target: { value }
        } = event;
        setcomplexselect(typeof value === 'string' ? value.split(',') : value);
    };

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
                    complexIds: jscomplex as any,
                    activeStatus: e.Status,
                    gender: e.Gender,
                    firstName: e.Firstname,
                    lastName: e.Surname,
                    email: e.Email,
                    phoneNumber: e.Phonenumber,
                    dateOfBirth: e.dateOfBirth,
                    middleName: e.middleName
                }
            },
            {
                onSuccess: () => {
                    enqueueSnackbar('Operation was successful!', { variant: 'success' }),
                        dispatch(closeModal(PeaplemanagementAddModal.name)),
                        queryClient.refetchQueries('user_getComplexManagers');
                },
                onError: (err) => {
                    mutationErrorHandler(err, 'user_createComplexManager');
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
                    Firstname: '',
                    Status: '',
                    Complex: '',
                    Surname: '',
                    Gender: null,
                    Phonenumber: '',
                    Email: '',
                    dateOfBirth: new Date().toJSON().slice(0, 10)
                }}
                validationSchema={Yup.object({
                    Firstname: Yup.string().required('This field is required'),
                    Status: Yup.string().required('This field is required'),
                    Complex: Yup.array().required('This field is required'),
                    Surname: Yup.string().required('This field is required'),
                    //Gender: Yup.string().required('This field is required'),
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
                                Add
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

const handleShowPeapleAddModal = (data?: RowTable) => {
    return newModal({
        Body: PeaplemanagementAddModal,
        title: 'Add complex manager',
        topBar: true,
        id: PeaplemanagementAddModal.name,
        data
    });
};

export default handleShowPeapleAddModal;
