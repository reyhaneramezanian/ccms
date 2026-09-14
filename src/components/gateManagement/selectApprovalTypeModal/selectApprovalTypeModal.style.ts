import COLORS from '@/utils/theme/colors';
import { Box } from '@mui/material';
import { grid, styled } from '@mui/system';

export const ApprovalTypeListWrapper = styled(Box)({
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    justifyItems: 'center',
    marginTop: 35
});

export const ApprovalTypeListItem = styled(Box)({
    '&>*': {
        cursor: 'pointer'
    }
});

export const ApprovalTypeListItemCircle = styled(Box)<{ isActive: boolean }>(({ isActive }) => {
    return {
        width: 80,
        height: 80,
        borderRadius: '50%',
        border: `1px solid ${isActive ? COLORS.primary : COLORS.grey3}`,
        backgroundColor: isActive ? COLORS.primary : COLORS.white,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8
    };
});
