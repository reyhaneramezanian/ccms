import { FC } from 'react';
import { Select, Box, Button, MenuItem, Typography } from '@mui/material';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { MInputFormik } from '@/components/base/input/MInput';
import * as adminstyle from '@/components/admin/admin.style';
import { closeModal, newModal } from 'src/redux/actions/actions';
import { IModalBodyProps } from '@/components/shared/modals/types.modals';
import { RowTable } from '@/components/table/table_layout/types.table.layout';
import { MSelectFormik } from '@/components/base/input/MSelect';
import * as s from '../@styles';
import { useQueryClient, QueryClient } from 'react-query';
import { useSnackbar } from 'notistack';
import {
    useFloor_UpdateMutation,
    useComplex_GetComplexesQuery,
    useBlock_GetBlocksQuery,
    useTotalComplexblockfloorflatQuery,
    SortEnumType
} from 'src/graphql/generated';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import Down from 'src/assets/icons/Down';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';
import { LoadingButton } from '@mui/lab';

const BuildingConfigurationEditModal: FC<IModalBodyProps<RowTable>> = ({
    data: { row, refetch }
}) => {
    const dispatch = useDispatch();
    const mutationErrorHandler = useMutationErrorHandler();
    const { data: totalbuilding } = useTotalComplexblockfloorflatQuery();

    const { mutate, isLoading } = useFloor_UpdateMutation();
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient();
    const [complexlist, setcomplexlist] = useState([]);
    const [blocklist, setblocklist] = useState([]);
    const [complexitem, setcomplexitem] = useState(0);
    const [Blockitem, setBlockitem] = useState(0);

    const { data: datacomplex } = useComplex_GetComplexesQuery({
        take: totalbuilding?.complex_getComplexes?.result?.totalCount,
        order: { id: SortEnumType.Desc }
    });
    const { data: dataBlock } = useBlock_GetBlocksQuery({
        take: totalbuilding?.complex_getComplexes?.result?.totalCount,
        where: {
            complexId: {
                eq: complexitem
            }
        },
        order: { id: SortEnumType.Desc }
    });

    const FormSelect = ({ name, options }) => {
        const [field, meta, helpers] = useField(name);
        return (
            <>
                <adminstyle.label>
                    <adminstyle.rowpage>
                        <adminstyle.cellvalid>Complex</adminstyle.cellvalid>
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
                        width: '100%',
                        margin: '0 0 20px 0',
                        height: '48px',
                        backgroundColor: '#F2F3F7'
                    }}
                    value={complexitem}
                    onChange={(e) => setcomplexitem(e.target.value)}
                    IconComponent={() => <Down />}
                    variant="outlined">
                    {options.map((item) => (
                        <MenuItem value={item.value}>{item.option}</MenuItem>
                    ))}
                </Select>
            </>
        );
    };
    useEffect(() => {
        var js = [],
            jsblock = [];
        datacomplex?.complex_getComplexes?.result?.items.forEach((item) => {
            js.push({ option: item.name, value: item.id });
            if (row?.Complex == item.name && complexitem === 0) setcomplexitem(Number(item.id));
        });
        if (dataBlock?.block_getBlocks?.result?.items.length !== 0) {
            var sw = 0;
            dataBlock?.block_getBlocks?.result?.items.forEach((item) => {
                jsblock.push({ option: item.name, value: item.id });
                if (row?.Block == item.name) {
                    setBlockitem(Number(item.id));
                    sw = 1;
                }
            });
            if (sw === 0) setBlockitem(0);
        } else setBlockitem(0);
        setcomplexlist(js);
        setblocklist(jsblock);
    }, [datacomplex, dataBlock]);

    const handleCancel = () => {
        dispatch(closeModal(BuildingConfigurationEditModal.name));
    };
    const handelsave = (e) => {
        mutate(
            {
                id: Number(row.id),
                input: {
                    name: e.Floor,
                    activeStatus: e.Status,
                    blockId: e.Block,
                    id: Number(row.id)
                }
            },
            {
                onSuccess: () => {
                    enqueueSnackbar('Operation was successful!', { variant: 'success' }),
                        queryClient.refetchQueries('floor_getFloors');
                    dispatch(closeModal(BuildingConfigurationEditModal.name));
                },
                onError: (err) => {
                    mutationErrorHandler(err, 'floor_update');
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
                    Complex: complexitem,
                    Status: row.activeStatus,
                    Block: Blockitem,
                    Floor: row.Floor
                }}
                validationSchema={Yup.object({
                    Complex: Yup.string().required('This field is required'),
                    Status: Yup.string().required('This field is required'),
                    Block: Yup.string().required('This field is required'),
                    Floor: Yup.string().required('This field is required')
                })}>
                <Form>
                    <adminstyle.modalFormRowWrapper>
                        <adminstyle.modalFormRowFieldWrapper>
                            <FormSelect name="Complex" options={complexlist} />
                        </adminstyle.modalFormRowFieldWrapper>
                        <adminstyle.modalFormRowFieldWrapper>
                            <MSelectFormik
                                options={blocklist}
                                name="Block"
                                label="Block"
                                placeholder="Block"
                            />
                        </adminstyle.modalFormRowFieldWrapper>
                        <adminstyle.modalFormRowFieldWrapper>
                            <MInputFormik
                                style={{ width: '100%' }}
                                name="Floor"
                                label="Floor"
                                placeholder="Floor"
                                fullWidth
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
        </adminstyle.modalbox>
    );
};

const handleShowBuildingConfigurationEditModal = (refetch, row?: RowTable) => {
    return newModal({
        Body: BuildingConfigurationEditModal,
        title: `${typeof row === 'undefined' ? 'Add' : 'Edit'} floor`,
        topBar: true,
        id: BuildingConfigurationEditModal.name,
        data: { row, refetch }
    });
};

export default handleShowBuildingConfigurationEditModal;
