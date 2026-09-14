import { Box } from '@mui/material';
import { styled } from '@mui/system';

export const ApproveActionWrapper = styled(Box)<{ approveActionLoading?: boolean }>(
    ({ approveActionLoading }) => ({
        display: 'grid',
        gridTemplateColumns: '24px 24px',
        columnGap: 8,
        justifyContent: 'center',
        alignItems: 'center',
        '&>*': {
            cursor: approveActionLoading ? 'default' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }
    })
);
