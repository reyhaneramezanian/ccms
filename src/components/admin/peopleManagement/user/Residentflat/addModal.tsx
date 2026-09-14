import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import * as adminstyle from '@/components/admin/admin.style';
import { Formik, Form, FieldArray, Field, useField } from 'formik';
import { MSelectFormik } from '@/components/base/input/MSelect';
import { MInputFormik } from '@/components/base/input/MInput';
import * as Yup from 'yup';
import { Select, Checkbox, Grid, FormControlLabel, Button, Box, MenuItem } from '@mui/material';
import {
    useResidentFlat_UpdateMutation,
    useBlock_GetAvailableBlocksQuery,
    useComplex_GetAvailableComplexesQuery,
    useFloor_GetAvailableFloorsQuery,
    useFlat_GetAvailableFlatsQuery,
    useUser_GetCurrentResidentQuery,
    useTotalComplexblockfloorflatQuery
} from 'src/graphql/generated';
import Down from 'src/assets/icons/Down';
import { IModalBodyProps } from '@/components/shared/modals/types.modals';
import { RowTable } from '@/components/table/table_layout/types.table.layout';
import { closeModal, newModal } from 'src/redux/actions/actions';
import { useSnackbar } from 'notistack';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';
import { FC } from 'react';
import { useQueryClient, QueryClient } from 'react-query';

const PeropertyAddModal: FC<IModalBodyProps<RowTable>> = ({ data: { row, refetch } }) => {
    const dispatch = useDispatch();
    const queryClient = useQueryClient();

    const { mutate, isLoading } = useResidentFlat_UpdateMutation();
    const { enqueueSnackbar } = useSnackbar();
    const mutationErrorHandler = useMutationErrorHandler();

    const [complexlist, setcomplexlist] = useState([]);
    const [owenershit, setowenershit] = useState('OWNER');
    const [blocklist, setblocklist] = useState([]);
    const [floorlist, setfloorlist] = useState([]);
    const [flatlist, setflatlist] = useState([]);
    const [complexitem, setcomplexitem] = useState(row?.complexId);
    const [Blockitem, setBlockitem] = useState(row?.blockId);
    const [Flooritem, setFlooritem] = useState(row?.floorId);
    const { data: datauser } = useUser_GetCurrentResidentQuery();
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
        ownershipStatus: owenershit as any,
        currentFlatId: Number(row.flatId)
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
        dispatch(closeModal(PeropertyAddModal.name));
    };
    const handelsave = (e) => {
        mutate(
            {
                input: {
                    //residentId: datauser?.user_getCurrentResident?.result?.id,
                    ownershipStatus: e.Owership,
                    flatId: e.Flat,
                    activeStatus: e.Status,
                    id: row?.id
                }
            },
            {
                onSuccess: () => {
                    enqueueSnackbar('Operation was successful!', {
                        variant: 'success'
                    }),
                        queryClient.refetchQueries('residentFlat_getResidentFlats');
                    dispatch(closeModal(PeropertyAddModal.name));
                },
                onError: (err) => {
                    mutationErrorHandler(err, 'residentFlat_create');
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
        <adminstyle.modalbox>
            <Formik
                enableReinitialize
                onSubmit={(v, handlers) => {
                    handelsave(v);
                }}
                initialValues={{
                    Complex: row?.complexId,
                    Block: row?.blockId,
                    Floor: row?.floorId,
                    Flat: row?.flatId,
                    Owership: row?.ownershipStatus,
                    Status: row?.activeStatus
                }}
                validationSchema={Yup.object({
                    Complex: Yup.string().required('This field is required'),
                    Block: Yup.string().required('This field is required'),
                    Floor: Yup.string().required('This field is required'),
                    Flat: Yup.string().required('This field is required'),
                    Owership: Yup.string().required('This field is required'),
                    Status: Yup.string().required('This field is required')
                })}>
                <Form>
                    <adminstyle.modalFormRowWrapper>
                        <adminstyle.modalFormRowFieldWrapper>
                            <Field
                                as={FormControlLabel}
                                type="select"
                                name="Owership"
                                onChange={onchangeOwership}
                                style={{ width: '100%', margin: '4px 0 0 0' }}
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
                        </adminstyle.modalFormRowFieldWrapper>
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
                                options={[
                                    { option: 'Active', value: 'ACTIVE' },

                                    { option: 'Inactivate', value: 'INACTIVE' }
                                ]}
                                name="Status"
                                label="Status"
                                placeholder="Status"
                            />
                        </adminstyle.modalFormRowFieldWrapper>
                    </adminstyle.modalFormRowWrapper>

                    <adminstyle.modalButtonGroup>
                        <Box>
                            <Button type="submit" variant="contained" color="primary">
                                Edit
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
const handlepropertyAddModal = (refetch, row?: RowTable) => {
    return newModal({
        Body: PeropertyAddModal,
        title: 'Edit property',
        topBar: true,
        id: PeropertyAddModal.name,
        data: { row, refetch }
    });
};

export default handlepropertyAddModal;
