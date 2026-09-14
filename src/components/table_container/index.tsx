import React, { HTMLAttributes, useEffect, useRef, useState } from 'react';
import Table from 'src/components/table/table';
import { Column } from 'src/components/table/table_layout/types.table.layout';
import { TableLayoutProps } from 'src/components/table/table_layout/types.table.layout';
import WithLoader from 'src/components/with_loader';
import Tabs from '../tabs/tabs';
import { useRouter } from 'next/router';
import TopRow from './top-row';
import TabParent from '../tabs/tabs-parent';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import CustomButtons from './custom-buttons';

type Tab = {
    label: string;
    id: string;
    Icon?: React.FC<any>;
};
interface Button extends HTMLAttributes<HTMLButtonElement> {
    label: string;
}
export type TableContainerProps = TableLayoutProps & {
    tabs?: Tab[];
    tabsParent?: Tab[];
    onTabChange?: (tab: Tab) => void;
    openDrawer?: () => void;
    closeDrawer?: () => void;
    onTabChangeParent?: (tab: Tab) => void;
    activeTab?: Tab;
    activeTabParent?: Tab;
    buttons?: Button[];
    onButtonClick?: (button: Button) => void;
    onPageChange?: (pageNumber: number) => void;
    sortInput?: React.ReactNode;
    sortNewInput?: React.ReactNode;
    renderComponent?: React.ReactNode;
    sortable?: boolean;
    open?: boolean;
    toprow?: { rows: Array<any>; Column: Column[]; isLoading?: boolean };
    totalPages?: number;
    activePage?: number;
    smallTab?: boolean;
    isLoading?: boolean;
    fulloverlay?: boolean;
    adminLayout?: boolean;
    healerLayout?: boolean;
    centerItem?: boolean;
    children?: React.ReactNode;
    totalRows?: number;
};

export default function TableContainer({
    tabs = [],
    activeTab,
    smallTab,
    buttons = [],
    onTabChange,
    totalPages,
    onTabChangeParent,
    activeTabParent,
    onButtonClick,
    tabsParent,
    sortInput,
    sortNewInput,
    renderComponent,
    open,
    openDrawer,
    closeDrawer,
    sortable,
    activePage,
    onPageChange,
    toprow = { rows: [], Column: [], isLoading: false },
    isLoading,
    children,
    fulloverlay,
    adminLayout = false,
    healerLayout = false,
    centerItem = false,
    ...props
}: TableContainerProps) {
    const router = useRouter();
    const { query } = useRouter();
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <div
            // ref={ref}
            style={{ position: 'relative' }}>
            {fulloverlay && (
                <div
                    style={{
                        borderBottom: '4px solid #D9D9D9',
                        height: '3px',
                        position: 'absolute',
                        left: 16,
                        width: '100%',
                        right: '50vw',
                        top: 46,
                        transition: '0.4s',
                        zIndex: 1
                    }}
                />
            )}

            {/* {toprow?.rows?.length > 0 && <TopRow {...toprow} />} */}
            {tabsParent ? (
                <div style={{ display: 'flex', flexFlow: 'row wrap' }}>
                    {!healerLayout && <div style={{ flex: 1 }} />}
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: centerItem ? 'center' : 'flex-start',
                            flexFlow: 'row wrap',
                            alignItems: 'flex-start'
                        }}>
                        <TabParent
                            smallTab={smallTab}
                            onTabChange={onTabChangeParent}
                            activeTab={activeTabParent}
                            tabs={tabsParent}
                            rows={props.rows}
                        />
                    </div>
                    <div style={{ flex: 1 }} />
                    <CustomButtons buttons={buttons} onButtonClick={onButtonClick} />
                </div>
            ) : null}
            {
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexFlow: 'row wrap',
                        marginLeft: adminLayout && !isSmall ? '100px' : null
                    }}>
                    <Tabs
                        onTabChange={onTabChange}
                        smallTab={smallTab}
                        activeTab={activeTab}
                        activeTabParent={activeTabParent}
                        tabs={tabs}
                        fulloverlay={fulloverlay}
                        rows={props.rows}
                    />
                    <div style={{ flex: 1 }} />
                    <div
                        style={{
                            marginLeft: isSmall ? '20px' : 0,
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginRight: healerLayout && !isSmall ? '100px' : null
                        }}>
                        {sortNewInput}
                        {sortInput}
                    </div>
                </div>
            }
            <div
                style={{
                    borderRadius: !props.rows ? 0 : '10px',
                    // border: '1px solid #0A0A0A',
                    // background: props.rows?.length > 0 ? '#fff' : '',
                    padding: !props.rows ? 0 : '0',
                    marginTop: '0',
                    minHeight: '30vh',
                    overflowX: 'auto',
                    position: 'relative'
                }}>
                {!tabsParent && sortInput && (
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'center'
                        }}>
                        {sortable && <div onClick={() => openDrawer()}>sort</div>}
                    </div>
                )}
                {isLoading ? (
                    <WithLoader isLoading={isLoading}> </WithLoader>
                ) : children ? (
                    children
                ) : adminLayout && !isSmall ? (
                    <div style={{ margin: '0 0px' }}>
                        <Table
                            {...props}
                            totalPages={totalPages ? totalPages : 20}
                            activePage={activePage ? activePage : 1}
                            onPageChange={onPageChange}
                        />
                    </div>
                ) : (
                    <Table
                        {...props}
                        totalPages={totalPages ? totalPages : 20}
                        activePage={activePage ? activePage : 1}
                        onPageChange={onPageChange}
                    />
                )}
            </div>
        </div>
    );
}
