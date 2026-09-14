import { Formik, Form, FieldArray, Field } from 'formik';
import * as Yup from 'yup';
import { MInputFormik } from '@/components/base/input/MInput';
import { useDispatch } from 'react-redux';
import { closeModal } from 'src/redux/actions/actions';
import { IModalBodyProps } from '@/components/shared/modals/types.modals';
import { FC } from 'react';
import * as style from '@/components/style';
import { Grid, Typography, Button, Box } from '@mui/material';
import useManageTab from 'src/hooks/useManageTab';
import React, { useEffect, useState } from 'react';
import * as S from './resident.style';
import Delivery from 'src/assets/icons/delivery';
import Deliveryactive from 'src/assets/icons/deliveryactive';
import Visitor from 'src/assets/icons/visitor';
import Visitoractive from 'src/assets/icons/visitoractive';
import Cab from 'src/assets/icons/cab';
import Cabactive from 'src/assets/icons/cabactive';
import { newModal } from 'src/redux/actions/actions';
import AddModaldelivery from './manage/addModal.delivery';
import AddModalvisitor from './manage/addModal.visitor';
import AddModalcab from './manage/addModal.cab';
import { selectApprovalTypeListItemsData } from './data';
import COLORS from '@/utils/theme/colors';
import { GateApprovalType } from 'src/graphql/generated';
import AdddeliveryModal from './manage/addModal.delivery';
import AddcabModal from './manage/addModal.cab';
import AddvisitorModal from './manage/addModal.visitor';

const ManagegateAddModal: FC<IModalBodyProps> = (props) => {
    const dispatch = useDispatch();
    const [activeApprovalType, setActiveApprovalType] = useState<GateApprovalType>();

    const handleCancel = () => {
        dispatch(closeModal('1'));
    };
    const handleSubmit = () => {
        if (typeof activeApprovalType === 'undefined') {
            enqueueSnackbar('Select pre approve theme', { variant: 'info' });
            return;
        }

        handleCancel();

        switch (activeApprovalType) {
            case GateApprovalType.Delivery:
                handlDelivery();
                break;

            case GateApprovalType.FrequentVisitor:
                handlvisitory();
                break;

            case GateApprovalType.Cab:
                handlcab();
                break;
        }
    };

    const handlDelivery = () => {
        dispatch(closeModal('1'));

        dispatch(AdddeliveryModal(''));
    };
    const handlvisitory = () => {
        dispatch(closeModal('1'));

        dispatch(AddvisitorModal(''));
    };
    const handlcab = () => {
        dispatch(closeModal('1'));

        dispatch(AddcabModal(''));
    };
    const handleClickApprovalType = (approvalType: GateApprovalType) => {
        setActiveApprovalType(approvalType);
        switch (activeApprovalType) {
            case GateApprovalType.Delivery:
                handlDelivery();
                break;

            case GateApprovalType.FrequentVisitor:
                handlvisitory();
                break;

            case GateApprovalType.Cab:
                handlcab();
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

export default ManagegateAddModal;
