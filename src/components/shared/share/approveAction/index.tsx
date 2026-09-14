import React, { FC } from 'react';
import Tick from 'src/assets/icons/Tick';
import Reject from 'src/assets/icons/Reject';
import * as S from './approveAction.style';
import { IApproveActionProps } from './approveAction.type';
import { Box } from '@mui/material';

const ApproveAction: FC<IApproveActionProps> = ({
    handleApprove,
    handleReject,
    approveActionLoading
}) => {
    return (
        <>
            <S.ApproveActionWrapper approveActionLoading={approveActionLoading}>
                <Box
                    onClick={() => {
                        if (approveActionLoading) return;

                        handleApprove();
                    }}
                    style={{ opacity: approveActionLoading ? 0.4 : 1 }}>
                    <Tick />
                </Box>

                <Box
                    onClick={() => {
                        if (approveActionLoading) return;

                        handleReject();
                    }}
                    style={{ opacity: approveActionLoading ? 0.4 : 1 }}>
                    <Reject />
                </Box>
            </S.ApproveActionWrapper>
        </>
    );
};

export default ApproveAction;
