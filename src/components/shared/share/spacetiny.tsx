import { styled } from '@mui/material';

export const CustomDivSpacer = styled('div')({
    ['@media (max-width:950px)']: {
        minWidth: 0,
        minHeight: 0
    },
    width: '5vw',
    height: '25px',
    overflow: 'hidden',
    textAlign: 'left',
    alignItems: 'left',
    margin: '0 auto',
    float: 'left',
    textOverflow: 'ellipsis !important',
    whiteSpace: 'nowrap'
});

export const Space = ({ value }) => {
    return <CustomDivSpacer title={value}>{value}</CustomDivSpacer>;
};

export default Space;
