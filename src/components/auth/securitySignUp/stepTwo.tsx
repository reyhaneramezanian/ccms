import { MInputFormik } from '@/components/base/input/MInput';
import { MSelectFormik } from '@/components/base/input/MSelect';
import Utils from '@/utils/utils';
import { Box } from '@mui/material';
import { ACTIVE_STATUS } from 'src/data/options';
import defaultQueryOptions from 'src/data/queryOptions';
import {
    useComplex_GetComplexesQuery,
    useEmploymentType_GetEmploymentTypesQuery,
    useTotalComplexQuery
} from 'src/graphql/generated';
import React, { useEffect, useState } from 'react';

const SecuritySignUpStepTwo = () => {
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
    const { data: dataemploy } = useEmploymentType_GetEmploymentTypesQuery(
        {
            take: totalbuilding?.employmentType_getEmploymentTypes?.result?.totalCount,
            where: { activeStatus: { eq: 'ACTIVE' as any } }
        },
        {
            ...defaultQueryOptions,
            enabled: !isLoading
        }
    );
    const [employtypelist, setemploytypelist] = useState([]);

    const complexOptions = Utils.convertQueryDataToArray(
        complexQuery?.data?.complex_getComplexes?.result?.items,
        complexQuery.isFetching
    );

    useEffect(() => {
        var jsemploy = [];

        dataemploy?.employmentType_getEmploymentTypes?.result?.items.forEach((item, i) => {
            jsemploy.push({ option: item.name, value: item.id });
        });
        setemploytypelist(jsemploy);
    }, [dataemploy]);

    return (
        <Box>
            <MInputFormik
                type="number"
                name="yearsOfExperience"
                label="Years of experience"
                placeholder="1"
            />

            <MSelectFormik name="complexId" label="Complex" options={complexOptions} />

            <MInputFormik
                inputMode="numeric"
                name="phoneNumber"
                label="Phone number"
                placeholder="Phone"
            />

            <MInputFormik name="email" label="Email address" placeholder="maria.smith@gmail.com" />
            <MSelectFormik name="employeeType" label="Employee type" options={employtypelist} />
        </Box>
    );
};

export default SecuritySignUpStepTwo;
