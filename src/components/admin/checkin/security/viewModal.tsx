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

const securityViewModal: FC<IModalBodyProps<RowTable>> = ({ data: { row } }) => {
    const dispatch = useDispatch();

    const handleCancel = () => {
        dispatch(closeModal(securityViewModal.name));
    };

    return (
        <adminstyle.modalbox style={{ width: 900, maxWidth: '90vw' }}>
            <adminstyle.modalFormRowWrapper>
                <Grid container>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                        <adminstyle.titledetail>First name</adminstyle.titledetail>
                        <adminstyle.textdetail>{row.Firstname}</adminstyle.textdetail>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                        <adminstyle.titledetail>Middle name</adminstyle.titledetail>
                        <adminstyle.textdetail>{row.middleName}</adminstyle.textdetail>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                        <adminstyle.titledetail>Surname</adminstyle.titledetail>
                        <adminstyle.textdetail>{row.Lastname}</adminstyle.textdetail>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                        <adminstyle.titledetail>Gender</adminstyle.titledetail>
                        <adminstyle.textdetail>{row.gender}</adminstyle.textdetail>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                        <adminstyle.titledetail>Date of birth</adminstyle.titledetail>
                        <adminstyle.textdetail>{row.dateOfBirth}</adminstyle.textdetail>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                        <adminstyle.titledetail>Complex </adminstyle.titledetail>
                        <adminstyle.textdetail>{row.Complex}</adminstyle.textdetail>
                    </Grid>

                    <Grid item xs={12} sm={12} md={4} lg={4}>
                        <adminstyle.titledetail>Phone number</adminstyle.titledetail>
                        <adminstyle.textdetail>{row.Phone}</adminstyle.textdetail>
                    </Grid>
                    <Grid item xs={12} sm={12} md={8} lg={8}>
                        <adminstyle.titledetail>Email address</adminstyle.titledetail>
                        <adminstyle.textdetail>{row.Email}</adminstyle.textdetail>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                        <adminstyle.titledetail>Employment type</adminstyle.titledetail>
                        <adminstyle.textdetail>{row.employeeType}</adminstyle.textdetail>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                        <adminstyle.titledetail>Status</adminstyle.titledetail>
                        <adminstyle.textdetail>{row.activeStatustext}</adminstyle.textdetail>
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

const handleShowsecurityViewModal = (row?: RowTable) => {
    return newModal({
        Body: securityViewModal,
        title: 'View security profile',
        topBar: true,
        id: securityViewModal.name,
        data: { row }
    });
};

export default handleShowsecurityViewModal;
