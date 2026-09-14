import Link from 'next/link';
import { NavbarLinkContainer } from '../styled.navbar';

function NavbarLink({ children, href = '#', showInMobileView = false }) {
    return (
        <NavbarLinkContainer showInMobileView={showInMobileView}>
            <Link href={href}>
                <a
                    style={{
                        color: 'inherit',
                        textDecoration: 'none',
                        cursor: 'pointer',
                        fontFamily: 'Helvetica'
                    }}>
                    {children}
                </a>
            </Link>
        </NavbarLinkContainer>
    );
}

export default NavbarLink;
