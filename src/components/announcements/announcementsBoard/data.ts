import * as Yup from 'yup';
import {
    AdminAnnouncementBoardCreateMutationVariables,
    useAdminAnnouncementBoardUpdateMutation,
    useAdminAnnouncementsBoardGetQuery,
    UserType
} from 'src/graphql/generated';
import { ICustomPageTabsProps } from '@/components/admin/types.admin';
import announcementBoardTransformer from './table.transformer';
import handleShowAnnouncementsBoardEditModal from './editModal';
import handleShowAnnouncementBoardDetailsModal from './detailsModal';
import handleShowAnnouncementsBoardDeleteModal from './deleteModal';
import { Column } from '@/components/table/table_layout/types.table.layout';
import { EAnnouncementsTabsKey } from '../data';
import Utils from '@/utils/utils';
import { AnyMessageParams } from 'yup/lib/types';
import Space from 'src/components/shared/share/space';

const ANNOUNCEMENTS_BOARD_COLUMNS: Column[] = [
    { id: 'Check', checkbox: true },
    { id: 'announcementType', label: 'Type', sort: true, sortkey: 'announcementType.name' },
    { id: 'date', label: 'Date', sort: true, sortkey: 'date' },
    { id: 'title', label: 'Title', Component: Space, sort: true, sortkey: 'title' },
    { id: 'message', label: 'Message', Component: Space, sort: true, sortkey: 'message' },
    { id: 'More', label: 'More', actions: true }
];

const ANNOUNCEMENTS_BOARD_COLUMNS_blockmanager: Column[] = [
    { id: 'announcementType', label: 'Type', sort: true, sortkey: 'announcementType.name' },
    { id: 'date', label: 'Date', sort: true, sortkey: 'date' },
    { id: 'title', label: 'Title', Component: Space, sort: true, sortkey: 'title' },
    { id: 'message', label: 'Message', Component: Space, sort: true, sortkey: 'message' },
    { id: 'More', label: 'More', actions: true }
];

export const announcementBoardTabProps: ICustomPageTabsProps = {
    label: 'Announcements',
    addButtonTitle: 'Add announcements',
    id: EAnnouncementsTabsKey.AnnouncementsBoard,
    column: ANNOUNCEMENTS_BOARD_COLUMNS,
    column2: ANNOUNCEMENTS_BOARD_COLUMNS_blockmanager,
    handleEdit: handleShowAnnouncementsBoardEditModal,
    handleDelete: handleShowAnnouncementsBoardDeleteModal,
    handleSee: handleShowAnnouncementBoardDetailsModal,
    handleAdd: handleShowAnnouncementsBoardEditModal,
    useQuery: useAdminAnnouncementsBoardGetQuery,
    useUpdateMutation: useAdminAnnouncementBoardUpdateMutation,
    queryKey: 'announcement_getAnnouncements',
    Transformer: announcementBoardTransformer,
    searchData: [
        {
            type: 'contains',
            key: 'title',
            empty: true,
            valueType: 'string'
        },
        {
            type: 'contains',
            key: 'message',
            empty: true,
            valueType: 'string'
        },
        {
            type: 'contains',
            key: 'announcementType.name',
            empty: true,
            valueType: 'string'
        },
        {
            type: 'eq',
            key: 'flatId',
            empty: true,
            valueType: 'number',
            defaultValueKey: 'flatId'
        },
        /*  {
            type: 'eq',
            key: 'flat.floorId',
            empty: true,
            valueType: 'number',
            defaultValueKey: 'floorId'
        },
        {
            type: 'eq',
            key: 'flat.floor.blockId',
            empty: true,
            valueType: 'number',
            defaultValueKey: 'blockId'
        },
        {
            type: 'eq',
            key: 'flat.floor.block.complexId',
            empty: true,
            valueType: 'number',
            defaultValueKey: 'complexId'
        },*/
        {
            type: 'eq',
            key: 'complexId',
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
        },
        {
            type: 'eq',
            key: 'floorId',
            empty: true,
            valueType: 'number',
            defaultValueKey: 'floorId'
        },
        {
            type: 'eq',
            key: 'announcementType.id',
            empty: true,
            defaultValueKey: 'announcementTypeId'
        },
        {
            type: 'eq',
            key: 'date',
            empty: true,
            defaultValueKey: 'date'
        }
    ]
};

export const announcementBoardInitialForm: AdminAnnouncementBoardCreateMutationVariables = {
    complexId: undefined,
    blockId: undefined,
    floorId: undefined,
    flatId: undefined,
    announcementTypeId: undefined,
    title: '',
    message: '',
    date: Utils.convertDateTimeToInputDateValue()
};

export const announcementsBoardFilterInitialForm = (state?: any) => {
    return {
        complexId: state?.complexId || undefined,
        blockId: state?.blockId || undefined,
        floorId: state?.floorId || undefined,
        flatId: state?.flatId || undefined,
        announcementTypeId: state?.alertType || undefined,
        date: state?.date || undefined
    };
};

export const announcementBoardValidationForm = (userType: UserType) => {
    const today = new Date();
    const obj: any = {
        announcementTypeId: Yup.number().required('This field is required'),
        title: Yup.string().required('This field is required'),
        // message: Yup.string().required('This field is required'),
        blockId: Yup.number(),
        floorId: Yup.number(),
        flatId: Yup.number(),
        date: Yup.date()
            .min(new Date(today.setDate(today.getDate() - 1)), 'Date can not be in the past')
            .required('This field is required')
    };

    if (userType !== UserType.Security) {
        obj.complexId = Yup.number().required('This field is required');
    }

    return Yup.object(obj);
};
