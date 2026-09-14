import TableContainer from 'src/components/table_container';
import { useRouter } from 'next/router';
import { useInitialProps } from '@/components/table_container/useTableProps';
import { setPageData } from 'src/redux/actions/actions';
import { connect } from 'react-redux';
import { Typography } from '@mui/material';
import { StyledTD } from 'src/components/table/table_layout/styled.table.layout';

function TopRow({ pageData, setPageData, rows = [], columns = [],isLoading }) {
    const router = useRouter();

    const initialProps = useInitialProps({
        totalCount: 1
    });

    const props = {
        ...initialProps,
        columns,
        rows,
        TD: TableColumn,
        isLoading
    };

    return <TableContainer {...props} />;
}

const mapStateToProps = ({ pageData }) => ({ pageData });

const mapDispatchToProps = { setPageData };

export default connect(mapStateToProps, mapDispatchToProps)(TopRow);

export function TableColumn({ children, rows, row, column, ...rest }) {
    const router = useRouter();

    return row === undefined ? (
        <StyledTD colSpan={8}>
            <Typography component="span" sx={{ textAlign: 'center' }}>
                No Data
            </Typography>
        </StyledTD>
    ) : (
        <StyledTD style={{ borderBottom: 'none' }} {...rest}>
            {children}
        </StyledTD>
    );
}
