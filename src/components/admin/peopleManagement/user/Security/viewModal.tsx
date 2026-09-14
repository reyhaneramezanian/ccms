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
    const dispatch = useDispatch();

    const handleCancel = () => {
        dispatch(closeModal(PeopleViewModal.name));
    };

    return (
        <adminstyle.modalbox style={{ width: 700 }}>
            <adminstyle.modalFormRowWrapper>
                <Grid container>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                        <adminstyle.titledetail>First name</adminstyle.titledetail>
                        <adminstyle.textdetail>{row.Firstname}</adminstyle.textdetail>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                        <adminstyle.titledetail>Middle name</adminstyle.titledetail>
                        <adminstyle.textdetail>{row.Middlename}</adminstyle.textdetail>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                        <adminstyle.titledetail>Surname</adminstyle.titledetail>
                        <adminstyle.textdetail>{row.Lastname}</adminstyle.textdetail>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                        <adminstyle.titledetail>Gender</adminstyle.titledetail>
                        <adminstyle.textdetail>{row.gendertext}</adminstyle.textdetail>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                        <adminstyle.titledetail>Date of birth</adminstyle.titledetail>
                        <adminstyle.textdetail>{row.dateOfBirths}</adminstyle.textdetail>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                        <adminstyle.titledetail>Complex </adminstyle.titledetail>
                        <adminstyle.textdetail title={row.Complex}>
                            {row.Complex}
                        </adminstyle.textdetail>
                    </Grid>

                    <Grid item xs={12} sm={12} md={4} lg={4}>
                        <adminstyle.titledetail>Phone number</adminstyle.titledetail>
                        <adminstyle.textdetail>{row.Phone}</adminstyle.textdetail>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                        <adminstyle.titledetail>Employee type</adminstyle.titledetail>
                        <adminstyle.textdetail>{row.employeeType}</adminstyle.textdetail>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <adminstyle.titledetail>Email address</adminstyle.titledetail>
                        <adminstyle.textdetail>{row.Email}</adminstyle.textdetail>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                        <adminstyle.titledetail>Date of joining</adminstyle.titledetail>
                        <adminstyle.textdetail>
                            {row.dateOfJoining.replaceAll('-', '/')}
                        </adminstyle.textdetail>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                        <adminstyle.titledetail>Date of termination</adminstyle.titledetail>
                        <adminstyle.textdetail>
                            {row.dateOfTermination.replaceAll('-', '/')}
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

const handleShowPeopleViewModal = (row?: RowTable) => {
    return newModal({
        Body: PeopleViewModal,
        title: 'View security',
        topBar: true,
        id: PeopleViewModal.name,
        data: { row }
    });
};

export default handleShowPeopleViewModal;
