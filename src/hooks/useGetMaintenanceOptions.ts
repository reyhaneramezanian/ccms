import Utils from '@/utils/utils';
import defaultQueryOptions from 'src/data/queryOptions';
import { useAdminMaintenanceTypeGetQuery } from 'src/graphql/generated';

const useGetMaintenanceOptions = () => {
    const maintenanceTypeQuery = useAdminMaintenanceTypeGetQuery(undefined, defaultQueryOptions);

    return Utils.convertQueryDataToArray(
        maintenanceTypeQuery.data?.maintenanceType_getMaintenanceTypes.result.items,
        maintenanceTypeQuery.isFetching
    );
};

export default useGetMaintenanceOptions;
