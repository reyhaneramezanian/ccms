import React from 'react';
import StyledSvgIcon from '../icons/SvgIcon';

export const LeftArrowIcon = (props: CommonIconProps) => {
    return (
        <svg
            style={{ margin: '0 0 0 9px' }}
            xmlns="http://www.w3.org/2000/svg"
            width="6.811"
            height="11.5"
            viewBox="0 0 6.811 11.5">
            <g
                id="Arrow-Right_2"
                data-name="Arrow-Right 2"
                transform="translate(6.811 11.5) rotate(180)">
                <path
                    id="Arrow-Right_2-2"
                    data-name="Arrow-Right 2"
                    d="M7.47,4.47a.75.75,0,0,1,1.061,0L14.061,10,8.53,15.53A.75.75,0,0,1,7.47,14.47L11.939,10,7.47,5.53A.75.75,0,0,1,7.47,4.47Z"
                    transform="translate(-7.25 -4.25)"
                    fill="#7a7a7a"
                    fillRule="evenodd"
                />
            </g>
        </svg>
    );
};

export const LeftArrowBackIcon = (props: CommonIconProps) => {
    return (
        <StyledSvgIcon {...props} viewBox="0 0 22 17.998" id="Iconly_Light_Arrow_-_Right">
            <path
                id="Icon_metro-arrow-left"
                data-name="Icon metro-arrow-left"
                d="M12.816,23.343l-7.857-7.5a1.452,1.452,0,0,1,0-2.121l7.857-7.5a1.625,1.625,0,0,1,2.222,0,1.452,1.452,0,0,1,0,2.121L9.864,13.283H24.927a1.5,1.5,0,1,1,0,3H9.864l5.175,4.939a1.452,1.452,0,0,1,0,2.121A1.625,1.625,0,0,1,12.816,23.343Z"
                transform="translate(-4.499 -5.784)"
                fill="#7A7A7A"
            />
        </StyledSvgIcon>
    );
};
