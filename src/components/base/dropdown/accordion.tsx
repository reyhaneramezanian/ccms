import React, { useState } from 'react';
import { useCallback } from 'react';

import { StyledAccordionSelectInput } from './styled';
import styled from '@emotion/styled';
import { Dropdown, useDropdownMenu, useDropdownToggle } from 'react-overlays';

const OFFSET = 48;
type SelectProps = AppCommonInput &
    AppCommonChild & {
        Title: React.FC<any>;
    };

export const AccordionMenuContainer = styled.div<{ show: boolean }>(({ theme, show }) => ({
    display: show ? 'flex' : 'none',
    borderTopLeftRadius: theme.shape.borderRadius.medium,
    borderTopRightRadius: theme.shape.borderRadius.medium,
    minWidth: 150,
    flexDirection: 'column',
    maxHeight: 500,
    zIndex: theme.zIndex.menu,
    position: 'absolute',
    top: `calc(100% + ${OFFSET}px)`,
    width: '100%',
    backgroundColor: '#FFF',
    boxShadow: theme.shadows.regular,
    transition: 'box-shadow 0.3s ease',
    padding: 16,
    paddingTop: OFFSET + 24
}));

const AccordionMenu = ({ children }: Omit<SelectProps, 'name'>) => {
    const { show, props, close } = useDropdownMenu({
        flip: true,
        offset: [0, -OFFSET]
    });
    return (
        <AccordionMenuContainer
            {...props}
            style={{ ...props.style, opacity: 1, pointerEvents: 'all' }}
            role="menu"
            show={show}>
            {children}
        </AccordionMenuContainer>
    );
};

const AccordionToggle = ({ StartAdornment, EndAdornment, Title }: Omit<SelectProps, 'name'>) => {
    const [props, { show, toggle }] = useDropdownToggle();

    return (
        <StyledAccordionSelectInput {...props} value={false} open={show}>
            <div onClick={() => toggle(false)}>
                <div />
                {StartAdornment && <StartAdornment />}
                <Title />
                {EndAdornment && <EndAdornment />}
            </div>
        </StyledAccordionSelectInput>
    );
};

export const AccordionSelectInput = (props: Omit<SelectProps, 'onChange' | 'name'>) => {
    const [show, setShow] = useState(false);
    const onToggle = useCallback(() => {
        setShow((prevProps) => !prevProps);
    }, []);

    return (
        <Dropdown {...props} show={show} onToggle={onToggle} itemSelector="button:not(:disabled)">
            {({ dp }: any) => (
                <div {...dp} style={{ position: 'relative' }}>
                    <AccordionToggle {...props} />
                    <AccordionMenu {...props}>{props.children}</AccordionMenu>
                </div>
            )}
        </Dropdown>
    );
};
