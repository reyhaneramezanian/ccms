import TablePage from '@/components/tablePage';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    EBuildingConfigurationTabsKey,
    Building_CONFIGURATION_TABS_ITEMS,
    blockFilterInitialForm,
    floorFilterInitialForm,
    flatFilterInitialForm
} from './data';
import useActivePage from 'src/hooks/useActivePage';
import useManageTabsQueries from 'src/hooks/useManageTabsQueries';
import useManageTab from 'src/hooks/useManageTab';
import { setPageData } from 'src/redux/actions/actions';

import {
    useBlock_GetBlocksQuery,
    useComplex_GetComplexesQuery,
    useFloor_GetFloorsQuery,
    useFlat_GetFlatsQuery,
    useCountbildingQuery
} from 'src/graphql/generated';

const BuildingConfiguration = () => {
    const dispatch = useDispatch();

    const [activePage, setActivePage] = useActivePage();
    const { activeTab, handleChangeActiveTab, tabs } = useManageTab(
        Building_CONFIGURATION_TABS_ITEMS
    );

    const [buildingFilter, setbuildingFilter] = useState(blockFilterInitialForm());
    const [FloorFilter, setFloorFilter] = useState(floorFilterInitialForm());
    const [FlatFilter, setFlatFilter] = useState(flatFilterInitialForm());
    const { activeQuery, data, setRows, setSearchValue, handleUpdateActiveStatus, isLoading } =
        useManageTabsQueries(tabs, activeTab, {
            searchData: activeTab?.searchData,
            isNotSearch: activeTab?.isNotSearch,
            othersFilter: {
                [EBuildingConfigurationTabsKey.Block]: buildingFilter,
                [EBuildingConfigurationTabsKey.Floor]: FloorFilter,
                [EBuildingConfigurationTabsKey.Flat]: FlatFilter
            },
            whereType: 'and'
        });

    if (typeof activeTab === 'undefined') return null;
    return (
        <TablePage
            title={activeTab?.label}
            isLoading={activeQuery?.isFetching}
            isShowAddButton
            isShowSearch
            addButtonText={activeTab?.addButtonTitle}
            tableColumn={activeTab.column}
            tableRow={data.rows}
            isShowFilter={activeTab.id === EBuildingConfigurationTabsKey.Complex ? false : true}
            isfilteractive={
                activeTab.id === EBuildingConfigurationTabsKey.Block
                    ? Object.values(buildingFilter).every((el) => el === undefined)
                    : activeTab.id === EBuildingConfigurationTabsKey.Floor
                    ? Object.values(FloorFilter).every((el) => el === undefined)
                    : Object.values(FlatFilter).every((el) => el === undefined)
            }
            tabs={{
                tabs: tabs,
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
            onChangeFilterValue={
                typeof activeTab?.handleFilter === 'function'
                    ? () => {
                          activeTab.id === EBuildingConfigurationTabsKey.Block
                              ? dispatch(activeTab.handleFilter(buildingFilter, setbuildingFilter))
                              : activeTab.id === EBuildingConfigurationTabsKey.Floor
                              ? dispatch(activeTab.handleFilter(FloorFilter, setFloorFilter))
                              : dispatch(activeTab.handleFilter(FlatFilter, setFlatFilter));
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
