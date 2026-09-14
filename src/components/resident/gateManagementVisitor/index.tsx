import TablePage from '@/components/tablePage';
import { useDispatch, useSelector } from 'react-redux';
import {
    AdminAnnouncementsBoardGetQueryVariables,
    GateApprovalType,
    useGateManagementChangeStatusMutation
} from 'src/graphql/generated';
import useActivePage from 'src/hooks/useActivePage';
import useManageTab from 'src/hooks/useManageTab';
import useManageTabsQueries from 'src/hooks/useManageTabsQueries';
import { EGateManagementVisitorTabsKey, GATE_MANAGEMENT_TABS_ITEMS } from './data';
import { setPageData } from 'src/redux/actions/actions';
import React, { useEffect, useState } from 'react';
import AddvisitorModal from '../manage/addModal.visitor';
import storageKeys from 'src/data/storageKeys';
import { gateManagementFilterInitialForm } from '@/components/gateManagement/filterModalresidentvisitor/data';
const GateManagementVisitor = () => {
    const dispatch = useDispatch();

    const gateManagementChangeStatusMutation = useGateManagementChangeStatusMutation();
    const [Filterontime, setFilterontime] = useState(gateManagementFilterInitialForm());
    const [Filterrrequent, setFilterrrequent] = useState(gateManagementFilterInitialForm());
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
                [EGateManagementVisitorTabsKey.OneTimeVisitor]: Filterontime,
                [EGateManagementVisitorTabsKey.FrequentVisitor]: Filterrrequent
            }
        }
    );

    const approvalType =
        activeTab?.id === EGateManagementVisitorTabsKey.FrequentVisitor
            ? GateApprovalType.FrequentVisitor
            : GateApprovalType.OneTimeVisitor;

    if (typeof activeTab === 'undefined') return null;
    return (
        <TablePage
            title={activeTab?.label}
            isShowAddButton={!activeTab?.notShowAddButton}
            isShowSearch
            addButtonText={activeTab?.addButtonTitle}
            tableColumn={activeTab.column}
            isShowFilter
            isfilteractive={
                activeTab?.id === EGateManagementVisitorTabsKey.FrequentVisitor
                    ? Object.values(Filterrrequent).every((el) => el === undefined)
                    : Object.values(Filterontime).every((el) => el === undefined)
            }
            tabs={{
                activeTab: activeTab,
                tabs: tabs,
                onTabChange: handleChangeActiveTab
            }}
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
                dispatch(activeTab?.handleDelete(activeQuery?.refetch, [row.id], approvalType));
            }}
            onEditItem={(row) => {
                dispatch(AddvisitorModal(activeQuery.refetch, row, activeTab.id));
                // dispatch(activeTab?.handleEdit(activeQuery?.refetch, row, activeTab.id));
            }}
            onClickAddButton={() => {
                dispatch(AddvisitorModal(activeQuery.refetch, undefined, activeTab.id));
                // dispatch(activeTab.handleAdd(activeQuery.refetch, undefined, activeTab.id));
            }}
            onSetasexpire={(row) => {
                dispatch(activeTab?.handleexpire(activeQuery?.refetch, row.id));
            }}
            onChangeFilterValue={
                typeof activeTab?.handleFilter === 'function'
                    ? () => {
                          activeTab?.id === EGateManagementVisitorTabsKey.FrequentVisitor
                              ? dispatch(activeTab.handleFilter(Filterrrequent, setFilterrrequent))
                              : dispatch(activeTab.handleFilter(Filterontime, setFilterontime));
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
