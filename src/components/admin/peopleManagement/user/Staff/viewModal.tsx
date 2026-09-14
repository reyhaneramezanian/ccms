import { FC } from 'react';
import { Checkbox, Box, Button, Grid } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { MInputFormik } from '@/components/base/input/MInput';
import * as adminstyle from '@/components/admin/admin.style';
import { closeModal, newModal } from 'src/redux/actions/actions';
import { IModalBodyProps } from '@/components/shared/modals/types.modals';
import { RowTable } from '@/components/table/table_layout/types.table.layout';
import { useDispatch } from 'react-redux';
import { MSelectFormik } from '@/components/base/input/MSelect';
import Checkicon from 'src/assets/icons/checkicon';
import React, { useEffect, useState } from 'react';

const PeopleViewModal: FC<IModalBodyProps<RowTable>> = ({ data: { row } }) => {
    const dispatch = useDispatch();
    const [complexselect, setcomplexselect] = useState([]);

    useEffect(() => {
        var js = [];
        row?.complexId?.map((item) => {
            js.push(item.complex.name + ' , ');
        });
        setcomplexselect(js);
    }, []);

    const handleCancel = () => {
        dispatch(closeModal(PeopleViewModal.name));
    };

    return (
        <adminstyle.modalbox style={{ width: 700 }}>
            <adminstyle.modalFormRowWrapper>
                <Grid container>
                    <adminstyle.headdetail>
                        <adminstyle.headdetail>
                            <adminstyle.tiltelhead>Personal information</adminstyle.tiltelhead>
                            <adminstyle.hrhead>
                                <hr style={{ backgroundColor: '#E5E7EF' }}></hr>
                            </adminstyle.hrhead>
                        </adminstyle.headdetail>
                    </adminstyle.headdetail>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                        <adminstyle.titledetail>First name</adminstyle.titledetail>
                        <adminstyle.textdetail>{row.firstName}</adminstyle.textdetail>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                        <adminstyle.titledetail>Middle name</adminstyle.titledetail>
                        <adminstyle.textdetail>{row.middleName}</adminstyle.textdetail>
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
                        <adminstyle.titledetail>Date of birth</adminstyle.titledetail>
                        <adminstyle.textdetail>{row.dateOfBirths}</adminstyle.textdetail>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <adminstyle.headdetail>
                            <adminstyle.tiltelhead>Contact information</adminstyle.tiltelhead>
                            <adminstyle.hrhead>
                                <hr style={{ backgroundColor: '#E5E7EF' }}></hr>
                            </adminstyle.hrhead>
                        </adminstyle.headdetail>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                        <adminstyle.titledetail>Primary phone</adminstyle.titledetail>
                        <adminstyle.textdetail>{row.Phone}</adminstyle.textdetail>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                        <adminstyle.titledetail>Alternative phone</adminstyle.titledetail>
                        <adminstyle.textdetail>{row.alternatePhone}</adminstyle.textdetail>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <adminstyle.titledetail>Primary email</adminstyle.titledetail>
                        <adminstyle.textdetail>{row.Email}</adminstyle.textdetail>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <adminstyle.titledetail>Alternative email</adminstyle.titledetail>
                        <adminstyle.textdetail>{row.alternateEmail}</adminstyle.textdetail>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <adminstyle.titledetail>Address</adminstyle.titledetail>
                        <adminstyle.textdetail>{row.address}</adminstyle.textdetail>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <adminstyle.headdetail>
                            <adminstyle.tiltelhead>Property information</adminstyle.tiltelhead>
                            <adminstyle.hrhead>
                                <hr style={{ backgroundColor: '#E5E7EF' }}></hr>
                            </adminstyle.hrhead>
                        </adminstyle.headdetail>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <adminstyle.titledetail>Complex</adminstyle.titledetail>
                        <adminstyle.textdetail>{complexselect}</adminstyle.textdetail>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                        <adminstyle.titledetail>Department</adminstyle.titledetail>
                        <adminstyle.textdetail>{row.Department}</adminstyle.textdetail>
                    </Grid>

                    <Grid item xs={12} sm={12} md={4} lg={4}>
                        <adminstyle.titledetail>Employment type</adminstyle.titledetail>
                        <adminstyle.textdetail>{row.employeeType}</adminstyle.textdetail>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                        <adminstyle.titledetail>Date of joining</adminstyle.titledetail>
                        <adminstyle.textdetail>{row.dateOfJoinings}</adminstyle.textdetail>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                        <adminstyle.titledetail>Date of termination</adminstyle.titledetail>
                        <adminstyle.textdetail>{row.dateOfTerminations}</adminstyle.textdetail>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                        <adminstyle.titledetail>Status</adminstyle.titledetail>
                        <adminstyle.textdetail>{row.activeStatuses}</adminstyle.textdetail>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                        <adminstyle.titledetail>Head of department</adminstyle.titledetail>
                        <Checkbox
                            checked={row.head}
                            disabled
                            defaultChecked
                            checkedIcon={<Checkicon />}
                        />
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
        title: 'View staff',
        topBar: true,
        id: PeopleViewModal.name,
        data: { row }
    });
};

export default handleShowPeopleViewModal;
