import TablePage from '@/components/tablePage';
import { useDispatch, useSelector } from 'react-redux';
import useManageTab from 'src/hooks/useManageTab';
import { useEffect, useState } from 'react';
import { RowTable } from '@/components/table/table_layout/types.table.layout';

import useManageTabsQueries from 'src/hooks/useManageTabsQueries';
import useActivePage from 'src/hooks/useActivePage';

import StafAddModal from './addModal';
import { staffFilterInitialForm } from './data';

import { Staff_SYSTEM_TABS_ITEMS, EstaffTabsKey } from './data';
import { useUser_GetCurrentSecurityQuery } from 'src/graphql/generated';
const Staf = () => {
    const dispatch = useDispatch();
    const [activePage, setActivePage] = useActivePage();
    const pageData = useSelector(({ pageData }: any) => pageData);
    const [staffFilter, setstaffFilter] = useState(staffFilterInitialForm());
    const { data: datacurentsecurity } = useUser_GetCurrentSecurityQuery();

    const { activeTab, handleChangeActiveTab, tabs } = useManageTab(Staff_SYSTEM_TABS_ITEMS);
    const { activeQuery, data, setRows, setSearchValue, handleUpdateActiveStatus } =
        useManageTabsQueries<any>(tabs, activeTab, {
            searchData: activeTab?.searchData,
            isNotSearch: activeTab?.isNotSearch,
            variables:
                activeTab?.id === EstaffTabsKey.Staff
                    ? () => {
                          return {
                              where: {
                                  complexId: {
                                      eq: datacurentsecurity?.user_getCurrentSecurity?.result
                                          ?.complexId
                                  },

                                  securityId: { eq: null }
                              }
                          };
                      }
                    : undefined,

            othersFilter: {
                [EstaffTabsKey.Staff]: staffFilter
            },
            whereType: 'or'
        });

    if (typeof activeTab === 'undefined') return null;
    return (
        <TablePage
            title={activeTab?.label}
            isLoading={activeQuery?.isFetching}
            isShowSearch
            isShowAddButton
            isShowFilter
            isfilteractive={Object.values(staffFilter).every((el) => el === undefined)}
            addButtonText="Check-In / Check-Out"
            tableColumn={activeTab.column}
            tableRow={data.rows}
            onClickAddButton={() => {
                dispatch(StafAddModal(activeQuery?.refetch));
            }}
            onChangeSearchValue={(newSearchValue) => {
                setSearchValue(newSearchValue);
            }}
            onChangeFilterValue={
                typeof activeTab?.handleFilter === 'function'
                    ? () => {
                          dispatch(activeTab.handleFilter(staffFilter, setstaffFilter));
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
