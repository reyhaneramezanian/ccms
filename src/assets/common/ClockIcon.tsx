import StyledSvgIcon from '../icons/SvgIcon';

export const ClockIcon = (props: CommonIconProps) => {
    return (
        <StyledSvgIcon viewBox="0 0 30 30" id="close-icon" {...props}>
            <g id="Group_21898" data-name="Group 21898" transform="translate(-3 -3)">
                <path
                    fill="currentColor"
                    id="Path_39311"
                    data-name="Path 39311"
                    d="M18,3A15,15,0,1,0,33,18,15.016,15.016,0,0,0,18,3Zm0,28.571A13.571,13.571,0,1,1,31.571,18,13.584,13.584,0,0,1,18,31.571Z"
                />
                <path
                    fill="currentColor"
                    id="Path_39312"
                    data-name="Path 39312"
                    d="M24.429,18.85V7.714a.714.714,0,1,0-1.429,0V19.143a.738.738,0,0,0,.207.507l5.714,5.714a.724.724,0,0,0,1.014,0,.711.711,0,0,0,0-1.007Z"
                    transform="translate(-5.714 -1.143)"
                />
            </g>
        </StyledSvgIcon>
    );
};
