import TablePage from '@/components/tablePage';
import { useDispatch, useSelector } from 'react-redux';
import useManageTab from 'src/hooks/useManageTab';
import { useEffect, useState } from 'react';
import { RowTable } from '@/components/table/table_layout/types.table.layout';
import useManageTabsQueries from 'src/hooks/useManageTabsQueries';
import useActivePage from 'src/hooks/useActivePage';
import {
    Peaple_Management_TABS_ITEMS,
    EpeaplemanagmentTabsKey,
    residentFilterInitialForm
} from './data';
import { ApprovalStatus, UserType, useBlockManager_CreateMutation } from 'src/graphql/generated';
import storageKeys from 'src/data/storageKeys';
import { useGetUser } from 'src/auth/UserProvider';
import { useRouter } from 'next/router';
import { setPageData } from 'src/redux/actions/actions';
import FilterModal from './Residentflat/filterModal';
import { useSnackbar } from 'notistack';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';
import Editemodalproperty from './Residentflat/addModal';
import Deletemodalproperty from './Residentflat/deleteModal';
const BuildingConfiguration = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const mutationErrorHandler = useMutationErrorHandler();
    const { mutate, isLoading } = useBlockManager_CreateMutation();
    const [search, setsearch] = useState('');
    const user = useGetUser();
    const router = useRouter();
    const [activePage, setActivePage] = useActivePage();
    const [residentFilter, setresidentFilter] = useState(residentFilterInitialForm());
    const [emailresident, setemailresident] = useState('');
    const pageData = useSelector(({ pageData }: any) => pageData);
    var { activeTab, handleChangeActiveTab, tabs } = useManageTab(Peaple_Management_TABS_ITEMS);

    const { activeQuery, data, setRows, setSearchValue, handleUpdateActiveStatus } =
        useManageTabsQueries<any>(
            tabs,
            router.query?.tab?.toString() === 'Property Resident'
                ? Peaple_Management_TABS_ITEMS[5]
                : activeTab,
            {
                searchData: activeTab?.searchData,
                isNotSearch: activeTab?.isNotSearch,

                variables:
                    activeTab?.id === EpeaplemanagmentTabsKey.Approval
                        ? () => {
                              return {
                                  where: {
                                      approvalStatus: { eq: ApprovalStatus.Pending },
                                      or: [
                                          { userType: { eq: UserType.Resident } },
                                          { userType: { eq: UserType.Security } },
                                          { userType: { eq: UserType.Staff } }
                                      ]
                                  }
                              };
                          }
                        : activeTab?.id === EpeaplemanagmentTabsKey.Peroperty
                        ? () => {
                              return {
                                  where: {
                                      approvalStatus: { eq: ApprovalStatus.Pending }
                                  }
                              };
                          }
                        : router.query?.tab?.toString() === 'Property Resident' ||
                          activeTab?.id === EpeaplemanagmentTabsKey.PropertyResident
                        ? () => {
                              return {
                                  where:
                                      localStorage.getItem(storageKeys.filterresidentflat) === '' ||
                                      localStorage.getItem(storageKeys.filterresidentflat) ===
                                          undefined
                                          ? {
                                                resident: {
                                                    accountDeleted: { eq: false }
                                                },
                                                approvalStatus: { eq: ApprovalStatus.Approved }
                                            }
                                          : {
                                                resident: {
                                                    accountDeleted: { eq: false },
                                                    email: {
                                                        eq: localStorage.getItem(
                                                            storageKeys.filterresidentflat
                                                        )
                                                    }
                                                },
                                                approvalStatus: { eq: ApprovalStatus.Approved }
                                            }
                              };
                          }
                        : () => {
                              return {
                                  where: {
                                      accountDeleted: { eq: false }
                                  }
                              };
                          },
                othersFilter: {
                    [EpeaplemanagmentTabsKey.PropertyResident]: residentFilter
                }
            }
        );

    if (typeof activeTab === 'undefined') return null;
    console.log(residentFilter);
    return (
        <TablePage
            title={activeTab?.label}
            isLoading={activeQuery?.isFetching}
            isShowFilter={
                activeTab.id === EpeaplemanagmentTabsKey.PropertyResident ||
                router.query?.tab?.toString() === 'Property Resident'
                    ? true
                    : false
            }
            isfilteractive={Object.values(residentFilter).every((el) => el === undefined)}
            isShowAddButton={
                localStorage.getItem(storageKeys.usertype) === 'BlockManager'
                    ? false
                    : activeTab?.id == EpeaplemanagmentTabsKey.Peroperty ||
                      activeTab?.id == EpeaplemanagmentTabsKey.Approval ||
                      activeTab?.id == EpeaplemanagmentTabsKey.PropertyResident ||
                      router.query?.tab?.toString() === 'Property Resident'
                    ? false
                    : true
            }
            isShowSearch
            addButtonText={activeTab?.addButtonTitle}
            tableColumn={
                localStorage.getItem(storageKeys.usertype) !== 'BlockManager'
                    ? router.query?.tab?.toString() === 'Property Resident'
                        ? Peaple_Management_TABS_ITEMS[5].column
                        : activeTab.column
                    : router.query?.tab?.toString() === 'Property Resident'
                    ? Peaple_Management_TABS_ITEMS[5].column2
                    : activeTab.column2
            }
            tableRow={data.rows}
            tabs={{
                tabs:
                    user.userType === UserType.ComplexManager
                        ? tabs.filter((item, i) => item.id !== EpeaplemanagmentTabsKey.Approval)
                        : localStorage.getItem(storageKeys.usertype) !== 'BlockManager'
                        ? tabs
                        : tabs.filter(
                              (item, i) =>
                                  item.id !== EpeaplemanagmentTabsKey.Peroperty &&
                                  item.id !== EpeaplemanagmentTabsKey.Approval
                          ),
                activeTab:
                    router.query?.tab?.toString() === 'Property Resident'
                        ? Peaple_Management_TABS_ITEMS[5]
                        : activeTab,
                onTabChange: handleChangeActiveTab
            }}
            onEditItem={
                localStorage.getItem(storageKeys.usertype) !== 'BlockManager' &&
                typeof activeTab?.handleEdit === 'function'
                    ? (rows) => {
                          router.query?.tab?.toString() === 'Property Resident'
                              ? dispatch(Editemodalproperty(activeQuery?.refetch, rows))
                              : dispatch(activeTab.handleEdit(activeQuery?.refetch, rows));
                      }
                    : undefined
            }
            onDeleteItem={
                localStorage.getItem(storageKeys.usertype) !== 'BlockManager' &&
                typeof activeTab?.handleDelete === 'function'
                    ? (rows) => {
                          router.query?.tab?.toString() === 'Property Resident'
                              ? dispatch(
                                    Deletemodalproperty(
                                        activeQuery?.refetch,
                                        rows.map((item) => item.id)
                                    )
                                )
                              : dispatch(activeTab.handleDelete(activeQuery?.refetch, [rows.id]));
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
                router.query?.tab?.toString() === 'Property Resident'
                    ? dispatch(
                          Deletemodalproperty(
                              activeQuery?.refetch,
                              rows.map((item) => item.id)
                          )
                      )
                    : dispatch(
                          activeTab.handleDelete(
                              activeQuery?.refetch,
                              rows.map((item) => item.id)
                          )
                      );
            }}
            onSeeProfile={
                router.query?.tab?.toString() === 'Property Resident'
                    ? undefined
                    : typeof activeTab?.handleSee === 'function'
                    ? (rows) => {
                          dispatch(activeTab.handleSee(rows));
                      }
                    : undefined
            }
            onUserproperty={
                router.query?.tab?.toString() === 'Property Resident'
                    ? undefined
                    : typeof activeTab?.handleUserproperty === 'function'
                    ? (rows) => {
                          localStorage.setItem(storageKeys.filterresidentflat, rows.Email);
                          setresidentFilter({ email: rows.Email });
                          router.push({
                              pathname: '/admin/people/users',
                              query: { tab: 'Property Resident' }
                          });
                      }
                    : undefined
            }
            onSetasblock={
                activeTab?.id === EpeaplemanagmentTabsKey.PropertyResident ||
                router.query?.tab?.toString() === 'Property Resident'
                    ? (row) => {
                          mutate(
                              {
                                  input: {
                                      blockId: row.blockId,
                                      activeStatus: row.activeStatus,
                                      residentId: row.idResident
                                  }
                              },
                              {
                                  onSuccess: () => {
                                      enqueueSnackbar('Operation was successful!', {
                                          variant: 'success'
                                      });
                                  },
                                  onError: (err) => {
                                      mutationErrorHandler(err, 'blockManager_create');
                                  }
                              }
                          );
                      }
                    : undefined
            }
            onChangeFilterValue={
                typeof activeTab?.handleFilter === 'function'
                    ? () => {
                          dispatch(activeTab.handleFilter(residentFilter, setresidentFilter));
                      }
                    : router.query?.tab?.toString() === 'Property Resident'
                    ? () => {
                          dispatch(FilterModal(residentFilter, setresidentFilter));
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
export default BuildingConfiguration;
