import React, { FC } from 'react';
import { IIcon } from './type';

const CabIcon: FC<IIcon> = ({ width = 24, height = 24, color = '#636363' }) => {
    return (
        <svg
            id="vuesax_linear_group"
            data-name="vuesax/linear/group"
            xmlns="http://www.w3.org/2000/svg"
            width="24.002"
            height="24.002"
            viewBox="0 0 24.002 24.002">
            <g id="group" transform="translate(0 0)">
                <path
                    id="Vector"
                    d="M13,0V10a2.006,2.006,0,0,1-2,2H0V4A4,4,0,0,1,4,0Z"
                    transform="translate(2 2)"
                    fill="none"
                    stroke={color}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                />
                <path
                    id="Vector-2"
                    data-name="Vector"
                    d="M20,9v3a3,3,0,0,1-3,3H16a2,2,0,0,0-4,0H8a2,2,0,0,0-4,0H3a3,3,0,0,1-3-3V9H11a2.006,2.006,0,0,0,2-2V0h1.84a2.017,2.017,0,0,1,1.74,1.01L18.292,4H17a1,1,0,0,0-1,1V8a1,1,0,0,0,1,1Z"
                    transform="translate(2 5)"
                    fill="none"
                    stroke={color}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                />
                <path
                    id="Vector-3"
                    data-name="Vector"
                    d="M4,2A2,2,0,1,1,2,0,2,2,0,0,1,4,2Z"
                    transform="translate(6.001 18.002)"
                    fill="none"
                    stroke={color}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                />
                <path
                    id="Vector-4"
                    data-name="Vector"
                    d="M4,2A2,2,0,1,1,2,0,2,2,0,0,1,4,2Z"
                    transform="translate(14.002 18.002)"
                    fill="none"
                    stroke={color}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                />
                <path
                    id="Vector-5"
                    data-name="Vector"
                    d="M4,3V5H1A1,1,0,0,1,0,4V1A1,1,0,0,1,1,0H2.29Z"
                    transform="translate(18.002 9.001)"
                    fill="none"
                    stroke={color}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                />
                <path id="Vector-6" data-name="Vector" d="M0,0H24V24H0Z" fill="none" opacity="0" />
            </g>
        </svg>
    );
};

export default CabIcon;
