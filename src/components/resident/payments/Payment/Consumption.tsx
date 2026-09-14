import TablePage from '@/components/tablePage';
import { useDispatch, useSelector } from 'react-redux';
import useManageTab from 'src/hooks/useManageTab';
import { useEffect, useState } from 'react';
import { RowTable } from '@/components/table/table_layout/types.table.layout';
import useManageTabsQueries from 'src/hooks/useManageTabsQueries';
import useActivePage from 'src/hooks/useActivePage';
import * as residentstyle from '../../resident.style';
import { LoadingButton } from '@mui/lab';
import {
    Checkbox,
    InputAdornment,
    FormControlLabel,
    Box,
    FormGroup,
    Radio,
    RadioGroup,
    Select,
    Grid,
    Typography,
    MenuItem,
    ListItemText,
    SelectChangeEvent
} from '@mui/material';
import Checkicon from 'src/assets/icons/checkicon';
import Tabs from '@/components/tabs/tabs';
import { setPageData } from 'src/redux/actions/actions';

import TableContainer from 'src/components/table_container';
import { useInitialProps } from '@/components/table_container/useTableProps';

import { CheckoutProvider, Checkout, injectCheckout } from 'paytm-blink-checkout-react';
import {
    usePayment_InitiateChargeWalletMutation,
    usePayment_GetPaymentBillsQuery,
    usePayment_GetPaymentMiscellaneousMaintenancesQuery,
    useAdminMaintenanceTypeGetQuery,
    PaymentStatus,
    useAdminUtilityRateGetQuery,
    useResidentUserGetQuery,
    RequestEnvironment,
    SortEnumType
} from 'src/graphql/generated';
import storageKeys from 'src/data/storageKeys';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';
import { Spacer } from '@/components/base/spacer';
import Radioiconchecked from 'src/assets/icons/radiocheked';
import Radioicon from 'src/assets/icons/radio';
import AddButton from '@/components/addButton';
import AddModalacount from '../../payment/addModal.acount';
import { closeModal, newModal } from 'src/redux/actions/actions';
import Utils from '@/utils/utils';
import SearchIcon from 'src/assets/icons/search-icon';
import Down from 'src/assets/icons/Down';
import { useRouter } from 'next/router';
import { ColumnPayments, ColumnPaymentsMaintenances } from '../data';
const monthsearch = [
    {
        name: 'JAN',
        id: 1
    },
    {
        name: 'FEB',
        id: 2
    },
    {
        name: 'MAR',
        id: 3
    },
    {
        name: 'APR',
        id: 4
    },
    {
        name: 'MAY',
        id: 5
    },
    {
        name: 'JUN',
        id: 6
    },
    {
        name: 'JUL',
        id: 7
    },
    {
        name: 'AUG',
        id: 8
    },
    {
        name: 'SEP',
        id: 9
    },
    {
        name: 'OCT',
        id: 10
    },
    {
        name: 'NOV',
        id: 11
    },
    {
        name: 'DEC',
        id: 12
    }
];
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: 48 * 4.5 + 8,
            width: 'auto'
        }
    }
};
const Complaint = () => {
    const router = useRouter();
    const customRadio = (
        <Radio
            style={{ margin: '10px', fontFamily: 'Poppins', fontSize: '12' }}
            disableRipple
            checkedIcon={<Radioiconchecked />}
            icon={<Radioicon />}
        />
    );
    const dispatch = useDispatch();
    const pageData = useSelector(({ pageData }: any) => pageData);
    const { activePage } = pageData;
    const [Curent, setCurent] = useState('Utility');
    const [activemonth, setactivemonth] = useState('');
    const [selectName, setSelectName] = useState([]);
    const [list, setlist] = useState([]);
    const [Rowutility, setRowutility] = useState([]);
    const [RowMaintenances, setRowMaintenances] = useState([]);
    const [MaintenanceType, setMaintenanceType] = useState([]);
    const { mutate, isLoading } = usePayment_InitiateChargeWalletMutation();
    const mutationErrorHandler = useMutationErrorHandler();
    const [paymentconfig, setpaymentconfig] = useState({});
    const [payitems, setpayitems] = useState([]);
    const [credit, setcredit] = useState([]);
    const [amount, setamount] = useState();
    const residentUser = useResidentUserGetQuery();
    const { data: dataUtility } = useAdminUtilityRateGetQuery();

    const { data: dataMaintenanceType } = useAdminMaintenanceTypeGetQuery();
    const { data: datapaymentMaintenances } = usePayment_GetPaymentMiscellaneousMaintenancesQuery({
        take: 10,
        skip: (activePage - 1) * 10,
        where:
            list.length != 0
                ? list
                : {
                      flatId: {
                          eq: Number(localStorage.getItem(storageKeys.activeResidentFlatId))
                      },
                      paymentStatus: { eq: PaymentStatus.Unpaid }
                  },
        order: { id: SortEnumType.Desc }
    });

    const { data: datapayment } = usePayment_GetPaymentBillsQuery({
        take: 10,
        skip: (activePage - 1) * 10,
        where:
            list.length != 0
                ? list
                : {
                      flatId: {
                          eq: Number(localStorage.getItem(storageKeys.activeResidentFlatId))
                      },
                      paymentStatus: { eq: PaymentStatus.Unpaid }
                  },
        order: { id: SortEnumType.Desc }
    });

    useEffect(() => {
        //dispatch(setPageData({ ...pageData, searchdata: '' }));
        if (Curent !== 'Utility') {
            var RowMaintenanceType =
                dataMaintenanceType?.maintenanceType_getMaintenanceTypes?.result?.items?.map(
                    (item) => ({
                        Check: false,
                        name: item?.name,
                        id: item?.id
                    })
                );

            setMaintenanceType(RowMaintenanceType);
        } else {
            var utility = dataUtility?.utilityRate_getUtilityRates?.result?.items?.map((item) => ({
                Check: false,
                name: Utils.convertoLowerCase(item?.utilityType),
                id: item?.utilityType
            }));
            setMaintenanceType(utility);
        }
    }, [dataMaintenanceType, dataUtility, Curent]);
    useEffect(() => {
        var Rowresidentoxners = datapayment?.payment_getPaymentBills?.result?.items?.map(
            (item) => ({
                Check: false,
                Month: new Date(item.dueDate).toString().slice(4, 7),
                Duedate: item?.dueDate.slice(0, 10).replaceAll('-', '/'),
                Previous: item?.previousMonthReading,
                Current: item?.currentMonthReading,
                Consumed: item?.consumed,
                Rate: item?.utilityRate,
                Status: item?.paymentStatus,
                Amount: item?.amount,
                paymentType: Utils.convertoLowerCase(item.utilityType),
                id: item?.id
            })
        );
        var RowMaintenances =
            datapaymentMaintenances?.payment_getPaymentMiscellaneousMaintenances?.result?.items?.map(
                (item) => ({
                    Check: false,
                    Month: new Date(item.dueDate).toString().slice(4, 7),
                    Duedate: item?.dueDate.slice(0, 10).replaceAll('-', '/'),
                    maintenanceType: item?.maintenanceType.name,
                    Status: item?.paymentStatus,
                    Amount: item?.amount,
                    id: item?.id
                })
            );
        setRowutility(Rowresidentoxners);
        setRowMaintenances(RowMaintenances);
    }, [datapayment, datapaymentMaintenances, pageData.activeTab]);

    const initialProps = useInitialProps({
        totalCount:
            Curent === 'Utility'
                ? datapayment?.payment_getPaymentBills?.result?.totalCount
                : datapaymentMaintenances?.payment_getPaymentMiscellaneousMaintenances?.result
                      ?.totalCount,
        totalRows: 10
    });

    const props = {
        ...initialProps,
        columns: Curent === 'Utility' ? ColumnPayments : ColumnPaymentsMaintenances,

        rows: Curent === 'Utility' ? Rowutility : RowMaintenances,
        adminLayout: true,
        centerItem: true,
        activePage
    };
    const onchangecheckbox = (e, id) => {
        var js = [];
        MaintenanceType?.forEach((item) => {
            if (item.id === id) {
                js.push({
                    Check: !item?.Check,
                    name: item?.name,
                    id: item?.id
                });
            } else {
                js.push(item);
            }
        });
        setMaintenanceType(js);
        query(js, activemonth, pageData.activeTab.label);
    };
    const onchangeradio = (e) => {
        if (e.target.defaultValue === 'Miscellaneous') {
            setCurent('Miscellaneous');
        } else setCurent('Utility');
    };

    const onchangemonth = (value) => {
        setactivemonth(value);

        if (Curent === 'Utility') query(MaintenanceType, value, pageData.activeTab.label);
        else query(selectName, value, pageData.activeTab.label);
    };
    const rowchecked = (row, checked) => {
        var js = [],
            listdelete = [];
        if (Curent === 'Utility') {
            Rowutility?.forEach((item) => {
                if (item.id === row.id) {
                    js.push({
                        Check: checked ? false : true,
                        Month: item?.Month,
                        Duedate: item?.Duedate,
                        Previous: item?.Previous,
                        Current: item?.Current,
                        Consumed: item?.Consumed,
                        Rate: item?.Rate,
                        Status: item?.paymentStatus,
                        Amount: item?.Amount,
                        paymentType: item?.paymentType,
                        id: item?.id
                    });
                    if (!checked) listdelete.push(item?.id);
                } else {
                    js.push(item);
                    if (item?.Check == true) listdelete.push(item?.id);
                }
            });
            setpayitems(listdelete);
            setRowutility(js);
        } else {
            RowMaintenances?.forEach((item) => {
                if (item.id === row.id) {
                    js.push({
                        Check: checked ? false : true,
                        Month: item?.Month,
                        maintenanceType: item?.maintenanceType,
                        Status: item?.Status,
                        Amount: item?.Amount,
                        Duedate: item?.Duedate,
                        id: item?.id
                    });
                    if (!checked) listdelete.push(item?.id);
                } else {
                    js.push(item);
                    if (item?.Check == true) listdelete.push(item?.id);
                }
            });
            setpayitems(listdelete);
            setRowMaintenances(js);
        }
    };
    const rowcheck = (checked) => {
        var js = [],
            listdelete = [];
        if (Curent === 'Utility') {
            Rowutility?.forEach((item) => {
                js.push({
                    Check: checked ? false : true,
                    Month: item?.Month,
                    Duedate: item?.Duedate,
                    Previous: item?.Previous,
                    Current: item?.Current,
                    Consumed: item?.Consumed,
                    Rate: item?.Rate,
                    Status: item?.paymentStatus,
                    Amount: item?.Amount,
                    paymentType: item?.paymentType,
                    id: item?.id
                });
                if (!checked) {
                    listdelete.push(item?.id);
                }
            });
            setpayitems(listdelete);
            setRowutility(js);
        } else {
            RowMaintenances?.forEach((item) => {
                js.push({
                    Check: checked ? false : true,
                    Month: item?.Month,
                    maintenanceType: item?.maintenanceType,
                    Status: item?.Status,
                    Amount: item?.Amount,
                    Duedate: item?.Duedate,
                    id: item?.id
                });
                if (!checked) {
                    listdelete.push(item?.id);
                }
            });
            setpayitems(listdelete);
            setRowMaintenances(js);
        }
    };
    const onClickAddButton = () => {
        var js = [];
        if (Curent === 'Utility') {
            Rowutility?.forEach((item) => {
                if (item.Check === true) js.push(item);
            });
        } else {
            RowMaintenances?.forEach((item) => {
                if (item.Check === true) js.push(item);
            });
        }
        dispatch(
            newModal({
                closeButton: true,
                Body: AddModalacount,
                title: 'Make a payment',
                topBar: true,
                id: '1',
                data: [js, Curent]
            })
        );
    };
    const handleChange = (event: SelectChangeEvent<typeof selectName>) => {
        var js = selectName;
        js.push(event.target.name);

        const {
            target: { value }
        } = event;

        setSelectName(typeof value === 'string' ? value.split(',') : value);
        query(event.target.value, activemonth, pageData.activeTab.label);
    };
    const query = (js, month, tab) => {
        let datestart = new Date().getFullYear() + '-' + month + '-01';
        let dateend = new Date().getFullYear() + '-' + month + '-30';

        let array = [];
        let array2 = [];
        if (Curent === 'Utility') {
            js?.map((item, index) => {
                if (item?.Check) {
                    array.push({
                        utilityType: { eq: item?.id as any }
                    });
                }
            });
        } else {
            js.forEach((v, i) => {
                MaintenanceType?.forEach((item) => {
                    if (item.name === v)
                        array.push({
                            maintenanceType: { id: { eq: item?.id } }
                        });
                });
            });
        }

        if (activemonth != '')
            array2.push({
                flatId: {
                    eq: Number(localStorage.getItem(storageKeys.activeResidentFlatId))
                },
                paymentStatus: { eq: PaymentStatus.Unpaid },
                dueDate: { gte: datestart, lte: dateend }
            });
        else
            array2.push({
                flatId: {
                    eq: Number(localStorage.getItem(storageKeys.activeResidentFlatId))
                },
                paymentStatus: { eq: PaymentStatus.Unpaid }
            });

        if (array.length) {
            setlist({ or: array, and: array2 });
        } else if (array2.length) {
            setlist({ and: array2 });
        }
    };

    return (
        <>
            <residentstyle.profiletabe>
                <residentstyle.modalFormRowFieldWrapper>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group">
                        <FormControlLabel
                            onChange={onchangeradio}
                            checked={Curent == 'Utility' ? true : false}
                            value="Utility"
                            control={customRadio}
                            label="Utility"
                        />
                        <FormControlLabel
                            onChange={onchangeradio}
                            checked={Curent == 'Miscellaneous' ? true : false}
                            value="Miscellaneous"
                            control={customRadio}
                            label="Miscellaneous maintenance"
                        />
                    </RadioGroup>
                </residentstyle.modalFormRowFieldWrapper>
            </residentstyle.profiletabe>

            <residentstyle.rowpage>
                {Curent === 'Utility' ? (
                    MaintenanceType?.map((item) => (
                        <residentstyle.cellcheckbox>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        onChange={(e) => onchangecheckbox(e, item.id)}
                                        checkedIcon={<Checkicon />}
                                        defaultChecked={item.Check}
                                    />
                                }
                                label={item.name}
                            />
                        </residentstyle.cellcheckbox>
                    ))
                ) : (
                    <Select
                        style={{
                            height: '48px !important',
                            marginTop: '-5px',
                            width: '400px',
                            backgroundColor: '#f2f3f7',
                            borderRadius: '6px'
                        }}
                        id="demo-multiple-checkbox"
                        multiple
                        value={selectName}
                        onChange={handleChange}
                        IconComponent={() => <Down />}
                        renderValue={(selected) => selected.join(', ')}
                        MenuProps={MenuProps}>
                        {MaintenanceType?.length > 0 ? (
                            MaintenanceType?.map((o, i) => (
                                <MenuItem key={`${i}-${o.name}`} value={o.name}>
                                    <Checkbox checked={selectName.indexOf(o.name) > -1} />
                                    <ListItemText primary={o.name} />
                                </MenuItem>
                            ))
                        ) : (
                            <Typography style={{ padding: '10px 15px' }}>{'no option'}</Typography>
                        )}
                    </Select>
                )}
            </residentstyle.rowpage>

            <>
                <residentstyle.rowpage>
                    <residentstyle.Title>Choose a month</residentstyle.Title>
                </residentstyle.rowpage>
                <residentstyle.rowpage>
                    <residentstyle.Textall>
                        Current month is shown by a circle. If you want to see other month select
                        them.
                    </residentstyle.Textall>
                </residentstyle.rowpage>
                <residentstyle.rowpage>
                    <residentstyle.boxmonth>
                        {monthsearch?.map((item) => (
                            <residentstyle.cellpage>
                                <residentstyle.cellmonth
                                    onClick={() => onchangemonth(item.id)}
                                    isActive={activemonth === item.id}>
                                    {item.name}
                                </residentstyle.cellmonth>
                            </residentstyle.cellpage>
                        ))}
                    </residentstyle.boxmonth>
                </residentstyle.rowpage>
            </>

            <residentstyle.rowpage>
                <residentstyle.CustomInputSearch
                    placeholder="Search"
                    id="standard"
                    variant="outlined"
                    value={pageData?.searchdata}
                    onChange={(e) =>
                        dispatch(
                            setPageData({
                                ...pageData,
                                searchdata: e.target.value,
                                activePage: 1
                            })
                        )
                    }
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                        style: {
                            height: '45px',
                            width: '100%',
                            borderRadius: '6px',
                            textAlign: 'center',
                            backgroundColor: '#f2f3f7'
                        }
                    }}
                />
            </residentstyle.rowpage>

            <residentstyle.profiletabe>
                <TableContainer
                    {...props}
                    onChangeCheckedItems={async (columnId, isCheckedItems, RowMaintenances) => {
                        rowcheck(isCheckedItems);
                    }}
                    onChangeCheckedItem={async (columnId, isCheckedItems, row) => {
                        rowchecked(row, isCheckedItems);
                    }}></TableContainer>
            </residentstyle.profiletabe>

            <Spacer space={25} />

            <residentstyle.rowpage>
                <AddButton onClick={onClickAddButton} style={{ margin: '23px 0 ', float: 'right' }}>
                    Pay now
                </AddButton>
            </residentstyle.rowpage>
        </>
    );
};
export default Complaint;
