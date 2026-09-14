import Client from 'src/assets/icons/Client';
import Dashboard from 'src/assets/icons/Dashboard';
import DashbordActive from 'src/assets/icons/DashbordActive';
import Projects from 'src/assets/icons/Projects';
import ProjectsActive from 'src/assets/icons/ProjectsActive';
import UserActive from 'src/assets/icons/UserActive';
import User from 'src/assets/icons/User';
import Image from 'src/components/shared/share/Image';
import EditDelete from 'src/components/shared/share/edit-delete';
import Switch from 'src/components/shared/share/switch';
import Space from 'src/components/shared/share/space';
import TickCloseAdmin from '../shared/share/tick-close-admin';
import { Rating } from '@mui/material';
import Block from 'src/assets/icons/Block';
import Unblock from 'src/assets/icons/Unblock';
import Checkbox from 'src/components/shared/share/checkbox';
import { Column } from '../table/table_layout/types.table.layout';
import Action from '../shared/share/action';

export const ColumnComplexbilding: Column[] = [
    { id: 'Check', checkbox: true },
    { id: 'Complex', label: 'Complex' },
    { id: 'Active', label: 'Active/Inactivate', active: true },
    { id: 'Action', label: 'More', actions: true }
];
export const ColumnBlockbilding = [
    { id: 'Check', label: '', Component: Checkbox },
    { id: 'Complex', label: 'Complex' },
    { id: 'Block', label: 'Block' },
    { id: 'Active', label: 'Active/Inactivate' },
    { id: 'Action', label: 'More' }
];
export const ColumnFloorbilding = [
    { id: 'Check', label: '', Component: Checkbox },
    { id: 'Complex', label: 'Complex' },
    { id: 'Block', label: 'Block' },
    { id: 'Floor', label: 'Floor' },
    { id: 'Active', label: 'Active/Inactivate' },
    { id: 'Action', label: 'More' }
];
export const ColumnFlatbilding = [
    { id: 'Check', label: '', Component: Checkbox },
    { id: 'Complex', label: 'Complex' },
    { id: 'Block', label: 'Block' },
    { id: 'Floor', label: 'Floor' },
    { id: 'Flat', label: 'Flat' },
    { id: 'Active', label: 'Active/Inactivate' },
    { id: 'Action', label: 'More' }
];
export const Columnresidentowners = [
    { id: 'image', label: '', Component: Image },
    { id: 'name', label: '' },
    { id: 'mobil', label: '' }
];
export const ColumnConfigurationScada = [
    { id: 'Check', label: '', Component: Checkbox },
    { id: 'Configuration', label: 'Configuration name' },
    { id: 'Active', label: 'Active/Inactivate' },
    { id: 'Action', label: 'More' }
];
export const ColumnmapingScada = [
    { id: 'Check', label: '', Component: Checkbox },
    { id: 'ScadaType', label: 'Scada Type' },
    { id: 'ScadaId', label: 'Scada Id' },
    { id: 'Active', label: 'Active/Inactivate' },
    { id: 'Action', label: 'More' }
];

export const tabs = [
    { label: 'Complex', id: 'Complex' },
    { label: 'Block ', id: 'Block' },
    { label: 'Floor', id: 'Floor' },
    { label: 'Flat', id: 'Flat' }
];

export const departmentTabs = [
    { label: 'Employee Type', id: 'Employee Type' },
    { label: 'Service Type ', id: 'Service Type' },
    { label: 'Department', id: 'Department' }
];

export const tabscada = [
    { label: 'Scada configuration', id: 'configuration' },
    { label: 'Scada mapping', id: 'mapping' }
];
function ComponentActions(value) {
    return <Action {...value} />;
}
