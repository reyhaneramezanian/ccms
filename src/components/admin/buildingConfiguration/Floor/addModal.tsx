import { Formik, Form, FieldArray, Field, useField } from 'formik';
import * as Yup from 'yup';
import { MInputFormik } from '@/components/base/input/MInput';
import * as adminstyle from '@/components/admin/admin.style';
import { closeModal, newModal } from 'src/redux/actions/actions';
import { IModalBodyProps } from '@/components/shared/modals/types.modals';
import { FC } from 'react';
import { Select, MenuItem, Grid, Typography, Button, Box } from '@mui/material';
import useManageTab from 'src/hooks/useManageTab';
import React, { useEffect, useState } from 'react';
import Delete from 'src/assets/icons/Deletelist';
import { Custom } from 'src/components/shared/share/tick-close';
import { RowTable } from '@/components/table/table_layout/types.table.layout';
import { useQueryClient, QueryClient } from 'react-query';
import { useSnackbar } from 'notistack';
import {
    useFloor_CreateMutation,
    useComplex_GetComplexesQuery,
    useBlock_GetBlocksQuery,
    useTotalComplexblockfloorflatQuery,
    SortEnumType
} from 'src/graphql/generated';
import { useDispatch, useSelector } from 'react-redux';
import { MSelectFormik } from '@/components/base/input/MSelect';
import Down from 'src/assets/icons/Down';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';
import { LoadingButton } from '@mui/lab';

const BuildingConfigurationAddModal: FC<IModalBodyProps<RowTable>> = ({ data }) => {
    const dispatch = useDispatch();
    const { mutate, isLoading } = useFloor_CreateMutation();
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient();
    const [complexlist, setcomplexlist] = useState([]);
    const [blocklist, setblocklist] = useState([[]]);
    const [complexitem, setcomplexitem] = useState([]);
    const [indexadd, setindexadd] = useState(0);
    const [dataselect, setdataselect] = useState('');
    const mutationErrorHandler = useMutationErrorHandler();
    const { data: totalbuilding } = useTotalComplexblockfloorflatQuery();

    const { data: datacomplex } = useComplex_GetComplexesQuery({
        skip: 0,
        take: totalbuilding?.complex_getComplexes?.result?.totalCount,
        order: { id: SortEnumType.Desc }
    });
    const { data: dataBlock } = useBlock_GetBlocksQuery({
        skip: 0,
        take: totalbuilding?.block_getBlocks?.result?.totalCount,
        where: {
            complexId: {
                eq: Number(dataselect)
            }
        },
        order: { id: SortEnumType.Desc }
    });
    useEffect(() => {
        var js = [],
            jsblocklist = [],
            jsblock = [],
            sw = 0;

        datacomplex?.complex_getComplexes?.result?.items.map((item) => {
            js.push({ option: item.name, value: item.id });
        });
        dataBlock?.block_getBlocks?.result?.items.map((item) => {
            jsblock.push({ option: item.name, value: item.id });
        });
        blocklist.forEach((item, i) => {
            if (i === indexadd) {
                jsblocklist.push(jsblock);
                sw = 1;
            } else jsblocklist.push(item);
        });
        if (sw == 0) jsblocklist.push(jsblock);
        setcomplexlist(js);
        setblocklist(jsblocklist);
    }, [datacomplex, dataBlock]);

    const handleCancel = () => {
        dispatch(closeModal(BuildingConfigurationAddModal.name));
    };

    const valuecomplex = (indexrow) => {
        var value = 0;
        if (complexitem.length != 0)
            complexitem?.forEach((item) => {
                if (item.index === indexrow) value = item.value;
            });
        return value;
    };
    const listblock = (indexrow) => {
        var value = [];

        if (blocklist.length != 0)
            blocklist?.forEach((item, i) => {
                if (i === indexrow) value = item;
            });
        return value;
    };

    const ComplexSelect = ({ name, options, label, indexrow }) => {
        const [field, meta, helpers] = useField(name);
        return (
            <>
                {indexrow !== 0 ? (
                    ''
                ) : (
                    <adminstyle.label>
                        <adminstyle.rowpage>
                            <adminstyle.cellvalid>{label}</adminstyle.cellvalid>
                            <adminstyle.cellvalid style={{ color: '#eb5c75', margin: '0 0 0 5px' }}>
                                *
                            </adminstyle.cellvalid>
                        </adminstyle.rowpage>
                    </adminstyle.label>
                )}
                <Select
                    name={name}
                    style={{
                        borderRadius: 8,
                        border: 'none',
                        width: '96%',
                        margin: '-4px 5px 15px 0',
                        height: '48px',
                        backgroundColor: '#F2F3F7'
                    }}
                    value={valuecomplex(indexrow)}
                    onChange={(e) => {
                        var js = complexitem,
                            sw = 0,
                            repete = 0;
                        setdataselect(e.target.value.toString());
                        complexitem?.forEach((item, i) => {
                            if (item.index === indexrow) {
                                js.push({ value: e.target.value, index: item.index });
                                sw = 1;
                            }
                            if (e.target.value === item.value) repete = item.index;
                        });
                        if (repete + 1 === indexrow) {
                            var jsblock = blocklist;
                            blocklist?.forEach((item, i) => {
                                if (i === repete) jsblock.push(item);
                            });
                            setblocklist(jsblock);
                        }

                        if (sw === 0) js.push({ value: e.target.value, index: indexrow });
                        setindexadd(indexrow);
                        setcomplexitem(js);
                    }}
                    IconComponent={() => <Down />}
                    variant="outlined">
                    {options.map((item) => (
                        <MenuItem value={item.value}>{item.option}</MenuItem>
                    ))}
                </Select>
            </>
        );
    };

    const handelsave = async (e) => {
        await Promise.all(
            e.listComplex.map((item) =>
                mutate(
                    {
                        input: {
                            name: item.Floor,
                            activeStatus: item.Status,
                            blockId: item.Block
                        }
                    },
                    {
                        onSuccess: () => {
                            enqueueSnackbar('Operation was successful!', { variant: 'success' }),
                                dispatch(closeModal(BuildingConfigurationAddModal.name)),
                                queryClient.refetchQueries('floor_getFloors');
                        },
                        onError: (err) => {
                            mutationErrorHandler(err, 'floor_create');
                        }
                    }
                )
            )
        );
    };

    return (
        <Box style={{ width: 900, maxWidth: '90vw' }}>
            <Formik
                initialValues={{
                    listComplex: [
                        {
                            Complex: datacomplex?.complex_getComplexes?.result?.items[0]?.id,
                            Block: dataBlock?.block_getBlocks?.result?.items[0]?.id,
                            Floor: '',
                            Status: 'ACTIVE'
                        }
                    ]
                }}
                validationSchema={Yup.object({
                    listComplex: Yup.array(
                        Yup.object({
                            // Complex: Yup.string().required('this field is required'),
                            Block: Yup.string().required('this field is required'),
                            Floor: Yup.string().required('this field is required'),
                            Status: Yup.string().required('this field is required')
                        })
                    ).min(1)
                })}
                onSubmit={(values) => {
                    handelsave(values);
                }}>
                {({ values, errors }) => (
                    <Form autoComplete="off">
                        <Grid container>
                            <FieldArray name="listComplex">
                                {({ push, remove }) => (
                                    <React.Fragment>
                                        {values.listComplex.map((v, index) => (
                                            <adminstyle.rowpage>
                                                <adminstyle.cellpage>
                                                    <ComplexSelect
                                                        name={`listComplex.${index}.Complex`}
                                                        label={index === 0 ? 'Complex' : ''}
                                                        options={complexlist}
                                                        indexrow={index}
                                                    />
                                                </adminstyle.cellpage>
                                                <adminstyle.cellpage>
                                                    <MSelectFormik
                                                        style={{ width: '96%' }}
                                                        options={listblock(index)}
                                                        name={`listComplex.${index}.Block`}
                                                        label={index === 0 ? 'Block' : ''}
                                                        placeholder="Block"
                                                    />
                                                </adminstyle.cellpage>
                                                <adminstyle.cellpage>
                                                    <div
                                                        style={{
                                                            width: '96%',
                                                            margin: `${
                                                                index != 0 ? '-13px 5px 0 0' : ''
                                                            }`
                                                        }}>
                                                        <MInputFormik
                                                            name={`listComplex.${index}.Floor`}
                                                            label={index === 0 ? 'Floor' : ''}
                                                            placeholder="Floor"
                                                            fullWidth
                                                        />
                                                    </div>
                                                </adminstyle.cellpage>
                                                <adminstyle.cellpage>
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
                                                        name={`listComplex.${index}.Status`}
                                                        label={index === 0 ? 'Status' : ''}
                                                        placeholder="Status"
                                                    />
                                                </adminstyle.cellpage>
                                                <adminstyle.cellpage>
                                                    {index != 0 ? (
                                                        <Custom
                                                            onClick={() => remove(index)}
                                                            style={{ margin: '-5px 0 0 0' }}>
                                                            <Delete />
                                                        </Custom>
                                                    ) : (
                                                        ''
                                                    )}
                                                </adminstyle.cellpage>
                                            </adminstyle.rowpage>
                                        ))}
                                        <Grid container>
                                            <Grid item>
                                                <Button
                                                    onClick={() => {
                                                        push({ Complex: '', Status: '' });
                                                    }}>
                                                    Add a floor
                                                </Button>
                                            </Grid>
                                        </Grid>
                                        <adminstyle.modalButtonGroup
                                            style={{ float: 'right', width: '100%' }}>
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
                                                <Button
                                                    variant="outlined"
                                                    color="grey3"
                                                    onClick={handleCancel}>
                                                    Cancel
                                                </Button>
                                            </Box>
                                        </adminstyle.modalButtonGroup>
                                    </React.Fragment>
                                )}
                            </FieldArray>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </Box>
    );
};

const handleShowBuildingConfigurationAddModal = (data?: RowTable) => {
    return newModal({
        Body: BuildingConfigurationAddModal,
        title: 'Add floor(s)',
        topBar: true,
        id: BuildingConfigurationAddModal.name,
        data
    });
};

export default handleShowBuildingConfigurationAddModal;
