import React from 'react';
import StyledSvgIcon from '../icons/SvgIcon';

const FilterIcon = (props: CommonIconProps) => {
    return (
        <StyledSvgIcon {...props} id="auth-outline">
            <g id="Filter_2" data-name="Filter 2" transform="translate(2 2)">
                <path
                    id="Filter_2-2"
                    data-name="Filter 2"
                    d="M7.085,19.874a.8.8,0,0,1-.356-.67V14.389a.558.558,0,0,1,.551-.565l4.855.015a.558.558,0,0,1,.548.565v2.731a.8.8,0,0,1-.454.724L7.823,19.929A.765.765,0,0,1,7.5,20,.754.754,0,0,1,7.085,19.874Zm5.35-7.83-5.447-.016a.591.591,0,0,1-.437-.2L.574,5.258A2.234,2.234,0,0,1,0,3.758V2.193A2.161,2.161,0,0,1,2.128,0H17.872A2.16,2.16,0,0,1,20,2.192V3.724a2.225,2.225,0,0,1-.637,1.563l-6.505,6.58a.582.582,0,0,1-.416.176Z"
                    fill="#0b0b0b"
                />
            </g>
        </StyledSvgIcon>
    );
};

export default FilterIcon;
