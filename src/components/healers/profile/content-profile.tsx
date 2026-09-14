import TableContainer from 'src/components/table_container';
import { tabsParent } from './data-type';
import { useRouter } from 'next/router';
import { useInitialProps } from '@/components/table_container/useTableProps';
import { setPageData } from 'src/redux/actions/actions';
import { connect, useDispatch } from 'react-redux';
import Dashboard from './component/dashboard';
import Settings from './component/settings';
import Sessions from './component/session';
import NewSession from './component/new-session';
import { useMediaQuery, useTheme } from '@mui/material';
import Messages from './component/message';


function Index({ pageData, setPageData }) {
    const router = useRouter();
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
    const dispatch = useDispatch()
    const { activePage = 1, activeTabParent = tabsParent[0] } = pageData;

    const initialProps = useInitialProps({
        totalCount: 10,
    });

    const props = {
        ...initialProps,
        activeTabParent,
        tabsParent,
        isLoading: false,
        healerLayout: true,
        adminLayout: true,
        buttons: activeTabParent.id !== "new" ? [
            { label: 'Add New Session', style: { borderRadius: '25px', border: 'none', marginRight: isSmall ? '13%' : '50px', padding: '11px 16px', width: '350px', cursor: 'pointer', height: '45px', fontSize: '18px', display: 'flex', justifyContent: 'center', alignItems: 'center' }, onClick: () => dispatch(setPageData({ ...pageData, activeTabParent: { label: 'new', id: 'new' } })) },
        ] : [],
    };

    return <TableContainer  {...props} >{activeTabParent.id === "Chat" ? <Messages /> : activeTabParent.id === "dashboard" ? <Dashboard /> : activeTabParent.id === "setting" ? <Settings /> : activeTabParent.id === "sessions" ? <Sessions /> : activeTabParent.id === "new" ? <NewSession /> : null}</TableContainer>
}

const mapStateToProps = ({ pageData }) => ({ pageData });

const mapDispatchToProps = { setPageData };

export default connect(mapStateToProps, mapDispatchToProps)(Index);
