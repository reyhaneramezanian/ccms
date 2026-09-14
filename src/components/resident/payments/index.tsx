import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import * as residentstyle from '../resident.style';
import { Grid } from '@mui/material';
import { useGetUser } from 'src/auth/UserProvider';
import useManageTab from 'src/hooks/useManageTab';
import { TabItems, PagesComponent } from './data';

const Complaint = () => {
    const user = useGetUser();

    const { activeTab, handleChangeActiveTab } = useManageTab(TabItems);

    const hasUser = typeof user === 'object' && user !== null;

    if (!hasUser || typeof activeTab === 'undefined') return null;
    const PageComponent = PagesComponent[activeTab.id];
    return (
        <Grid container style={{ backgroundColor: '#fff', borderRadius: 8 }}>
            <residentstyle.warper>
                <residentstyle.SecurityProfileTabs
                    tabs={TabItems}
                    activeTab={activeTab}
                    onTabChange={handleChangeActiveTab}
                />

                <PageComponent />
            </residentstyle.warper>
        </Grid>
    );
};
export default Complaint;
