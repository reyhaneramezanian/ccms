import TablePage from '@/components/tablePage';
import { useDispatch } from 'react-redux';
import useManageTab from 'src/hooks/useManageTab';
import { useEffect, useState } from 'react';
import { RowTable } from '@/components/table/table_layout/types.table.layout';

import {
    FAKE_DEPARTMENT_CONFIGURATION_ROWS,
    Building_CONFIGURATION_TABS_ITEMS,
} from './data';
import { ROW_CREATOR_DATA } from '../data';


const ScadaConfiguration = () => {
    const dispatch = useDispatch();

    const [rows, setRows] = useState<RowTable[]>([]);
    const [searchValue, setSearchValue] = useState<string>('');

    const { tabs, activeTab, handleChangeActiveTab } = useManageTab(
        Building_CONFIGURATION_TABS_ITEMS
    );

    useEffect(()=>{
        /*setRows(
            ROW_CREATOR_DATA().map((row)=>({
                ...row,
                Active:false,
                Check:false
            }))
        )*/

    },[activeTab])   

    if(typeof activeTab === 'undefined')return null;
    return (
        <TablePage
        title={activeTab?.label}
        isShowAddButton
        isShowSearch
        addButtonText={activeTab?.label}
        tableColumn={activeTab.column}
        tableRow={FAKE_DEPARTMENT_CONFIGURATION_ROWS}
        tabs={{
            tabs: tabs,
            activeTab: activeTab,
            onTabChange: handleChangeActiveTab
        }}
            onEditItem={(row) => {
                dispatch(activeTab.handleEdit(row));
            }}
            onDeleteItem={(row) => {
                dispatch(activeTab.handleDelete(row));
            }}
            onClickAddButton={() => {
                dispatch(activeTab.handleAdd());
            }}
            setRow={setRows}
            searchValue={searchValue}
            onChangeSearchValue={(newSearchValue) => {
                setSearchValue(newSearchValue);
            }}
        />
    );
};
export default ScadaConfiguration;
