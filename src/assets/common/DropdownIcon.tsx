import React from 'react';
import StyledSvgIcon from '../icons/SvgIcon';

const DropdownIcon = (props: CommonIconProps) => {
    return (
        <StyledSvgIcon viewBox="0 0 24 24" id="document-icon" {...props}>
            <path d="M7 10l5 5 5-5z" />
        </StyledSvgIcon>
    );
};

export default DropdownIcon;
