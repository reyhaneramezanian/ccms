import { FC } from 'react';
import { Typography, Box, Button } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { MInputFormik } from '@/components/base/input/MInput';
import * as adminstyle from '@/components/admin/admin.style';
import { closeModal, newModal } from 'src/redux/actions/actions';
import { IModalBodyProps } from '@/components/shared/modals/types.modals';
import { RowTable } from '@/components/table/table_layout/types.table.layout';
import { useDispatch } from 'react-redux';
import { MSelectFormik } from '@/components/base/input/MSelect';

const ComplaintViewModal: FC<IModalBodyProps<RowTable>> = ({ data: { row } }) => {
    const dispatch = useDispatch();

    const handleCancel = () => {
        dispatch(closeModal(ComplaintViewModal.name));
    };

    return (
        <adminstyle.modalbox>
            <adminstyle.modalFormRowWrapper>
                <adminstyle.modalFormRowFieldWrapper>
                    <adminstyle.titledetail>Complex </adminstyle.titledetail>
                    <adminstyle.textdetail>{row.complex}</adminstyle.textdetail>
                </adminstyle.modalFormRowFieldWrapper>
                <adminstyle.modalFormRowFieldWrapper>
                    <adminstyle.titledetail>Block </adminstyle.titledetail>
                    <adminstyle.textdetail>{row.block}</adminstyle.textdetail>
                </adminstyle.modalFormRowFieldWrapper>
                <adminstyle.modalFormRowFieldWrapper>
                    <adminstyle.titledetail>Floor </adminstyle.titledetail>
                    <adminstyle.textdetail>{row.floor}</adminstyle.textdetail>
                </adminstyle.modalFormRowFieldWrapper>
                <adminstyle.modalFormRowFieldWrapper>
                    <adminstyle.titledetail>Flat </adminstyle.titledetail>
                    <adminstyle.textdetail>{row.flat}</adminstyle.textdetail>
                </adminstyle.modalFormRowFieldWrapper>
                <adminstyle.modalFormRowFieldWrapper>
                    <adminstyle.titledetail>Type</adminstyle.titledetail>
                    <adminstyle.textdetail>{row.Type}</adminstyle.textdetail>
                </adminstyle.modalFormRowFieldWrapper>
                <adminstyle.modalFormRowFieldWrapper>
                    <adminstyle.titledetail>Date</adminstyle.titledetail>
                    <adminstyle.textdetail>{row.Date}</adminstyle.textdetail>
                </adminstyle.modalFormRowFieldWrapper>
                <adminstyle.modalFormRowFieldWrapper>
                    <adminstyle.titledetail>Title</adminstyle.titledetail>
                    <adminstyle.textdetail>{row.Title}</adminstyle.textdetail>
                </adminstyle.modalFormRowFieldWrapper>
                <adminstyle.modalFormRowFieldWrapper>
                    <adminstyle.titledetail>Message</adminstyle.titledetail>
                    <adminstyle.textdetail>{row.Message}</adminstyle.textdetail>
                </adminstyle.modalFormRowFieldWrapper>
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

const handleShowComplaintViewModal = (row?: RowTable) => {
    return newModal({
        Body: ComplaintViewModal,
        title: 'View Complaint',
        topBar: true,
        id: ComplaintViewModal.name,
        data: { row }
    });
};

export default handleShowComplaintViewModal;
