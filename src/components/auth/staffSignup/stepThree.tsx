import { MSelect } from '@/components/base/input/MSelect';
import Utils from '@/utils/utils';
import { Box } from '@mui/material';
import { FC } from 'react';
import defaultQueryOptions from 'src/data/queryOptions';
import {
    useComplex_GetComplexesQuery,
    useDepartment_GetDepartmentsQuery,
    useEmploymentType_GetEmploymentTypesQuery,
    useTotalComplexQuery
} from 'src/graphql/generated';

const StaffSignUpStepThree: FC<any> = ({ formik }) => {
    const { data: totalbuilding, isLoading } = useTotalComplexQuery();

    const complexQuery = useComplex_GetComplexesQuery(
        {
            take: totalbuilding?.complex_getComplexes?.result?.totalCount,
            where: { activeStatus: { eq: 'ACTIVE' as any } }
        },
        {
            ...defaultQueryOptions,
            enabled: !isLoading
        }
    );
    const departmentQuery = useDepartment_GetDepartmentsQuery(
        {
            take: totalbuilding?.department_getDepartments?.result?.totalCount,
            where: { activeStatus: { eq: 'ACTIVE' as any } }
        },
        {
            ...defaultQueryOptions,
            enabled: !isLoading
        }
    );
    const employeeTypeQuery = useEmploymentType_GetEmploymentTypesQuery(
        {
            take: totalbuilding?.employmentType_getEmploymentTypes?.result?.totalCount,
            where: { activeStatus: { eq: 'ACTIVE' as any } }
        },
        {
            ...defaultQueryOptions,
            enabled: !isLoading
        }
    );

    return (
        <Box>
            <MSelect
                name="complexId"
                label="Complex"
                options={Utils.convertQueryDataToArray(
                    complexQuery?.data?.complex_getComplexes?.result?.items,
                    complexQuery.isLoading
                )}
                value={formik.values.complexId}
                onChange={formik.handleChange}
                meta={formik.getFieldMeta('complexId')}
            />

            <MSelect
                name="departmentId"
                label="Department"
                options={Utils.convertQueryDataToArray(
                    departmentQuery?.data?.department_getDepartments?.result?.items,
                    departmentQuery.isLoading
                )}
                value={formik.values.departmentId}
                onChange={formik.handleChange}
                meta={formik.getFieldMeta('departmentId')}
            />

            <MSelect
                name="employmentTypeId"
                label="Employee type"
                options={Utils.convertQueryDataToArray(
                    employeeTypeQuery?.data?.employmentType_getEmploymentTypes?.result?.items,
                    employeeTypeQuery.isLoading
                )}
                value={formik.values.employmentTypeId}
                onChange={formik.handleChange}
                meta={formik.getFieldMeta('employmentTypeId')}
            />
        </Box>
    );
};

export default StaffSignUpStepThree;
