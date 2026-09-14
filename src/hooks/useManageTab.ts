import { ItemTabs } from '@/components/tabs/types.tabs';
import { ICustomPageTabsProps } from '@/components/adm';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import storageKeys from 'src/data/storageKeys';

const useManageTab = (tabs: ICustomPageTabsProps[], tabName: string = 'tab') => {
    const router = useRouter();

    const [activeTab, setActiveTab] = useState<ICustomPageTabsProps>();

    useEffect(() => {
        if (!tabs.length) return;

        const queries = new URLSearchParams(window.location.search);
        const tabQuery = queries.get(tabName);

        if (!tabQuery) {
            localStorage.setItem(storageKeys.sortcolumn, '');
            setActiveTab(tabs[0]);
            return;
        }

        const findTab = tabs.find((tab) => tab.id === tabQuery);

        if (typeof findTab === 'undefined') {
            setActiveTab(tabs[0]);
            return;
        }

        setActiveTab(findTab);

        // eslint-disable-next-line
    }, [tabName]);

    const handleChangeActiveTab = (newTab: ItemTabs) => {
        const findTab = tabs.find((item) => item.id === newTab.id);

        if (typeof findTab === 'undefined') return;

        localStorage.setItem(storageKeys.sortcolumn, '');
        setActiveTab(findTab);

        const query: any = { ...router.query, [tabName]: newTab.id };

        if (router.query.page) query.page = 1;

        router.push({
            pathname: router.pathname,
            query
        });
    };

    return {
        activeTab,
        tabs,
        handleChangeActiveTab
    };
};

export default useManageTab;
