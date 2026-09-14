import { announcementsBoardFilterInitialForm } from '@/components/announcements/announcementsBoard/data';
import handleShowAnnouncementsBoardFilter from '@/components/announcements/announcementsBoard/filterModal';
import { EAnnouncementsTabsKey } from '@/components/announcements/data';
import TablePage from '@/components/tablePage';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AdminAnnouncementsBoardGetQueryVariables } from 'src/graphql/generated';
import useActivePage from 'src/hooks/useActivePage';
import useManageTab from 'src/hooks/useManageTab';
import useManageTabsQueries from 'src/hooks/useManageTabsQueries';
import { SECURITY_ANNOUNCEMENT_TABS_ITEMS } from './data';

const SecurityAnnouncements = () => {
    const dispatch = useDispatch();

    const { tabs, activeTab, handleChangeActiveTab } = useManageTab(
        SECURITY_ANNOUNCEMENT_TABS_ITEMS
    );
    const [activePage, setActivePage] = useActivePage();
    const [announcementsBoardFilter, setAnnouncementsBoardFilter] = useState(
        announcementsBoardFilterInitialForm()
    );

    const { activeQuery, data, handleUpdateActiveStatus, setSearchValue, setRows, isLoading } =
        useManageTabsQueries<AdminAnnouncementsBoardGetQueryVariables>(tabs, activeTab, {
            searchData: activeTab?.searchData,
            othersFilter: {
                [EAnnouncementsTabsKey.AnnouncementsBoard]: announcementsBoardFilter
            }
        });

    if (typeof activeTab === 'undefined') return null;
    return (
        <TablePage
            title={activeTab?.label}
            isShowAddButton
            isShowSearch
            addButtonText={activeTab?.addButtonTitle}
            tableColumn={activeTab.column}
            tableRow={data.rows}
            onEditItem={(row) => {
                dispatch(activeTab.handleEdit(activeQuery.refetch, row));
            }}
            onDeleteItem={(row) => {
                dispatch(activeTab.handleDelete(activeQuery.refetch, [row.id]));
            }}
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

export default SecurityAnnouncements;
