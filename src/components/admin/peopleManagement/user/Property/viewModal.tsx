import { FC } from 'react';
import { Typography, Box, Button, Grid } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { MInputFormik } from '@/components/base/input/MInput';
import * as adminstyle from '@/components/admin/admin.style';
import { closeModal, newModal } from 'src/redux/actions/actions';
import { IModalBodyProps } from '@/components/shared/modals/types.modals';
import { RowTable } from '@/components/table/table_layout/types.table.layout';
import { useDispatch } from 'react-redux';
import { MSelectFormik } from '@/components/base/input/MSelect';

const PeopleViewModal: FC<IModalBodyProps<RowTable>> = ({ data: { row } }) => {
    debugger;
    const dispatch = useDispatch();

    const handleCancel = () => {
        dispatch(closeModal(PeopleViewModal.name));
    };

    return (
        <adminstyle.modalbox style={{ width: 700 }}>
            <adminstyle.modalFormRowWrapper>
                <Grid container>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <adminstyle.headdetail>
                            <adminstyle.tiltelhead>Personal information</adminstyle.tiltelhead>
                            <adminstyle.hrhead>
                                <hr style={{ backgroundColor: '#E5E7EF' }}></hr>
                            </adminstyle.hrhead>
                        </adminstyle.headdetail>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                        <adminstyle.titledetail>First name</adminstyle.titledetail>
                        <adminstyle.textdetail>{row.firstName}</adminstyle.textdetail>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                        <adminstyle.titledetail>Middle name</adminstyle.titledetail>
                        <adminstyle.textdetail>{row.Middlename}</adminstyle.textdetail>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                        <adminstyle.titledetail>Surname</adminstyle.titledetail>
                        <adminstyle.textdetail>{row.lastName}</adminstyle.textdetail>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                        <adminstyle.titledetail>Gender</adminstyle.titledetail>
                        <adminstyle.textdetail>{row.gendertext}</adminstyle.textdetail>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                        <adminstyle.titledetail>Phone number</adminstyle.titledetail>
                        <adminstyle.textdetail>{row.Phone}</adminstyle.textdetail>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <adminstyle.titledetail>Email address</adminstyle.titledetail>
                        <adminstyle.textdetail>{row.Email}</adminstyle.textdetail>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <adminstyle.titledetail>Primary contact</adminstyle.titledetail>
                        <adminstyle.textdetail>{row.primaryContact}</adminstyle.textdetail>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <adminstyle.headdetail>
                            <adminstyle.tiltelhead>Property information</adminstyle.tiltelhead>
                            <adminstyle.hrhead>
                                <hr style={{ backgroundColor: '#E5E7EF' }}></hr>
                            </adminstyle.hrhead>
                        </adminstyle.headdetail>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                        <adminstyle.titledetail>Complex </adminstyle.titledetail>
                        <adminstyle.textdetail>{row.complex}</adminstyle.textdetail>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                        <adminstyle.titledetail>Block </adminstyle.titledetail>
                        <adminstyle.textdetail>{row.block}</adminstyle.textdetail>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                        <adminstyle.titledetail>Floor </adminstyle.titledetail>
                        <adminstyle.textdetail>{row.floor}</adminstyle.textdetail>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                        <adminstyle.titledetail>Flat </adminstyle.titledetail>
                        <adminstyle.textdetail>{row.flat}</adminstyle.textdetail>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                        <adminstyle.titledetail>Ownership</adminstyle.titledetail>
                        <adminstyle.textdetail>{row.Owerships}</adminstyle.textdetail>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                        <adminstyle.titledetail>Status</adminstyle.titledetail>
                        <adminstyle.textdetail>{row.activeStatuses}</adminstyle.textdetail>
                    </Grid>
                </Grid>
            </adminstyle.modalFormRowWrapper>
            <adminstyle.modalButtonGroup>
                <Box>
                    <Button variant="contained" color="primary" onClick={handleCancel}>
                        ok
                    </Button>
                </Box>
            </adminstyle.modalButtonGroup>
        </adminstyle.modalbox>
    );
};

const handleShowPeopleViewModal = (row?: RowTable) => {
    return newModal({
        Body: PeopleViewModal,
        title: 'View resident',
        topBar: true,
        id: PeopleViewModal.name,
        data: { row }
    });
};

export default handleShowPeopleViewModal;
