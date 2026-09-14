export const CheckboxTickSquareIcon = ({ checked }: CommonIconProps & { checked: boolean }) => {
    return (
        <>
            {checked ? (
                <svg
                    id="Component_39_1"
                    data-name="Component 39 – 1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 30 30">
                    <rect
                        id="Rectangle_17014"
                        data-name="Rectangle 17014"
                        width="30"
                        height="30"
                        rx="4"
                        fill="#213950"
                    />
                    <path
                        id="Stroke-1"
                        d="M6.44,13.232l4.363,5.6L19.524,7.627"
                        transform="translate(2.018 2.768)"
                        fill="none"
                        stroke="#f0f5fa"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        fillRule="evenodd"
                    />
                </svg>
            ) : (
                <svg
                    id="Component_40_1"
                    data-name="Component 40 – 1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 30 30">
                    <g
                        id="Rectangle_17013"
                        data-name="Rectangle 17013"
                        fill="none"
                        stroke="#707070"
                        strokeWidth="1">
                        <rect width="30" height="30" rx="4" stroke="none" />
                        <rect x="0.5" y="0.5" width="29" height="29" rx="3.5" fill="none" />
                    </g>
                </svg>
            )}
        </>
    );
};
