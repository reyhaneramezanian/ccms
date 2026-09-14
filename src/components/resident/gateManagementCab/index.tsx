import TablePage from '@/components/tablePage';
import { useDispatch } from 'react-redux';
import {
    AdminAnnouncementsBoardGetQueryVariables,
    GateApprovalType,
    useGateManagementChangeStatusMutation
} from 'src/graphql/generated';
import useActivePage from 'src/hooks/useActivePage';
import useManageTab from 'src/hooks/useManageTab';
import useManageTabsQueries from 'src/hooks/useManageTabsQueries';
import { GATE_MANAGEMENT_TABS_ITEMS, EGateManagementCabTabsKey } from './data';
import storageKeys from 'src/data/storageKeys';
import { useEffect, useState } from 'react';
import { gateManagementFilterInitialForm } from '@/components/gateManagement/filterModalresident/data';
const GateManagementVisitor = () => {
    const dispatch = useDispatch();

    const gateManagementChangeStatusMutation = useGateManagementChangeStatusMutation();
    const [Filter, setFilter] = useState(gateManagementFilterInitialForm());
    const { tabs, activeTab, handleChangeActiveTab } = useManageTab(GATE_MANAGEMENT_TABS_ITEMS);
    const [activePage, setActivePage] = useActivePage();

    const { activeQuery, data, setSearchValue, setRows, isLoading } = useManageTabsQueries<any>(
        tabs,
        activeTab,
        {
            isNotSearch: activeTab?.isNotSearch,
            searchData: activeTab?.searchData,
            variables: () => {
                return {
                    where: {
                        residentFlat: {
                            flatId: {
                                eq: Number(localStorage.getItem(storageKeys.activeResidentFlatId))
                            }
                        }
                    }
                };
            },

            othersFilter: {
                [EGateManagementCabTabsKey.Cab]: Filter
            }
        }
    );

    if (typeof activeTab === 'undefined') return null;
    return (
        <TablePage
            title={activeTab?.label}
            isShowAddButton={!activeTab?.notShowAddButton}
            isShowSearch
            isShowFilter
            isfilteractive={Object.values(Filter).every((el) => el === undefined)}
            addButtonText={activeTab?.addButtonTitle}
            tableColumn={activeTab.column}
            tableRow={data.rows}
            handleDelete={(rows) => {
                dispatch(
                    activeTab?.handleDelete(
                        activeQuery?.refetch,
                        rows.map((item) => item.id),
                        GateApprovalType.Delivery
                    )
                );
            }}
            onDeleteItem={(row) => {
                dispatch(
                    activeTab?.handleDelete(activeQuery?.refetch, [row.id], GateApprovalType.Cab)
                );
            }}
            onEditItem={(row) => {
                dispatch(activeTab?.handleEdit(activeQuery?.refetch, row));
            }}
            onClickAddButton={() => {
                dispatch(activeTab.handleAdd(activeQuery.refetch));
            }}
            onSetasexpire={(row) => {
                dispatch(activeTab?.handleexpire(activeQuery?.refetch, row.id));
            }}
            onChangeFilterValue={
                typeof activeTab?.handleFilter === 'function'
                    ? () => {
                          dispatch(activeTab.handleFilter(Filter, setFilter));
                      }
                    : undefined
            }
            setRow={setRows}
            activePage={activePage}
            onPageChange={setActivePage}
            totalCount={data.totalCount}
            isLoading={isLoading}
            onChangeSearchValue={(newSearchValue) => {
                setSearchValue(newSearchValue);
            }}
            approveActionLoading={gateManagementChangeStatusMutation.isLoading}
        />
    );
};
export default GateManagementVisitor;
