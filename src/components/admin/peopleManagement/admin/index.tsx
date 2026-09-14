import TablePage from '@/components/tablePage';
import { useDispatch } from 'react-redux';
import useManageTabsQueries from 'src/hooks/useManageTabsQueries';
import useManageTab from 'src/hooks/useManageTab';
import { useEffect, useState } from 'react';
import { RowTable } from '@/components/table/table_layout/types.table.layout';
import useActivePage from 'src/hooks/useActivePage';
import { Peaple_Management_TABS_ITEMS, EpeaplemanagmentTabsKey } from './data';
import peopleviewBlock from './Block/viewModal';
import peopleviewComplex from './Complex/viewModal';
import peopleviewDepartment from './Department/viewModal';
import { useUser_GetCurrentSuperAdminQuery } from 'src/graphql/generated';

const peoplemanagementfiguration = () => {
    const dispatch = useDispatch();
    const admincurrent = useUser_GetCurrentSuperAdminQuery();
    const [activePage, setActivePage] = useActivePage();
    const { activeTab, handleChangeActiveTab, tabs } = useManageTab(Peaple_Management_TABS_ITEMS);
    const { activeQuery, data, setRows, setSearchValue, handleUpdateActiveStatus } =
        useManageTabsQueries<any>(tabs, activeTab, {
            searchData: activeTab?.searchData,
            isNotSearch: activeTab?.isNotSearch,
            variables:
                activeTab?.id === EpeaplemanagmentTabsKey.Complex ||
                activeTab?.id === EpeaplemanagmentTabsKey.Superadmin
                    ? () => {
                          return {
                              where: {
                                  accountDeleted: { eq: false }
                              }
                          };
                      }
                    : undefined
        });

    if (typeof activeTab === 'undefined') return null;
    return (
        <TablePage
            title={activeTab?.label}
            isLoading={activeQuery?.isFetching}
            isShowAddButton={
                activeTab?.label === EpeaplemanagmentTabsKey.Superadmin
                    ? admincurrent?.data?.user_getCurrentSuperAdmin?.result?.isMaster
                    : true
            }
            isShowSearch
            addButtonText={activeTab?.addButtonTitle}
            tableColumn={activeTab.column}
            tableRow={data.rows}
            tabs={{
                tabs: tabs,
                activeTab: activeTab,
                onTabChange: handleChangeActiveTab
            }}
            onEditItem={
                activeTab?.label === EpeaplemanagmentTabsKey.Superadmin
                    ? admincurrent?.data?.user_getCurrentSuperAdmin?.result?.isMaster &&
                      typeof activeTab?.handleEdit === 'function'
                        ? (rows) => {
                              dispatch(activeTab.handleEdit(activeQuery?.refetch, rows));
                          }
                        : undefined
                    : typeof activeTab?.handleEdit === 'function'
                    ? (rows) => {
                          dispatch(activeTab.handleEdit(activeQuery?.refetch, rows));
                      }
                    : undefined
            }
            onDeleteItem={
                activeTab?.label === EpeaplemanagmentTabsKey.Superadmin
                    ? admincurrent?.data?.user_getCurrentSuperAdmin?.result?.isMaster &&
                      typeof activeTab?.handleDelete === 'function'
                        ? (row) => {
                              dispatch(activeTab.handleDelete(activeQuery?.refetch, [row.id]));
                          }
                        : undefined
                    : typeof activeTab?.handleEdit === 'function'
                    ? (row) => {
                          dispatch(activeTab.handleDelete(activeQuery?.refetch, [row.id]));
                      }
                    : undefined
            }
            onClickAddButton={() => {
                dispatch(activeTab.handleAdd(activeQuery?.refetch));
            }}
            onChangeSearchValue={(newSearchValue) => {
                setSearchValue(newSearchValue);
            }}
            handleDelete={(rows) => {
                dispatch(
                    activeTab.handleDelete(
                        activeQuery?.refetch,
                        rows.map((item) => item.id)
                    )
                );
            }}
            onSeeProfile={(row) => {
                dispatch(activeTab.handleSee(row));
            }}
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
export default peoplemanagementfiguration;
