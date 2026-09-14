import {
    useBlock_GetBlocksQuery,
    useFloor_GetFloorsQuery,
    useFlat_GetFlatsQuery,
    useComplex_GetComplexesQuery,
    useTotalComplexQuery,
    useUser_GetCurrentSecurityQuery,
    SortEnumType
} from './../graphql/generated';

import { useFormik, FormikConfig } from 'formik';
import defaultQueryOptions from 'src/data/queryOptions';
import Utils from '@/utils/utils';

interface IUserFloorLocation extends FormikConfig<any> {
    complexId?: number;
    blockId?: number;
    floorId?: number;
    flatId?: number;
}

const useUserFloorLocation = ({
    complexId,
    blockId,
    floorId,
    flatId,
    initialValues,
    ...formikConfig
}: IUserFloorLocation) => {
    const formik = useFormik({
        initialValues: {
            complexId: complexId,
            blockId: blockId,
            floorId: floorId,
            flatId: flatId,
            ...initialValues
        },
        ...formikConfig
    });
    const complexQuery = useComplex_GetComplexesQuery(
        {
            take: 10000,
            where: { activeStatus: { eq: 'ACTIVE' as any } },
            order: { id: SortEnumType.Desc }
        },

        {
            ...defaultQueryOptions
            //  enabled: !isLoading
        }
    );
    const blockQuery = useBlock_GetBlocksQuery(
        {
            take: 1000,
            where: {
                complexId: {
                    eq: formik.values.complexId
                },
                activeStatus: { eq: 'ACTIVE' as any }
            },
            order: { id: SortEnumType.Desc }
        },
        {
            ...defaultQueryOptions,
            enabled: typeof formik.values.complexId === 'number'
        }
    );
    const floorQuery = useFloor_GetFloorsQuery(
        {
            take: 1000,
            where: {
                block: {
                    complexId: {
                        eq: formik.values.complexId
                    },
                    id: {
                        eq: formik.values.blockId
                    }
                },
                activeStatus: { eq: 'ACTIVE' as any }
            },
            order: { id: SortEnumType.Desc }
        },
        {
            ...defaultQueryOptions,
            enabled: typeof formik.values.blockId === 'number'
        }
    );
    const flatQuery = useFlat_GetFlatsQuery(
        {
            take: 1000,
            where: {
                floor: {
                    block: {
                        complexId: {
                            eq: formik.values.complexId
                        },
                        id: {
                            eq: formik.values.blockId
                        }
                    },
                    id: {
                        eq: formik.values.floorId
                    }
                },
                activeStatus: { eq: 'ACTIVE' as any }
            },
            order: { id: SortEnumType.Desc }
        },
        {
            ...defaultQueryOptions,
            enabled: typeof formik.values.floorId === 'number'
        }
    );

    const complexes = Utils.convertQueryDataToArray(
        complexQuery.data?.complex_getComplexes.result.items,
        complexQuery.isFetching,
        'complex'
    );
    const blocks = Utils.convertQueryDataToArray(
        blockQuery.data?.block_getBlocks.result.items,
        blockQuery.isFetching,
        'block'
    );
    const floors = Utils.convertQueryDataToArray(
        floorQuery.data?.floor_getFloors.result.items,
        floorQuery.isFetching,
        'floor'
    );
    const flats = Utils.convertQueryDataToArray(
        flatQuery.data?.flat_getFlats.result.items,
        flatQuery.isFetching,
        'flat'
    );

    return { formik, complexes, blocks, floors, flats };
};

export default useUserFloorLocation;
