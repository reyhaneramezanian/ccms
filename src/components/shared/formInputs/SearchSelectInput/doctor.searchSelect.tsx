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
import { useGetDoctors } from 'src/graphql/doctor/useDoctor';
import { SelectChips } from '../cc.chips';
import { StyledColumn } from '@/components/base/view-container/Column';
import { useCallback } from 'react';
import { DoctorSpecialitiesOptions } from 'src/data/providers';
import { useDoctorSharedFunc } from './shared';
import { useSelectDoctor } from 'src/graphql/doctor/useSelectDoctor';

export const SearchSelectDoctorComponent = () => {
    const [_, { toggle }] = useDropdownToggle();
    const { searchTerm, otherFilter } = useSearchSelectState();
    const setState = useSearchSelectAction();

    const searchValue = useDebounce(searchTerm, 500);
    const { data, isLoading } = useGetDoctors({
        take: 50,
        skip: 0,
        where: {
            isActive: { eq: true },
            firstName: { contains: searchValue },
            lastName: { contains: searchValue },
            doctorSpecialty: { eq: otherFilter?.spec }
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
            {data?.doctor_getDoctors?.result?.items ? (
                data?.doctor_getDoctors?.result?.items?.map((d) => {
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
export const SearchSelectDoctor = ({ values, push, remove }) => {
    const { onAdd } = useDoctorSharedFunc(push, values);

    return (
        <SearchSelectInputProvider>
            <SearchSelectSpecialityInput
                title={'Select Doctor'}
                onAdd={onAdd}
                specialities={DoctorSpecialitiesOptions}>
                <SearchSelectDoctorComponent />
            </SearchSelectSpecialityInput>
            <StyledColumn css={{ flex: 1 }}>
                {values?.map((i, index) => (
                    <SelectChips key={index} onClose={() => remove(index)} title={i?.title} />
                ))}
            </StyledColumn>
        </SearchSelectInputProvider>
    );
};

export const SearchSelectMbcDoctorComponent = () => {
    const [_, { toggle }] = useDropdownToggle();
    const { searchTerm, otherFilter } = useSearchSelectState();
    const setState = useSearchSelectAction();

    const searchValue = useDebounce(searchTerm, 500);
    const { data, isLoading } = useSelectDoctor({
        take: 50,
        skip: 0,
        where: {
            doctor: {
                isActive: { eq: true },
                firstName: { contains: searchValue },
                lastName: { contains: searchValue },
                doctorSpecialty: { eq: otherFilter?.spec }
            }
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
            {data?.doctor_getSelectInDoctors?.result?.items ? (
                data?.doctor_getSelectInDoctors?.result?.items?.map((d) => {
                    console.log(d)
                    return (
                        <SearchSelectButton
                            key={d.id}
                            onClick={() => {
                                setState((p) => ({
                                    ...p,
                                    searchTerm: `${d.doctor.firstName} ${d.doctor.lastName}`,
                                    option: `${d.doctor.firstName} ${d.doctor.lastName}`,
                                    value: d.id
                                }));
                                toggle(false);
                                console.log(d)
                            }}
                            css={{ display: 'block' }}>
                            <MText>{`${d.doctor.firstName} ${d.doctor.lastName}`}</MText>
                        </SearchSelectButton>
                    );
                })
            ) : (
                <MText>No Option</MText>
            )}
        </SearchSelectContainer>
    );
};

export const SearchSelectMbcDoctor = ({ values, push, remove }) => {
    const { onAdd } = useDoctorSharedFunc(push, values);

    return (
        <SearchSelectInputProvider>
            <SearchSelectSpecialityInput
                title={'Select Doctor'}
                onAdd={onAdd}
                specialities={DoctorSpecialitiesOptions}>
                <SearchSelectMbcDoctorComponent />
            </SearchSelectSpecialityInput>
            <StyledColumn css={{ flex: 1 }}>
                {values?.map((i, index) => (
                    <SelectChips key={index} onClose={() => remove(index)} title={i?.title} />
                ))}
            </StyledColumn>
        </SearchSelectInputProvider>
    );
};
