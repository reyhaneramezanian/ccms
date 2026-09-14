import { MButton } from '@/components/base/MButton';
import styled from '@emotion/styled';
import { useDropdownToggle } from 'react-overlays';
import { SearchSelectButton, SearchSelectContainer, useSearchSelectAction, useSearchSelectState } from './input.searchSelect';
import useDebounce from 'src/hooks/useDebounce';
import { useGetHospitals } from 'src/graphql/hospital/useHospital';
import { MText } from '@/components/base/MText';
import { StyledSpinner } from '@/components/base/loader/spinner';


export const SearchSelectHospital = () => {
    const [_, { toggle }] = useDropdownToggle();
    const { searchTerm } = useSearchSelectState();
    const setState = useSearchSelectAction();
    const searchValue = useDebounce(searchTerm, 500);
    const { data, isLoading } = useGetHospitals({
        take: 50,
        skip: 0,
        where: {
            isActive: { eq: true },
            title: { contains: searchValue }
        }
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
            {data?.hospital_getHospitals?.result?.items ? (
                data?.hospital_getHospitals?.result?.items?.map((d) => {
                    return (
                        <SearchSelectButton
                            onClick={() => {
                                setState({
                                    searchTerm: `${d.title}`,
                                    option: `${d.title}(${d?.city})`,
                                    value: d.id
                                });
                                toggle(false);
                            }}
                            css={{ display: 'block' }}
                            key={d.id}>
                            <MText>{`${d.title}(${d?.city})`}</MText>
                        </SearchSelectButton>
                    );
                })
            ) : (
                <MText>No Option</MText>
            )}
        </SearchSelectContainer>
    );
};
