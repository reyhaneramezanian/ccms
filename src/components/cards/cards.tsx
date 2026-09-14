import Card from './card';
import styled from '@emotion/styled';
import Pagination from '@/components/table/pagination/pagination';

const CardsContainer = styled.div({
    display: 'flex',
    gap: '30px',
    flexWrap: 'wrap',
    maxWidth: '1300px',
    margin: '0 auto'
});

export default function Cards({ data = [] }) {
    return (
        <CardsContainer>
            {data.map((item, index) => (
                <Card key={index} {...item} />
            ))}
            <div style={{ margin: '0 auto' }}>
                <Pagination activePage={1} totalPages={30} />
            </div>
        </CardsContainer>
    );
}
