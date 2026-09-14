import React from 'react';
import CloseIconMain from 'src/assets/icons/Close';
import Tick from 'src/assets/icons/Tick';
import { styled } from '@mui/material';

const CustomDiv = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    minWidth: '70px'
});

export const Custom = styled('div')({
    cursor: 'pointer'
});

const TickClose = () => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            <CustomDiv>
                <Custom>
                    <Tick />
                </Custom>

                <Custom>
                    <CloseIconMain />
                </Custom>
            </CustomDiv>
        </div>
    );
};

export default TickClose;
