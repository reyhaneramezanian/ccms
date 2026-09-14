import React from 'react'
import { SVGAttributes } from 'react';

const CloseItem = ({ ...props }: SVGAttributes<SVGElement>) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="9.113" height="9.113" viewBox="0 0 9.113 9.113">
            <g id="Group_22690" data-name="Group 22690" transform="translate(-6.751 -6.744)">
                <line id="Stroke-1" x1="7.403" y2="7.403" transform="translate(7.603 7.596)" fill="none" stroke="#3e205a" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" { ...props } />
                <line id="Stroke-2" x1="7.416" y1="7.416" transform="translate(7.6 7.593)" fill="none" stroke="#3e205a" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" { ...props } />
            </g>
        </svg>

    )
}

export default CloseItem