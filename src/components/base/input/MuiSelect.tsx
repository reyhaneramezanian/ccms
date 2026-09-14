import React, { forwardRef, memo } from 'react';
import { Select, styled } from '@mui/material';
import Down from 'src/assets/icons/Down';

// import { DownWardArrow } from 'src/assets/auctions/DownWardArrow';

const CustomSelect = styled(Select)(({ theme }) => ({
    // '& svg': {
    //     display: 'none'
    // }
    height: '48px !important',
    margin: '-5px 0 0 0',
    '&:hover': {
        border: 'none !important'
    }
}));

export const MuiSelect = memo(
    forwardRef(({ size = 'small', ...props }: any, ref) => {
        return (
            <div style={{ position: 'relative', display: 'flex' }}>
                <CustomSelect
                    fullWidth
                    size={size}
                    {...props}
                    ref={ref}
                    MenuProps={{ PaperProps: { sx: { maxHeight: 250 } }, ...props.MenuProps }}
                    IconComponent={() => <Down />}
                />
                {/* <div
                    style={{
                        position: 'absolute',
                        right: 20,
                        bottom: 8,
                        zIndex: +1000,
                        pointerEvents: 'none'
                    }}>
                    <DownWardArrow />
                </div> */}
            </div>
        );
    })
);
