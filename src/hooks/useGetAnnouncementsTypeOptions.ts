import { useAdminAnnouncementTypeGetQuery } from '../graphql/generated';
import Utils from '@/utils/utils';
import defaultQueryOptions from 'src/data/queryOptions';

const useGetAnnouncementsTypeOptions = () => {
    const utilityRateQuery = useAdminAnnouncementTypeGetQuery(undefined, defaultQueryOptions);

    return Utils.convertQueryDataToArray(
        utilityRateQuery.data?.announcementType_getAnnouncementTypes.result.items,
        utilityRateQuery.isFetching
    );
};

export default useGetAnnouncementsTypeOptions;
