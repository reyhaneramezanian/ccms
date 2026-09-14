import { MenuMenuContainer, MenuSelectInput } from '@/components/base/dropdown/menu';
import { MSelectInput } from '@/components/base/dropdown/select';
import { MInput } from '@/components/base/input';
import { BSLabel } from '@/components/base/input/styled';
import { MButton } from '@/components/base/MButton';
import { Spacer } from '@/components/base/spacer';
import { StyledColumn } from '@/components/base/view-container/Column';
import styled from '@emotion/styled';
import React, { createContext, useContext, useState } from 'react';
import { useDropdownMenu, useDropdownToggle } from 'react-overlays';
import { DoctorSpecialitiesOptions } from 'src/data/providers';
import { ButtomFormAdd } from '../buttons';
import { SelectSearchSpecAdd } from '../utilities/input.types';

export const SearchSelectButton = styled(MButton)({
    width: '100%',
    '&:hover': {
        backgroundColor: '#eee'
    }
});

export const SearchSelectContainer = styled.div(({ theme }) => ({
    width: 400,
    padding: 16,
    minHeight: 85,
    borderRadius: 12,
    maxHeight: '70vh',
    overflow: 'auto',
    backgroundColor: '#FFF',
    boxShadow: theme.shadows.regular,
    position: 'relative'
}));

type State = {
    searchTerm: string;
    value: number;
    option: string;
    otherFilter?: Record<string, any>;
};
const SearchSelectStateContext = createContext({} as State);
const SearchSelectActionContext = createContext({} as React.Dispatch<React.SetStateAction<State>>);

export const useSearchSelectState = () => {
    const state = useContext(SearchSelectStateContext);
    if (!state) {
        throw new Error('state should be inside provider');
    }
    return state;
};
export const useSearchSelectAction = () => {
    const setState = useContext(SearchSelectActionContext);
    if (!setState) {
        throw new Error('setState should be inside provider');
    }
    return setState;
};

const SearchInput = () => {
    const { searchTerm } = useSearchSelectState();
    const setState = useSearchSelectAction();
    const [props, { toggle, show }] = useDropdownToggle();

    return (
        <div css={{ width: '100%' }} {...props} onClick={() => toggle(true)}>
            <MInput
                
                autoComplete="new-password"
                name={"search-select-input"}

                {...props}
                value={searchTerm}
                onChange={(e) => setState((p) => ({ ...p, searchTerm: e.target.value }))}
            />
        </div>
    );
};
const MenuContainerComponent = styled.div({ position: 'relative', width: '100%' });
const MenuListContainer = styled(MenuMenuContainer)({});
const MenuListComponent = ({ children }: AppCommonChild) => {
    const { show, props, close } = useDropdownMenu({
        flip: true,
        offset: [0, 0]
    });
    return (
        <MenuListContainer
            {...props}
            style={{ ...props.style, opacity: 1, pointerEvents: 'all' }}
            role="menu"
            show={show}>
            {children}
        </MenuListContainer>
    );
};

export const SearchSelectInputProvider = ({ children }) => {
    const [state, setState] = useState({
        searchTerm: '',
        value: -1,
        option: '',
        otherFilter: {}
    });
    return (
        <SearchSelectActionContext.Provider value={setState}>
            <SearchSelectStateContext.Provider value={state}>
                {children}
            </SearchSelectStateContext.Provider>
        </SearchSelectActionContext.Provider>
    );
};
export const SearchSelectInput = ({ children }: AppCommonChild) => {
    return (
        <MenuSelectInput
            ToggleComponent={SearchInput}
            MenuListComponent={MenuListComponent}
            MenuContainerComponent={MenuContainerComponent}
            Icon={() => null}>
            {children}
        </MenuSelectInput>
    );
};

export const SearchSelectSpecialityInput = ({
    children,
    title,
    onAdd,
    specialities
}: { title: string; onAdd: SelectSearchSpecAdd,
    specialities:any } & AppCommonChild) => {
    const setState = useSearchSelectAction();
    const { otherFilter, option, value } = useSearchSelectState();
    return (
        <StyledColumn css={{ flex: 1 }}>
            <MSelectInput
                label="Select Speciality"
                name={`${title}-spec`}
                options={specialities}
                value={otherFilter?.spec}
                onChange={(opt) => {
                    setState((p) => ({
                        ...p,
                        otherFilter: {
                            spec: opt?.value
                        }
                    }));
                }}
            />
            <Spacer vert={16} />
            <BSLabel>{title}</BSLabel>
            <SearchSelectInput>{children}</SearchSelectInput>
            <Spacer vert={16} />
            <ButtomFormAdd onClick={() => onAdd(value, otherFilter?.spec, option)} />
        </StyledColumn>
    );
};
