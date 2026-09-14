import { useDispatch, useSelector } from 'react-redux';
import * as residentstyle from '../../resident.style';

import TableContainer from 'src/components/table_container';
import { useInitialProps } from '@/components/table_container/useTableProps';

import { PaymentStatus, usePayment_GetChargesQuery, SortEnumType } from 'src/graphql/generated';
import storageKeys from 'src/data/storageKeys';
import { Spacer } from '@/components/base/spacer';

import { ColumnWalletHistory } from '../data';

const Wallet = () => {
    const dispatch = useDispatch();
    const pageData = useSelector(({ pageData }: any) => pageData);
    const { activePage } = pageData;
    const { data: datacharge } = usePayment_GetChargesQuery({
        take: 10,
        skip: (activePage - 1) * 10,
        flatId: Number(localStorage.getItem(storageKeys.activeResidentFlatId)),
        order: { id: SortEnumType.Desc }
    });

    const initialProps = useInitialProps({
        totalCount: datacharge?.payment_getCharges?.result?.totalCount,
        totalRows: 10
    });
    const Rowcharge = datacharge?.payment_getCharges?.result?.items?.map((item) => ({
        createdAt: item?.createdAt.slice(0, 10).replaceAll('-', '/'),
        Status: item?.isVedified,
        amount: item?.amount,
        id: item?.id
    }));
    const props = {
        ...initialProps,
        columns: ColumnWalletHistory,
        rows: Rowcharge,
        adminLayout: true,
        centerItem: true,
        activePage
    };

    return (
        <>
            <residentstyle.profiletabe>
                <TableContainer {...props}></TableContainer>
            </residentstyle.profiletabe>

            <Spacer space={25} />
        </>
    );
};
export default Wallet;
