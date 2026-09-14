import TablePage from '@/components/tablePage';
import { useDispatch, useSelector } from 'react-redux';
import useManageTab from 'src/hooks/useManageTab';
import { useEffect, useState } from 'react';
import { RowTable } from '@/components/table/table_layout/types.table.layout';

import useManageTabsQueries from 'src/hooks/useManageTabsQueries';
import useActivePage from 'src/hooks/useActivePage';

import { Staff_SYSTEM_TABS_ITEMS, EstaffTabsKey } from './data';
import { useUser_GetCurrentSecurityQuery } from 'src/graphql/generated';

const Staff = () => {
    const dispatch = useDispatch();
    const [activePage, setActivePage] = useActivePage();
    const pageData = useSelector(({ pageData }: any) => pageData);
    const { data: datacurentsecurity } = useUser_GetCurrentSecurityQuery();

    const { activeTab, handleChangeActiveTab, tabs } = useManageTab(Staff_SYSTEM_TABS_ITEMS);
    const { activeQuery, data, setRows, setSearchValue, handleUpdateActiveStatus } =
        useManageTabsQueries<any>(tabs, activeTab, {
            searchData: activeTab?.searchData,
            isNotSearch: activeTab?.isNotSearch,
            variables(searchValue) {
                activeTab?.id === EstaffTabsKey.Staff
                    ? {
                          where: {
                              complexId: {
                                  eq: datacurentsecurity?.user_getCurrentSecurity?.result?.complexId
                              }
                          }
                      }
                    : undefined;
            }
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
            handleDelete={(rows) => {
                console.log(rows);
            }}
            onChangeSearchValue={(newSearchValue) => {
                setSearchValue(newSearchValue);
            }}
            activePage={activePage}
            onPageChange={setActivePage}
            totalCount={data.totalCount}
            setRow={setRows}
        />
    );
};
export default Staff;
