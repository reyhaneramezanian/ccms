import TablePage from '@/components/tablePage';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import useActivePage from 'src/hooks/useActivePage';
import useManageTab from 'src/hooks/useManageTab';
import useManageTabsQueries from 'src/hooks/useManageTabsQueries';
import { DEPARTMENT_CONFIGURATION_TABS_ITEMS, EPaymentManagementTabsKey } from './data';
import { paymentsFilterInitialForm } from './payments/data';
import { MaintenanceFilterInitialForm } from './maintenancepayment/data';
import * as XLSX from 'xlsx';
import Utils from '@/utils/utils';
import storageKeys from 'src/data/storageKeys';
import { useGetUser } from 'src/auth/UserProvider';
import { ApprovalStatus, UserType } from 'src/graphql/generated';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const PaymentManagement = () => {
    const dispatch = useDispatch();
    const [paymentFilter, setPaymentFilter] = useState(paymentsFilterInitialForm());
    const [MaintenanceFilter, setMaintenanceFilter] = useState(MaintenanceFilterInitialForm());
    const user = useGetUser();

    const [activePage, setActivePage] = useActivePage();
    const { tabs, activeTab, handleChangeActiveTab } = useManageTab(
        DEPARTMENT_CONFIGURATION_TABS_ITEMS
    );
    const { activeQuery, data, setRows, setSearchValue, handleUpdateActiveStatus, isLoading } =
        useManageTabsQueries(tabs, activeTab, {
            searchData: activeTab?.searchData,
            isNotSearch: activeTab?.isNotSearch,
            othersFilter: {
                [EPaymentManagementTabsKey.UtilityPayment]: paymentFilter,
                [EPaymentManagementTabsKey.MaintenancePayment]: MaintenanceFilter
            }
            // whereType: 'and'
        });

    const excel = (data) => {
        var js = [],
            jslist = [];
        var head = [
            'Complex',
            'Block',
            'Floor',
            'Flat',
            'Due_date',
            'Received_on',
            'Assigned_on',
            'Utility_type',
            'Maintenance_type',
            'Amount(INR)',
            'Status',
            'Comment'
        ];
        var jspdf = [];

        data.forEach((item, i) => {
            jslist = [];
            js.push({
                Complex: item.complexName,
                Block: item.blockName,
                Floor: item.floorName,
                Flat: item.flatName,
                Due_date: item?.dueDate?.slice(0, 10),
                Received_on: item?.receivedOn?.slice(0, 10),
                Assigned_on: item?.assignedOn?.slice(0, 10),
                Utility_type: item?.utilityType,
                Maintenance_type: item?.maintenanceTypeName,
                'Amount(INR)': item.amountText,
                Status: Utils.convertoLowerCase(item.status),
                Comment: item.comment
            });
            jslist.push(item.complexName);
            jslist.push(item.blockName);
            jslist.push(item.floorName);
            jslist.push(item.flatName);
            jslist.push(item?.dueDate?.slice(0, 10));
            jslist.push(item?.receivedOn != undefined ? item?.receivedOn?.slice(0, 10) : '');
            jslist.push(item?.assignedOn?.slice(0, 10));
            jslist.push(
                item?.utilityType != null && item?.utilityType != undefined ? item?.utilityType : ''
            );
            jslist.push(item.maintenanceTypeName);
            jslist.push(item.amountText);
            jslist.push(Utils.convertoLowerCase(item.status));
            jslist.push(item.comment);
            jspdf.push(jslist);
        });
        //pdf
        // const doc = new jsPDF();
        const doc = new jsPDF('l', 'pt');

        autoTable(doc, { html: '#my-table' });

        autoTable(doc, {
            head: [head],
            body: jspdf
        });

        doc.save('Payment.pdf');
        //pdf
        return js;
    };

    if (typeof activeTab === 'undefined') return <></>;
    return (
        <TablePage
            title={activeTab?.label}
            isShowAddButton={
                localStorage.getItem(storageKeys.usertype) !== 'BlockManager'
                    ? !activeTab?.notShowAddButton
                    : false
            }
            isShowSearch={!activeTab?.isNotSearch}
            isShowExcelButton={
                localStorage.getItem(storageKeys.usertype) !== 'BlockManager'
                    ? activeTab?.id == EPaymentManagementTabsKey.MaintenancePayment ||
                      activeTab?.id == EPaymentManagementTabsKey.UtilityPayment
                        ? true
                        : false
                    : false
            }
            excelButtonText="Export report"
            addButtonText={activeTab.addButtonTitle}
            tableColumn={
                activeTab?.id == EPaymentManagementTabsKey.UtilityRate &&
                user.userType === UserType.ComplexManager
                    ? activeTab.column2
                    : localStorage.getItem(storageKeys.usertype) !== 'BlockManager'
                    ? activeTab.column
                    : activeTab.column2
            }
            tableRow={data.rows}
            isLoading={isLoading}
            isShowFilter={typeof activeTab?.handleFilter === 'function'}
            isfilteractive={
                activeTab?.id == EPaymentManagementTabsKey.MaintenancePayment
                    ? Object.values(MaintenanceFilter).every((el) => el === undefined)
                    : Object.values(paymentFilter).every((el) => el === undefined)
            }
            onChangeFilterValue={() => {
                activeTab?.id == EPaymentManagementTabsKey.MaintenancePayment
                    ? dispatch(activeTab?.handleFilter(MaintenanceFilter, setMaintenanceFilter))
                    : dispatch(activeTab?.handleFilter(paymentFilter, setPaymentFilter));
            }}
            onClickExcelButton={() => {
                // var document = excel();
                const worksheet = XLSX.utils.json_to_sheet(excel(data.rows));
                const workbook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
                XLSX.writeFile(workbook, 'Excel.xlsx');
            }}
            tabs={{
                tabs: tabs,
                activeTab: activeTab,
                onTabChange: handleChangeActiveTab
            }}
            onEditItem={(row) => {
                dispatch(activeTab.handleEdit(activeQuery.refetch, row));
            }}
            onDeleteItem={
                activeTab.handleDelete
                    ? (row) => {
                          dispatch(activeTab.handleDelete(activeQuery.refetch, [row.id]));
                      }
                    : undefined
            }
            onClickAddButton={() => {
                dispatch(activeTab.handleAdd(activeQuery.refetch));
            }}
            handleDelete={(rows) => {
                dispatch(
                    activeTab.handleDelete(
                        activeQuery.refetch,
                        rows.map((row) => row.id)
                    )
                );
            }}
            setRow={setRows}
            onChangeSearchValue={(newSearchValue) => {
                setSearchValue(newSearchValue);
            }}
            activePage={activePage}
            onPageChange={setActivePage}
            totalCount={data.totalCount}
            onChangeActive={(_, __, row) => {
                handleUpdateActiveStatus(row);
            }}
        />
    );
};
export default PaymentManagement;
