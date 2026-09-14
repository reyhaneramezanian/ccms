import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import * as stafftstyle from '../../staff.style';
import { Formik, Form, FieldArray, Field, useField } from 'formik';
import { MSelectFormik } from '@/components/base/input/MSelect';
import { MInputFormik } from '@/components/base/input/MInput';
import * as Yup from 'yup';
import { Select, Checkbox, Grid, FormControlLabel, Button, Box, MenuItem } from '@mui/material';
import { PHONE_VALIDATIONIndia, PHONE_VALIDATIONUsa } from '@/utils/helper/regexes';
import Checkicon from 'src/assets/icons/checkicon';
import {
    useUser_GetCurrentStaffQuery,
    useUser_UpdateStaffProfileMutation,
    useDepartment_GetDepartmentsQuery,
    useEmploymentType_GetEmploymentTypesQuery,
    useTotalbuildingQuery
} from 'src/graphql/generated';
import { useSnackbar } from 'notistack';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';
import { LoadingButton } from '@mui/lab';

const creerdite = () => {
    const dispatch = useDispatch();
    const { data: totalbuilding } = useTotalbuildingQuery();

    const [Departmentlist, setDepartmentlist] = useState([]);
    const [employtypelist, setemploytypelist] = useState([]);
    const { data: dataDepartment } = useDepartment_GetDepartmentsQuery({
        take: totalbuilding?.department_getDepartments?.result?.totalCount,
        where: { activeStatus: { eq: 'ACTIVE' as any } }
    });
    const { data: dataemploy } = useEmploymentType_GetEmploymentTypesQuery({
        take: totalbuilding?.employmentType_getEmploymentTypes?.result?.totalCount,
        where: { activeStatus: { eq: 'ACTIVE' as any } }
    });
    const mutationErrorHandler = useMutationErrorHandler();

    const { enqueueSnackbar } = useSnackbar();

    const { mutate, isLoading } = useUser_UpdateStaffProfileMutation();
    const { data: datauser } = useUser_GetCurrentStaffQuery();
    useEffect(() => {
        var js = [],
            jsemploy = [];
        dataDepartment?.department_getDepartments?.result?.items.forEach((item, i) => {
            js.push({ option: item.name, value: item.id });
        });
        dataemploy?.employmentType_getEmploymentTypes?.result?.items.forEach((item, i) => {
            jsemploy.push({ option: item.name, value: item.id });
        });
        setemploytypelist(jsemploy);
        setDepartmentlist(js);
    }, [dataDepartment, dataemploy]);

    const handelsave = (e) => {
        debugger;
        mutate(
            {
                input: {
                    photoUrl: datauser?.user_getCurrentStaff?.result?.photoUrl,
                    departmentId: e.Department,
                    employmentTypeId: e.Employeetype,
                    headOfDepertment: e.Head,
                    gender: datauser?.user_getCurrentStaff?.result?.gender,
                    activeStatus: datauser?.user_getCurrentStaff?.result?.activeStatus,
                    firstName: datauser?.user_getCurrentStaff?.result?.firstName,
                    lastName: datauser?.user_getCurrentStaff?.result?.lastName,
                    dateOfBirth: datauser?.user_getCurrentStaff?.result?.dateOfBirth,
                    phoneNumber: datauser?.user_getCurrentStaff?.result?.phoneNumber,
                    // email: datauser?.user_getCurrentStaff?.result?.email,
                    middleName: datauser?.user_getCurrentStaff?.result?.middleName,
                    alternatePhone: datauser?.user_getCurrentStaff?.result?.alternatePhone,
                    alternateEmail: datauser?.user_getCurrentStaff?.result?.alternateEmail,
                    address: datauser?.user_getCurrentStaff?.result?.address,
                    //  role: e.Role,
                    dateOfJoining: e.Dateofjoining,
                    dateOfTermination: e.Dateofterminaition,
                    id: datauser?.user_getCurrentStaff?.result?.id
                }
            },
            {
                onSuccess: () => {
                    enqueueSnackbar('Operation was successful!', {
                        variant: 'success'
                    });
                },
                onError: (err) => {
                    mutationErrorHandler(err, 'user_updateStaffProfile');
                }
            }
        );
    };

    return (
        <Formik
            enableReinitialize
            onSubmit={(v, handlers) => {
                handelsave(v);
            }}
            initialValues={{
                Department: datauser?.user_getCurrentStaff?.result?.departmentId,
                // Role: datauser?.user_getCurrentStaff?.result?.role,
                //Status: datauser?.user_getCurrentStaff?.result?.activeStatus,
                Dateofjoining: datauser?.user_getCurrentStaff?.result?.dateOfJoining.slice(0, 10),
                Dateofterminaition: datauser?.user_getCurrentStaff?.result?.dateOfTermination.slice(
                    0,
                    10
                ),
                Head:
                    datauser?.user_getCurrentStaff?.result?.departmentManagers.length > 0
                        ? true
                        : false,
                Employeetype: datauser?.user_getCurrentStaff?.result?.employmentTypeId
            }}
            validationSchema={Yup.object({
                Department: Yup.string().required('This field is required'),
                // Role: Yup.string().required('This field is required'),
                //Status: Yup.string().required('This field is required'),
                Dateofjoining: Yup.string().required('This field is required'),
                Dateofterminaition: Yup.string().required('This field is required'),
                Employeetype: Yup.string().required('This field is required')
            })}>
            <Form>
                <stafftstyle.modalFormRowWrapper>
                    <stafftstyle.rowpage>
                        <stafftstyle.cellpage>
                            <MSelectFormik
                                style={{ width: '96%' }}
                                options={Departmentlist}
                                name="Department"
                                label="Department"
                                placeholder="Department"
                            />
                        </stafftstyle.cellpage>
                        <stafftstyle.cellpage>
                            <MSelectFormik
                                style={{ width: '96%' }}
                                options={employtypelist}
                                name="Employeetype"
                                label="Employee type"
                                placeholder="Employee type"
                            />
                        </stafftstyle.cellpage>
                        <stafftstyle.cellpage>
                            <div style={{ width: '96%' }}>
                                <MInputFormik
                                    style={{ width: '96%' }}
                                    name="Dateofjoining"
                                    label="Date of joining"
                                    placeholder="Date of joining"
                                    fullWidth
                                    type="date"
                                />
                            </div>
                        </stafftstyle.cellpage>
                    </stafftstyle.rowpage>

                    <stafftstyle.rowpage>
                        <stafftstyle.cellpage>
                            <div style={{ width: '96%' }}>
                                <MInputFormik
                                    style={{ width: '96%' }}
                                    name="Dateofterminaition"
                                    label="Date of terminaition"
                                    placeholder="Date of terminaition"
                                    fullWidth
                                    type="date"
                                />
                            </div>
                        </stafftstyle.cellpage>
                        <stafftstyle.cellpage>
                            <div style={{ margin: '20px 0 0 0' }}>
                                <Field
                                    disabled
                                    as={FormControlLabel}
                                    type="checkbox"
                                    name="Head"
                                    control={
                                        <Checkbox defaultChecked checkedIcon={<Checkicon />} />
                                    }
                                    label="Head of department"
                                />
                            </div>
                        </stafftstyle.cellpage>
                        <stafftstyle.cellpage></stafftstyle.cellpage>
                    </stafftstyle.rowpage>
                </stafftstyle.modalFormRowWrapper>
                <stafftstyle.rowpage>
                    <Box>
                        <LoadingButton
                            loading={isLoading}
                            type="submit"
                            variant="contained"
                            color="primary">
                            Save
                        </LoadingButton>
                    </Box>
                </stafftstyle.rowpage>
            </Form>
        </Formik>
    );
};
export default creerdite;
