import styled from '@emotion/styled';

export const Span = styled.span({ color: '#8B8B8B' });

export const OptionsContainer = styled.div({
    display: 'flex',
    justifyContent: 'center',
    '& svg': { cursor: 'pointer' },
    '@media(max-width:950px)': {
        justifyContent: 'flex-end'
    }
});

export const Button = styled.button(
    ({ danger, primary }: { danger?: boolean; primary?: boolean }) => ({
        color: primary ? 'white' : danger ? '#9F0B0B' : '#2B368F',
        border: `1px solid ${danger ? '#9F0B0B' : '#2B368F'}`,
        borderRadius: '4px',
        padding: '0 20px',
        backgroundColor: primary ? '#2B368F' : 'white',
        cursor: 'pointer',
        margin: '0 5px',
        whiteSpace: 'nowrap',
        '@media(max-width:950px)': {
            margin: 0
        }
    })
);
