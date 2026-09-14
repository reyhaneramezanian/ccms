import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import * as residentstyle from '../../resident.style';
import { Box, Button, Typography, Modal } from '@mui/material';
import { setPageData } from 'src/redux/actions/actions';
import { tabs, EresidentTabsKey, ColumnAuthorized } from '../data';
import TableContainer from 'src/components/table_container';
import { useInitialProps } from '@/components/table_container/useTableProps';
import AddButton from '@/components/addButton';
import { useUser_GetAuthorizedUsersQuery, SortEnumType } from 'src/graphql/generated';
import { connect } from 'react-redux';
import AuthorizedEditModal from './editModal';
import AuthorizedDeleteModal from './deleteModal';
import Authorized from './addModal';
import { getFullImageUrl } from '@/utils/helper/ui';

import { useGetUser } from 'src/auth/UserProvider';
import Utils from '@/utils/utils';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#fff',
    borderRadius: '7px !important',
    border: '0px solid #fff !important',
    p: 2
};

const Profileresident = ({ pageData, setPageData }) => {
    const dispatch = useDispatch();

    const user = useGetUser();
    const [Rowresidentoxners, setRowresidentoxners] = useState([]);
    const [deleteitems, setdeleteitems] = useState([]);

    const { data: dataAuthorize } = useUser_GetAuthorizedUsersQuery({
        where: { accountDeleted: { eq: false } },
        order: { id: SortEnumType.Desc }
    });

    useEffect(() => {
        var js = [];
        dataAuthorize?.user_getAuthorizedUsers?.result?.items?.forEach((item) => {
            js.push({
                Check: false,
                photoUrl:
                    item?.photoUrl == null ? '/images/men.png' : getFullImageUrl(item?.photoUrl),
                name: item?.firstName + ' ' + item?.lastName,
                Phone: item?.phoneNumber,
                email: item?.email,
                Relation: Utils.convertoLowerCase(item?.relation),
                firstName: item?.firstName,
                lastName: item?.lastName,
                activeStatus: [
                    item?.activeStatus,
                    item?.id,
                    item?.firstName,
                    item?.lastName,
                    item?.email,
                    item?.phoneNumber,
                    item?.relation,
                    item?.residentFlatId,
                    item?.gender,
                    item?.dateOfBirth,
                    item?.photoUrl
                ],
                id: item?.id,
                gender: item.gender,
                dateOfBirth: item?.dateOfBirth,
                relation: item?.relation
            });
        });
        setRowresidentoxners(js);
    }, [dataAuthorize]);

    const initialProps = useInitialProps({
        totalCount: dataAuthorize?.user_getAuthorizedUsers?.result?.totalCount,
        totalRows: 10
    });

    const rowcheck = (checked) => {
        var js = [],
            listdelete = [];
        Rowresidentoxners?.forEach((item) => {
            js.push({
                Check: checked ? false : true,
                photoUrl: item?.photoUrl,
                name: item?.name,
                Phone: item?.Phone,
                email: item?.email,
                Relation: item?.Relation,
                firstName: item?.firstName,
                lastName: item?.lastName,
                activeStatus: item?.activeStatus,
                id: item?.id,
                gender: item.gender,
                dateOfBirth: item?.dateOfBirth,
                relation: item?.relation
            });
            if (!checked) {
                listdelete.push(item?.id);
            }
        });
        setdeleteitems(listdelete);
        setRowresidentoxners(js);
    };
    const rowchecked = (row, checked) => {
        var js = [],
            listdelete = [];
        Rowresidentoxners?.forEach((item) => {
            if (item.id === row.id) {
                js.push({
                    Check: checked ? false : true,
                    photoUrl: item?.photoUrl,
                    name: item?.name,
                    Phone: item?.Phone,
                    email: item?.email,
                    Relation: item?.Relation,
                    firstName: item?.firstName,
                    lastName: item?.lastName,
                    activeStatus: item?.activeStatus,
                    id: item?.id,
                    gender: item.gender,
                    dateOfBirth: item?.dateOfBirth,
                    relation: item?.relation
                });
                if (!checked) listdelete.push(item?.id);
            } else {
                js.push(item);
                if (item?.Check == true) listdelete.push(item?.id);
            }
        });
        setdeleteitems(listdelete);
        setRowresidentoxners(js);
    };
    const handleDelete = () => {
        dispatch(AuthorizedDeleteModal(deleteitems, deleteitems));
        setdeleteitems([]);
    };

    const props = {
        ...initialProps,
        columns: ColumnAuthorized,
        rows: Rowresidentoxners,
        adminLayout: true,
        centerItem: true
    };
    const onclickAuthorized = () => {
        dispatch(Authorized());
    };
    return (
        <residentstyle.modalFormRowWrapper>
            <AddButton onClick={onclickAuthorized}>Add users</AddButton>
            <residentstyle.rowprofile>
                <residentstyle.profiletabe>
                    {deleteitems.length > 0 ? (
                        <Button variant="contained" color="danger" onClick={handleDelete}>
                            Delete
                        </Button>
                    ) : (
                        ''
                    )}
                    <TableContainer
                        {...props}
                        onChangeCheckedItems={async (
                            columnId,
                            isCheckedItems,
                            Rowresidentoxners
                        ) => {
                            rowcheck(isCheckedItems);
                        }}
                        onChangeCheckedItem={async (columnId, isCheckedItems, row) => {
                            rowchecked(row, isCheckedItems);
                        }}
                        onDeleteItem={(row) => {
                            dispatch(AuthorizedDeleteModal([row.id], [row.id]));
                        }}
                        onEditItem={(row) => {
                            dispatch(AuthorizedEditModal(row, row));
                        }}></TableContainer>
                </residentstyle.profiletabe>
            </residentstyle.rowprofile>
        </residentstyle.modalFormRowWrapper>
    );
};

const mapStateToProps = ({ pageData }) => ({ pageData });

const mapDispatchToProps = { setPageData };

export default connect(mapStateToProps, mapDispatchToProps)(Profileresident);
