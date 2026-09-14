import React, { forwardRef, memo } from 'react';
import InputLabel from '@mui/material/InputLabel';
import styled from '@mui/material/styles/styled';

const GrayInputLabel = styled(InputLabel)(({ theme }) => ({
    color: theme.palette.grey[400]
}));

export const MuiInputLabel = memo(
    forwardRef(({ ...props }: any, ref) => {
        return <GrayInputLabel {...props} ref={ref} />;
    })
);
