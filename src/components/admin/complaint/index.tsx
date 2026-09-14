import TablePage from '@/components/tablePage';
import { useDispatch, useSelector } from 'react-redux';
import useManageTab from 'src/hooks/useManageTab';
import { useEffect, useState } from 'react';
import { RowTable } from '@/components/table/table_layout/types.table.layout';
import ComplaintViewModal from './complaint/viewModal';
import filtercomplaint from './complaint/filterModal';
import useManageTabsQueries from 'src/hooks/useManageTabsQueries';
import useActivePage from 'src/hooks/useActivePage';
import {
    useComplaint_GetComplaintsQuery,
    useComplaint_CreateMutation,
    UserType,
    ComplaintStatus
} from 'src/graphql/generated';
import { Complaint_TABS_ITEMS, EComplaintTabsKey, complaintFilterInitialForm } from './data';
import storageKeys from 'src/data/storageKeys';
import { useGetUser } from 'src/auth/UserProvider';
import { it } from 'date-fns/locale';

const Complaint = () => {
    const dispatch = useDispatch();
    const pageData = useSelector(({ pageData }: any) => pageData);
    const user = useGetUser();

    const [activePage, setActivePage] = useActivePage();
    const { activeTab, handleChangeActiveTab, tabs } = useManageTab(Complaint_TABS_ITEMS);
    const [complaintFilter, setcomplaintFilter] = useState(complaintFilterInitialForm());

    const { activeQuery, data, setRows, setSearchValue, handleUpdateActiveStatus, isLoading } =
        useManageTabsQueries(tabs, activeTab, {
            searchData: activeTab?.searchData,
            isNotSearch: activeTab?.isNotSearch,
            othersFilter: {
                [EComplaintTabsKey.Complaint]: complaintFilter
            },
            whereType: 'or'
        });

    if (typeof activeTab === 'undefined') return null;
    console.log(data.rows);
    return (
        <TablePage
            title={activeTab?.label}
            isLoading={activeQuery?.isFetching}
            isShowAddButton={
                localStorage.getItem(storageKeys.usertype) !== 'BlockManager' ? true : false
            }
            isShowSearch
            addButtonText={activeTab?.addButtonTitle}
            tableColumn={
                localStorage.getItem(storageKeys.usertype) !== 'BlockManager'
                    ? activeTab.column
                    : activeTab.column2
            }
            tableRow={data.rows}
            isShowFilter={activeTab.id === EComplaintTabsKey.Complaint ? true : false}
            isfilteractive={Object.values(complaintFilter).every((el) => el === undefined)}
            tabs={{
                tabs: tabs,
                activeTab: activeTab,
                onTabChange: handleChangeActiveTab
            }}
            onEditItem={(row) => {
                dispatch(activeTab.handleEdit(activeQuery?.refetch, row));
            }}
            onDeleteItem={(row) => {
                dispatch(activeTab.handleDelete(activeQuery?.refetch, [row.id]));
            }}
            onClickAddButton={() => {
                dispatch(activeTab.handleAdd(activeQuery?.refetch));
            }}
            onChangeSearchValue={(newSearchValue) => {
                setSearchValue(newSearchValue);
            }}
            onConvertToservice={
                typeof activeTab?.handleService === 'function'
                    ? (rows) => {
                          dispatch(activeTab.handleService(activeQuery?.refetch, rows));
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
            handleDelete={(rows) => {
                dispatch(
                    activeTab.handleDelete(
                        activeQuery?.refetch,
                        rows.map((item) => item.id)
                    )
                );
            }}
            onChangeFilterValue={
                typeof activeTab?.handleFilter === 'function'
                    ? () => {
                          dispatch(activeTab.handleFilter(complaintFilter, setcomplaintFilter));
                      }
                    : undefined
            }
            activePage={activePage}
            onPageChange={setActivePage}
            totalCount={data.totalCount}
            setRow={setRows}
            onChangeActive={async (_, __, row) => {
                await handleUpdateActiveStatus(row, activeTab?.requiredFieldUpdate);
            }}
        />
    );
};
export default Complaint;
