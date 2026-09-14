import { Formik, Form, FieldArray, Field } from 'formik';
import * as Yup from 'yup';
import { MInputFormik } from '@/components/base/input/MInput';
import * as adminstyle from '@/components/admin/admin.style';
import { closeModal, newModal } from 'src/redux/actions/actions';
import { IModalBodyProps } from '@/components/shared/modals/types.modals';
import { FC } from 'react';
import { Grid, Typography, Button, Box } from '@mui/material';
import useManageTab from 'src/hooks/useManageTab';
import React, { useEffect, useState } from 'react';
import Delete from 'src/assets/icons/Deletelist';
import { Custom } from 'src/components/shared/share/tick-close';
import { RowTable } from '@/components/table/table_layout/types.table.layout';
import { useQueryClient, QueryClient } from 'react-query';
import { useSnackbar } from 'notistack';
import {
    useBlock_CreateMutation,
    useComplex_GetComplexesQuery,
    useTotalComplexblockfloorflatQuery,
    SortEnumType
} from 'src/graphql/generated';
import { useDispatch, useSelector } from 'react-redux';
import { MSelectFormik } from '@/components/base/input/MSelect';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';
import { LoadingButton } from '@mui/lab';

const BuildingConfigurationAddModal: FC<IModalBodyProps<RowTable>> = ({ data }) => {
    const dispatch = useDispatch();
    const { mutate, isLoading } = useBlock_CreateMutation();
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient();
    const mutationErrorHandler = useMutationErrorHandler();
    const { data: totalbuilding } = useTotalComplexblockfloorflatQuery();

    const [complexlist, setcomplexlist] = useState([]);
    const { data: datacomplex } = useComplex_GetComplexesQuery({
        take: totalbuilding?.complex_getComplexes?.result?.totalCount,
        order: { id: SortEnumType.Desc }
    });

    useEffect(() => {
        var js = [];
        datacomplex?.complex_getComplexes?.result?.items.forEach((item, i) => {
            js.push({ option: item.name, value: item.id });
        });

        setcomplexlist(js);
    }, [datacomplex]);

    const handleCancel = () => {
        dispatch(closeModal(BuildingConfigurationAddModal.name));
    };
    const handelsave = async (e) => {
        await Promise.all(
            e.listComplex.map((item) =>
                mutate(
                    {
                        input: {
                            name: item.Block,
                            activeStatus: item.Status,
                            complexId: item.Complex
                        }
                    },
                    {
                        onSuccess: () => {
                            enqueueSnackbar('Operation was successful!', { variant: 'success' }),
                                dispatch(closeModal(BuildingConfigurationAddModal.name)),
                                queryClient.refetchQueries('block_getBlocks');
                        },
                        onError: (err) => {
                            mutationErrorHandler(err, 'block_create');
                        }
                    }
                )
            )
        );

        if (typeof refetch === 'function') {
            refetch();
        }
    };
    return (
        <Box>
            <Formik
                initialValues={{
                    listComplex: [
                        {
                            Complex: datacomplex?.complex_getComplexes?.result?.items[0]?.id,
                            Block: '',
                            Status: 'ACTIVE'
                        }
                    ]
                }}
                validationSchema={Yup.object({
                    listComplex: Yup.array(
                        Yup.object({
                            Complex: Yup.string().required('this field is required'),
                            Block: Yup.string().required('this field is required'),
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
                                                    <MSelectFormik
                                                        style={{ width: '96%' }}
                                                        options={complexlist}
                                                        name={`listComplex.${index}.Complex`}
                                                        label={index === 0 ? 'Complex' : ''}
                                                        placeholder="Complex"
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
                                                            name={`listComplex[${index}].Block`}
                                                            label={index === 0 ? 'Block' : ''}
                                                            placeholder="Block"
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
                                                    onClick={() =>
                                                        push({ Complex: '', Status: '' })
                                                    }>
                                                    Add a block
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
        title: 'Add block(s)',
        topBar: true,
        id: BuildingConfigurationAddModal.name,
        data
    });
};

export default handleShowBuildingConfigurationAddModal;
