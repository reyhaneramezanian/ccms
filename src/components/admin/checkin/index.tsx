import TablePage from '@/components/tablePage';
import { useDispatch, useSelector } from 'react-redux';
import useManageTab from 'src/hooks/useManageTab';
import { useEffect, useState } from 'react';
import { RowTable } from '@/components/table/table_layout/types.table.layout';
import useManageTabsQueries from 'src/hooks/useManageTabsQueries';
import useActivePage from 'src/hooks/useActivePage';
import StafFilterModal from './staff/filterModal';
import { staffFilterInitialForm, securityFilterInitialForm } from './data';
import * as XLSX from 'xlsx';
import { Staff_SYSTEM_TABS_ITEMS, EstaffTabsKey } from './data';
import { useUser_GetCurrentSecurityQuery, UserType, ApprovalStatus } from 'src/graphql/generated';
import storageKeys from 'src/data/storageKeys';
import { useGetUser } from 'src/auth/UserProvider';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const Staf = () => {
    const dispatch = useDispatch();
    const [activePage, setActivePage] = useActivePage();
    const pageData = useSelector(({ pageData }: any) => pageData);
    const user = useGetUser();
    const { activeTab, handleChangeActiveTab, tabs } = useManageTab(Staff_SYSTEM_TABS_ITEMS);
    const [securityFilter, setsecurityFilter] = useState(securityFilterInitialForm());
    const [staffFilter, setstaffFilter] = useState(staffFilterInitialForm());

    const { activeQuery, data, setRows, setSearchValue, handleUpdateActiveStatus, isLoading } =
        useManageTabsQueries<any>(tabs, activeTab, {
            searchData: activeTab?.searchData,
            isNotSearch: activeTab?.isNotSearch,
            variables:
                activeTab?.id === EstaffTabsKey.Staff
                    ? () => {
                          return {
                              where: {
                                  securityId: { eq: null }
                              }
                          };
                      }
                    : () => {
                          return {
                              where: {
                                  staffId: { eq: null }
                              }
                          };
                      },
            othersFilter: {
                [EstaffTabsKey.Staff]: staffFilter,
                [EstaffTabsKey.Security]: securityFilter
            },
            whereType: 'and'
        });

    const excel = (data) => {
        var js = [],
            jspdf = [],
            head = [
                'Name',
                'Phone',
                'Email',
                'Check_in',
                'Check_out',
                'Department',
                'Complex',
                'Join_date',
                'Termination_date',
                'Alternative_phone',
                'Address',
                'Gender',
                'Employment_type',
                'Staff_type'
            ];
        if (activeTab.id === EstaffTabsKey.Staff)
            data.forEach((item, i) => {
                var jslist = [];
                js.push({
                    Name: item.Name,
                    Phone: item.Phone,
                    Email: item.Email,
                    Check_in: item.checkInDateTime,
                    Check_out: item.checkOutDateTime,
                    Department: item.departmentname,
                    Complex: item.Complex,
                    Join_date: item.dateOfJoining,
                    Termination_date: item.dateOfTermination,
                    Alternative_email: item.alternateEmail,
                    Alternative_phone: item.alternatePhone,
                    Address: item.address,
                    Gender:
                        item.gender == 'FEMALE' ? 'Female' : item.gender == 'MALE' ? 'Male' : '',
                    Employment_type: item.employeeType,
                    Staff_type: item.head ? 'Head' : 'Staff'
                });
                jslist.push(item.Name);
                jslist.push(item.Phone);
                jslist.push(item.Email);
                jslist.push(item.checkInDateTime);
                jslist.push(item.checkOutDateTime);
                jslist.push(item.departmentname);
                jslist.push(item.Complex);
                jslist.push(item.dateOfJoining);
                jslist.push(item.dateOfTermination);
                jslist.push(item.alternateEmail);
                jslist.push(item.alternatePhone);
                jslist.push(item.address);
                jslist.push(
                    item.gender == 'FEMALE' ? 'Female' : item.gender == 'MALE' ? 'Male' : ''
                );
                jslist.push(item.Employment_type);
                jslist.push(item.Staff_type);
                jspdf.push(jslist);
            });
        else {
            head = [
                'Name',
                'Phone',
                'Email',
                'Check_in',
                'Check_out',
                'Complex',
                'Join_date',
                'Termination_date',
                'Address',
                'Gender',
                'Employment_type'
            ];
            data.forEach((item, i) => {
                var jslist = [];
                js.push({
                    Name: item.Name,
                    Phone: item.Phone,
                    Email: item.Email,
                    Check_in: item.checkInDateTime,
                    Check_out: item.checkOutDateTime,
                    Complex: item.Complex,
                    Join_date: item.dateOfJoining,
                    Termination_date: item.dateOfTermination,
                    Address: item?.address || '',
                    Gender:
                        item.gender == 'FEMALE' ? 'Female' : item.gender == 'MALE' ? 'Male' : '',
                    Employment_type: item.employeeType
                });

                jslist.push(item.Name);
                jslist.push(item.Phone);
                jslist.push(item.Email);
                jslist.push(item.checkInDateTime);
                jslist.push(item.checkOutDateTime);
                jslist.push(item.Complex);
                jslist.push(item.dateOfJoining);
                jslist.push(item.dateOfTermination);
                jslist.push(item.address);
                jslist.push(
                    item.gender == 'FEMALE' ? 'Female' : item.gender == 'MALE' ? 'Male' : ''
                );
                jslist.push(item.Employment_type);
                jspdf.push(jslist);
            });
        }
        const doc = new jsPDF('l', 'pt', 'a3');
        autoTable(doc, { html: '#my-table' });

        autoTable(doc, {
            head: [head],
            body: jspdf
        });

        doc.save('Check-in-out.pdf');
        return js;
    };
    if (typeof activeTab === 'undefined') return null;
    return (
        <TablePage
            title={activeTab?.label}
            isLoading={activeQuery?.isFetching}
            isShowAddButton={activeTab.id === EstaffTabsKey.Security ? true : false}
            isShowExcelButton
            isShowSearch
            isShowFilter
            isfilteractive={
                activeTab.id !== EstaffTabsKey.Security
                    ? Object.values(staffFilter).every((el) => el === undefined)
                    : Object.values(securityFilter).every((el) => el === undefined)
            }
            excelButtonText="Export report"
            addButtonText="Check-In / Check-Out"
            tableColumn={activeTab.column}
            tableRow={data.rows}
            tabs={{
                tabs: tabs,
                activeTab: activeTab,
                onTabChange: handleChangeActiveTab
            }}
            onClickAddButton={() => {
                dispatch(activeTab.handleAdd(activeQuery?.refetch));
            }}
            onClickExcelButton={() => {
                const worksheet = XLSX.utils.json_to_sheet(excel(data.rows));
                const workbook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
                XLSX.writeFile(workbook, 'Excel.xlsx');
            }}
            onChangeSearchValue={(newSearchValue) => {
                setSearchValue(newSearchValue);
            }}
            onChangeFilterValue={
                typeof activeTab?.handleFilter === 'function'
                    ? () => {
                          activeTab.id !== EstaffTabsKey.Security
                              ? dispatch(activeTab.handleFilter(staffFilter, setstaffFilter))
                              : dispatch(activeTab.handleFilter(securityFilter, setsecurityFilter));
                      }
                    : undefined
            }
            onSeeProfile={
                typeof activeTab?.handleSee === 'function'
                    ? (rows) => {
                          dispatch(activeTab.handleSee(rows));
                      }
                    : undefined
            }
            activePage={activePage}
            onPageChange={setActivePage}
            totalCount={data.totalCount}
            setRow={setRows}
            onChangeActive={async (_, __, row) => {
                // await handleUpdateActiveStatus(row);
            }}
        />
    );
};
export default Staf;
