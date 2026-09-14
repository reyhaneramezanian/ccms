import TablePage from '@/components/tablePage';
import { useDispatch } from 'react-redux';
import { AdminVisitorsGetQueryVariables, UserType } from 'src/graphql/generated';
import useActivePage from 'src/hooks/useActivePage';
import useManageTab from 'src/hooks/useManageTab';
import useManageTabsQueries from 'src/hooks/useManageTabsQueries';
import { EVisitorsConfigurationTabsKey, VISITORS_CONFIGURATION_TABS_ITEMS } from './data';
import { useGetUser } from 'src/auth/UserProvider';
import storageKeys from 'src/data/storageKeys';

const VisitorsConfiguration = () => {
    const dispatch = useDispatch();
    const user = useGetUser();
    const { tabs, activeTab, handleChangeActiveTab } = useManageTab(
        VISITORS_CONFIGURATION_TABS_ITEMS
    );
    const [activePage, setActivePage] = useActivePage();
    const { activeQuery, data, setRows, setSearchValue, handleUpdateActiveStatus, isLoading } =
        useManageTabsQueries<AdminVisitorsGetQueryVariables>(tabs, activeTab, {});
    if (typeof activeTab === 'undefined') return <></>;
    return (
        <TablePage
            title={activeTab?.label}
            isShowAddButton
            isShowSearch
            isLoading={isLoading}
            addButtonText={`Add ${activeTab?.label?.toLowerCase()}`}
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
            setRow={setRows}
            onChangeSearchValue={(newSearchValue) => {
                setSearchValue(newSearchValue);
            }}
            onChangeActive={(_, __, row) => {
                handleUpdateActiveStatus(row, activeTab?.requiredFieldUpdate);
            }}
            handleDelete={(rows) => {
                dispatch(
                    activeTab.handleDelete(
                        activeQuery.refetch,
                        rows.map((row) => row.id)
                    )
                );
            }}
            totalCount={data.totalCount}
            activePage={activePage}
            onPageChange={setActivePage}
        />
    );
};

export default VisitorsConfiguration;
