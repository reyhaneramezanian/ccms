import { RowTable } from '@/components/table/table_layout/types.table.layout';
import { Box, Button } from '@mui/material';
import DetailsListGroup from '@/components/detailsListGroup';
import { useDispatch } from 'react-redux';
import { closeModal, newModal } from 'src/redux/actions/actions';

const GateManagementHistoryDetailsModal = ({ data: { row } }) => {
    const dispatch = useDispatch();

    const handleCancel = () => {
        dispatch(closeModal(GateManagementHistoryDetailsModal.name));
    };

    return (
        <Box style={{ width: 450, maxWidth: '100%' }}>
            <Box style={{ paddingTop: 24, paddingBottom: 32 }}>
                <DetailsListGroup
                    items={[
                        {
                            title: 'From',
                            value: row?.from
                        },
                        {
                            title: 'Type',
                            value: row?.type
                        },
                        {
                            title: 'Name',
                            value: row?.name
                        },
                        {
                            title: 'Phone',
                            value: row?.phoneNumber
                        },
                        {
                            title: 'Start date',
                            value: row?.startDate
                        },
                        {
                            title: 'End date',
                            value: row?.endDate
                        },
                        {
                            title: 'Code',
                            value: row?.code
                        },
                        {
                            title: 'Approval status',
                            value: row?.approvalStatustext
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

const handleShowGateManagementHistoryDetailsModal = (row: RowTable) => {
    return newModal({
        Body: GateManagementHistoryDetailsModal,
        title: `View gate management`,
        topBar: true,
        id: GateManagementHistoryDetailsModal.name,
        data: { row }
    });
};

export default handleShowGateManagementHistoryDetailsModal;
