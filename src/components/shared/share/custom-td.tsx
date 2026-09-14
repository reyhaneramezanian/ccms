import React, { useEffect } from 'react';
import { StyledTD } from 'src/components/table/table_layout/styled.table.layout';
import { useRedirectToPage } from 'src/routes';
import { Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useDispatch, useSelector } from 'react-redux';
import { setPageData } from 'src/redux/actions/actions';

export const CustomTD = ({ children, row, column, ...rest }) => {
    const theme = useTheme();
    const isMd = useMediaQuery(theme.breakpoints.down('md'));
    const router = useRouter();
    const pageData = useSelector(({ pageData }: any) => pageData);

    const dispatch = useDispatch();
    // console.log('row')

    // console.log(row)
    const onclick = () => {
        if (column?.id !== 'options') {
            if (pageData.activeTabParent.id === 'Projects') {
                dispatch(setPageData({ ...pageData, Bids: 1, searchdata: '' }));
                router.push({
                    pathname: '/bids',
                    query: { pid: row.options }
                });
            } else {
                dispatch(setPageData({ ...pageData, searchdata: '' }));
                router.push({
                    pathname: '/detail-project',
                    query: { pid: row.options }
                });
            }
        }
    };
    return row === undefined ? (
        <StyledTD colSpan={isMd ? 3 : 8} style={{ textAlign: 'center' }}>
            <Typography component="span" sx={{ textAlign: 'center' }}>
                No Data
            </Typography>
        </StyledTD>
    ) : (
        <StyledTD
            style={{ cursor: 'pointer' }}
            onClick={() => {
                onclick();
            }}
            {...rest}>
            {children}
        </StyledTD>
    );
};
