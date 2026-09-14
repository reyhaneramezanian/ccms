import { Typography, InputAdornment, Box } from '@mui/material'
import React from 'react'
import SearchDrawer from 'src/assets/icons/search-drawer'
import { CustomInputSearch, CustomParentfringe } from '../styled.profile'
import DashboardIconMain from 'src/assets/icons/dashboard-icon-main';
import SessionIconMain from 'src/assets/icons/session-icon-main';
import SettingIconMain from 'src/assets/icons/setting-icon-main';
import ChatIconMain from 'src/assets/icons/chat-icon-main';
import LogoutIconMain from 'src/assets/icons/logout-icon-main';


const DrawerItems = () => {
    return (
        <>
            <CustomParentfringe>
                <Typography sx={{ marginTop: '17px', fontSize: '20px', color: '#fff' }}>Louisa Fuller</Typography>
                <Typography sx={{ marginTop: '5px', fontSize: '15px', color: '#fff' }}>Louisa Fuller</Typography>
                <CustomInputSearch
                    placeholder="Search Project"
                    id="standard"
                    variant="outlined"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchDrawer />
                            </InputAdornment>
                        ),
                        style: {
                            height: '50px',
                            width: '100%'
                        }
                    }}
                />
            </CustomParentfringe>
            <RenderIcons icon={<DashboardIconMain />} title="Dashboard" active="true" />
            <RenderIcons icon={<SessionIconMain />} title="Sessions" active="false" />
            <RenderIcons icon={<ChatIconMain />} title="Chat" active="false" />
            <RenderIcons icon={<SettingIconMain />} title="Setting" active="false" />
            <RenderIcons icon={<LogoutIconMain />} title="Logout" active="false" style={{marginTop:'50px'}} />
        </>
    )
}

export default DrawerItems

const RenderIcons = ({ title, active, icon,style = null }) => {
    return (
        <div style={{ marginTop: '20px',...style }}>
            <Box style={{ height: '50px', padding: '0 10px', color: '#fff', background: active === "true" ? "linear-gradient(45deg,#DDBFFA, #A587C2)" : null, display: 'flex', alignItems: 'center' }}>
                {icon}
                <Typography sx={{ fontSize: '18px', marginLeft: '16px' }}>{title}</Typography>
            </Box>
        </div>
    )
}