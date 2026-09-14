import { Box } from '@mui/material';
import { styled } from '@mui/system';
import { StatusBadgeType } from './types.statusBadge';

export const StatusBadgeWrapper = styled(Box)<{ type: StatusBadgeType }>(({ type }) => {
    let color: string = '',
        background: string = '';

    switch (type) {
        case 'PENDING':
        case 'PENDDING':
        case 'EXPIRED':
            color = '#CC9E14';
            background = 'rgba(230, 191, 76, 0.25)';
            break;
        case 'STAFF_ASIGNED':
        case 'StaffAsigned':
        case 'IN_PROGRESS':
            color = '#409FFF';
            background = 'rgba(64, 159, 255, 0.1)';
            break;

        case 'REJECTED':
        case 'UNPAID':
            color = '#E63C49';
            background = 'rgba(230, 60, 73, 0.1)';
            break;

        case 'PAID':
        case 'COMPLETED':
        case 'APPROVED':
        case 'MarkedAsDone':
        case 'MARKED_AS_DONE':
        case 'DONE':
        case 'StaffAsigned':
            color = '#20A144';
            background = 'rgba(61, 204, 121, 0.1)';
            break;
    }

    return {
        padding: '8px 16px',
        borderRadius: 4,
        display: 'inline-block',
        fontSize: 12,
        lineHeight: '18px',
        color,
        background
    };
});
