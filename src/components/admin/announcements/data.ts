import { Column } from '@/components/table/table_layout/types.table.layout';
import {
    useAdminAnnouncementBoardUpdateMutation,
    useAdminAnnouncementsBoardGetQuery,
    useAdminAnnouncementTypeGetQuery,
    useAdminAnnouncementTypeUpdateMutation
} from 'src/graphql/generated';
import { ICustomPageTabsProps } from '../types.admin';
import handleShowAnnouncementsBoardDeleteModal from '../../announcements/announcementsBoard/deleteModal';
import handleShowAnnouncementsBoardEditModal from '../../announcements/announcementsBoard/editModal';
import handleShowAnnouncementsTypeDeleteModal from './announcementsType/deleteModal';
import handleShowAnnouncementsTypeEditModal from './announcementsType/editModal';
import announcementBoardTransformer from '../../announcements/announcementsBoard/table.transformer';
import announcementTypeTransformer from './announcementsType/table.transformer';
import handleShowAnnouncementBoardDetailsModal from '../../announcements/announcementsBoard/detailsModal';
import { announcementBoardTabProps } from '@/components/announcements/announcementsBoard/data';
import { EAnnouncementsTabsKey } from '@/components/announcements/data';
const ANNOUNCEMENTS_TYPE_COLUMNS: Column[] = [
    { id: 'Check', checkbox: true },
    { id: 'name', label: 'Announcements type', sort: true, sortkey: 'name' },
    { id: 'activeStatus', label: 'Active/Inactivate', active: true },
    { id: 'More', label: 'More', actions: true }
];
const ANNOUNCEMENTS_TYPE_COLUMNS_blockmanager: Column[] = [
    { id: 'name', label: 'Announcements type', sort: true, sortkey: 'name' },
    { id: 'activeStatus', label: 'Active/Inactivate', active: true }
];
export const DEPARTMENT_CONFIGURATION_TABS_ITEMS: ICustomPageTabsProps[] = [
    {
        label: 'Announcements type',
        addButtonTitle: 'Add announcements type',
        id: EAnnouncementsTabsKey.AnnouncementsType,
        column: ANNOUNCEMENTS_TYPE_COLUMNS,
        column2: ANNOUNCEMENTS_TYPE_COLUMNS_blockmanager,
        handleEdit: handleShowAnnouncementsTypeEditModal,
        handleDelete: handleShowAnnouncementsTypeDeleteModal,
        handleAdd: handleShowAnnouncementsTypeEditModal,
        useQuery: useAdminAnnouncementTypeGetQuery,
        useUpdateMutation: useAdminAnnouncementTypeUpdateMutation,
        queryKey: 'announcementType_getAnnouncementTypes',
        Transformer: announcementTypeTransformer
    },
    announcementBoardTabProps
];
