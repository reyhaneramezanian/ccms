import { useDropdownToggle } from 'react-overlays';
import {
    SearchSelectButton,
    SearchSelectContainer,
    SearchSelectInputProvider,
    SearchSelectSpecialityInput,
    useSearchSelectAction,
    useSearchSelectState
} from './input.searchSelect';
import useDebounce from 'src/hooks/useDebounce';
import { MText } from '@/components/base/MText';
import { StyledSpinner } from '@/components/base/loader/spinner';
import { SelectChips } from '../cc.chips';
import { StyledColumn } from '@/components/base/view-container/Column';
import { useCallback } from 'react';
import { useGetDentists } from 'src/graphql/dentist/useDentist';
import { DentistsSpecialitiesOptions } from 'src/data/providers';
import { useDoctorSharedFunc } from './shared';

export const SearchSelectDentistComponent = () => {
    const [_, { toggle }] = useDropdownToggle();
    const { searchTerm, otherFilter } = useSearchSelectState();
    const setState = useSearchSelectAction();

    const searchValue = useDebounce(searchTerm, 500);
    const { data, isLoading } = useGetDentists({
        take: 50,
        skip: 0,
        where: {
            isActive: { eq: true },
            firstName: { contains: searchValue },
            lastName: { contains: searchValue },
            dentistSpecialty: { eq: otherFilter?.spec }
        },
        options: { enabled: Boolean(otherFilter?.spec) }
    });

    return (
        <SearchSelectContainer>
            {isLoading && (
                <StyledSpinner
                    css={{
                        position: 'absolute',
                        left: '50%',
                        zIndex: 1,
                        transform: 'translate(-50%)'
                    }}
                />
            )}
            {data?.dentist_getDentists?.result?.items ? (
                data?.dentist_getDentists?.result?.items?.map((d) => {
                    return (
                        <SearchSelectButton
                            key={d.id}
                            onClick={() => {
                                setState((p) => ({
                                    ...p,
                                    searchTerm: `${d.firstName} ${d.lastName}`,
                                    option: `${d.firstName} ${d.lastName}`,
                                    value: d.id
                                }));
                                toggle(false);
                            }}
                            css={{ display: 'block' }}>
                            <MText>{`${d.firstName} ${d.lastName}`}</MText>
                        </SearchSelectButton>
                    );
                })
            ) : (
                <MText>No Option</MText>
            )}
        </SearchSelectContainer>
    );
};
export const SearchSelectDentist = ({ values, push, remove }) => {
    const { onAdd } = useDoctorSharedFunc(push, values);
    return (
        <SearchSelectInputProvider>
            <SearchSelectSpecialityInput
                title={'Select Dentist'}
                onAdd={onAdd}
                specialities={DentistsSpecialitiesOptions}>
                <SearchSelectDentistComponent />
            </SearchSelectSpecialityInput>
            <StyledColumn css={{ flex: 1 }}>
                {values?.map((i, index) => (
                    <SelectChips key={index} onClose={() => remove(index)} title={i?.title} />
                ))}
            </StyledColumn>
        </SearchSelectInputProvider>
    );
};
