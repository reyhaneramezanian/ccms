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
import handleShowAlertSystemFilter from '../../alertSystem/filterModal';
import { ALERTS_SYSTEM_TABS_ITEMS } from './data';
import storageKeys from 'src/data/storageKeys';
import { useGetUser } from 'src/auth/UserProvider';
import { ApprovalStatus, UserType } from 'src/graphql/generated';

const AlertSystem = () => {
    const dispatch = useDispatch();
    const user = useGetUser();

    const [filterState, setFilterState] = useState(alertSystemFilterInitialForm());

    const { activeTab, tabs } = useManageTab(ALERTS_SYSTEM_TABS_ITEMS);
    const { data, setSearchValue, setRows, isLoading } = useManageTabsQueries(tabs, activeTab, {
        searchData: activeTab?.searchData,
        isNotSearch: activeTab?.isNotSearch,
        othersFilter: {
            [EAlertsSystemTabsKey.AlertSystem]: filterState
        },
        whereType: 'and'
    });
    const [activePage, setActivePage] = useActivePage();

    return (
        <TablePage
            title={activeTab?.label || 'Alert system'}
            isShowSearch
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
export default AlertSystem;
