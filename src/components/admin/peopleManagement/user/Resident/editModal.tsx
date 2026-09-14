import { Formik, Form, FieldArray, Field, useField } from 'formik';
import * as Yup from 'yup';
import { MInputFormik } from '@/components/base/input/MInput';
import * as adminstyle from '@/components/admin/admin.style';
import { closeModal, newModal } from 'src/redux/actions/actions';
import { IModalBodyProps } from '@/components/shared/modals/types.modals';
import { FC } from 'react';
import { Select, Checkbox, Grid, FormControlLabel, Button, Box, MenuItem } from '@mui/material';
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
    useUser_UpdateResidentMutation,
    useResidentFlat_UpdateMutation,
    useTotalComplexblockfloorflatQuery,
    UserType
} from 'src/graphql/generated';
import Down from 'src/assets/icons/Down';
import Utils from '@/utils/utils';
import { PHONE_VALIDATIONIndia, PHONE_VALIDATIONUsa } from '@/utils/helper/regexes';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';
import { LoadingButton } from '@mui/lab';

const PeaplemanagementAddModal: FC<IModalBodyProps<RowTable>> = ({ data: { row, refetch } }) => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const mutationErrorHandler = useMutationErrorHandler();
    const { data: totalbuilding } = useTotalComplexblockfloorflatQuery();

    const queryClient = useQueryClient();
    const { mutate, isLoading } = useUser_UpdateResidentMutation();
    const { mutate: mutateflat, isLoading: isLoadingflat } = useResidentFlat_UpdateMutation();

    const [complexlist, setcomplexlist] = useState([]);
    const [blocklist, setblocklist] = useState([]);
    const [floorlist, setfloorlist] = useState([]);
    const [flatlist, setflatlist] = useState([]);
    const [complexitem, setcomplexitem] = useState(row.Complex[0]);
    const [Blockitem, setBlockitem] = useState(row.Block[0]);
    const [Flooritem, setFlooritem] = useState(row.Floor[0]);

    const handleCancel = () => {
        dispatch(closeModal(PeaplemanagementAddModal.name));
    };

    const handelsave = (e) => {
        mutate(
            {
                input: {
                    alternativeContact: e.PrimaryContact,
                    gender: e.Gender,
                    activeStatus: e.Status,
                    firstName: e.Firstname,
                    lastName: e.Surname,
                    dateOfBirth: e.Dateofbirth,
                    phoneNumber: e.Phonenumber,
                    // email: e.Email,
                    id: row.id,
                    photoUrl: row.photoUrl,
                    middleName: e.Middlename
                }
            },
            {
                onSuccess: () => {
                    enqueueSnackbar('Operation was successful!', {
                        variant: 'success'
                    }),
                        dispatch(closeModal(PeaplemanagementAddModal.name)),
                        queryClient.refetchQueries('user_getResidents');
                },
                onError: (err) => {
                    mutationErrorHandler(err, 'user_updateResident');
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
                    Status: row.activeStatus,
                    Firstname: row.firstName,
                    Surname: row.lastName,
                    Gender: row.gender,
                    Phonenumber: row.Phone,
                    Email: row.Email,
                    PrimaryContact: row.primaryContact,
                    Dateofbirth: row.dateOfBirth,
                    Middlename: row.Middlename
                }}
                validationSchema={Yup.object({
                    Firstname: Yup.string().required('This field is required'),
                    Surname: Yup.string().required('This field is required'),
                    //Gender: Yup.string().required('This field is required'),
                    Phonenumber: Yup.string()
                        .required('This field is required')
                        .matches(PHONE_VALIDATIONIndia, 'Please enter invalid number'),
                    Email: Yup.string()
                        .required('This field is required')
                        .email('Must be a valid email'),
                    // PrimaryContact: Yup.string().required('This field is required'),
                    Dateofbirth: Yup.date()
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
                                        label="Date of birth"
                                        fullWidth
                                        type="date"
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={3} lg={3}>
                                <div style={{ width: '96%' }}>
                                    <MInputFormik
                                        style={{ width: '96%' }}
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
                                        style={{ width: '96%' }}
                                        name="Email"
                                        label="Email address"
                                        placeholder="Email Address"
                                        fullWidth
                                        disabled
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={3} lg={3}>
                                <div style={{ width: '96%' }}>
                                    <MInputFormik
                                        style={{ width: '96%' }}
                                        name="PrimaryContact"
                                        label="Alternative contact"
                                        placeholder="Primary Contact"
                                        fullWidth
                                        necessary={false}
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

const handleShowPeapleAddModal = (refetch, row?: RowTable) => {
    return newModal({
        Body: PeaplemanagementAddModal,
        title: `${typeof row === 'undefined' ? 'Add' : 'Edit'} resident`,
        topBar: true,
        id: PeaplemanagementAddModal.name,
        data: { row, refetch }
    });
};

export default handleShowPeapleAddModal;
