import { Select, Box, Button, MenuItem, Typography, FormControlLabel } from '@mui/material';
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
    useComplaintType_GetComplaintTypesQuery,
    useTotalbuildingQuery,
    UserType
} from 'src/graphql/generated';
import Down from 'src/assets/icons/Down';
import Utils from '@/utils/utils';
import { RowTable } from '@/components/table/table_layout/types.table.layout';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';
import { LoadingButton } from '@mui/lab';
import { useGetUser } from 'src/auth/UserProvider';
import storageKeys from 'src/data/storageKeys';

const ComplaintAddModal: FC<IModalBodyProps<RowTable>> = ({ data }) => {
    const dispatch = useDispatch();
    const { data: totalbuilding } = useTotalbuildingQuery();
    const mutationErrorHandler = useMutationErrorHandler();
    const user = useGetUser();
    const { mutate, isLoading } = useComplaint_CreateMutation();
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient();
    const [complexlist, setcomplexlist] = useState([]);
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
    const [TypeComplaint, setTypeComplaint] = useState([]);
    const { data: datacomplex } = useComplex_GetComplexesQuery({
        take: 1000,
        where: { activeStatus: { eq: 'ACTIVE' as any } }
    });
    const { data: datatypecomplaint } = useComplaintType_GetComplaintTypesQuery({
        take: 1000,
        where: { activeStatus: { eq: 'ACTIVE' as any } }
    });
    const { data: dataBlock } = useBlock_GetBlocksQuery({
        take: 1000,
        where: {
            complexId: { eq: complexitem },
            activeStatus: { eq: 'ACTIVE' as any }
        }
    });
    const { data: dataFloor } = useFloor_GetFloorsQuery({
        take: 1000,
        where: {
            blockId: { eq: Blockitem },
            activeStatus: { eq: 'ACTIVE' as any }
        }
    });
    const { data: dataFlat } = useFlat_GetFlatsQuery({
        take: 1000,
        where: {
            floorId: { eq: Flooritem },
            activeStatus: { eq: 'ACTIVE' as any }
        }
    });
    useEffect(() => {
        var js = [];
        datatypecomplaint?.complaintType_getComplaintTypes?.result?.items?.map((item) => {
            js.push({ option: item.name, value: item.id });
        });
        setTypeComplaint(js);
    }, [datatypecomplaint]);
    useEffect(() => {
        var js = [],
            jsblock = [],
            jsfloor = [],
            jsflat = [];
        datacomplex?.complex_getComplexes?.result?.items.map((item) => {
            js.push({ option: item.name, value: item.id });
        });
        if (dataBlock?.block_getBlocks?.result?.items.length !== 0) {
            dataBlock?.block_getBlocks?.result?.items.map((item) => {
                jsblock.push({ option: item.name, value: item.id });
            });
        }
        if (dataFloor?.floor_getFloors?.result?.items.length !== 0) {
            dataFloor?.floor_getFloors?.result?.items.map((item) => {
                jsfloor.push({ option: item.name, value: item.id });
                //else setFlooritem(0)
            });
        }
        if (dataFlat?.flat_getFlats?.result?.items.length !== 0) {
            dataFlat?.flat_getFlats?.result?.items.map((item) => {
                jsflat.push({ option: item.name, value: item.id });
                //else setFlooritem(0)
            });
        }
        setflatlist(jsflat);
        setfloorlist(jsfloor);
        setcomplexlist(js);
        setblocklist(jsblock);
    }, [datacomplex, dataBlock, dataFloor, dataFlat]);
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

    const handleCancel = () => {
        dispatch(closeModal(ComplaintAddModal.name));
    };
    const handelsave = (e) => {
        mutate(
            {
                input: {
                    complaintStatus: e.Status as any,
                    date: e.Date,
                    title: e.Title,
                    message: e.Message,
                    flatId: e.Flat,
                    complaintTypeId: e.TypeComplaint
                }
            },
            {
                onSuccess: () => {
                    enqueueSnackbar('Operation was successful!', { variant: 'success' }),
                        dispatch(closeModal(ComplaintAddModal.name));
                    queryClient.refetchQueries('complaint_getComplaints');
                },
                onError: (err) => {
                    mutationErrorHandler(err, 'complaint_create');
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
                    //Complex: complexitem,
                    Floor: '',
                    Blook: '',
                    Status: '',
                    Date: new Date().toJSON().slice(0, 10),
                    TypeComplaint: '',
                    Title: '',
                    Message: '',
                    Flat: ''
                }}
                validationSchema={Yup.object({
                    Date: Yup.date().required('This field is required'),
                    Status: Yup.string().required('This field is required'),
                    Complex: Yup.string().required('This field is required'),
                    Block: Yup.string().required('This field is required'),
                    Floor: Yup.string().required('This field is required'),
                    Flat: Yup.string().required('This field is required'),
                    TypeComplaint: Yup.string().required('This field is required'),
                    Title: Yup.string().required('This field is required')
                    // Message: Yup.string().required('This field is required')
                })}>
                <Form>
                    <adminstyle.modalFormRowWrapper>
                        <adminstyle.modalFormRowFieldWrapper>
                            <Field
                                as={FormControlLabel}
                                type="select"
                                name="Complex"
                                onChange={onchangeComplex}
                                style={{ width: '100%', margin: '4px 0 0 0' }}
                                control={<MSelectFormik options={complexlist} label="Complex" />}
                            />
                        </adminstyle.modalFormRowFieldWrapper>

                        <adminstyle.modalFormRowFieldWrapper>
                            <Field
                                as={FormControlLabel}
                                type="select"
                                name="Block"
                                onChange={onchangeBlock}
                                style={{ width: '100%', margin: '4px 0 0 0' }}
                                control={<MSelectFormik options={blocklist} label="Block" />}
                            />
                        </adminstyle.modalFormRowFieldWrapper>

                        <adminstyle.modalFormRowFieldWrapper>
                            <Field
                                as={FormControlLabel}
                                type="select"
                                name="Floor"
                                onChange={onchangeFloor}
                                style={{ width: '100%', margin: '4px 0 0 0' }}
                                control={<MSelectFormik options={floorlist} label="Floor" />}
                            />
                        </adminstyle.modalFormRowFieldWrapper>

                        <adminstyle.modalFormRowFieldWrapper>
                            <MSelectFormik
                                options={flatlist}
                                name="Flat"
                                label="Flat"
                                placeholder="Flat"
                            />
                        </adminstyle.modalFormRowFieldWrapper>
                        <adminstyle.modalFormRowFieldWrapper>
                            <MSelectFormik
                                options={TypeComplaint}
                                name="TypeComplaint"
                                label="Type"
                                placeholder="Type"
                            />
                        </adminstyle.modalFormRowFieldWrapper>
                        <adminstyle.modalFormRowFieldWrapper>
                            <MInputFormik
                                style={{ width: '100%' }}
                                name="Date"
                                label="Date"
                                placeholder="Date"
                                fullWidth
                                type="date"
                            />
                        </adminstyle.modalFormRowFieldWrapper>
                        <adminstyle.modalFormRowFieldWrapper>
                            <MInputFormik
                                style={{ width: '100%' }}
                                name="Title"
                                label="Title"
                                placeholder="Title"
                                fullWidth
                            />
                        </adminstyle.modalFormRowFieldWrapper>
                        <adminstyle.modalFormRowFieldWrapper>
                            <MInputFormik
                                style={{ width: '100%' }}
                                name="Message"
                                label="Message"
                                placeholder="Message"
                                fullWidth
                                necessary={false}
                            />
                        </adminstyle.modalFormRowFieldWrapper>
                        <adminstyle.modalFormRowFieldWrapper>
                            <MSelectFormik
                                options={[
                                    { option: 'Pending', value: 'PENDING' },
                                    {
                                        option: 'In progress',
                                        value: 'IN_PROGRESS'
                                    },
                                    { option: 'Completed', value: 'COMPLETED' }
                                ]}
                                name="Status"
                                label="Status"
                                placeholder="Status"
                            />
                        </adminstyle.modalFormRowFieldWrapper>
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
        </adminstyle.modalbox>
    );
};

const handleShowComplaintAddModal = (data?: RowTable) => {
    return newModal({
        Body: ComplaintAddModal,
        title: 'Add complaint',
        topBar: true,
        id: ComplaintAddModal.name,
        data
    });
};

export default handleShowComplaintAddModal;
