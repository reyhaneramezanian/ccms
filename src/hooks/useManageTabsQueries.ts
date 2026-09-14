import { TABLE_TAKE } from 'src/data/tableOptions';
import useActivePage from 'src/hooks/useActivePage';
import { ICustomPageTabsProps, IRequiredFieldUpdate } from '@/components/admin/types.admin';
import { RowTable } from '@/components/table/table_layout/types.table.layout';
import { useEffect, useState } from 'react';
import { UseMutationResult, UseQueryOptions, UseQueryResult } from 'react-query';
import { ActiveStatus, SortEnumType } from 'src/graphql/generated';
import defaultQueryOptions from 'src/data/queryOptions';
import * as Convert from '@/utils/convertStirngTo3DObject';
import { useDispatch, useSelector } from 'react-redux';
import { AnyObject } from 'immer/dist/internal';
import storageKeys from 'src/data/storageKeys';

export interface ISearchData {
    type: 'contains' | 'eq' | 'lte' | 'gte' | 'nin';
    valueType?: 'string' | 'number';
    key: string;
    empty?: boolean;
    defaultValueKey?: string;
}

export interface IOthersFilter {
    [tabId: string]: {
        [key: string]: any;
    };
}

const useManageTabsQueries = <Variable = any>(
    tabs: ICustomPageTabsProps[],
    activeTab: ICustomPageTabsProps,
    options?: {
        variables?: (searchValue: string) => Variable | Variable;
        queryOptions?: UseQueryOptions;
        isNotSearch?: boolean;
        searchData?: ISearchData[];
        othersFilter?: IOthersFilter;
        whereType?: 'or' | 'and';
    }
) => {
    debugger;
    const pageData = useSelector(({ pageData }: any) => pageData);
    const queries: { [key: string]: UseQueryResult } = {};
    const [sortitemtable, setsortitemtable] = useState({});
    const [sortdata, setsortdata] = useState<any>();

    const updateMutations: { [key: string]: UseMutationResult } = {};

    useEffect(() => {
        const order = { id: SortEnumType.Desc };
        if (
            localStorage.getItem(storageKeys.sortcolumn) === '' ||
            localStorage.getItem(storageKeys.sortcolumn) === undefined
        )
            localStorage.setItem(storageKeys.sortcolumn, JSON.stringify(order));
        var sort = Convert.default.convertStringToObjectOrderBy(
            pageData?.sortItem?.sortkey,
            pageData?.sortData?.Sort !== 'ASC' ? SortEnumType.Desc : SortEnumType.Asc
        );
        if (sort != undefined) localStorage.setItem(storageKeys.sortcolumn, JSON.stringify(sort));
        setsortdata(sort);
    }, [pageData]);
    const searchData: ISearchData[] = options?.searchData || [
        {
            type: 'contains',
            key: 'name'
        }
    ];

    const [data, setData] = useState<{
        totalCount: number;
        rows: RowTable[];
    }>({
        totalCount: 0,
        rows: []
    });
    const [activePage] = useActivePage();
    const [searchValue, setSearchValue] = useState<string>('');
    var filter_or_serch = 0;
    // query hooks

    tabs.forEach((tab) => {
        if (typeof tab.queryKey !== 'string' && typeof tab.useQuery !== 'function') return;

        if (typeof tab.queryKey !== 'string') throw new Error('queryKey is required');
        if (typeof tab.useQuery !== 'function') throw new Error('useQuery is required');

        const variables: any =
            typeof options?.variables === 'function'
                ? options?.variables(searchValue)
                : options?.variables || {
                      where: {}
                  };

        Array.isArray(searchData) && searchData.length
            ? searchData.map((item) => {
                  const otherFilter =
                      options?.othersFilter?.[activeTab?.id]?.[item.defaultValueKey];
                  if (otherFilter != undefined) filter_or_serch = 1;
              })
            : undefined;
        const orData =
            Array.isArray(searchData) && searchData.length
                ? searchData
                      .map((item) => {
                          let value =
                              item.valueType === 'number'
                                  ? parseFloat(searchValue)
                                  : searchValue.trim();
                          const otherFilter =
                              options?.othersFilter?.[activeTab?.id]?.[item.defaultValueKey];

                          if (
                              typeof item?.defaultValueKey === 'string' &&
                              typeof otherFilter === 'undefined'
                          ) {
                              return undefined;
                          } else if (typeof item?.defaultValueKey === 'string') {
                              value = otherFilter;
                          } else if (
                              item.empty &&
                              ((item.valueType === 'number' && isNaN(parseFloat(searchValue))) ||
                                  (item.valueType === 'string' && searchValue.trim() === ''))
                          ) {
                              return;
                          }
                          if (filter_or_serch === 1 && otherFilter != undefined) {
                              if (otherFilter !== -1)
                                  return Convert.default.convertStringToObject(item.key, {
                                      [item.type]: value
                                  });
                              else
                                  return Convert.default.convertStringToObject(item.key, {
                                      [item.type]: null
                                  });
                          } else if (filter_or_serch === 0)
                              return Convert.default.convertStringToObject(item.key, {
                                  [item.type]: value
                              });
                      })
                      .filter((item) => typeof item !== 'undefined')
                : undefined;
        const whereordata = {
            [filter_or_serch !== 1 ? 'or' : 'and']:
                !options?.isNotSearch && orData.length ? orData : undefined
        };
        const whereData = {
            ...variables?.where,
            [filter_or_serch === 1 ? 'and' : 'and']:
                !options?.isNotSearch && orData.length
                    ? filter_or_serch === 1
                        ? orData
                        : whereordata
                    : undefined
        };
        Object.keys(whereData).forEach((key) => {
            if (whereData[key] === undefined) delete whereData[key];
        });

        queries[tab.id] = tab.useQuery(
            {
                skip:
                    orData.length === 0 || filter_or_serch == 1 ? (activePage - 1) * TABLE_TAKE : 0,
                take: TABLE_TAKE,
                ...variables,
                where:
                    (typeof options?.variables === 'undefined' && options?.isNotSearch) ||
                    !Object.keys(whereData).length
                        ? undefined
                        : whereData,
                order:
                    sortdata != undefined
                        ? sortdata
                        : localStorage.getItem(storageKeys.sortcolumn) === ''
                        ? { id: SortEnumType.Desc }
                        : JSON.parse(localStorage.getItem(storageKeys.sortcolumn))
                //{ id: SortEnumType.Desc }
                /*  order:
                    pageData?.sortItem === '' || sortdata === undefined
                        ? { id: SortEnumType.Desc }
                        : sortdata.length === 1
                        ? {
                              [pageData?.sortItem?.sortkey]:
                                  pageData?.sortData?.Sort === 'ASC'
                                      ? SortEnumType.Asc
                                      : SortEnumType.Desc
                          }
                        : sortitemtable*/
            },
            {
                ...defaultQueryOptions,
                ...options?.queryOptions,
                enabled:
                    tab.id === activeTab?.id &&
                    typeof activePage === 'number' &&
                    options?.queryOptions?.enabled
            }
        );
    });

    // update mutations hooks
    tabs.forEach((tab) => {
        if (typeof tab.useUpdateMutation !== 'function') return;

        updateMutations[tab.id] = tab.useUpdateMutation();
    });

    const activeQuery = queries[activeTab?.id],
        activeUpdateMutation = updateMutations[activeTab?.id];

    const handleSetRows = (): RowTable[] => {
        if (typeof activeTab.Transformer === 'undefined') {
            return activeQuery?.data?.[activeTab?.queryKey]?.result;
        }

        return activeTab.Transformer.transforms(activeQuery?.data);
    };

    useEffect(() => {
        if (typeof activeQuery === 'undefined') return;

        const result = activeQuery?.data?.[activeTab?.queryKey]?.result;

        if (activeQuery.isLoading || !result) return;

        setData((prevState) => ({
            ...prevState,
            rows: handleSetRows(),
            totalCount: result.totalCount
        }));

        // eslint-disable-next-line
    }, [activeQuery?.data, activeTab]);

    const setRows = (setState: (prevState: RowTable[]) => RowTable[]) => {
        setData((prevState) => ({
            ...prevState,
            rows: [...setState(prevState.rows)]
        }));
    };

    const handleUpdateActiveStatus = async (
        row: RowTable,
        requiredField?: IRequiredFieldUpdate[] | string[]
    ) => {
        if (typeof updateMutations[activeTab?.id] === 'undefined')
            throw new Error('updateMutation is required');

        const updateMutationRequiredData = {};

        if (Array.isArray(requiredField)) {
            requiredField.forEach((field) => {
                if (typeof field === 'string') {
                    if (typeof row[field] === 'undefined') {
                        throw new Error(`${field} is required`);
                    }

                    updateMutationRequiredData[field] = row[field];
                    return;
                }

                if (typeof field.key !== 'string') throw new Error('key is required');
                if (typeof field.value !== 'string') throw new Error('value is required');

                updateMutationRequiredData[field.key] = row[field.value];
            });
        }

        await updateMutations[activeTab?.id]?.mutateAsync({
            input: {
                id: row.id,
                ...updateMutationRequiredData,
                activeStatus:
                    ActiveStatus.Active === row.activeStatus
                        ? ActiveStatus.Inactive
                        : ActiveStatus.Active
            },
            id: row.id
        });

        activeQuery?.refetch();
    };

    const isLoading = activeQuery?.isFetching || activeUpdateMutation?.isLoading;

    return {
        queries,
        activeQuery,
        data,
        setData,
        setRows,
        searchValue,
        setSearchValue,
        handleUpdateActiveStatus,
        isLoading
    };
};

export default useManageTabsQueries;
