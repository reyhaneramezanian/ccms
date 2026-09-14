import styled from '@emotion/styled';

export const PaginationContainer = styled.div({
    display: 'flex',
    padding: '0 24px',
    justifyContent: 'right',
    paddingTop: 17
});

export const PaginationPageItem = styled.div(({ active }: { active?: boolean }) => ({
    backgroundColor: active ? '#487A9D' : '',
    color: active ? '#F1E5FC' : '#3B3B3B',
    borderRadius: '8px',
    width: 40,
    height: 40,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    margin: '0 1px',
    fontFamily: 'Poppins',
    fontSize: '15px',
    cursor: active ? '' : 'pointer',
    pointerEvents: active ? 'none' : 'auto',
    '&:hover': {
        backgroundColor: active ? '' : 'rgb(214, 225, 255)',
        transition: '.4s'
    }
}));

export const PaginationArrowContainer = styled.div({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '0 5px',
    cursor: 'pointer',
    color: '#3B3B3B',
    backgroundColor: '#ECF1F5',
    height: 40,
    width: 40,
    borderRadius: '8px',
    margin: '0 3px'
});

export const PaginationDotsContainer = styled.div({
    color: '#8B8B8B',
    padding: '0 3px'
});
