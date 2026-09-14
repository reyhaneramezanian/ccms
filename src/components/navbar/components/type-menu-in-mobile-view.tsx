import NavbarLink from './navbar-link';
import { MobileViewItem, TypeMenuContainer, TypeMenuItemContainer } from '../styled.navbar';
import { ArrowDownIcon } from 'src/assets/common/ArrowDownIcon';
import { Divider, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { Spacer } from '@/components/base/spacer';
import { Box } from '@mui/system';

const MobileViewTypesMenu = () => {
    const [isTypeMenuOpen, setIsTypeMenuOpen] = useState(false);
    const ref = useRef<any>();

    useEffect(() => {
        window.addEventListener('click', handleClickOutside, true);
        function handleClickOutside(event) {
            if (!ref.current?.contains?.(event.target) && isTypeMenuOpen) {
                setIsTypeMenuOpen(false);
            }
        }
        return () => window.removeEventListener('click', handleClickOutside, true);
    }, [isTypeMenuOpen]);

    return (
        <Box ref={ref}>
            <MobileViewItem onClick={() => setIsTypeMenuOpen(!isTypeMenuOpen)}>
                <Typography>Healing Type</Typography>
                <Spacer space={3} />
                <ArrowDownIcon />
            </MobileViewItem>
            <Spacer space={5} />
            <TypeMenuContainer style={{ display: isTypeMenuOpen ? 'unset' : 'none' }}>
                <TypeMenuItemContainer>
                    <NavbarLink showInMobileView={true} href="/">
                        Home
                    </NavbarLink>
                </TypeMenuItemContainer>
                <Divider style={{ width: '100%', borderColor: '#E4E1F0' }} />
                <TypeMenuItemContainer>
                    <NavbarLink showInMobileView={true} href="/healing">
                        Healing type
                    </NavbarLink>
                </TypeMenuItemContainer>
                <Divider style={{ width: '100%', borderColor: '#E4E1F0' }} />
                <TypeMenuItemContainer>
                    <NavbarLink showInMobileView={true} href="/healers">
                        Healers
                    </NavbarLink>
                </TypeMenuItemContainer>
                <Divider style={{ width: '100%', borderColor: '#E4E1F0' }} />
                <TypeMenuItemContainer>
                    <NavbarLink showInMobileView={true} href="/about">
                        About
                    </NavbarLink>
                </TypeMenuItemContainer>
            </TypeMenuContainer>
        </Box>
    );
};

export default MobileViewTypesMenu;
