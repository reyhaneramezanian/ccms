import { Column, RowTable } from '@/components/table/table_layout/types.table.layout';
import { ItemTabs } from '@/components/tabs/types.tabs';
import { BuildingConfigurationTabs } from '../types.admin';
import ScadaConfigurationmappingEditModal from './mapping/editModal';
import ScadaConfigurationmappingdeleteModal from './mapping/deleteModal';
import ScadaConfigurationmappingAddModal from './mapping/addModal';
import ScadaConfigurationEditModal from './configuration/editModal';
import ScadaConfigurationdeleteModal from './configuration/deleteModal';
import ScadaConfigurationAddModal from './configuration/addModal';

enum EScadaConfigurationTabsKey {
    configuration = 'SCADA configuration',
    mapping = 'SCADA mapping'
}
export const ColumnConfigurationScada: Column[] = [
    { id: 'Check', label: '', checkbox: true },
    { id: 'Configuration', label: 'Configuration name' },
    { id: 'Active', label: 'Active/Inactivate', active: true },
    { id: 'Action', label: 'More', actions: true }
];
export const ColumnmapingScada: Column[] = [
    { id: 'Check', label: '', checkbox: true },
    { id: 'ScadaType', label: 'Scada Type' },
    { id: 'ScadaId', label: 'Scada Id' },
    { id: 'Active', label: 'Active/Inactivate', active: true },
    { id: 'Action', label: 'More', actions: true }
];
export const Building_CONFIGURATION_TABS_ITEMS: BuildingConfigurationTabs[] = [
    {
        label: 'SCADA configuration',
        id: EScadaConfigurationTabsKey.configuration,
        column: ColumnConfigurationScada,
        handleEdit: ScadaConfigurationEditModal,
        handleDelete: ScadaConfigurationdeleteModal,
        handleAdd: ScadaConfigurationAddModal
    },
    {
        label: 'SCADA mapping',
        id: EScadaConfigurationTabsKey.mapping,
        column: ColumnmapingScada,
        handleEdit: ScadaConfigurationmappingEditModal,
        handleDelete: ScadaConfigurationmappingdeleteModal,
        handleAdd: ScadaConfigurationmappingAddModal
    }
];

// TODO
//! Remove below codes after connecting to backend
export const FAKE_DEPARTMENT_CONFIGURATION_ROWS: RowTable[] = [
    {
        Complex: 'Low to high bids',
        Active: true,
        id: 1,
        Check: true
    },
    {
        Complex: 'Low to high bids',
        Active: false,
        id: 2,
        Check: true
    },
    {
        Complex: 'Low to high bids',
        Active: true,
        id: 3,
        Check: true
    },
    {
        Complex: 'Low to high bids',
        Active: false,
        id: 4,
        Check: true
    },
    {
        Complex: 'Low to high bids',
        Active: true,
        id: 5,
        Check: true
    },
    {
        Complex: 'Low to high bids',
        Active: false,
        id: 6,
        Check: true
    },
    {
        Complex: 'Low to high bids',
        Active: false,
        id: 7,
        Check: true
    },
    {
        Complex: 'Low to high bids',
        Active: true,
        id: 8,
        Check: true
    },
    {
        Complex: 'Low to high bids',
        Active: false,
        id: 9,
        Check: true
    },
    {
        Complex: 'Low to high bids',
        Active: true,
        id: 10,
        Check: true
    },
    {
        Complex: 'Low to high bids',
        Active: false,
        id: 11,
        Check: true
    }
];
