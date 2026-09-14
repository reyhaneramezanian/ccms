import { FC } from 'react';
import { Box, Button } from '@mui/material';
import { closeModal, newModal } from 'src/redux/actions/actions';
import { IModalBodyProps } from '@/components/shared/modals/types.modals';
import { RowTable } from '@/components/table/table_layout/types.table.layout';
import { useDispatch } from 'react-redux';
import DetailsListGroup from '@/components/detailsListGroup';
import handleShowFilterModal from '@/components/security/staff/filterModal';

const AnnouncementBoardDetailsModal: FC<IModalBodyProps<RowTable>> = ({ data: { row } }) => {
    const dispatch = useDispatch();

    const handleCancel = () => {
        dispatch(closeModal(AnnouncementBoardDetailsModal.name));
    };

    return (
        <Box style={{ width: 450, maxWidth: '100%' }}>
            <Box style={{ paddingTop: 10, paddingBottom: 10 }}>
                <DetailsListGroup
                    items={[
                        {
                            title: 'Complex ',
                            value: row?.complexName
                        },
                        {
                            title: 'Block ',
                            value: row?.blockName
                        },
                        {
                            title: 'Floor ',
                            value: row?.floorName
                        },
                        {
                            title: 'Flat ',
                            value: row?.flatName
                        },
                        {
                            title: 'Type',
                            value: row?.announcementType
                        },
                        {
                            title: 'Date',
                            value: row?.date
                        },
                        {
                            title: 'Title',
                            value: row?.title
                        },
                        {
                            title: 'Message',
                            value: row?.message
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

const handleShowAnnouncementBoardDetailsModal = (row: RowTable) => {
    return newModal({
        Body: AnnouncementBoardDetailsModal,
        title: 'View announcement board',
        topBar: true,
        id: AnnouncementBoardDetailsModal.name,
        data: { row }
    });
};

export default handleShowAnnouncementBoardDetailsModal;
