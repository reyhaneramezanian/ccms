import React, { FC, useEffect, useState } from 'react';
import { Grid, MenuItem, Select, Button, Box, FormControlLabel } from '@mui/material';
import { Formik, Form, FieldArray, Field } from 'formik';
import { MInputFormik } from '@/components/base/input/MInput';
import * as adminstyle from '@/components/admin/admin.style';
import { closeModal, newModal } from 'src/redux/actions/actions';
import { IModalBodyProps } from '@/components/shared/modals/types.modals';
import { RowTable } from '@/components/table/table_layout/types.table.layout';
import { useDispatch } from 'react-redux';
import { MSelectFormik } from '@/components/base/input/MSelect';
import { frequentVisitorValidationSchema } from './data';
import {
    FrequentVisitorInput,
    useComplex_GetComplexesQuery,
    useAdminVisitorCreateMutation,
    useAdminVisitorUpdateMutation,
    useTotalComplexblockfloorflatQuery,
    UserType,
    useUser_GetCurrentComplexManagerQuery
} from 'src/graphql/generated';
import { ACTIVE_STATUS } from 'src/data/options';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';
import Down from 'src/assets/icons/Down';
import { MSelectmultiFormik } from '@/components/base/input/selectmulti';
import { useGetUser } from 'src/auth/UserProvider';
import storageKeys from 'src/data/storageKeys';

const FrequentVisitorEditModal: FC<IModalBodyProps<RowTable>> = ({ data: { row, refetch } }) => {
    const user = useGetUser();
    const hasUser = typeof user === 'object' && user !== null;
    const dispatch = useDispatch();
    const [complexlist, setcomplexlist] = useState([]);
    const [complexselect, setcomplexselect] = useState([]);
    const frequentVisitorCreate = useAdminVisitorCreateMutation();
    const frequentVisitorUpdate = useAdminVisitorUpdateMutation();
    const mutationErrorHandler = useMutationErrorHandler();
    const { data: totalbuilding } = useTotalComplexblockfloorflatQuery();
    const complexUser = useUser_GetCurrentComplexManagerQuery(undefined, {
        enabled: hasUser && user.userType === UserType.ComplexManager
    });

    const { data: datacomplex } = useComplex_GetComplexesQuery({
        take: totalbuilding?.complex_getComplexes?.result?.totalCount,
        where: { activeStatus: { eq: 'ACTIVE' as any } }
    });
    useEffect(() => {
        var js = [],
            jscomplex = [];
        if (user.userType !== UserType.ComplexManager)
            datacomplex?.complex_getComplexes?.result?.items.forEach((item, i) => {
                js.push({ option: item.name, value: item.id });
            });
        else
            complexUser?.data?.user_getCurrentComplexManager?.result?.complexManagerComplexes?.forEach(
                (item, i) => {
                    js.push({ option: item.complex.name, value: item.complex.id });
                }
            );
        row?.complexId.map((items) => {
            jscomplex.push(items.complex.name);
        });
        setcomplexselect(jscomplex);
        setcomplexlist(js);
    }, [datacomplex, complexUser.isLoading]);

    const handleChange = (event) => {
        const {
            target: { value }
        } = event;
        setcomplexselect(typeof value === 'string' ? value.split(',') : value);
    };

    const handleCancel = () => {
        dispatch(closeModal(FrequentVisitorEditModal.name));
    };

    const handleSubmitForm = async (data: FrequentVisitorInput) => {
        var jscomplex = [];
        data.Complex.forEach((v, i) => {
            complexlist.forEach((item, index) => {
                if (v === item.option) jscomplex.push(item.value);
            });
        });
        if (row) {
            await frequentVisitorUpdate.mutateAsync(
                {
                    input: {
                        id: row.id,
                        ...data,
                        complexIds: jscomplex as any
                    }
                },
                {
                    onError(err) {
                        mutationErrorHandler(err, 'frequentVisitor_update');
                    }
                }
            );
        } else {
            await frequentVisitorCreate.mutateAsync(
                {
                    input: {
                        ...data, //complex: jscomplex,
                        complexIds: jscomplex as any
                    }
                },
                {
                    onError(err) {
                        mutationErrorHandler(err, 'frequentVisitor_create');
                    }
                }
            );
        }

        if (typeof refetch === 'function') {
            refetch();
        }

        dispatch(closeModal(FrequentVisitorEditModal.name));
    };

    return (
        <Box style={{ width: 450, maxWidth: '100%' }}>
            <Formik
                enableReinitialize
                onSubmit={handleSubmitForm}
                initialValues={{
                    name: row?.name || '',
                    description: row?.description || '',
                    activeStatus: row?.activeStatus || undefined,
                    Complex: complexselect
                }}
                validationSchema={frequentVisitorValidationSchema}>
                <Form>
                    <adminstyle.modalFormRowWrapper>
                        <adminstyle.modalFormRowFieldWrapper>
                            <MSelectmultiFormik
                                style={{ width: '100%' }}
                                options={complexlist}
                                name="Complex"
                                label="Complex"
                                placeholder="Complex"
                                values={complexselect}
                            />
                        </adminstyle.modalFormRowFieldWrapper>

                        <adminstyle.modalFormRowFieldWrapper>
                            <div style={{ width: '96%' }}>
                                <MInputFormik
                                    name="name"
                                    label="Company/repair type"
                                    placeholder="Company/repair type"
                                    fullWidth
                                />
                            </div>
                        </adminstyle.modalFormRowFieldWrapper>

                        <adminstyle.modalFormRowFieldWrapper>
                            <div style={{ width: '96%' }}>
                                <MInputFormik
                                    name="description"
                                    label="Description"
                                    placeholder="Description"
                                    fullWidth
                                />
                            </div>
                        </adminstyle.modalFormRowFieldWrapper>

                        <adminstyle.modalFormRowFieldWrapper>
                            <MSelectFormik
                                style={{ width: '96%' }}
                                options={ACTIVE_STATUS}
                                name="activeStatus"
                                label="Status"
                                placeholder="Status"
                            />
                        </adminstyle.modalFormRowFieldWrapper>
                    </adminstyle.modalFormRowWrapper>

                    <adminstyle.modalButtonGroup>
                        <Box>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={
                                    frequentVisitorCreate.isLoading ||
                                    frequentVisitorUpdate.isLoading
                                }>
                                Save
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
        </Box>
    );
};

const handleShowFrequentVisitorEditModal = (refetch, row?: RowTable) => {
    return newModal({
        Body: FrequentVisitorEditModal,
        title: `${typeof row === 'undefined' ? 'Add' : 'Edit'} frequent visitor`,
        topBar: true,
        id: FrequentVisitorEditModal.name,
        data: { refetch, row }
    });
};

export default handleShowFrequentVisitorEditModal;
