import { Column, RowTable } from '@/components/table/table_layout/types.table.layout';
import { ICustomPageTabsProps } from '@/components/admin/types.admin';
import Myaccount from './Payment/Myaccount';
import Paymenthistory from './Payment/Paymenthistory';
import Consumption from './Payment/Consumption';
import Wallethistorypage from './Payment/Wallethistory';

export enum EPaymentsTabsKey {
    Consumption = 'Consumption',
    Paymenthistory = 'Payment history',
    Myaccount = 'My wallet',
    WalletHistory = 'Wallet history'
}
export const tabs = [
    { label: 'Consumption', id: 'Consumption' },
    { label: 'Payment history', id: 'Paymenthistory' },
    { label: 'My wallet', id: 'Myaccount' },
    { label: 'Wallet history', id: 'WalletHistory' }
];
export const ColumnPayments: Column[] = [
    { id: 'Check', checkbox: true },
    // { id: 'Description', label: 'Description' },
    { id: 'Month', label: 'Month' },
    { id: 'paymentType', label: 'Utility type' },
    { id: 'Duedate', label: 'Due date' },
    { id: 'Previous', label: 'last month readings/unit' },
    { id: 'Current', label: 'Current month readings/unit' },
    { id: 'Consumed', label: 'Consumed/unit' },
    { id: 'Rate', label: 'Rate/unit(INR)' },
    { id: 'Status', label: 'Status', status: true },
    { id: 'Amount', label: 'Amount (INR)' }
];
export const ColumnPaymentsMaintenances: Column[] = [
    { id: 'Check', checkbox: true },
    // { id: 'Description', label: 'Description' },
    { id: 'Month', label: 'Month' },
    { id: 'Duedate', label: 'Due date' },
    { id: 'maintenanceType', label: 'Maintenance type' },
    { id: 'Status', label: 'Status', status: true },
    { id: 'Amount', label: 'Amount (INR)' }
];
export const ColumnPaymentsHistory: Column[] = [
    // { id: 'Description', label: 'Description' },
    { id: 'Month', label: 'Month' },
    { id: 'paymentType', label: 'Payment type' },
    { id: 'Duedate', label: 'Due date' },
    { id: 'Previous', label: 'last month readings/unit' },
    { id: 'Current', label: 'Current month readings/unit' },
    { id: 'Consumed', label: 'Consumed/unit' },
    { id: 'Rate', label: 'Rate/unit(INR)' },
    { id: 'Status', label: 'Status', status: true },
    { id: 'Amount', label: 'Amount (INR)' }
];

export const ColumnWalletHistory: Column[] = [
    { id: 'amount', label: 'Amount (INR)' },
    { id: 'createdAt', label: 'Create' }
    // { id: 'Status', label: 'Status', active: true }
];
export const ColumnPaymentsMaintenancesHistory: Column[] = [
    // { id: 'Description', label: 'Description' },
    { id: 'Month', label: 'Month' },
    { id: 'Duedate', label: 'Due date' },
    { id: 'maintenanceType', label: 'Maintenance type' },
    { id: 'Status', label: 'Status', status: true },
    { id: 'Amount', label: 'Amount (INR)' }
];
export const TabItems: ICustomPageTabsProps[] = [
    {
        id: EPaymentsTabsKey.Consumption,
        label: 'Consumption'
    },
    {
        id: EPaymentsTabsKey.Paymenthistory,
        label: 'Payment history'
    },
    {
        id: EPaymentsTabsKey.WalletHistory,
        label: 'Wallet history'
    },
    {
        id: EPaymentsTabsKey.Myaccount,
        label: 'My wallet'
    }
];

export const PagesComponent = {
    [EPaymentsTabsKey.Consumption]: Consumption,
    [EPaymentsTabsKey.Paymenthistory]: Paymenthistory,
    [EPaymentsTabsKey.Myaccount]: Myaccount,
    [EPaymentsTabsKey.WalletHistory]: Wallethistorypage
};
