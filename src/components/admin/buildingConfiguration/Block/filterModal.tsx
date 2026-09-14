import { FC } from 'react';
import { Typography, Box, Button } from '@mui/material';
import { Formik, Form } from 'formik';
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
    useBlock_UpdateMutation,
    useComplex_GetComplexesQuery,
    SortEnumType
} from 'src/graphql/generated';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { setPageData } from 'src/redux/actions/actions';
import { blockFilterInitialForm } from '../data';

const BuildingConfigurationFilterModal: FC<IModalBodyProps<RowTable>> = ({
    data: { state, setState }
}) => {
    const dispatch = useDispatch();
    const [complexlist, setcomplexlist] = useState([]);
    const pageData = useSelector(({ pageData }: any) => pageData);

    const handleCancel = () => {
        dispatch(closeModal(BuildingConfigurationFilterModal.name));
    };

    const { data: datacomplex } = useComplex_GetComplexesQuery({
        take: 1000,
        order: { id: SortEnumType.Desc }
    });

    useEffect(() => {
        var js = [];
        datacomplex?.complex_getComplexes?.result?.items.map((item) => {
            js.push({ option: item.name, value: item.id });
        });
        setcomplexlist(js);
    }, [datacomplex]);
    const handelsave = (data) => {
        setState({
            ...data
        });

        dispatch(closeModal(BuildingConfigurationFilterModal.name));
    };
    const handelReset = () => {
        setState(blockFilterInitialForm());
        dispatch(closeModal(BuildingConfigurationFilterModal.name));
    };
    return (
        <adminstyle.modalbox>
            <Formik
                enableReinitialize
                onSubmit={(v, handlers) => {
                    handelsave(v);
                }}
                initialValues={state}>
                <Form>
                    <adminstyle.rowpage>
                        <adminstyle.cellpage>
                            <MSelectFormik
                                style={{ width: '96%' }}
                                options={complexlist}
                                name="complexId"
                                label="Complex"
                                placeholder="Complex"
                                necessary={false}
                            />
                        </adminstyle.cellpage>
                        <adminstyle.cellpage>
                            <MSelectFormik
                                style={{ width: '96%' }}
                                options={[
                                    { option: 'Active', value: 'ACTIVE' },
                                    { option: 'Inactivate', value: 'INACTIVE' }
                                ]}
                                name="activeStatus"
                                label="Status"
                                placeholder="Status"
                                necessary={false}
                            />
                        </adminstyle.cellpage>
                    </adminstyle.rowpage>
                    <adminstyle.modalButtonGroup>
                        <Box>
                            <Button type="submit" variant="contained" color="primary">
                                Save
                            </Button>
                        </Box>

                        <Box>
                            <Button variant="outlined" color="grey3" onClick={handleCancel}>
                                Cancel
                            </Button>
                        </Box>
                        <adminstyle.boxReset>
                            <adminstyle.ResetButton onClick={handelReset}>
                                Reset filter
                            </adminstyle.ResetButton>
                        </adminstyle.boxReset>
                    </adminstyle.modalButtonGroup>
                </Form>
            </Formik>
        </adminstyle.modalbox>
    );
};

const handleShowBuildingConfigurationFilterModal = (state: any, setState: (data: any) => void) => {
    return newModal({
        Body: BuildingConfigurationFilterModal,
        title: 'Filter',
        topBar: true,
        id: BuildingConfigurationFilterModal.name,
        data: {
            setState,
            state
        }
    });
};

export default handleShowBuildingConfigurationFilterModal;
