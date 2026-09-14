import Utils from '@/utils/utils';
import { FC } from 'react';
import DeliveryIcon from 'src/assets/icons/delivery';
import { IIcon } from 'src/assets/icons/type';
import snackbarMessages from 'src/data/snackbarMessages';
import { AlertType } from 'src/graphql/generated';
import * as Yup from 'yup';

export const raiseAlarmTypesData: { Icon: FC<IIcon>; title: string; type: AlertType }[] = [
    {
        Icon: DeliveryIcon,
        title: 'Fire',
        type: AlertType.Fire
    },
    {
        Icon: DeliveryIcon,
        title: 'Thief',
        type: AlertType.Thief
    },
    {
        Icon: DeliveryIcon,
        title: 'Lost children',
        type: AlertType.LostChildren
    },
    {
        Icon: DeliveryIcon,
        title: 'Stuck in elevator',
        type: AlertType.StuckInElevator
    },
    {
        Icon: DeliveryIcon,
        title: 'Visitor threat',
        type: AlertType.VisitorThreat
    },
    {
        Icon: DeliveryIcon,
        title: 'Animal Threat',
        type: AlertType.AnimalThreat
    },
    {
        Icon: DeliveryIcon,
        title: 'Other',
        type: AlertType.Other
    }
];

export const raiseAlarmInitialForm = {
    alertType: undefined,
    description: '',
    date: Utils.convertDateTimeToInputDateValue()
};

export const raiseAlarmValidationForm = () => {
    const obj = {
        description: Yup.string().required(snackbarMessages.requiredField),
        date: Yup.string().required(snackbarMessages.requiredField)
    };

    return Yup.object(obj);
};
