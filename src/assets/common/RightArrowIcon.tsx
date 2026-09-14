import React from 'react';
import StyledSvgIcon from '../icons/SvgIcon';

const RightArrowIcon = (props: CommonIconProps) => {
    return (
        <svg
            style={{ margin: '0 0 0 10px' }}
            id="Arrow-Right_2"
            data-name="Arrow-Right 2"
            xmlns="http://www.w3.org/2000/svg"
            width="6.811"
            height="11.5"
            viewBox="0 0 6.811 11.5">
            <path
                id="Arrow-Right_2-2"
                data-name="Arrow-Right 2"
                d="M7.47,4.47a.75.75,0,0,1,1.061,0L14.061,10,8.53,15.53A.75.75,0,0,1,7.47,14.47L11.939,10,7.47,5.53A.75.75,0,0,1,7.47,4.47Z"
                transform="translate(-7.25 -4.25)"
                fill="#487a9d"
                fillRule="evenodd"
            />
        </svg>
    );
};
export const RightArrowForwardIcon = (props: CommonIconProps) => {
    return (
        <StyledSvgIcon {...props} viewBox="0 0 15 14">
            <path
                id="Fill_4"
                d="M.34,8.827l5.832,5.844a1.2,1.2,0,0,0,1.656,0L13.66,8.827A1.167,1.167,0,0,0,12,7.183L8.166,11.028V1.164a1.167,1.167,0,0,0-2.334,0v9.864L1.994,7.183A1.166,1.166,0,0,0,.34,8.827"
                transform="translate(0 14) rotate(-90)"
                fill="#487A9D"
            />
        </StyledSvgIcon>
    );
};

export default RightArrowIcon;
