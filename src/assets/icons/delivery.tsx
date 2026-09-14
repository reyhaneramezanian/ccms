import React, { FC } from 'react';
import { IIcon } from './type';

const DeliveryIcon: FC<IIcon> = ({ width = 24, height = 24, color = '#636363' }) => {
    return (
        <svg
            id="vuesax_linear_box"
            data-name="vuesax/linear/box"
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 0 24.004 24.003">
            <g id="box" transform="translate(0.001 0)">
                <g id="Group" transform="translate(2.39 2)">
                    <g id="Group-2" data-name="Group" transform="translate(0.78 5.441)">
                        <path
                            id="Vector"
                            d="M0,0,8.831,5.111,17.6.03"
                            fill="none"
                            stroke={color}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                        />
                        <path
                            id="Vector-2"
                            data-name="Vector"
                            d="M0,9.071V0"
                            transform="translate(8.831 5.101)"
                            fill="none"
                            stroke={color}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                        />
                    </g>
                    <path
                        id="Vector-3"
                        data-name="Vector"
                        d="M7.541.48,2.2,3.45A4.719,4.719,0,0,0,0,7.181v5.651a4.719,4.719,0,0,0,2.2,3.73l5.341,2.97a4.793,4.793,0,0,0,4.151,0l5.341-2.97a4.719,4.719,0,0,0,2.2-3.73V7.181a4.719,4.719,0,0,0-2.2-3.73L11.692.48A4.726,4.726,0,0,0,7.541.48Z"
                        transform="translate(0 0)"
                        fill="none"
                        stroke={color}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                    />
                </g>
                <path
                    id="Vector-4"
                    data-name="Vector"
                    d="M9.491,9.141V5.481L0,0"
                    transform="translate(7.511 4.1)"
                    fill="none"
                    stroke={color}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                />
                <path id="Vector-5" data-name="Vector" d="M0,0H24V24H0Z" fill="none" opacity="0" />
            </g>
        </svg>
    );
};

export default DeliveryIcon;
