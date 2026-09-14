import {
    useBlock_GetAvailableBlocksQuery,
    useComplex_GetAvailableComplexesQuery,
    useFloor_GetAvailableFloorsQuery,
    useFlat_GetAvailableFlatsQuery,
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
    ownershipStatus?: string;
}

const useUserFloorLocation = ({
    complexId,
    blockId,
    floorId,
    flatId,
    ownershipStatus,
    initialValues,
    ...formikConfig
}: IUserFloorLocation) => {
    const formik = useFormik({
        initialValues: {
            complexId: complexId,
            blockId: blockId,
            floorId: floorId,
            flatId: flatId,
            ownershipStatus: ownershipStatus,
            ...initialValues
        },
        ...formikConfig
    });
    debugger;
    const complexQuery = useComplex_GetAvailableComplexesQuery(
        {
            take: 10000,
            where: { activeStatus: { eq: 'ACTIVE' as any } },
            order: { id: SortEnumType.Desc },
            ownershipStatus: formik.values.ownershipStatus as any
        },

        {
            ...defaultQueryOptions,
            enabled: typeof formik.values.ownershipStatus === 'string'
        }
    );
    const blockQuery = useBlock_GetAvailableBlocksQuery(
        {
            take: 1000,
            where: {
                complexId: {
                    eq: formik.values.complexId
                },
                activeStatus: { eq: 'ACTIVE' as any }
            },
            order: { id: SortEnumType.Desc },
            ownershipStatus: formik.values.ownershipStatus as any
        },
        {
            ...defaultQueryOptions,
            enabled: typeof formik.values.complexId === 'number'
        }
    );
    const floorQuery = useFloor_GetAvailableFloorsQuery(
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
            order: { id: SortEnumType.Desc },
            ownershipStatus: formik.values.ownershipStatus as any
        },
        {
            ...defaultQueryOptions,
            enabled: typeof formik.values.blockId === 'number'
        }
    );
    const flatQuery = useFlat_GetAvailableFlatsQuery(
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
            order: { id: SortEnumType.Desc },
            ownershipStatus: formik.values.ownershipStatus as any
        },
        {
            ...defaultQueryOptions,
            enabled: typeof formik.values.floorId === 'number'
        }
    );

    const complexes = Utils.convertQueryDataToArray(
        complexQuery.data?.complex_getAvailableComplexes.result.items,
        complexQuery.isFetching,
        'complex'
    );
    const blocks = Utils.convertQueryDataToArray(
        blockQuery.data?.block_getAvailableBlocks.result.items,
        blockQuery.isFetching,
        'block'
    );
    const floors = Utils.convertQueryDataToArray(
        floorQuery.data?.floor_getAvailableFloors.result.items,
        floorQuery.isFetching,
        'floor'
    );
    const flats = Utils.convertQueryDataToArray(
        flatQuery.data?.flat_getAvailableFlats.result.items,
        flatQuery.isFetching,
        'flat'
    );

    return { formik, complexes, blocks, floors, flats };
};

export default useUserFloorLocation;
