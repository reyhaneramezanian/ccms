import React from 'react';
import { styled } from '@mui/material';

const BorderLinearProgress = styled('div')<{ percent?: String }>(({ theme, percent }) => ({
    width: `${percent}%`,
    height: '50px',
    backgroundColor: Number(percent) <= 50 ? '#CDE5FC' : (Number(percent) <= 75 && Number(percent) >= 50 ) ?  '#75B0EA' : '#4374A4',
    borderRadius: '25px',
    marginBottom: '12px',
    display: 'flex',
    alignItems: 'center',
    marginLeft: '10px',
    maxWidth:'100%',
    minWidth:'20%'

}));

const CustomDiv = styled('div')({
    borderRadius: '50%',
    padding: '8px',
    backgroundColor: '#fff',
    margin: '5px 21px 5px 10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '40px',
    height: '40px'
})

const CustomP = styled('h2')({
    color: '#fff'
})


const Linear = ({ Icon = null, percent = 0 }) => {
    return (
        <BorderLinearProgress percent={String(percent)}>
            <CustomDiv>{Icon}</CustomDiv>
            <CustomP>{percent}%</CustomP>
        </BorderLinearProgress>
    )
}

export default Linear