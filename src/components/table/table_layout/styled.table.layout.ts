import styled from '@emotion/styled';
import { SButtonContained } from '@/components/base/MButton/styled';

export const StyledTable = styled.table({
    borderSpacing: 'unset',
    width: '100%',

    '@media(max-width:900px)': {
        display: 'block',
        width: '100%'
    }
});

export const StyledTBody = styled.tbody({
    '@media(max-width:900px)': {
        display: 'block',
        width: '100%'
    }
});

export const StyledTHead = styled.thead({
    '@media(max-width:900px)': {
        display: 'block',
        width: '100%'
    }
});

export const StyledSearchTR = styled.tr({
    '@media(max-width:900px)': {
        display: 'block',
        width: '100%',
        padding: '5px 10px'
    }
});

export const StyledHeadTR = styled.tr({
    '@media(max-width:950px)': {
        display: 'none'
    }
});

export const StyledBodyTR = styled.tr({
    height: 72,

    '@media(max-width:950px)': {
        display: 'block',
        width: '100%',
        minWidth: '300px',
        height: 'unset',
        borderRadius: '10px',
        marginBottom: 10
    },
    '@media(max-width:500px)': {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
        minWidth: '200px',
        height: 'unset',
        borderRadius: '10px',
        marginBottom: 10
    }
});

export const StyledTH = styled.th({
    color: '#230833',
    fontSize: '16px',
    fontWeight: 500,
    padding: '15px 10px',
    minWidth: '50px',
    textAlign: 'left',
    '@media(max-width:1400px)': {
        fontSize: '14px'
    },
    '@media(max-width:1300px)': {
        padding: '15px 5px'
    },
    '@media(max-width:1150px)': {
        fontSize: '13px'
    },
    '@media(max-width:950px)': {
        padding: '5px',
        display: 'block',
        width: '100%',
        "&[data-hidden='true']": {
            display: 'none'
        }
    },
    '&[data-hidden]': {
        padding: '5px'
    }
});

export const StyledTD = styled.td({
    textAlign: 'left',
    fontSize: '14px',
    backgroundColor: '#FFFFFF',
    padding: '0 10px',
    color: '#230833',
    '&tr :nth-child(even)': {
        backgroundColor: '#F2F3F7'
    },
    /**
     * The emotion has issue with :first-child pseudo class in ssr and may break the css.
     * Complete log :
     * ((The pseudo class ":first-child" is potentially unsafe when doing server-side rendering.
     * Try changing it to ":first-of-type".))
     */
    '&:first-of-type': {
        borderRadius: '10px 0 0 10px',
        paddingTop: '5px'
    },
    '&:last-child': {
        borderRadius: '0 10px 10px 0',
        paddingBottom: '5px'
    },
    '&:only-child': {
        borderRadius: '0'
    },
    '@media(max-width:950px)': {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-end',
        width: '100%',
        minHeight: '23px',
        textAlign: 'right',
        position: 'relative',
        paddingTop: 10,
        '&:before': {
            content: 'attr(data-label)',
            position: 'absolute',
            left: 10,
            fontWeight: 600
        },
        '&:first-of-type': {
            borderRadius: '10px 10px 0 0'
        },
        '&:last-child': {
            borderRadius: '0 0 10px 10px'
        },
        '&:only-child': {
            borderRadius: '10px'
        }
    }
});

export const TableRowSpacer = styled.tr({ height: '10px' });

export const TableButtonSearchHead = styled(SButtonContained)({
    border: '2px solid #35094F',
    backgroundColor: '#2B368F79',
    color: '#FFFFFF',
    whiteSpace: 'nowrap'
});

export const TableSortIconsContainer = styled.div({
    display: 'grid',
    rowGap: '2px',
    marginLeft: '5px',
    '& svg': {
        cursor: 'pointer'
    }
});

export const TableSearchInputContainer = styled.div({
    display: 'flex',
    backgroundColor: '#FFFFFF',
    height: '28px',
    padding: '0 10px',
    border: '2px solid #8B8B8B',
    //borderRadius: '4px',
    alignContent: 'center',
    alignItems: 'center'
});

export const TableSearchInputField = styled.input({
    flex: '1',
    minWidth: '100px',
    outline: 'none',
    border: 'none',
    backgroundColor: 'inherit',
    textAlign: 'center'
});

export const RotateArrow = styled.div({
    transform: 'rotate(90deg)'
});
