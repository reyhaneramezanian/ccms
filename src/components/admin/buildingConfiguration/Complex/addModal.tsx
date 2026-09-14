import { Formik, Form, FieldArray, Field } from 'formik';
import * as Yup from 'yup';
import { MInputFormik } from '@/components/base/input/MInput';
import * as adminstyle from '@/components/admin/admin.style';
import { closeModal, newModal } from 'src/redux/actions/actions';
import { IModalBodyProps } from '@/components/shared/modals/types.modals';
import { FC } from 'react';
import {
    Grid,
    Typography,
    Button,
    Box,
    FormControlLabel,
    Select,
    MenuItem,
    InputLabel
} from '@mui/material';
import useManageTab from 'src/hooks/useManageTab';
import React, { useEffect, useState } from 'react';
import Delete from 'src/assets/icons/Deletelist';
import { Custom } from 'src/components/shared/share/tick-close';
import { RowTable } from '@/components/table/table_layout/types.table.layout';
import { useQueryClient, QueryClient } from 'react-query';
import { useSnackbar } from 'notistack';
import { useComplex_CreateMutation } from 'src/graphql/generated';
import { useDispatch, useSelector } from 'react-redux';
import { MSelectFormik } from '@/components/base/input/MSelect';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';
import { LoadingButton } from '@mui/lab';

const BuildingConfigurationAddModal: FC<IModalBodyProps<RowTable>> = ({ data }) => {
    const dispatch = useDispatch();
    const { mutate, isLoading } = useComplex_CreateMutation();
    const [payment, setpayment] = useState('POST_PAID');
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient();
    const mutationErrorHandler = useMutationErrorHandler();

    const handleCancel = () => {
        dispatch(closeModal(BuildingConfigurationAddModal.name));
    };
    const handelsave = (e) => {
        mutate(
            {
                input: {
                    name: e.Complex,
                    activeStatus: e.Status,
                    paymentMode: payment as any,
                    initiallyAmount: Number(e.Initiallyamount),
                    permittedConsumption: Number(e.Permittedconsumption)
                }
            },
            {
                onSuccess: () => {
                    enqueueSnackbar('Operation was successful!', { variant: 'success' }),
                        dispatch(closeModal(BuildingConfigurationAddModal.name)),
                        queryClient.refetchQueries('complex_getComplexes');
                },
                onError: (err) => {
                    mutationErrorHandler(err, 'complex_create');
                }
            }
        );
    };
    const changepayment = (e) => {
        setpayment(e.target.value);
    };
    return (
        <Box>
            <Formik
                onSubmit={(v, handlers) => {
                    handelsave(v);
                }}
                initialValues={{
                    Complex: '',
                    Status: 'ACTIVE',
                    Paymentmode: 'POST_PAID',
                    Initiallyamount: '',
                    Permittedconsumption: ''
                }}
                validationSchema={
                    payment === 'POST_PAID'
                        ? Yup.object({
                              Complex: Yup.string().required('This field is required'),
                              Status: Yup.string().required('This field is required')
                          })
                        : Yup.object({
                              Complex: Yup.string().required('This field is required'),
                              Status: Yup.string().required('This field is required'),
                              Initiallyamount: Yup.number()
                                  .required('This field is required')
                                  .min(1, 'Min is 0'),
                              Permittedconsumption: Yup.number()
                                  .required('This field is required')
                                  .min(1, 'Min is 1')
                                  .max(100, 'Max is 100')
                          })
                }>
                <Form>
                    <adminstyle.rowpage>
                        <adminstyle.cellpage>
                            <div style={{ width: '96%' }}>
                                <MInputFormik
                                    name="Complex"
                                    label="Complex"
                                    placeholder="Complex"
                                    fullWidth
                                />
                            </div>
                        </adminstyle.cellpage>
                        <adminstyle.cellpage>
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
                        </adminstyle.cellpage>
                        <adminstyle.cellpage>
                            <Field
                                as={FormControlLabel}
                                type="select"
                                name="Payment"
                                control={
                                    <Grid container>
                                        <Grid item xs={12} sm={12} md={12} lg={12}>
                                            <adminstyle.lablelselect>
                                                Payment mode
                                            </adminstyle.lablelselect>
                                            <adminstyle.lablelstar>*</adminstyle.lablelstar>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12} lg={12}>
                                            <Select
                                                onChange={changepayment}
                                                value={payment}
                                                style={{
                                                    backgroundColor: '#f2f3f7',
                                                    borderRadius: 8,
                                                    height: 48,
                                                    margin: '7px 0 0 10px',
                                                    width: '97%'
                                                }}>
                                                <MenuItem value="POST_PAID">Post mode</MenuItem>
                                                <MenuItem value="PRE_PAID">Pre-paid mode</MenuItem>
                                            </Select>
                                        </Grid>
                                    </Grid>
                                }
                            />
                        </adminstyle.cellpage>
                    </adminstyle.rowpage>
                    {payment === 'PRE_PAID' ? (
                        <adminstyle.rowpage>
                            <adminstyle.cellpage>
                                <div style={{ width: '96%' }}>
                                    <MInputFormik
                                        name="Initiallyamount"
                                        label="Initially amount"
                                        placeholder="Initially amount"
                                        fullWidth
                                        type="number"
                                    />
                                </div>
                            </adminstyle.cellpage>
                            <adminstyle.cellpage>
                                <div style={{ width: '96%' }}>
                                    <MInputFormik
                                        name="Permittedconsumption"
                                        label="Permitted consumption(%) "
                                        placeholder="Permitted consumption(%)"
                                        fullWidth
                                        type="number"
                                    />
                                </div>
                            </adminstyle.cellpage>
                            <adminstyle.cellpage></adminstyle.cellpage>
                        </adminstyle.rowpage>
                    ) : (
                        ''
                    )}
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

const handleShowBuildingConfigurationAddModal = (data?: RowTable) => {
    return newModal({
        Body: BuildingConfigurationAddModal,
        title: 'Add complex',
        topBar: true,
        id: BuildingConfigurationAddModal.name,
        data
    });
};

export default handleShowBuildingConfigurationAddModal;
