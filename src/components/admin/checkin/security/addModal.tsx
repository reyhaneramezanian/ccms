import { FC } from 'react';
import { Select, MenuItem, Button, Radio, RadioGroup, Box, FormControlLabel } from '@mui/material';
import { Formik, Form, FieldArray, Field, useField } from 'formik';
import * as Yup from 'yup';
import { MInputFormik } from '@/components/base/input/MInput';
import * as adminstyle from '../../admin.style';
import { closeModal, newModal } from 'src/redux/actions/actions';
import { IModalBodyProps } from '@/components/shared/modals/types.modals';
import { RowTable } from '@/components/table/table_layout/types.table.layout';
import { useDispatch } from 'react-redux';
import { MSelectFormik } from '@/components/base/input/MSelect';
import Down from 'src/assets/icons/Down';
import { useQueryClient, QueryClient } from 'react-query';
import { useSnackbar } from 'notistack';
import {
    useAttendance_SecurityCheckInMutation,
    useAttendance_SecurityCheckOutMutation,
    useComplex_GetComplexesQuery,
    useTotalbuildingQuery,
    useUser_GetSecuritiesQuery,
    UserType,
    ApprovalStatus
} from 'src/graphql/generated';
import Radioiconchecked from 'src/assets/icons/radiocheked';
import Radioicon from 'src/assets/icons/radio';
import React, { useState, useEffect } from 'react';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';
import { LoadingButton } from '@mui/lab';
import { useGetUser } from 'src/auth/UserProvider';

const StaffAddModal: FC<IModalBodyProps<RowTable>> = ({ data: { row, refetch } }) => {
    const dispatch = useDispatch();
    const user = useGetUser();
    const { mutate, isLoading } = useAttendance_SecurityCheckInMutation();
    const { mutate: mutateout, isLoading: isLoadingout } = useAttendance_SecurityCheckOutMutation();
    const mutationErrorHandler = useMutationErrorHandler();
    const [complexlist, setcomplexlist] = useState([]);
    const [securitylist, setsecuritylist] = useState([]);
    const [complexitem, setcomplexitem] = useState(0);

    const { data: totalbuilding } = useTotalbuildingQuery();

    const { data: datacomplex } = useComplex_GetComplexesQuery({
        take: totalbuilding?.complex_getComplexes?.result?.totalCount,
        where: { activeStatus: { eq: 'ACTIVE' as any } }
    });
    const { data: datasecuity } = useUser_GetSecuritiesQuery({
        take: totalbuilding?.user_getSecurities?.result?.totalCount,
        where: {
            activeStatus: { eq: 'ACTIVE' as any },
            complexId: { eq: complexitem },
            approvalStatus: { eq: ApprovalStatus.Approved }
        }
    });

    useEffect(() => {
        var js = [],
            jssecurity = [];
        datacomplex?.complex_getComplexes?.result?.items.forEach((item, i) => {
            js.push({ option: item.name, value: item.id });
        });
        datasecuity?.user_getSecurities?.result?.items.forEach((item, i) => {
            jssecurity.push({
                option: item.firstName + ' ' + item.lastName + ' (' + item.securityId + ')',
                value: item.securityId
            });
        });
        setcomplexlist(js);
        setsecuritylist(jssecurity);
    }, [datacomplex, datasecuity]);

    const ComplexSelect = ({ name, options, label }) => {
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
                    value={complexitem}
                    onChange={(e) => {
                        setcomplexitem(e.target.value);
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

    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient();
    const [Curent, setCurent] = useState(false);

    const customRadio = (
        <Radio
            style={{ margin: '10px' }}
            disableRipple
            checkedIcon={<Radioiconchecked />}
            icon={<Radioicon />}
        />
    );

    const handleCancel = () => {
        dispatch(closeModal(StaffAddModal.name));
    };
    const handelsave = (e) => {
        if (Curent === false)
            mutate(
                {
                    securityId: e.StaffID as any
                },
                {
                    onSuccess: () => {
                        enqueueSnackbar('Operation was successful!', { variant: 'success' }),
                            queryClient.refetchQueries('attendance_getStaffAttendances');
                        dispatch(closeModal(StaffAddModal.name));
                    },
                    onError: (err) => {
                        mutationErrorHandler(err, 'attendance_securityCheckIn');
                    }
                }
            );
        else
            mutateout(
                {
                    securityId: e.StaffID as any
                },
                {
                    onSuccess: () => {
                        enqueueSnackbar('Operation was successful!', { variant: 'success' }),
                            queryClient.refetchQueries('attendance_getStaffAttendances');
                        dispatch(closeModal(StaffAddModal.name));
                    },
                    onError: (err) => {
                        mutationErrorHandler(err, 'attendance_securityCheckOut');
                    }
                }
            );
    };
    const onchangeradio = (e) => {
        if (e.target.defaultValue === 'out') setCurent(true);
        else setCurent(false);
    };
    return (
        <adminstyle.modalbox>
            <Formik
                enableReinitialize
                onSubmit={(v, handlers) => {
                    handelsave(v);
                }}
                initialValues={{ StaffID: '', check: '' }}
                validationSchema={Yup.object({
                    StaffID: Yup.string().required('This field is required')
                })}>
                <Form>
                    <adminstyle.modalFormRowWrapper>
                        <adminstyle.modalFormRowFieldWrapper>
                            <ComplexSelect name="Complex" label="Complex" options={complexlist} />
                        </adminstyle.modalFormRowFieldWrapper>

                        <adminstyle.modalFormRowFieldWrapper>
                            <MSelectFormik
                                options={securitylist}
                                name="StaffID"
                                label="Security"
                                placeholder="Security "
                            />
                        </adminstyle.modalFormRowFieldWrapper>
                        <adminstyle.modalFormRowFieldWrapper>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="check">
                                <FormControlLabel
                                    checked={Curent ? false : true}
                                    value="in"
                                    control={customRadio}
                                    label="Check-in"
                                    onChange={onchangeradio}
                                />
                                <FormControlLabel
                                    checked={Curent ? true : false}
                                    value="out"
                                    control={customRadio}
                                    label="Check-out"
                                    onChange={onchangeradio}
                                />
                            </RadioGroup>
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

const handleShowStaffAddModal = (refetch, row?: RowTable) => {
    return newModal({
        Body: StaffAddModal,
        title: 'Check-In / Check-Out',
        topBar: true,
        id: StaffAddModal.name,
        data: { row, refetch }
    });
};

export default handleShowStaffAddModal;
