import { FC } from 'react';
import { Box, Button } from '@mui/material';
import { closeModal, newModal } from 'src/redux/actions/actions';
import { IModalBodyProps } from '@/components/shared/modals/types.modals';
import { RowTable } from '@/components/table/table_layout/types.table.layout';
import { useDispatch } from 'react-redux';
import DetailsListGroup from '@/components/detailsListGroup';
import handleShowFilterModal from '@/components/security/staff/filterModal';

const AlertSystemDetailsModal: FC<IModalBodyProps<RowTable>> = ({ data: { row } }) => {
    const dispatch = useDispatch();

    const handleCancel = () => {
        dispatch(closeModal(AlertSystemDetailsModal.name));
    };

    return (
        <Box style={{ width: 450, maxWidth: '100%' }}>
            <Box style={{ paddingTop: 24, paddingBottom: 32 }}>
                <DetailsListGroup
                    items={[
                        {
                            title: 'Type',
                            value: row?.alertType
                        },
                        {
                            title: 'From',
                            value: row?.from
                        },
                        {
                            title: 'Phone number',
                            value: row?.phoneNumber
                        },
                        {
                            title: 'Date',
                            value: row?.date
                        },
                        {
                            title: 'Additional information',
                            value: row?.description
                        }
                    ]}
                />
            </Box>

            <Box display="flex" justifyContent="flex-end">
                <Button variant="contained" onClick={handleCancel}>
                    Ok
                </Button>
            </Box>
        </Box>
    );
};

const handleShowAlertSystemDetailsModal = (row: RowTable) => {
    return newModal({
        Body: AlertSystemDetailsModal,
        title: 'View alert system',
        topBar: true,
        id: AlertSystemDetailsModal.name,
        data: { row }
    });
};

export default handleShowAlertSystemDetailsModal;
