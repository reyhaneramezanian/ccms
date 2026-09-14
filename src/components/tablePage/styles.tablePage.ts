import { Box } from '@mui/material';
import { styled } from '@mui/system';
import CardPage from '../cardPage';
import style from '@emotion/styled';

export const TablePageWrapper = styled(CardPage)({
    minHeight: '100%',
    paddingTop: 0
});

export const TablePageHeader = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 22
});

export const TablePageTabWrapper = styled(Box)({});

export const TablePageTableWrapper = styled(Box)({
    border: `1px solid #E8E8E8`,
    borderRadius: 8,
    padding: '24px 0'
});

export const TablePageTableFilterWrapper = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    padding: '0 24px',
    position: 'relative',

    '&>*': {
        '&:not(:first-child)': {
            marginLeft: '24px'
        }
    }
});

export const Searchpage = style.div({
    position: 'relative'
});
export const SearchFilter = style.div({
    position: 'absolute',
    top: '50%',
    right: 20,
    transform: 'translateY(-50%)'
});

export const TablebtnHeader = styled(Box)({
    float: 'right'
});
