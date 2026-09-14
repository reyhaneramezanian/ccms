import { AlertType } from 'src/graphql/generated';

const useGetAlertSystemType = (): AppOptions[] => {
    return [
        {
            option: 'Animal threat',
            value: AlertType.AnimalThreat
        },
        {
            option: 'Fire',
            value: AlertType.Fire
        },
        {
            option: 'Lost children',
            value: AlertType.LostChildren
        },
        {
            option: 'Other',
            value: AlertType.Other
        },
        {
            option: 'Stuck in elevator',
            value: AlertType.StuckInElevator
        },
        {
            option: 'Thief',
            value: AlertType.Thief
        },
        {
            option: 'Visitor threat',
            value: AlertType.VisitorThreat
        }
    ];
};

export default useGetAlertSystemType;
