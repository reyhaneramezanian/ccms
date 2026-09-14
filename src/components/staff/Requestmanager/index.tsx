import TablePage from '@/components/tablePage';
import { useDispatch, useSelector } from 'react-redux';
import useManageTab from 'src/hooks/useManageTab';
import { useEffect, useState } from 'react';
import { RowTable } from '@/components/table/table_layout/types.table.layout';

import useManageTabsQueries from 'src/hooks/useManageTabsQueries';
import useActivePage from 'src/hooks/useActivePage';

import { Requests_TABS_ITEMS, ERequestsTabsKey, FilterInitialForm } from './data';
import { useUser_GetCurrentStaffQuery, useUser_GetMyStaffsQuery } from 'src/graphql/generated';
const Staff = () => {
    const dispatch = useDispatch();
    const [activePage, setActivePage] = useActivePage();
    const pageData = useSelector(({ pageData }: any) => pageData);
    const { data: datacurentstaff } = useUser_GetCurrentStaffQuery();
    const [Filter, setFilter] = useState(FilterInitialForm());

    const { activeTab, handleChangeActiveTab, tabs } = useManageTab(Requests_TABS_ITEMS);
    const { activeQuery, data, setRows, setSearchValue, handleUpdateActiveStatus } =
        useManageTabsQueries<any>(tabs, activeTab, {
            searchData: activeTab?.searchData,
            othersFilter: {
                [ERequestsTabsKey.Requests]: Filter
            },
            whereType: 'or'
        });

    if (typeof activeTab === 'undefined') return null;
    return (
        <TablePage
            title={activeTab?.label}
            isLoading={activeQuery?.isFetching}
            isShowSearch
            addButtonText={activeTab?.label}
            tableColumn={activeTab.column}
            tableRow={data.rows}
            isShowFilter
            isfilteractive={Object.values(Filter).every((el) => el === undefined)}
            onAccept={(row) => {
                dispatch(activeTab.handleAccepts(activeQuery?.refetch, [row.id]));
            }}
            onReject={(row) => {
                dispatch(activeTab.handleReject(activeQuery?.refetch, [row.id]));
            }}
            onChangeSearchValue={(newSearchValue) => {
                setSearchValue(newSearchValue);
            }}
            onChangeFilterValue={
                typeof activeTab?.handleFilter === 'function'
                    ? () => {
                          dispatch(activeTab.handleFilter(Filter, setFilter));
                      }
                    : undefined
            }
            activePage={activePage}
            onPageChange={setActivePage}
            totalCount={data.totalCount}
            setRow={setRows}
        />
    );
};
export default Staff;
