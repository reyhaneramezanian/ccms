import { NavBarContainer } from './styled.navbar';
import { useRouter } from 'next/router';
import { navbarItems } from './navbar_items';
import { connect, useDispatch } from 'react-redux';
import { newModal, activeSideBar, activeTab } from 'src/redux/actions/actions';
import { useEffect } from 'react';
import Sidebar from '@/components/sidebar/sidebar';

function Navbar({ isSideBarActive, activeSideBar }) {
    const router = useRouter();
    const rootPath = router.pathname;
    const dispatch = useDispatch();
    let userRole = 'client';

    useEffect(() => {
        if (!rootPath.includes('/healers/profile') && !rootPath.includes('/client'))
            dispatch(activeTab('is-not-in-dashboard'));
    }, [rootPath]);

    useEffect(() => {
        if (!isSideBarActive) return;

        function disableSideBar() {
            if (isSideBarActive) activeSideBar(false);
        }

        window.addEventListener('resize', disableSideBar);

        return () => window.removeEventListener('resize', disableSideBar);
    }, [isSideBarActive]);

    let items;
    if (userRole === 'healer' || userRole === 'client') items = navbarItems['clientOrHealer'];
    else items = navbarItems['default'];
    // const items = navbarItems[rootPath] || navbarItems.default;

    return <NavBarContainer>{isSideBarActive ? <Sidebar /> : items}</NavBarContainer>;
}

const mapStateToProps = ({ isSideBarActive, chatCount, activeTabName }) => ({
    isSideBarActive,
    chatCount,
    activeTabName
});

const mapDispatchToProps = { activeSideBar, newModal };

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
