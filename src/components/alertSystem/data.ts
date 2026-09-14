import Utils from '@/utils/utils';
import { useAlertsSystemGetQuery } from 'src/graphql/generated';
import { ICustomPageTabsProps } from '../admin/types.admin';
import { Column } from '../table/table_layout/types.table.layout';
import handleShowAlertSystemDetailsModal from './detailsModal';
import alertSystemTransformer from './table.transformer';
import * as Yup from 'yup';
import snackbarMessages from 'src/data/snackbarMessages';
import Space from 'src/components/shared/share/space';

export enum EAlertsSystemTabsKey {
    AlertSystem = 'AlertSystem'
}

export const ALERT_SYSTEM_COLUMNS: Column[] = [
    { id: 'from', label: 'From', Component: Space },
    { id: 'alertType', label: 'Type', sort: true, sortkey: 'alertType' },
    { id: 'date', label: 'Date', sort: true, sortkey: 'date' },
    { id: 'description', label: 'Additional information', sort: true, sortkey: 'description' },
    { id: 'More', label: 'More', actions: true }
];

export const alertSystemFilterInitialForm = (state?: any) => {
    return {
        complexId: state?.complexId || undefined,
        blockId: state?.blockId || undefined,
        floorId: state?.floorId || undefined,
        flatId: state?.flatId || undefined,
        alertType: state?.alertType || undefined,
        date: state?.date || undefined
    };
};

export const alertSystemAddModalInitialForm = () => {
    return {
        alertType: undefined,
        date: Utils.convertDateTimeToInputDateValue(),
        description: undefined
    };
};

export const alertSystemAddModalFormValidation = () => {
    const obj = {
        complexId: Yup.number(),
        // blockId: Yup.number(),
        //floorId: Yup.number(),
        // flatId: Yup.number(),
        alertType: Yup.string().required(snackbarMessages.requiredField),
        date: Yup.string().required(snackbarMessages.requiredField)
        // description: Yup.string()
    };

    return Yup.object(obj);
};

export const ALERTS_SYSTEM_TAB_ITEM: ICustomPageTabsProps = {
    label: 'Alert system',
    id: EAlertsSystemTabsKey.AlertSystem,
    column: ALERT_SYSTEM_COLUMNS,
    queryKey: 'alert_getAlerts',
    useQuery: useAlertsSystemGetQuery,
    handleSee: handleShowAlertSystemDetailsModal,
    Transformer: alertSystemTransformer,
    searchData: [
        {
            type: 'contains',
            key: 'description',
            empty: true,
            valueType: 'string'
        },
        {
            type: 'contains',
            key: 'flat.name',
            empty: true,
            valueType: 'string'
        },
        {
            type: 'contains',
            key: 'flat.floor.name',
            empty: true,
            valueType: 'string'
        },
        {
            type: 'contains',
            key: 'flat.floor.block.name',
            empty: true,
            valueType: 'string'
        },
        {
            type: 'contains',
            key: 'flat.floor.block.complex.name',
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
        {
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
        },
        {
            type: 'eq',
            key: 'alertType',
            empty: true,
            valueType: 'string',
            defaultValueKey: 'alertType'
        },
        {
            type: 'eq',
            key: 'date',
            empty: true,
            valueType: 'string',
            defaultValueKey: 'date'
        }
    ]
};
