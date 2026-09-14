import handleShowAlertSystemFilter from '@/components/alertSystem/filterModal';
import {
    alertSystemFilterInitialForm,
    ALERT_SYSTEM_COLUMNS,
    EAlertsSystemTabsKey
} from '@/components/alertSystem/data';
import TablePage from '@/components/tablePage';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import useActivePage from 'src/hooks/useActivePage';
import useManageTab from 'src/hooks/useManageTab';
import useManageTabsQueries from 'src/hooks/useManageTabsQueries';
import { SECURITY_ALERTS_SYSTEM_TABS_ITEMS } from './data';

const SecurityAlertSystem = () => {
    const dispatch = useDispatch();

    const [filterState, setFilterState] = useState(alertSystemFilterInitialForm());

    const { activeTab, tabs } = useManageTab(SECURITY_ALERTS_SYSTEM_TABS_ITEMS);
    const { data, setSearchValue, setRows, isLoading, activeQuery } = useManageTabsQueries(
        tabs,
        activeTab,
        {
            othersFilter: {
                [EAlertsSystemTabsKey.AlertSystem]: filterState
            },
            searchData: activeTab?.searchData
        }
    );
    const [activePage, setActivePage] = useActivePage();

    return (
        <TablePage
            title={activeTab?.label || ''}
            isShowSearch
            addButtonText={activeTab?.addButtonTitle}
            isShowAddButton
            onClickAddButton={() => {
                dispatch(activeTab?.handleAdd(activeQuery?.refetch));
            }}
            tableColumn={ALERT_SYSTEM_COLUMNS}
            tableRow={data.rows}
            setRow={setRows}
            onChangeSearchValue={(newSearchValue) => {
                setSearchValue(newSearchValue);
            }}
            activePage={activePage}
            onPageChange={setActivePage}
            totalCount={data.totalCount}
            isLoading={isLoading}
            isShowFilter
            isfilteractive={Object.values(filterState).every((el) => el === undefined)}
            onChangeFilterValue={() => {
                dispatch(handleShowAlertSystemFilter(filterState, setFilterState));
            }}
            onSeeProfile={(row) => {
                dispatch(activeTab.handleSee(row));
            }}
        />
    );
};

export default SecurityAlertSystem;
