import React from 'react'
import { SVGAttributes } from 'react';


const Client = ({ ...props }: SVGAttributes<SVGElement>) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="31" height="27" viewBox="0 0 38.646 38.824" { ...props }>
            <g id="Group_23742" data-name="Group 23742" transform="translate(0.75 0.75)">
                <circle id="Ellipse_379" data-name="Ellipse 379" cx="4.5" cy="4.5" r="4.5" transform="translate(14)" fill="none" stroke="#213950" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" { ...props } />
                <path id="Path_42629" data-name="Path 42629" d="M30,151.572h.361a11.431,11.431,0,0,0,8.781-4.113l2.43-2.917A4.292,4.292,0,0,1,44.865,143H52.28a4.292,4.292,0,0,1,3.293,1.542L58,147.459a11.431,11.431,0,0,0,8.781,4.113h.361" transform="translate(-30 -130.142)" fill="none" stroke="#213950" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" { ...props } />
                <path id="Path_42630" data-name="Path 42630" d="M43.43,148v4.286A1.429,1.429,0,0,1,42,153.715H34.532a2.528,2.528,0,0,0-2.4,1.729l0,.007a2.53,2.53,0,0,0,1.749,3.243l22.409,6.451" transform="translate(-29.143 -127.998)" fill="none" stroke="#213950" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"  { ...props }/>
                <path id="Path_42631" data-name="Path 42631" d="M49.858,148v4.286a1.429,1.429,0,0,0,1.429,1.429h7.469a2.528,2.528,0,0,1,2.4,1.729l0,.007a2.53,2.53,0,0,1-1.749,3.243L37,165.144" transform="translate(-26.999 -127.998)" fill="none" stroke="#213950" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" { ...props } />
            </g>
        </svg>

    )
}

export default Client