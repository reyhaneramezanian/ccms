import TableContainer from 'src/components/table_container';
import { Column, tabs, tabsParent, RowCurrent, RowClose } from '../data-type';
import { useRouter } from 'next/router';
import { useInitialProps } from '@/components/table_container/useTableProps';
import { setPageData } from 'src/redux/actions/actions';
import { connect } from 'react-redux';
import BasicSelect from '@/components/shared/basic-select';
import  CustomTDSession  from '@/components/shared/share/custom-td-session';
import SessionItems from './session-item';


function Sessions({ pageData, setPageData }) {
    const router = useRouter();
    const { activePage = 1, activeTab = tabs[0], activeTabParent = tabsParent[0],sessionItem } = pageData;

    const initialProps = useInitialProps({
        totalCount: 10,
    });

    const props = {
        ...initialProps,
        columns: activeTabParent.id === "sessions" ? Column : [],
        rows: activeTabParent.id === "sessions" ? activeTab?.id === "close" ? RowClose : RowCurrent : [],
        activeTab,
        tabs: sessionItem ==='' ? (activeTabParent.id === "sessions" ? tabs : []) : [],
        sortInput: sessionItem ==='' ?  <BasicSelect /> : null,
        isLoading: false,
        healerLayout: true,
        adminLayout: true,
        TD: CustomTDSession,
        buttons: [
            { label: 'Add New Session', style: { borderRadius: '25px', border: 'none', marginRight: '50px', padding: '11px 16px', width: '350px', cursor: 'pointer', height: '45px', fontSize: '18px', display: 'flex', justifyContent: 'center', alignItems: 'center' }, onClick: () => router.push('/healer/add-new-session') },
        ],
    };

    return <TableContainer  {...props} >{sessionItem !== '' && <SessionItems sessionItem={sessionItem} />}</TableContainer>
}

const mapStateToProps = ({ pageData }) => ({ pageData });

const mapDispatchToProps = { setPageData };

export default connect(mapStateToProps, mapDispatchToProps)(Sessions);
