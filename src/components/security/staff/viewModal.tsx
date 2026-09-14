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

const staffViewModal: FC<IModalBodyProps<RowTable>> = ({ data: { row } }) => {
    const dispatch = useDispatch();

    const handleCancel = () => {
        dispatch(closeModal(staffViewModal.name));
    };

    return (
        <adminstyle.modalbox style={{ width: 700 }}>
            <adminstyle.modalFormRowWrapper>
                <Grid container>
                    <adminstyle.headdetail> Personal information</adminstyle.headdetail>
                    <Grid item xs={12} sm={12} md={3} lg={3}>
                        <adminstyle.titledetail>First name</adminstyle.titledetail>
                        <adminstyle.textdetail>{row.firstName}</adminstyle.textdetail>
                    </Grid>
                    <Grid item xs={12} sm={12} md={3} lg={3}>
                        <adminstyle.titledetail>Surname</adminstyle.titledetail>
                        <adminstyle.textdetail>{row.lastName}</adminstyle.textdetail>
                    </Grid>
                    <Grid item xs={12} sm={12} md={3} lg={3}>
                        <adminstyle.titledetail>MiddleName</adminstyle.titledetail>
                        <adminstyle.textdetail>{row.middleName}</adminstyle.textdetail>
                    </Grid>
                    <Grid item xs={12} sm={12} md={3} lg={3}>
                        <adminstyle.titledetail>Gender</adminstyle.titledetail>
                        <adminstyle.textdetail>{row.gender}</adminstyle.textdetail>
                    </Grid>
                    <Grid item xs={12} sm={12} md={3} lg={3}>
                        <adminstyle.titledetail>Date of birth</adminstyle.titledetail>
                        <adminstyle.textdetail>{row.dateOfBirth}</adminstyle.textdetail>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <adminstyle.headdetail> Contact information</adminstyle.headdetail>
                    </Grid>
                    <Grid item xs={12} sm={12} md={3} lg={3}>
                        <adminstyle.titledetail>Primary phone</adminstyle.titledetail>
                        <adminstyle.textdetail>{row.Phone}</adminstyle.textdetail>
                    </Grid>
                    <Grid item xs={12} sm={12} md={3} lg={3}>
                        <adminstyle.titledetail>Alternative phone</adminstyle.titledetail>
                        <adminstyle.textdetail>{row.alternatePhone}</adminstyle.textdetail>
                    </Grid>
                    <Grid item xs={12} sm={12} md={3} lg={3}>
                        <adminstyle.titledetail>Primary email</adminstyle.titledetail>
                        <adminstyle.textdetail>{row.Email}</adminstyle.textdetail>
                    </Grid>
                    <Grid item xs={12} sm={12} md={3} lg={3}>
                        <adminstyle.titledetail>Alternative email</adminstyle.titledetail>
                        <adminstyle.textdetail>{row.alternateEmail}</adminstyle.textdetail>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <adminstyle.titledetail>Address</adminstyle.titledetail>
                        <adminstyle.textdetail>{row.address}</adminstyle.textdetail>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <adminstyle.headdetail> Contact information</adminstyle.headdetail>
                    </Grid>

                    <Grid item xs={12} sm={12} md={3} lg={3}>
                        <adminstyle.titledetail>Department</adminstyle.titledetail>
                        <adminstyle.textdetail>{row.Department}</adminstyle.textdetail>
                    </Grid>

                    <Grid item xs={12} sm={12} md={3} lg={3}>
                        <adminstyle.titledetail>Role</adminstyle.titledetail>
                        <adminstyle.textdetail>{row.role}</adminstyle.textdetail>
                    </Grid>
                    <Grid item xs={12} sm={12} md={3} lg={3}>
                        <adminstyle.titledetail>Employee type</adminstyle.titledetail>
                        <adminstyle.textdetail>{row.Email}</adminstyle.textdetail>
                    </Grid>
                    <Grid item xs={12} sm={12} md={3} lg={3}>
                        <adminstyle.titledetail>Date of joining</adminstyle.titledetail>
                        <adminstyle.textdetail>{row.dateOfJoining}</adminstyle.textdetail>
                    </Grid>
                    <Grid item xs={12} sm={12} md={3} lg={3}>
                        <adminstyle.titledetail>Date of termination</adminstyle.titledetail>
                        <adminstyle.textdetail>{row.dateOfTermination}</adminstyle.textdetail>
                    </Grid>
                    <Grid item xs={12} sm={12} md={3} lg={3}>
                        <adminstyle.titledetail>Status</adminstyle.titledetail>
                        <adminstyle.textdetail>{row.activeStatus}</adminstyle.textdetail>
                    </Grid>
                    <Grid item xs={12} sm={12} md={3} lg={3}>
                        <adminstyle.titledetail>Head of department</adminstyle.titledetail>
                        <adminstyle.textdetail>
                            <Checkbox
                                checked={row.head}
                                disabled
                                defaultChecked
                                checkedIcon={<Checkicon />}
                            />
                        </adminstyle.textdetail>
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

const handleShowstaffViewModal = (row?: RowTable) => {
    return newModal({
        Body: staffViewModal,
        title: 'View security profile',
        topBar: true,
        id: staffViewModal.name,
        data: { row }
    });
};

export default handleShowstaffViewModal;
