import React, { FC, useState } from 'react';
import { styled } from '@mui/system';
import { FormControlLabel, Switch } from '@mui/material';
import storageKeys from 'src/data/storageKeys';

const Switcher: FC<{ value?: boolean; handleChange?(): void }> = ({ value, handleChange }) => {
    const SwitchCase = styled(Switch)({
        padding: 2,
        width: '40px',
        height: '24px',
        '& .MuiSwitch-switchBase': {
            '&.Mui-checked': {
                '& .MuiSwitch-thumb': {
                    position: 'absolute',
                    left: '2px',
                    width: '15px',
                    backgroundColor: '#fff',
                    top: '4px'
                },
                '& + .MuiSwitch-track': {
                    backgroundColor: '#487A9D',
                    opacity: '1'
                }
            }
        },
        '& .MuiSwitch-track': {
            backgroundColor: '#C9C9C9',
            borderRadius: '18px'
        },
        '& .MuiSwitch-thumb': {
            boxShadow: 'none',
            width: 15,
            height: 15,
            left: '6px',
            position: 'absolute',
            borderRadius: '50%',
            top: '4px',
            backgroundColor: '#fff'
        }
    });

    return (
        <FormControlLabel
            sx={{
                position: 'relative',
                margin: 0
            }}
            control={
                <SwitchCase
                    disabled={
                        localStorage.getItem(storageKeys.usertype) === 'BlockManager' ? true : false
                    }
                    checked={value}
                    onChange={() => {
                        if (typeof handleChange !== 'function') return;

                        handleChange();
                    }}
                    name="checked"
                />
            }
            label=""
        />
    );
};

export default Switcher;
