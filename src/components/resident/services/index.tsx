import TablePage from '@/components/tablePage';
import { useDispatch } from 'react-redux';
import {
    AdminAnnouncementsBoardGetQueryVariables,
    GateApprovalType,
    useGateManagementChangeStatusMutation,
    useRequest_ChangeRequestStatusMutation
} from 'src/graphql/generated';
import useActivePage from 'src/hooks/useActivePage';
import useManageTab from 'src/hooks/useManageTab';
import useManageTabsQueries from 'src/hooks/useManageTabsQueries';
import { GATE_MANAGEMENT_TABS_ITEMS, EServicesTabsKey } from './data';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';
import { closeModal, newModal } from 'src/redux/actions/actions';
import { useSnackbar } from 'notistack';
import { useQueryClient, QueryClient } from 'react-query';
import storageKeys from 'src/data/storageKeys';
const ResidentServices = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient();
    const mutationErrorHandler = useMutationErrorHandler();
    const { mutate } = useRequest_ChangeRequestStatusMutation();

    const gateManagementChangeStatusMutation = useGateManagementChangeStatusMutation();
    const { tabs, activeTab, handleChangeActiveTab } = useManageTab(GATE_MANAGEMENT_TABS_ITEMS);

    const [activePage, setActivePage] = useActivePage();

    const { activeQuery, data, setRows, setSearchValue, handleUpdateActiveStatus, isLoading } =
        useManageTabsQueries(tabs, activeTab, {
            searchData: activeTab?.searchData,
            isNotSearch: activeTab?.isNotSearch,

            variables:
                activeTab?.id === EServicesTabsKey.Approval
                    ? () => {
                          return {
                              where: {
                                  requestStatus: { eq: 'MARKED_AS_DONE' as any },
                                  residentFlat: {
                                      flatId: {
                                          eq: Number(
                                              localStorage.getItem(storageKeys.activeResidentFlatId)
                                          )
                                      }
                                  }
                              }
                          };
                      }
                    : activeTab?.id === EServicesTabsKey.History
                    ? () => {
                          return {
                              where: {
                                  requestStatus: { eq: 'DONE' as any },
                                  residentFlat: {
                                      flatId: {
                                          eq: Number(
                                              localStorage.getItem(storageKeys.activeResidentFlatId)
                                          )
                                      }
                                  }
                              }
                          };
                      }
                    : () => {
                          return {
                              where: {
                                  residentFlat: {
                                      flatId: {
                                          eq: Number(
                                              localStorage.getItem(storageKeys.activeResidentFlatId)
                                          )
                                      }
                                  }
                              }
                          };
                      }
        });

    const handeldone = (id) => {
        mutate(
            {
                entityId: Number(id),
                newStatus: 'DONE' as any
            },
            {
                onSuccess: () => {
                    dispatch(closeModal('1'));
                    enqueueSnackbar('Operation was successful!', { variant: 'success' });
                    queryClient.refetchQueries('request_getMyRequests');
                },
                onError: (err) => {
                    mutationErrorHandler(err, 'request_getMyRequests');
                }
            }
        );
    };
    const handelpending = (id) => {
        mutate(
            {
                entityId: Number(id),
                newStatus: 'PENDDING' as any
            },
            {
                onSuccess: () => {
                    dispatch(closeModal('1'));
                    enqueueSnackbar('Operation was successful!', { variant: 'success' });
                    queryClient.refetchQueries('request_getMyRequests');
                },
                onError: (err) => {
                    mutationErrorHandler(err, 'request_getMyRequests');
                }
            }
        );
    };

    if (typeof activeTab === 'undefined') return null;
    return (
        <TablePage
            title={activeTab?.label}
            isShowAddButton={activeTab?.id === EServicesTabsKey.Service ? true : false}
            isShowSearch
            addButtonText={activeTab?.addButtonTitle}
            tableColumn={activeTab.column}
            tableRow={data.rows}
            tabs={{
                tabs: tabs,
                activeTab: activeTab,
                onTabChange: handleChangeActiveTab
            }}
            handleDelete={(rows) => {
                dispatch(
                    activeTab?.handleDelete(
                        activeQuery?.refetch,
                        rows.map((item) => item.id),
                        GateApprovalType.Delivery
                    )
                );
            }}
            onDeleteItem={
                typeof activeTab?.handleDelete === 'function'
                    ? (row) => {
                          dispatch(activeTab?.handleDelete(activeQuery?.refetch, [row.id]));
                      }
                    : undefined
            }
            onEditItem={
                typeof activeTab?.handleEdit === 'function'
                    ? (row) => {
                          dispatch(activeTab?.handleEdit(activeQuery?.refetch, row));
                      }
                    : undefined
            }
            onClickAddButton={() => {
                dispatch(activeTab.handleAdd(activeQuery.refetch, undefined));
            }}
            onSeeProfile={
                typeof activeTab?.handleSee === 'function'
                    ? (rows) => {
                          dispatch(activeTab.handleSee(rows));
                      }
                    : undefined
            }
            onApproveItem={async (row) => {
                handeldone(row.id);
                /* await gateManagementChangeStatusMutation.mutateAsync({
                    gateApprovalId: row.id,
                    gateApprovalStatus: GateApprovalStatus.Approved
                });

                activeQuery.refetch();

                console.log(row);*/
                // dispatch(handleShowGateManagementApprovedModal(row.code));
            }}
            onRejectItem={async (row) => {
                handelpending(row.id);
                /*await gateManagementChangeStatusMutation.mutateAsync({
                    gateApprovalId: row.id,
                    gateApprovalStatus: GateApprovalStatus.Rejected
                });

                activeQuery.refetch();*/
                // dispatch(handleShowGateManagementRejectedModal());
            }}
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
export default ResidentServices;
