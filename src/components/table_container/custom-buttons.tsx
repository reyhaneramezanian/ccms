import React from 'react'
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Button } from '@mui/material';


const CustomButtons = ({ buttons, onButtonClick }) => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
    const Bottoms = {marginBottom:matches ? "40px" : 0}
    return (
        buttons.length > 0 ?
        buttons.map(({ label, style = {}, ...props }, index) => (
            <Button
                key={index}
                variant="contained"
                style={{ backgroundColor: '#A587C2', color: 'white',marginTop:'30px', marginLeft:matches ? '40px':0,...style,borderRadius: 25,...Bottoms,textTransform: 'none' }}
                onClick={() => onButtonClick?.({ label, style, ...props })}
                {...props}>
                {label}
            </Button>
        )) :
        null

    )
}

export default CustomButtons