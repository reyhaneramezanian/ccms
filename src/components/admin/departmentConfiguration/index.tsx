import TablePage from '@/components/tablePage';
import { useDispatch } from 'react-redux';
import useActivePage from 'src/hooks/useActivePage';
import useManageTab from 'src/hooks/useManageTab';
import useManageTabsQueries from 'src/hooks/useManageTabsQueries';
import { ICustomPageTabsProps } from '../types.admin';
import { DEPARTMENT_CONFIGURATION_TABS_ITEMS } from './data';

const DepartmentConfiguration = () => {
    const dispatch = useDispatch();

    const { activeTab, handleChangeActiveTab, tabs } = useManageTab(
        DEPARTMENT_CONFIGURATION_TABS_ITEMS
    );
    const [activePage, setActivePage] = useActivePage();

    const { activeQuery, isLoading, data, setRows, setSearchValue, handleUpdateActiveStatus } =
        useManageTabsQueries(tabs, activeTab, {
            searchData: activeTab?.searchData,
            isNotSearch: activeTab?.isNotSearch
        });

    console.log(activePage, data);
    if (typeof activeTab === 'undefined') return null;
    return (
        <TablePage
            title={activeTab?.label}
            isShowAddButton
            isShowSearch
            addButtonText={activeTab?.addButtonTitle}
            tableRow={data.rows}
            tableColumn={activeTab.column}
            isLoading={isLoading}
            tabs={{
                tabs: tabs.map((tab) => ({
                    ...tab,
                    label: tab.label
                })),
                activeTab: activeTab,
                onTabChange: handleChangeActiveTab
            }}
            onEditItem={(row) => {
                dispatch(activeTab.handleEdit(activeQuery?.refetch, row));
            }}
            onDeleteItem={(row) => {
                dispatch(activeTab.handleDelete(activeQuery?.refetch, [row.id]));
            }}
            onClickAddButton={() => {
                dispatch(activeTab.handleAdd(activeQuery?.refetch));
            }}
            onChangeSearchValue={(newSearchValue) => {
                setSearchValue(newSearchValue);
            }}
            handleDelete={(rows) => {
                dispatch(
                    activeTab.handleDelete(
                        activeQuery?.refetch,
                        rows.map((item) => item.id)
                    )
                );
            }}
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
export default DepartmentConfiguration;
