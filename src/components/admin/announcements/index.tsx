import { EAnnouncementsTabsKey } from '@/components/announcements/data';
import TablePage from '@/components/tablePage';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AdminAnnouncementsBoardGetQueryVariables } from 'src/graphql/generated';
import useActivePage from 'src/hooks/useActivePage';
import useManageTab from 'src/hooks/useManageTab';
import useManageTabsQueries from 'src/hooks/useManageTabsQueries';
import { announcementsBoardFilterInitialForm } from '../../announcements/announcementsBoard/data';
import handleShowAnnouncementsBoardFilter from '../../announcements/announcementsBoard/filterModal';
import { DEPARTMENT_CONFIGURATION_TABS_ITEMS } from './data';
import storageKeys from 'src/data/storageKeys';
import { useGetUser } from 'src/auth/UserProvider';
import { ApprovalStatus, UserType } from 'src/graphql/generated';

const Announcements = () => {
    const dispatch = useDispatch();
    const user = useGetUser();

    const { tabs, activeTab, handleChangeActiveTab } = useManageTab(
        DEPARTMENT_CONFIGURATION_TABS_ITEMS
    );
    const [activePage, setActivePage] = useActivePage();
    const [announcementsBoardFilter, setAnnouncementsBoardFilter] = useState(
        announcementsBoardFilterInitialForm()
    );

    const { activeQuery, data, handleUpdateActiveStatus, setSearchValue, setRows, isLoading } =
        useManageTabsQueries<AdminAnnouncementsBoardGetQueryVariables>(tabs, activeTab, {
            searchData: activeTab?.searchData,
            isNotSearch: activeTab?.isNotSearch,

            othersFilter: {
                [EAnnouncementsTabsKey.AnnouncementsBoard]: announcementsBoardFilter
            }
        });

    if (typeof activeTab === 'undefined') return null;
    return (
        <TablePage
            title={activeTab?.label}
            isShowAddButton={
                activeTab?.id == EAnnouncementsTabsKey.AnnouncementsType &&
                localStorage.getItem(storageKeys.usertype) === 'BlockManager'
                    ? false
                    : true
            }
            isShowSearch
            addButtonText={activeTab?.addButtonTitle}
            tableColumn={
                localStorage.getItem(storageKeys.usertype) !== 'BlockManager'
                    ? activeTab.column
                    : activeTab.column2
            }
            tableRow={data.rows}
            tabs={{
                tabs: tabs,
                activeTab: activeTab,
                onTabChange: handleChangeActiveTab
            }}
            onEditItem={
                typeof activeTab?.handleEdit === 'function'
                    ? (rows) => {
                          dispatch(activeTab.handleEdit(activeQuery?.refetch, rows));
                      }
                    : undefined
            }
            onDeleteItem={
                typeof activeTab?.handleDelete === 'function'
                    ? (rows) => {
                          dispatch(activeTab.handleDelete(activeQuery?.refetch, [rows.id]));
                      }
                    : undefined
            }
            onClickAddButton={() => {
                dispatch(activeTab.handleAdd(activeQuery.refetch));
            }}
            handleDelete={(rows) => {
                dispatch(
                    activeTab.handleDelete(
                        activeQuery.refetch,
                        rows.map((item) => item.id)
                    )
                );
            }}
            onSeeProfile={
                typeof activeTab?.handleSee === 'function'
                    ? (row) => {
                          dispatch(activeTab.handleSee(row));
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
            onChangeActive={(_, __, row) => {
                handleUpdateActiveStatus(row);
            }}
            isShowFilter={activeTab?.id === EAnnouncementsTabsKey.AnnouncementsBoard}
            isfilteractive={Object.values(announcementsBoardFilter).every((el) => el === undefined)}
            onChangeFilterValue={() => {
                dispatch(
                    handleShowAnnouncementsBoardFilter(
                        announcementsBoardFilter,
                        setAnnouncementsBoardFilter
                    )
                );
            }}
        />
    );
};
export default Announcements;
