import { Box, Button, Typography } from '@mui/material';
import { closeModal, newModal } from 'src/redux/actions/actions';
import * as style from '@/components/style';
import * as S from './selectApprovalTypeModal.style';
import COLORS from '@/utils/theme/colors';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { GateApprovalType } from 'src/graphql/generated';
import { selectApprovalTypeListItemsData } from './data';
import { useSnackbar } from 'notistack';
import handleShowGateManagementDeliveryModal from '../deliveryModal';
import handleShowGateManagementVisitorModal from '../visitorModal';
import handleShowGateManagementCabModal from '../cab';

const SelectGateManagementApprovalType = ({ data: { refetch } }) => {
    const dispatch = useDispatch();
    const [activeApprovalType, setActiveApprovalType] = useState<GateApprovalType>();
    const { enqueueSnackbar } = useSnackbar();

    const handleCancel = () => {
        dispatch(closeModal(SelectGateManagementApprovalType.name));
    };

    const handleClickApprovalType = (approvalType: GateApprovalType) => {
        setActiveApprovalType(approvalType);
    };

    const handleSubmit = () => {
        if (typeof activeApprovalType === 'undefined') {
            enqueueSnackbar('Select pre approve theme', { variant: 'info' });
            return;
        }

        handleCancel();

        switch (activeApprovalType) {
            case GateApprovalType.Delivery:
                dispatch(handleShowGateManagementDeliveryModal(refetch));
                break;

            case GateApprovalType.FrequentVisitor:
                dispatch(handleShowGateManagementVisitorModal(refetch));
                break;

            case GateApprovalType.Cab:
                dispatch(handleShowGateManagementCabModal(refetch));
                break;
        }
    };

    return (
        <Box style={{ width: 450, maxWidth: '100%' }}>
            <Box>
                <Typography variant="body2" color={COLORS.grey3}>
                    Which one do you want to pre-approve them for?
                </Typography>
            </Box>

            <S.ApprovalTypeListWrapper>
                {selectApprovalTypeListItemsData.map((item, index) => {
                    const isActive = activeApprovalType === item.type;

                    return (
                        <S.ApprovalTypeListItem key={index}>
                            <S.ApprovalTypeListItemCircle
                                isActive={isActive}
                                onClick={() => {
                                    handleClickApprovalType(item.type);
                                }}>
                                <item.Icon color={isActive ? COLORS.white : undefined} />
                            </S.ApprovalTypeListItemCircle>

                            <Typography
                                variant="body2"
                                onClick={() => {
                                    handleClickApprovalType(item.type);
                                }}
                                textAlign="center"
                                color={isActive ? COLORS.primary : COLORS.grey3}>
                                {item.title}
                            </Typography>
                        </S.ApprovalTypeListItem>
                    );
                })}
            </S.ApprovalTypeListWrapper>

            <style.modalButtonGroup>
                <Button variant="contained" color="primary" type="submit" onClick={handleSubmit}>
                    Next
                </Button>

                <Button variant="outlined" color="grey3" onClick={handleCancel}>
                    Cancel
                </Button>
            </style.modalButtonGroup>
        </Box>
    );
};

const handleShowSelectGateManagementApprovalTypeModal = (refetch?: () => void) => {
    return newModal({
        Body: SelectGateManagementApprovalType,
        title: `Walk-in approval`,
        topBar: true,
        id: SelectGateManagementApprovalType.name,
        data: { refetch }
    });
};

export default handleShowSelectGateManagementApprovalTypeModal;
