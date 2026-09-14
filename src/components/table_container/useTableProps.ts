import React from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { setPageData } from 'src/redux/actions/actions';

export function useInitialProps(data?: { totalCount?: number,totalRows?:number,tabs?:{},tabsParent?:{} }) {
    const pageData = useSelector(({ pageData }: any) => pageData);
    const dispatch = useDispatch();
    const { asPath, pathname } = useRouter();

    const { totalRows = data.totalRows ? data.totalRows : 5, activePage, activePagebid, activeTabParent } = pageData;
    const { totalCount = 0 } = data;

    React.useEffect(()=>{
        if(pathname==='/bids'){
            updatePageData({
                activePagebid:activePage,
                activePage: 1,
                // activeTabParent:data.tabsParent ? data.tabsParent : [],
                // activeTab:data.tabs ? data.tabs : []
            })
        }
        else{
            if(activeTabParent==='Projects')
                updatePageData({
                    activePage: activePagebid!=1?activePagebid:activePage,
                    // activeTabParent:data.tabsParent ? data.tabsParent : [],
                    // activeTab:data.tabs ? data.tabs : []
                })
        }
    },[asPath])

 
    return {
        ...pageData,
        onTabChange: (tab) => updatePageData({ activeTab: tab, /*activePage: 1*/ }),
        onTabChangeParent: (tab) => updatePageData({ activeTabParent: tab, activePage: 1,sessionItem:'', searchdata:'',sortData: { Sort: 'Sort' } }),
        onPageChange: (pageNumber) => updatePageData({ activePage: pageNumber }),
        totalPages: Math.ceil((totalCount || 1) / totalRows),
        activePage
    };

    function updatePageData(data) {
        dispatch(setPageData({ ...pageData, ...data }));
    }
}
