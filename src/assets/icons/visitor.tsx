import React, { FC } from 'react';
import { IIcon } from './type';

const VisitorIcon: FC<IIcon> = ({ width = 24, height = 24, color = '#636363' }) => {
    return (
        <svg
            id="vuesax_linear_profile"
            data-name="vuesax/linear/profile"
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 0 24.004 24.003">
            <g id="profile" transform="translate(0.001 0)">
                <path
                    id="Vector"
                    d="M4.6,8.871a1.818,1.818,0,0,0-.33,0,4.446,4.446,0,1,1,.33,0Z"
                    transform="translate(7.561 2)"
                    fill="none"
                    stroke={color}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                />
                <path
                    id="Vector-2"
                    data-name="Vector"
                    d="M1.815,1.373c-2.42,1.62-2.42,4.26,0,5.871a9.768,9.768,0,0,0,10.011,0c2.42-1.62,2.42-4.26,0-5.871A9.813,9.813,0,0,0,1.815,1.373Z"
                    transform="translate(5.346 13.189)"
                    fill="none"
                    stroke={color}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                />
                <path
                    id="Vector-3"
                    data-name="Vector"
                    d="M0,0H24V24H0Z"
                    transform="translate(24.003 24.003) rotate(180)"
                    fill="none"
                    opacity="0"
                />
            </g>
        </svg>
    );
};

export default VisitorIcon;
