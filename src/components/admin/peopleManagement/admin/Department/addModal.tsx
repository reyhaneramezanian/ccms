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
import { useDispatch, useSelector } from 'react-redux';
import { MSelectFormik } from '@/components/base/input/MSelect';
import {
    useDepartmentManager_CreateMutation,
    useAdminDepartmentTypeGetQuery,
    useBlock_GetBlocksQuery,
    useResidentFlat_GetResidentFlatsQuery,
    useUser_GetStaffsQuery,
    useTotalbuildingQuery,
    useUser_GetStaffstotalQuery
} from 'src/graphql/generated';
import Down from 'src/assets/icons/Down';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';
import { LoadingButton } from '@mui/lab';

const PeaplemanagementAddModal: FC<IModalBodyProps<RowTable>> = ({ data: { row, refetch } }) => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient();
    const { data: totalbuilding } = useTotalbuildingQuery();
    const { data: totalstaff } = useUser_GetStaffstotalQuery();
    const { mutate, isLoading } = useDepartmentManager_CreateMutation();
    const mutationErrorHandler = useMutationErrorHandler();

    const [Departmentlist, setDepartmentlist] = useState([]);
    const [Departmentitem, setDepartmentitem] = useState(0);

    const [stafflist, setstafflist] = useState([[]]);
    const { data: datastaff } = useUser_GetStaffsQuery({
        take: totalstaff?.user_getStaffs?.result?.totalCount,
        where: {
            activeStatus: { eq: 'ACTIVE' as any },
            departmentId: { eq: Departmentitem }
        }
    });

    const { data: dataDepartment } = useAdminDepartmentTypeGetQuery({
        take: totalbuilding?.complex_getComplexes?.result?.totalCount,
        where: { activeStatus: { eq: 'ACTIVE' as any } }
    });
    useEffect(() => {
        var js = [],
            jsstaf = [];
        dataDepartment?.department_getDepartments?.result?.items.forEach((item, i) => {
            js.push({ option: item.name, value: item.id });
        });
        datastaff?.user_getStaffs?.result?.items.forEach((item, i) => {
            jsstaf.push({ option: item.firstName + ' ' + item.lastName, value: item.id });
        });
        setstafflist(jsstaf);
        setDepartmentlist(js);
    }, [dataDepartment, datastaff]);

    const DepartmentSelect = ({ name, options, label }) => {
        const [field, meta, helpers] = useField(name);
        return (
            <>
                <adminstyle.label>
                    <adminstyle.rowpage>
                        <adminstyle.cellvalid>{label}</adminstyle.cellvalid>
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
                        margin: '-4px 5px 15px 0',
                        height: '48px',
                        backgroundColor: '#F2F3F7'
                    }}
                    value={Departmentitem}
                    onChange={(e) => {
                        setDepartmentitem(e.target.value);
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
    const handleCancel = () => {
        dispatch(closeModal(PeaplemanagementAddModal.name));
    };

    const handelsave = (e) => {
        mutate(
            {
                input: {
                    departmentId: e.Department,
                    activeStatus: e.Status,
                    staffId: e.Staff
                }
            },
            {
                onSuccess: () => {
                    enqueueSnackbar('Operation was successful!', { variant: 'success' }),
                        dispatch(closeModal(PeaplemanagementAddModal.name)),
                        queryClient.refetchQueries('departmentManager_getDepartmentManagers');
                },
                onError: (err) => {
                    mutationErrorHandler(err, 'departmentManager_create');
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
                initialValues={{ Department: Departmentitem, Status: '', Staff: '' }}
                validationSchema={Yup.object({
                    Staff: Yup.string().required('This field is required'),
                    Status: Yup.string().required('This field is required'),
                    Department: Yup.string().required('This field is required')
                })}>
                <Form>
                    <adminstyle.modalFormRowWrapper>
                        <adminstyle.modalFormRowFieldWrapper>
                            <DepartmentSelect
                                name="Department"
                                label="Department"
                                options={Departmentlist}
                            />
                        </adminstyle.modalFormRowFieldWrapper>
                        <adminstyle.modalFormRowFieldWrapper>
                            <MSelectFormik
                                options={stafflist}
                                name="Staff"
                                label="Staff"
                                placeholder="Staff"
                            />
                        </adminstyle.modalFormRowFieldWrapper>

                        <adminstyle.modalFormRowFieldWrapper>
                            <MSelectFormik
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

const handleShowPeapleAddModal = (refetch, row?: RowTable) => {
    return newModal({
        Body: PeaplemanagementAddModal,
        title: 'Add department manager',
        topBar: true,
        id: PeaplemanagementAddModal.name,
        data: { row, refetch }
    });
};

export default handleShowPeapleAddModal;
