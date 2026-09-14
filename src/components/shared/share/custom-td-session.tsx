import React from 'react';
import { StyledTD } from 'src/components/table/table_layout/styled.table.layout';
import { useRedirectToPage } from 'src/routes';
import { Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { setPageData } from 'src/redux/actions/actions';
import { connect, useDispatch } from 'react-redux';

const CustomTDSession = ({ children, row, column,pageData, ...rest }) => {
    const { tabCurrent } = row;
    const dispatch = useDispatch()
    const theme = useTheme();
    const isMd = useMediaQuery(theme.breakpoints.down('md'));
    const router = useRouter();

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
                 tabCurrent === 'true' ? dispatch(setPageData({...pageData,sessionItem:'current'})) : tabCurrent === 'false' ?  dispatch(setPageData({...pageData,sessionItem:'close'})) : null
            }}
            {...rest}
        >
            {children}
        </StyledTD>
    );
};


const mapStateToProps = ({ pageData }) => ({ pageData });

const mapDispatchToProps = { setPageData };

export default connect(mapStateToProps, mapDispatchToProps)(CustomTDSession);
