import React from 'react'
import { styled } from '@mui/material';
import { MImage } from '@/components/base/image/MImage'



const Image = ({ value }) => {
    return (
        <MImage resources={{ src: value }}
            style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                objectFit: 'cover'
            }}
        />
    )
}

export default Image