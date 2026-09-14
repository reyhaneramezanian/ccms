import { Box, Button, Typography } from '@mui/material';
import { FC, useEffect, useRef } from 'react';
import { TABLE_TAKE } from 'src/data/tableOptions';
import AddButton from '../addButton';
import ExcelButton from '../excelButton';
import SearchInputPage from '../searchInputPage';
import TableContainer from '../table_container';
import Tabs from '../tabs/tabs';
import * as S from './styles.tablePage';
import { ITablePageProps } from './types.tablePage';
import Filter from 'src/assets/icons/filter';
import Filteractive from 'src/assets/icons/filteractive';
import { Custom } from '../shared/share/tick-close';
const TablePage: FC<ITablePageProps> = ({
    title,
    isShowAddButton,
    isShowExcelButton,
    addButtonText,
    excelButtonText,
    isLoading,
    onApproveItem,
    onRejectItem,
    tableColumn,
    tableRow,
    isShowSearch,
    isShowFilter,
    isfilteractive,
    onChangeSearchValue,
    onChangeFilterValue,
    onClickAddButton,
    onClickExcelButton,
    tabs,
    setRow,
    onEditItem,
    onDeleteItem,
    onConvertToservice,
    onSeeProfile,
    onUserproperty,
    onAccept,
    onReject,
    onSetasblock,
    onSetasexpire,
    take = TABLE_TAKE,
    totalCount,
    activePage,
    onPageChange,
    handleDelete,
    onChangeActive,
    onChangeCheckedItem,
    onChangeCheckedItems,
    ...props
}) => {
    const columnCheckboxId = tableColumn.find((column) => column.checkbox)?.id;
    const inputRef = useRef<HTMLInputElement>();
    const _handleDelete = () => {
        if (typeof handleDelete !== 'function') return;

        const filteredRows = tableRow?.filter((row) => row[columnCheckboxId]);

        handleDelete(filteredRows);
    };

    const totalPage = Math.ceil(totalCount / take);

    useEffect(() => {
        if (!inputRef.current) return;

        onChangeSearchValue('');

        inputRef.current.value = '';

        //eslint-disable-next-line
    }, [tabs?.activeTab]);

    return (
        <S.TablePageWrapper>
            <S.TablePageHeader>
                <Typography component="h2" variant="h5" color="grey" style={{ marginTop: 23 }}>
                    {title
                        .toLowerCase()
                        .split('')
                        .map((chat, index) => (index === 0 ? chat.toUpperCase() : chat))
                        .join('')}
                </Typography>
                <S.TablebtnHeader>
                    {isShowAddButton && (
                        <AddButton onClick={onClickAddButton} style={{ marginTop: 23 }}>
                            {typeof addButtonText === 'string'
                                ? addButtonText
                                : title.toLowerCase()}
                        </AddButton>
                    )}
                    {isShowExcelButton && (
                        <ExcelButton onClick={onClickExcelButton} style={{ marginTop: 23 }}>
                            {typeof excelButtonText === 'string'
                                ? excelButtonText
                                : title.toLowerCase()}
                        </ExcelButton>
                    )}
                </S.TablebtnHeader>
            </S.TablePageHeader>

            {typeof tabs === 'object' && (
                <S.TablePageTabWrapper>
                    <Tabs {...tabs} />
                </S.TablePageTabWrapper>
            )}

            <S.TablePageTableWrapper>
                <S.TablePageTableFilterWrapper>
                    <Box position="relative">
                        {isShowSearch && (
                            <SearchInputPage
                                inputRef={inputRef}
                                onChange={(value) => {
                                    if (typeof onChangeSearchValue !== 'function') return;
                                    onChangeSearchValue(value);
                                }}
                            />
                        )}
                        {isShowFilter && (
                            <S.SearchFilter>
                                <Custom onClick={onChangeFilterValue}>
                                    {!isfilteractive ? <Filteractive /> : <Filter />}
                                </Custom>
                            </S.SearchFilter>
                        )}
                    </Box>
                    {typeof columnCheckboxId === 'string' &&
                        Array.isArray(tableRow) &&
                        tableRow?.some((i) => i[columnCheckboxId]) && (
                            <Button variant="contained" color="danger" onClick={_handleDelete}>
                                Delete
                            </Button>
                        )}
                </S.TablePageTableFilterWrapper>

                <TableContainer
                    isLoading={isLoading}
                    onApproveItem={(row) => {
                        onApproveItem(row);
                    }}
                    onRejectItem={(row) => {
                        onRejectItem(row);
                    }}
                    onChangeCheckedItems={async (columnId, isCheckedItems, rows) => {
                        if (typeof setRow === 'function') {
                            setRow((prevState) => [
                                ...prevState.map((row) => ({
                                    ...row,
                                    [columnId]: !isCheckedItems
                                }))
                            ]);
                        }

                        if (typeof onChangeCheckedItems !== 'function') return;

                        await onChangeCheckedItems(columnId, isCheckedItems, rows);
                    }}
                    onChangeCheckedItem={async (columnId, isCheckedItems, row) => {
                        if (typeof setRow === 'function') {
                            setRow((prevState) => {
                                const newState = [...prevState];

                                const rowIndex = newState.findIndex((r) => r.id === row.id);

                                newState[rowIndex] = {
                                    ...newState[rowIndex],
                                    [columnId]: !isCheckedItems
                                };

                                return newState;
                            });
                        }

                        if (typeof onChangeCheckedItem !== 'function') return;

                        await onChangeCheckedItem(columnId, isCheckedItems, row);
                    }}
                    onChangeActive={async (columnId, isActive, row) => {
                        if (typeof onChangeActive !== 'function') return;

                        await onChangeActive(columnId, isActive, row);
                    }}
                    onEditItem={onEditItem}
                    onDeleteItem={onDeleteItem}
                    onConvertToservice={onConvertToservice}
                    onSeeProfile={onSeeProfile}
                    onUserproperty={onUserproperty}
                    onSetasblock={onSetasblock}
                    onSetasexpire={onSetasexpire}
                    onAccept={onAccept}
                    onReject={onReject}
                    columns={tableColumn}
                    rows={tableRow}
                    totalPages={totalPage ? totalPage : 1}
                    activePage={activePage}
                    onPageChange={onPageChange}
                    {...props}
                />
            </S.TablePageTableWrapper>
        </S.TablePageWrapper>
    );
};

export default TablePage;
