import { Column, RowTable } from '@/components/table/table_layout/types.table.layout';
import { ItemTabs } from '@/components/tabs/types.tabs';
import { ICustomPageTabsProps } from '../types.admin';
import BuildingConfigurationComplexEditModal from './Complex/editModal';
import BuildingConfigurationComplexdeleteModal from './Complex/deleteModal';
import BuildingConfigurationComplexAddModal from './Complex/addModal';
import BuildingConfigurationBlockEditModal from './Block/editModal';
import BuildingConfigurationBlockdeleteModal from './Block/deleteModal';
import BuildingConfigurationBlockAddModal from './Block/addModal';
import BuildingConfigurationFloorEditModal from './Floor/editModal';
import BuildingConfigurationFloordeleteModal from './Floor/deleteModal';
import BuildingConfigurationFloorAddModal from './Floor/addModal';
import BuildingConfigurationFlatEditModal from './Flat/editModal';
import BuildingConfigurationFlatdeleteModal from './Flat/deleteModal';
import BuildingConfigurationFlatAddModal from './Flat/addModal';

import ComplexTypeTransform from './Complex/table.transformer';
import FlatTypeTransform from './Flat/table.transformer';
import FloorTypeTransform from './Floor/table.transformer';
import BlockTypeTransform from './Block/table.transformer';
import {
    useBlock_GetBlocksQuery,
    useComplex_GetComplexesQuery,
    useFloor_GetFloorsQuery,
    useFlat_GetFlatsQuery,
    useComplex_UpdateMutation,
    useBlock_UpdateMutation,
    useFloor_UpdateMutation,
    useFlat_UpdateMutation
} from 'src/graphql/generated';
import filterModalblock from './Block/filterModal';
import filterModalfloor from './Floor/filterModal';
import filterModalflat from './Flat/filterModal';
export enum EBuildingConfigurationTabsKey {
    Complex = 'Complex',
    Block = 'Block',
    Floor = 'Floor',
    Flat = 'Flat'
}
export const ColumnComplexbilding: Column[] = [
    { id: 'Check', checkbox: true },
    { id: 'name', label: 'Complex', sort: true, sortkey: 'name' },
    { id: 'paymentModetext', label: 'Payment mode', sort: true, sortkey: 'paymentMode' },
    { id: 'initiallyAmount', label: 'Initially amount ', sort: true, sortkey: 'initiallyAmount' },
    {
        id: 'permittedConsumption',
        label: 'Permitted consumption(%) ',
        sort: true,
        sortkey: 'permittedConsumption'
    },
    { id: 'activeStatus', label: 'Active/Inactivate', active: true },
    { id: 'Action', label: 'More', actions: true }
];
export const ColumnBlockbilding: Column[] = [
    { id: 'Check', checkbox: true },
    { id: 'Complex', label: 'Complex', sort: true, sortkey: 'complex.name' },
    { id: 'Block', label: 'Block', sort: true, sortkey: 'name' },
    { id: 'activeStatus', label: 'Active/Inactivate', active: true },
    { id: 'Action', label: 'More', actions: true }
];
export const ColumnFloorbilding: Column[] = [
    { id: 'Check', checkbox: true },
    { id: 'Complex', label: 'Complex', sort: true, sortkey: 'block.complex.name' },
    { id: 'Block', label: 'Block', sort: true, sortkey: 'block.name' },
    { id: 'Floor', label: 'Floor', sort: true, sortkey: 'name' },
    { id: 'activeStatus', label: 'Active/Inactivate', active: true },
    { id: 'Action', label: 'More', actions: true }
];
export const ColumnFlatbilding: Column[] = [
    { id: 'Check', checkbox: true },
    { id: 'Complex', label: 'Complex', sort: true, sortkey: 'floor.block.complex.name' },
    { id: 'Block', label: 'Block', sort: true, sortkey: 'floor.block.name' },
    { id: 'Floor', label: 'Floor', sort: true, sortkey: 'floor.name' },
    { id: 'Flat', label: 'Flat', sort: true, sortkey: 'name' },
    { id: 'activeStatus', label: 'Active/Inactivate', active: true },
    { id: 'Action', label: 'More', actions: true }
];
export const Building_CONFIGURATION_TABS_ITEMS: ICustomPageTabsProps[] = [
    {
        label: 'Complex',
        addButtonTitle: 'Add complex',
        id: EBuildingConfigurationTabsKey.Complex,
        column: ColumnComplexbilding,
        handleEdit: BuildingConfigurationComplexEditModal,
        handleDelete: BuildingConfigurationComplexdeleteModal,
        handleAdd: BuildingConfigurationComplexAddModal,
        queryKey: 'complex_getComplexes',
        useQuery: useComplex_GetComplexesQuery,
        useUpdateMutation: useComplex_UpdateMutation,

        Transformer: ComplexTypeTransform,
        searchData: [
            {
                type: 'contains',
                key: 'name',
                empty: true,
                valueType: 'string'
            }
        ],
        requiredFieldUpdate: [
            {
                key: 'name',
                value: 'name'
            },
            {
                key: 'paymentMode',
                value: 'paymentMode'
            },
            {
                key: 'initiallyAmount',
                value: 'initiallyAmount'
            },
            {
                key: 'permittedConsumption',
                value: 'permittedConsumption'
            }
        ]
    },
    {
        label: 'Block',
        addButtonTitle: 'Add block',
        id: EBuildingConfigurationTabsKey.Block,
        column: ColumnBlockbilding,
        handleEdit: BuildingConfigurationBlockEditModal,
        handleDelete: BuildingConfigurationBlockdeleteModal,
        handleAdd: BuildingConfigurationBlockAddModal,
        queryKey: 'block_getBlocks',
        useQuery: useBlock_GetBlocksQuery,
        useUpdateMutation: useBlock_UpdateMutation,
        handleFilter: filterModalblock,
        Transformer: BlockTypeTransform,
        requiredFieldUpdate: [
            {
                key: 'complexId',
                value: 'complexId'
            },
            {
                key: 'name',
                value: 'Block'
            }
        ],
        searchData: [
            {
                type: 'contains',
                key: 'name',
                empty: true,
                valueType: 'string'
            },
            {
                type: 'contains',
                key: 'complex.name',
                empty: true,
                valueType: 'string'
            },
            {
                type: 'eq',
                key: 'activeStatus',
                empty: true,
                valueType: 'string',
                defaultValueKey: 'activeStatus'
            },
            {
                type: 'eq',
                key: 'complexId',
                empty: true,
                valueType: 'number',
                defaultValueKey: 'complexId'
            }
        ]
    },
    {
        label: 'Floor',
        addButtonTitle: 'Add floor',
        id: EBuildingConfigurationTabsKey.Floor,
        column: ColumnFloorbilding,
        handleEdit: BuildingConfigurationFloorEditModal,
        handleDelete: BuildingConfigurationFloordeleteModal,
        handleAdd: BuildingConfigurationFloorAddModal,
        queryKey: 'floor_getFloors',
        useQuery: useFloor_GetFloorsQuery,
        useUpdateMutation: useFloor_UpdateMutation,
        handleFilter: filterModalfloor,
        Transformer: FloorTypeTransform,
        requiredFieldUpdate: [
            {
                key: 'blockId',
                value: 'blockId'
            },
            {
                key: 'name',
                value: 'Floor'
            }
        ],
        searchData: [
            {
                type: 'contains',
                key: 'name',
                empty: true,
                valueType: 'string'
            },
            {
                type: 'contains',
                key: 'block.complex.name',
                empty: true,
                valueType: 'string'
            },
            {
                type: 'contains',
                key: 'block.name',
                empty: true,
                valueType: 'string'
            },
            {
                type: 'eq',
                key: 'activeStatus',
                empty: true,
                valueType: 'string',
                defaultValueKey: 'activeStatus'
            },
            {
                type: 'eq',
                key: 'block.complexId',
                empty: true,
                valueType: 'number',
                defaultValueKey: 'complexId'
            },
            {
                type: 'eq',
                key: 'blockId',
                empty: true,
                valueType: 'number',
                defaultValueKey: 'blockId'
            }
        ]
    },
    {
        label: 'Flat',
        addButtonTitle: 'Add flat',
        id: EBuildingConfigurationTabsKey.Flat,
        column: ColumnFlatbilding,
        handleEdit: BuildingConfigurationFlatEditModal,
        handleDelete: BuildingConfigurationFlatdeleteModal,
        handleAdd: BuildingConfigurationFlatAddModal,
        queryKey: 'flat_getFlats',
        useQuery: useFlat_GetFlatsQuery,
        useUpdateMutation: useFlat_UpdateMutation,
        handleFilter: filterModalflat,
        Transformer: FlatTypeTransform,
        requiredFieldUpdate: [
            {
                key: 'floorId',
                value: 'floorId'
            },
            {
                key: 'name',
                value: 'Flat'
            }
        ],
        searchData: [
            {
                type: 'contains',
                key: 'name',
                empty: true,
                valueType: 'string'
            },
            {
                type: 'contains',
                key: 'floor.block.complex.name',
                empty: true,
                valueType: 'string'
            },
            {
                type: 'contains',
                key: 'floor.block.name',
                empty: true,
                valueType: 'string'
            },
            {
                type: 'contains',
                key: 'floor.name',
                empty: true,
                valueType: 'string'
            },
            {
                type: 'eq',
                key: 'activeStatus',
                empty: true,
                valueType: 'string',
                defaultValueKey: 'activeStatus'
            },
            {
                type: 'eq',
                key: 'floor.block.complexId',
                empty: true,
                valueType: 'number',
                defaultValueKey: 'complexId'
            },
            {
                type: 'eq',
                key: 'floor.blockId',
                empty: true,
                valueType: 'number',
                defaultValueKey: 'blockId'
            },
            {
                type: 'eq',
                key: 'floorId',
                empty: true,
                valueType: 'number',
                defaultValueKey: 'floorId'
            }
        ]
    }
];

export const blockFilterInitialForm = (row?: any): any => {
    return {
        complexId: row?.complexId || undefined,
        activeStatus: row?.activeStatus || undefined
    };
};
export const floorFilterInitialForm = (row?: any): any => {
    return {
        complexId: row?.complexId || undefined,
        blockId: row?.blockId || undefined,
        activeStatus: row?.activeStatus || undefined
    };
};
export const flatFilterInitialForm = (row?: any): any => {
    return {
        complexId: row?.complexId || undefined,
        blockId: row?.blockId || undefined,
        floorId: row?.floorId || undefined,
        activeStatus: row?.activeStatus || undefined
    };
};
