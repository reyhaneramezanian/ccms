import { useAdminUtilityRateGetQuery } from './../graphql/generated';
import Utils from '@/utils/utils';
import defaultQueryOptions from 'src/data/queryOptions';

const useGetUtilityRateOptions = () => {
    const utilityRateQuery = useAdminUtilityRateGetQuery(undefined, defaultQueryOptions);

    return Utils.convertQueryDataToArray(
        utilityRateQuery.data?.utilityRate_getUtilityRates.result.items,
        utilityRateQuery.isFetching,
        'utilityType',
        'utilityType'
    );
};

export default useGetUtilityRateOptions;
