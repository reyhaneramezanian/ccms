import {
    useAdminVisitorUpdateMutation,
    useAdminVisitorsGetQuery
} from './../../../graphql/generated';
import { Column } from '@/components/table/table_layout/types.table.layout';
import { ICustomPageTabsProps } from '../types.admin';
import handleShowFrequentVisitorEditModal from './frequentVisitor/editModal';
import frequentVisitorTransformer from './frequentVisitor/table.transformer';
import handleShowFrequentVisitorConfigurationDeleteModal from './frequentVisitor/deleteModal';
import Showcomplex from 'src/components/shared/share/show-complex';

export enum EVisitorsConfigurationTabsKey {
    FrequentVisitor = 'FrequentVisitor'
}

const FREQUENT_VISITOR: Column[] = [
    { id: 'Check', checkbox: true },
    { id: 'name', label: 'Company/repair type', sort: true, sortkey: 'name' },
    { id: 'description', label: 'Description', sort: true, sortkey: 'description' },
    { id: 'complexId', label: 'Complexes', Component: Showcomplex },
    { id: 'activeStatus', label: 'Active/Inactivate', active: true },
    { id: 'Action', label: 'More', actions: true }
];

export const VISITORS_CONFIGURATION_TABS_ITEMS: ICustomPageTabsProps[] = [
    {
        label: 'Frequent visitors',
        id: EVisitorsConfigurationTabsKey.FrequentVisitor,
        column: FREQUENT_VISITOR,
        handleEdit: handleShowFrequentVisitorEditModal,
        handleDelete: handleShowFrequentVisitorConfigurationDeleteModal,
        handleAdd: handleShowFrequentVisitorEditModal,
        queryKey: 'frequentVisitor_getFrequentVisitors',
        useQuery: useAdminVisitorsGetQuery,
        useUpdateMutation: useAdminVisitorUpdateMutation,
        Transformer: frequentVisitorTransformer,
        requiredFieldUpdate: [
            {
                key: 'description',
                value: 'description'
            },
            {
                key: 'complexIds',
                value: 'complex'
            },
            {
                key: 'name',
                value: 'name'
            }
        ]
    }
];
