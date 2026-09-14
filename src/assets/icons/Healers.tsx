import React from 'react'
import { SVGAttributes } from 'react';


const Healers = ({ ...props }: SVGAttributes<SVGElement>) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="31" height="27" viewBox="0 0 27.5 27.5" { ...props }>
            <g id="Group_23746" data-name="Group 23746" transform="translate(-29.25 -81.25)" >
                <ellipse id="Ellipse_373" data-name="Ellipse 373" cx="7" cy="4" rx="7" ry="4" transform="translate(41 89)" fill="none" stroke="#213950" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" { ...props } />
                <ellipse id="Ellipse_374" data-name="Ellipse 374" cx="4" cy="3.5" rx="4" ry="3.5" transform="translate(43 82)" fill="none" stroke="#213950" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" { ...props } />
                <path id="Path_42617" data-name="Path 42617" d="M39.384,99.009a.366.366,0,0,1-.392-.392A2.748,2.748,0,0,0,36,96a2.746,2.746,0,0,0-2.991,2.614.37.37,0,0,1-.4.394,3.019,3.019,0,0,0,0,5.983.367.367,0,0,1,.392.392A2.746,2.746,0,0,0,36,108a2.746,2.746,0,0,0,2.991-2.616.366.366,0,0,1,.392-.392,3.018,3.018,0,0,0,0-5.983Z" fill="none" stroke="#213950" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" { ...props } />
                <circle id="Ellipse_375" data-name="Ellipse 375" cx="1.5" cy="1.5" r="1.5" transform="translate(34.5 100.5)" fill="#213950" { ...props } />
                <path id="Path_42618" data-name="Path 42618" d="M47,97a11.791,11.791,0,0,0-7.021,2.064A2.9,2.9,0,0,1,42,102a2.749,2.749,0,0,1-2.617,2.992.359.359,0,0,0-.3.127C40.608,106.835,43.581,108,47,108c4.971,0,9-2.462,9-5.5S51.971,97,47,97Z" fill="none" stroke="#213950" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" { ...props } />
            </g>
        </svg>

    )
}

export default Healers