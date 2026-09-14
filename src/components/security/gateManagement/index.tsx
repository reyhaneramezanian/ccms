import handleShowGateManagementApprovedModal from '@/components/gateManagement/approvedModal';
import handleShowGateManagementRejectedModal from '@/components/gateManagement/rejectedModal';
import TablePage from '@/components/tablePage';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    AdminAnnouncementsBoardGetQueryVariables,
    ApprovalStatus,
    GateApprovalStatus,
    useGateManagementChangeStatusMutation
} from 'src/graphql/generated';
import useActivePage from 'src/hooks/useActivePage';
import useManageTab from 'src/hooks/useManageTab';
import useManageTabsQueries from 'src/hooks/useManageTabsQueries';
import { gateManagementApprovalFilterInitialForm } from './approval/data';
import { GATE_MANAGEMENT_TABS_ITEMS, EGateManagementTabsKey } from './data';
import { gateManagementHistoryFilterInitialForm } from './history/data';
import handleApproveModal from './approval/approveModal';
import handleRejectModal from './approval/rejectModal';

const SecurityGateManagement = () => {
    const dispatch = useDispatch();

    const gateManagementChangeStatusMutation = useGateManagementChangeStatusMutation();

    const { tabs, activeTab, handleChangeActiveTab } = useManageTab(GATE_MANAGEMENT_TABS_ITEMS);
    const [activePage, setActivePage] = useActivePage();
    const [gateManagementApprovalFilter, setGateManagementApprovalFilter] = useState(
        gateManagementApprovalFilterInitialForm()
    );
    const [gateManagementHistoryFilter, setGateManagementHistoryFilter] = useState(
        gateManagementHistoryFilterInitialForm()
    );

    const { activeQuery, data, setSearchValue, setRows, isLoading } = useManageTabsQueries<any>(
        tabs,
        activeTab,
        {
            isNotSearch: activeTab?.isNotSearch,
            searchData: activeTab?.searchData,
            variables:
                activeTab?.id === EGateManagementTabsKey.Approval
                    ? () => {
                          return {
                              where: {
                                  approvalStatus: { eq: ApprovalStatus.Pending }
                              }
                          };
                      }
                    : () => {
                          return {
                              where: {
                                  approvalStatus: { neq: ApprovalStatus.Pending }
                              }
                          };
                      },

            othersFilter: {
                [EGateManagementTabsKey.Approval]: {
                    ...gateManagementApprovalFilter
                },
                [EGateManagementTabsKey.History]: gateManagementHistoryFilter
            },
            whereType: 'and'
        }
    );

    console.log('dsd');
    console.log(gateManagementApprovalFilter);
    console.log(Object.values(gateManagementApprovalFilter).every((el) => el === undefined));
    if (typeof activeTab === 'undefined') return null;
    return (
        <TablePage
            title={activeTab?.label}
            isShowAddButton={!activeTab?.notShowAddButton}
            isShowSearch
            addButtonText={activeTab?.addButtonTitle}
            tableColumn={activeTab.column}
            tableRow={data.rows}
            tabs={{
                tabs: tabs,
                activeTab: activeTab,
                onTabChange: handleChangeActiveTab
            }}
            onClickAddButton={() => {
                dispatch(activeTab.handleAdd(activeQuery.refetch));
            }}
            setRow={setRows}
            activePage={activePage}
            onPageChange={setActivePage}
            totalCount={data.totalCount}
            isLoading={isLoading}
            onChangeSearchValue={(newSearchValue) => {
                setSearchValue(newSearchValue);
            }}
            /* onApproveItem={(row) => {
                dispatch(handleApproveModal(activeQuery?.refetch, row));
            }}*/
            /*onRejectItem={(row) => {
                dispatch(handleRejectModal(activeQuery?.refetch, row));
            }}
            approveActionLoading={gateManagementChangeStatusMutation.isLoading}*/
            isShowFilter
            isfilteractive={
                activeTab.id === EGateManagementTabsKey.Approval
                    ? Object.values(gateManagementApprovalFilter).every((el) => el === undefined)
                    : Object.values(gateManagementHistoryFilter).every((el) => el === undefined)
            }
            onSeeProfile={(row) => dispatch(activeTab.handleSee(row))}
            onChangeFilterValue={() => {
                if (activeTab.id === EGateManagementTabsKey.Approval) {
                    dispatch(
                        activeTab?.handleFilter(
                            gateManagementApprovalFilter,
                            setGateManagementApprovalFilter
                        )
                    );
                } else {
                    dispatch(
                        activeTab?.handleFilter(
                            gateManagementHistoryFilter,
                            setGateManagementHistoryFilter
                        )
                    );
                }
            }}
        />
    );
};
export default SecurityGateManagement;
