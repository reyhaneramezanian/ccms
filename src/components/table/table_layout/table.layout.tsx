import SortUpIcon from 'src/assets/table-container/sort.up.icon';
import SortDownIcon from 'src/assets/table-container/sort.down.icon';
import TableSearchIcon from 'src/assets/table-container/table.search.icon';
import { Fragment, useState } from 'react';
import { Column, RowTable, TableLayoutProps } from './types.table.layout';
import {
    StyledTable,
    StyledTHead,
    StyledTBody,
    StyledSearchTR,
    StyledHeadTR,
    StyledTH,
    StyledBodyTR,
    StyledTD,
    TableButtonSearchHead,
    TableSortIconsContainer,
    TableSearchInputContainer,
    TableSearchInputField,
    RotateArrow
} from './styled.table.layout';
import { useRouter } from 'next/router';
import { Checkbox } from '@mui/material';
import Switcher from '@/components/shared/share/switch';
import ConfirmationModal from '@/components/confirmationModal';
import { closeModal, newModal } from 'src/redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import { ActiveStatus, ComplaintStatus, ApprovalStatus } from 'src/graphql/generated';
import StatusBadge from '@/components/statusBadge';
import Action from '@/components/shared/share/action';
import ApproveAction from '@/components/shared/share/approveAction';
import { setPageData } from 'src/redux/actions/actions';

const DeActiveModal = ({ data }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleAccept = async () => {
        setIsLoading(true);

        try {
            await data.onConfirm();
        } catch (e) {
            console.log(e);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ConfirmationModal
            id="deactive-table"
            handleAccept={handleAccept}
            isLoading={isLoading}
            type="deactivate"
        />
    );
};

export function TableSearchInput({
    LeftIcon = null,
    RightIcon = TableSearchIcon,
    wrapperStyle = {},
    ...props
}) {
    return (
        <TableSearchInputContainer style={wrapperStyle}>
            {LeftIcon && <LeftIcon />}
            <TableSearchInputField {...props} />
            {RightIcon && (
                <RotateArrow>
                    <RightIcon />
                </RotateArrow>
            )}
        </TableSearchInputContainer>
    );
}

function TableLayout({
    columns = [],
    rows = [],
    onSearch,
    searchData,
    isError,
    onSort,
    onChange,
    onChangeActive,
    onChangeCheckedItem,
    onChangeCheckedItems,
    onDeleteItem,
    onApproveItem,
    onRejectItem,
    onEditItem,
    onConvertToservice,
    onSeeProfile,
    onUserproperty,
    approveActionLoading,
    onSetasblock,
    onSetasexpire,
    onAccept,
    onReject,
    TD = StyledTD,
    TR = StyledBodyTR
}: TableLayoutProps) {
    const hasRowLabel = rows.some((row) => row.label);
    const mustShowLabels = columns.some((column) => column.label);
    const { asPath, pathname } = useRouter();
    const dispatch = useDispatch();
    const pageData = useSelector(({ pageData }: any) => pageData);

    return (
        <StyledTable>
            <StyledTHead>
                <StyledSearchTR>
                    {hasRowLabel && <th></th>}
                    {columns.map((column, index) => {
                        return (
                            <StyledTH key={index} data-hidden={column.search ? 'false' : 'true'}>
                                {column.search && (
                                    <TableSearchInput
                                        name="tableinputsearch"
                                        style={{ width: '110px', fontSize: '12px' }}
                                        placeholder={column.search}
                                        title={column.search}
                                        value={searchData?.[column.id] || ''}
                                        onChange={(e) =>
                                            onSearch?.({ column, value: e.target.value })
                                        }
                                    />
                                )}
                                {column.button && (
                                    <TableButtonSearchHead
                                        variant="contained"
                                        degree2="red"
                                        {...column.button}>
                                        {column.button.label}
                                    </TableButtonSearchHead>
                                )}
                            </StyledTH>
                        );
                    })}
                </StyledSearchTR>

                <StyledHeadTR>
                    {hasRowLabel && <th></th>}
                    {mustShowLabels &&
                        columns.map((column, index) => {
                            const isCheckedRows =
                                column.checkbox &&
                                rows.every((row) => row[column.id] && row[column.id]);

                            return (
                                <StyledTH key={index}>
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'left',
                                            justifyContent: 'left'
                                        }}>
                                        {typeof column.label === 'string' && (
                                            <div>{column.label}</div>
                                        )}

                                        {typeof column.label !== 'string' && column.checkbox && (
                                            <Checkbox
                                                checked={isCheckedRows && rows.length >= 1}
                                                onChange={() => {
                                                    if (typeof onChangeCheckedItems !== 'function')
                                                        return;

                                                    onChangeCheckedItems(
                                                        column.id,
                                                        isCheckedRows,
                                                        rows
                                                    );
                                                }}
                                            />
                                        )}

                                        {column.sort && (
                                            <TableSortIconsContainer>
                                                <SortUpIcon
                                                    onClick={
                                                        () =>
                                                            dispatch(
                                                                setPageData({
                                                                    ...pageData,
                                                                    sortItem: column,
                                                                    sortData: { Sort: 'ASC' }
                                                                })
                                                            )
                                                        // onSort?.({ column, direction: 'ASC' })
                                                    }
                                                />
                                                <SortDownIcon
                                                    onClick={
                                                        () =>
                                                            dispatch(
                                                                setPageData({
                                                                    ...pageData,
                                                                    sortItem: column,
                                                                    sortData: { Sort: 'DESC' }
                                                                })
                                                            )
                                                        //onSort?.({ column, direction: 'DESC' })
                                                    }
                                                />
                                            </TableSortIconsContainer>
                                        )}
                                    </div>
                                </StyledTH>
                            );
                        })}
                </StyledHeadTR>
            </StyledTHead>

            <StyledTBody>
                {rows.length === 0 || isError ? (
                    <StyledBodyTR>
                        <TD colSpan={columns.length} style={{ textAlign: 'center' }}>
                            No Data
                        </TD>
                    </StyledBodyTR>
                ) : (
                    rows.map((row, rowIndex) => {
                        return (
                            <Fragment key={rowIndex}>
                                <StyledBodyTR>
                                    {hasRowLabel && (
                                        <th style={{ fontWeight: 'normal' }}>{row.label}</th>
                                    )}

                                    {columns.map((column, columnIndex) => (
                                        <TD
                                            style={{
                                                backgroundColor: `${
                                                    pathname !== '/admin'
                                                        ? rowIndex % 2 === 0
                                                            ? '#F2F3F7'
                                                            : ''
                                                        : ''
                                                }`,
                                                borderRadius: 0
                                            }}
                                            column={column}
                                            data-label={column.label ? column.label + ':' : ''}
                                            key={columnIndex}
                                            row={rows[rowIndex]}>
                                            {getCell(column, row, rowIndex)}
                                        </TD>
                                    ))}
                                </StyledBodyTR>
                            </Fragment>
                        );
                    })
                )}
            </StyledTBody>
        </StyledTable>
    );

    function getCell(column: Column, row: RowTable, rowIndex: number) {
        const { Component, ...rest } = column;
        const { value, ...props } =
            row?.[column.id]?.constructor === Object ? row[column.id] : { value: row?.[column.id] };

        if (column.approveAction) {
            return (
                <ApproveAction
                    handleApprove={() => {
                        onApproveItem(row);
                    }}
                    handleReject={() => {
                        onRejectItem(row);
                    }}
                    approveActionLoading={approveActionLoading}
                />
            );
        }
        if (column.actions) {
            return (
                <Action
                    handleEdit={
                        typeof onEditItem === 'function'
                            ? () => {
                                  onEditItem(row);
                              }
                            : undefined
                    }
                    handleDelete={
                        typeof onDeleteItem === 'function' && row.isDeleted !== false
                            ? () => {
                                  onDeleteItem(row);
                              }
                            : undefined
                    }
                    handleConvertToservice={
                        row.Status !== ComplaintStatus.Completed &&
                        typeof onConvertToservice === 'function'
                            ? () => {
                                  onConvertToservice(row);
                              }
                            : undefined
                    }
                    handleSeeProfile={
                        typeof onSeeProfile === 'function'
                            ? () => {
                                  onSeeProfile(row);
                              }
                            : undefined
                    }
                    handleUserproperty={
                        typeof onUserproperty === 'function'
                            ? () => {
                                  onUserproperty(row);
                              }
                            : undefined
                    }
                    handleSetasexpire={
                        row.status === ApprovalStatus.Pending && typeof onSetasexpire === 'function'
                            ? () => {
                                  onSetasexpire(row);
                              }
                            : undefined
                    }
                    handleSetasblock={
                        typeof onSetasblock === 'function'
                            ? () => {
                                  onSetasblock(row);
                              }
                            : undefined
                    }
                    handleAccepts={
                        typeof onAccept === 'function'
                            ? () => {
                                  onAccept(row);
                              }
                            : undefined
                    }
                    handleReject={
                        typeof onReject === 'function'
                            ? () => {
                                  onReject(row);
                              }
                            : undefined
                    }
                />
            );
        }
        if (column.active) {
            return (
                <Switcher
                    value={row[column.id] === ActiveStatus.Active}
                    handleChange={() => {
                        if (typeof onChangeActive !== 'function') return;

                        if (row[column.id] === ActiveStatus.Active) {
                            dispatch(
                                newModal({
                                    Body: DeActiveModal,
                                    title: 'Confirmation',
                                    topBar: true,
                                    id: 'deactive-table',
                                    data: {
                                        onConfirm: async () => {
                                            await onChangeActive(column.id, row[column.id], row);

                                            dispatch(closeModal('deactive-table'));
                                        }
                                    }
                                })
                            );
                        } else {
                            onChangeActive(column.id, row[column.id], row);
                        }
                    }}
                />
            );
        }
        if (column.status) {
            return <StatusBadge type={row[column.id]} />;
        }
        if (column.checkbox) {
            return (
                <div style={{ minWidth: 40 }}>
                    <Checkbox
                        checked={row[column.id]}
                        onChange={() => {
                            if (typeof onChangeCheckedItem !== 'function') return;

                            onChangeCheckedItem(column.id, row[column.id], row);
                        }}
                    />
                </div>
            );
        }
        return Component ? (
            <Component
                row={row}
                value={value}
                onChange={(value) => {
                    rows[rowIndex][column.id] = value;

                    onChange?.([...rows]);
                }}
                {...rest}
                {...(props || {})}
            />
        ) : row[column.id] === '' ? (
            '----'
        ) : (
            row[column.id]
        );
    }
}

export default TableLayout;
