import { FC } from 'react';
import { Typography, Box, Button } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { MInputFormik } from '@/components/base/input/MInput';
import * as residentstyle from '../../resident.style';
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
        <residentstyle.modalbox>
            <residentstyle.modalFormRowWrapper>
                <residentstyle.modalFormRowFieldWrapper>
                    <residentstyle.titledetail>Department</residentstyle.titledetail>
                    <residentstyle.textdetail>{row.departmentName}</residentstyle.textdetail>
                </residentstyle.modalFormRowFieldWrapper>
                <residentstyle.modalFormRowFieldWrapper>
                    <residentstyle.titledetail>Service</residentstyle.titledetail>
                    <residentstyle.textdetail>{row.serviceName}</residentstyle.textdetail>
                </residentstyle.modalFormRowFieldWrapper>
                <residentstyle.modalFormRowFieldWrapper>
                    <residentstyle.titledetail>Start date</residentstyle.titledetail>
                    <residentstyle.textdetail>{row.startDate}</residentstyle.textdetail>
                </residentstyle.modalFormRowFieldWrapper>
                <residentstyle.modalFormRowFieldWrapper>
                    <residentstyle.titledetail>End date</residentstyle.titledetail>
                    <residentstyle.textdetail>{row.endDate}</residentstyle.textdetail>
                </residentstyle.modalFormRowFieldWrapper>
                <residentstyle.modalFormRowFieldWrapper>
                    <residentstyle.titledetail>Start time</residentstyle.titledetail>
                    <residentstyle.textdetail>{row.startTime}</residentstyle.textdetail>
                </residentstyle.modalFormRowFieldWrapper>
                <residentstyle.modalFormRowFieldWrapper>
                    <residentstyle.titledetail>End time</residentstyle.titledetail>
                    <residentstyle.textdetail>{row.endTime}</residentstyle.textdetail>
                </residentstyle.modalFormRowFieldWrapper>
                <residentstyle.modalFormRowFieldWrapper>
                    <residentstyle.titledetail>Staff name</residentstyle.titledetail>
                    <residentstyle.textdetail>{row.name}</residentstyle.textdetail>
                </residentstyle.modalFormRowFieldWrapper>
                <residentstyle.modalFormRowFieldWrapper>
                    <residentstyle.titledetail>Phone staff</residentstyle.titledetail>
                    <residentstyle.textdetail>{row.phoneNumber}</residentstyle.textdetail>
                </residentstyle.modalFormRowFieldWrapper>
            </residentstyle.modalFormRowWrapper>
            <residentstyle.modalButtonGroup>
                <Box>
                    <Button variant="contained" color="primary" onClick={handleCancel}>
                        ok
                    </Button>
                </Box>
            </residentstyle.modalButtonGroup>
        </residentstyle.modalbox>
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
