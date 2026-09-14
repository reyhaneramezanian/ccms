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
    useUser_CreateResidentMutation,
    useBlock_GetAvailableBlocksQuery,
    useComplex_GetAvailableComplexesQuery,
    useFloor_GetAvailableFloorsQuery,
    useFlat_GetAvailableFlatsQuery,
    useResidentFlat_CreateMutation,
    useTotalComplexblockfloorflatQuery,
    UserType
} from 'src/graphql/generated';
import Down from 'src/assets/icons/Down';
import Utils from '@/utils/utils';
import { PHONE_VALIDATIONIndia, PHONE_VALIDATIONUsa } from '@/utils/helper/regexes';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';
import { LoadingButton } from '@mui/lab';
import { useGetUser } from 'src/auth/UserProvider';
import storageKeys from 'src/data/storageKeys';

const PeaplemanagementAddModal: FC<IModalBodyProps<RowTable>> = ({ row }) => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const mutationErrorHandler = useMutationErrorHandler();
    const user = useGetUser();

    const queryClient = useQueryClient();
    const { mutate, isLoading } = useUser_CreateResidentMutation();
    const { mutate: mutateflat, isLoading: isLoadingflat } = useResidentFlat_CreateMutation();

    const [complexlist, setcomplexlist] = useState([]);
    const [owenershit, setowenershit] = useState('OWNER');
    const [blocklist, setblocklist] = useState([]);
    const [floorlist, setfloorlist] = useState([]);
    const [flatlist, setflatlist] = useState([]);
    const [complexitem, setcomplexitem] = useState(
        user.userType === UserType.ComplexManager
            ? Number(localStorage.getItem(storageKeys.activecomplexId))
            : ''
    );
    const [Blockitem, setBlockitem] = useState('');
    const [Flooritem, setFlooritem] = useState('');
    const { data: datacomplex } = useComplex_GetAvailableComplexesQuery({
        take: 1000,
        where: { activeStatus: { eq: 'ACTIVE' as any } },
        ownershipStatus: owenershit as any
    });
    const { data: dataBlock } = useBlock_GetAvailableBlocksQuery({
        take: 10000,
        where: {
            complexId: { eq: complexitem },

            activeStatus: { eq: 'ACTIVE' as any }
        },
        ownershipStatus: owenershit as any
    });
    const { data: dataFloor } = useFloor_GetAvailableFloorsQuery({
        take: 10000,
        where: {
            blockId: { eq: Blockitem },

            activeStatus: { eq: 'ACTIVE' as any }
        },
        ownershipStatus: owenershit as any
    });
    const { data: dataFlat } = useFlat_GetAvailableFlatsQuery({
        take: 10000,

        where: {
            floorId: { eq: Flooritem },

            activeStatus: { eq: 'ACTIVE' as any }
        },
        ownershipStatus: owenershit as any
    });

    useEffect(() => {
        var js = [],
            jsblock = [],
            jsfloor = [],
            jsflat = [];
        datacomplex?.complex_getAvailableComplexes?.result?.items.map((item) => {
            js.push({ option: item.name, value: item.id });
        });
        if (dataBlock?.block_getAvailableBlocks?.result?.items.length !== 0) {
            var sw = 0;
            dataBlock?.block_getAvailableBlocks?.result?.items.map((item) => {
                jsblock.push({ option: item.name, value: item.id });
            });
        }
        if (dataFloor?.floor_getAvailableFloors?.result?.items.length !== 0) {
            dataFloor?.floor_getAvailableFloors?.result?.items.map((item) => {
                jsfloor.push({ option: item.name, value: item.id });
            });
        }
        if (dataFlat?.flat_getAvailableFlats?.result?.items.length !== 0) {
            dataFlat?.flat_getAvailableFlats?.result?.items.map((item) => {
                jsflat.push({ option: item.name, value: item.id });
            });
        } else setflatlist(0);

        setflatlist(jsflat);
        setfloorlist(jsfloor);
        setcomplexlist(js);
        setblocklist(jsblock);
    }, [datacomplex, dataBlock, dataFloor, dataFlat]);

    const handleCancel = () => {
        dispatch(closeModal(PeaplemanagementAddModal.name));
    };

    const handelsave = (e) => {
        mutate(
            {
                residentFlatInput: {
                    flatId: e.Flat,
                    ownershipStatus: e.Owership,
                    activeStatus: e.Status
                },

                input: {
                    alternativeContact: e.PrimaryContact,
                    gender: e.Gender,
                    activeStatus: e.Status,
                    firstName: e.Firstname,
                    lastName: e.Surname,
                    dateOfBirth: e.Dateofbirth,
                    phoneNumber: e.Phonenumber,
                    email: e.Email.trim(),
                    middleName: e.Middlename,
                    //  ownershipStatus: e.Owership,
                    //flatId: e.Flat,
                    photoUrl: ''
                    /* residentFlats: {
                        ownershipStatus: e.Owership,
                        flatId: e.Flat,
                        activeStatus: e.Status
                    } as any*/
                }
            },
            {
                onSuccess: (result) => {
                    enqueueSnackbar('Operation was successful!', {
                        variant: 'success'
                    }),
                        dispatch(closeModal(PeaplemanagementAddModal.name)),
                        queryClient.refetchQueries('user_getResidents');
                    /*  mutateflat(
                        {
                            input: {
                                residentId: result?.user_createResident?.result?.id,
                                ownershipStatus: e.Owership,
                                flatId: e.Flat,
                                activeStatus: e.Status
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
                           
                        }
                    );*/
                },
                onError: (err) => {
                    mutationErrorHandler(err, 'user_createResident');
                }
            }
        );
    };
    const onchangeOwership = (e) => {
        setowenershit(e.target.value);
        setcomplexitem('');
        setBlockitem('');
        setFlooritem('');
    };
    const onchangeComplex = (e) => {
        setcomplexitem(e.target.value);
        setBlockitem('');
        setFlooritem('');
    };
    const onchangeBlock = (e) => {
        setBlockitem(e.target.value);
        setFlooritem('');
    };
    const onchangeFloor = (e) => {
        setFlooritem(e.target.value);
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
                    Status: '',
                    Firstname: '',
                    Surname: '',
                    Gender: null,
                    Phonenumber: '',
                    Email: '',
                    PrimaryContact: '',
                    Dateofbirth: new Date().toJSON().slice(0, 10),
                    Flat: '',
                    Owership: 'OWNER',
                    Middlename: '',
                    Block: '',
                    Floor: ''
                    // Complex: complexitem
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
                    //PrimaryContact: Yup.string().required('This field is required'),
                    Dateofbirth: Yup.date()
                        .max(new Date(), 'Date can not be in the future')
                        .required('This field is required'),
                    Block: Yup.string().required('This field is required'),
                    Floor: Yup.string().required('This field is required'),
                    Complex: Yup.string().required('This field is required'),
                    Flat: Yup.string().required('This field is required'),
                    Owership: Yup.string().required('This field is required'),
                    Status: Yup.string().required('This field is required')
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
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <adminstyle.headdetail>Property information</adminstyle.headdetail>
                            </Grid>
                            <Grid item xs={12} sm={12} md={3} lg={3}>
                                <Field
                                    as={FormControlLabel}
                                    type="select"
                                    name="Owership"
                                    onChange={onchangeOwership}
                                    style={{ width: '96%', margin: '4px 0 0 0' }}
                                    control={
                                        <MSelectFormik
                                            options={[
                                                { option: 'Owner', value: 'OWNER' },

                                                { option: 'Renter', value: 'RENTER' }
                                            ]}
                                            label="Owership"
                                        />
                                    }
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={3} lg={3}>
                                <Field
                                    as={FormControlLabel}
                                    type="select"
                                    name="Complex"
                                    onChange={onchangeComplex}
                                    style={{ width: '96%', margin: '4px 0 0 0' }}
                                    control={
                                        <MSelectFormik options={complexlist} label="Complex" />
                                    }
                                />
                            </Grid>

                            <Grid item xs={12} sm={12} md={3} lg={3}>
                                <Field
                                    as={FormControlLabel}
                                    type="select"
                                    name="Block"
                                    onChange={onchangeBlock}
                                    style={{ width: '96%', margin: '4px 0 0 0' }}
                                    control={<MSelectFormik options={blocklist} label="Block" />}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={3} lg={3}>
                                <Field
                                    as={FormControlLabel}
                                    type="select"
                                    name="Floor"
                                    onChange={onchangeFloor}
                                    style={{ width: '96%', margin: '4px 0 0 0' }}
                                    control={<MSelectFormik options={floorlist} label="Floor" />}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={3} lg={3}>
                                <MSelectFormik
                                    style={{ width: '96%' }}
                                    options={flatlist}
                                    name="Flat"
                                    label="Flat"
                                    placeholder="Flat"
                                />
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
        title: 'Add resident',
        topBar: true,
        id: PeaplemanagementAddModal.name,
        data
    });
};

export default handleShowPeapleAddModal;
