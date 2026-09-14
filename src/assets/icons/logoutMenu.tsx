import { IIcon } from './type';

const LogoutMenuIcon = ({ width = 23.998, height = 23.998, color = '#e63c49' }: IIcon) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 0 23.998 23.998">
            <g
                id="vuesax_linear_logout"
                data-name="vuesax/linear/logout"
                transform="translate(-748 -444)">
                <g id="logout" transform="translate(748 444)">
                    <path
                        id="Vector"
                        d="M0,5.07C.31,1.47,2.16,0,6.209,0h.13C10.809,0,12.6,1.79,12.6,6.259v6.519c0,4.47-1.79,6.259-6.259,6.259h-.13c-4.02,0-5.87-1.45-6.2-4.99"
                        transform="translate(8.899 2.49)"
                        fill="none"
                        stroke={color}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                    />
                    <path
                        id="Vector-2"
                        data-name="Vector"
                        d="M11.379,0H0"
                        transform="translate(3.62 11.999)"
                        fill="none"
                        stroke={color}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                    />
                    <path
                        id="Vector-3"
                        data-name="Vector"
                        d="M3.35,0,0,3.35,3.35,6.7"
                        transform="translate(2.5 8.649)"
                        fill="none"
                        stroke={color}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                    />
                    <path
                        id="Vector-4"
                        data-name="Vector"
                        d="M0,0H24V24H0Z"
                        transform="translate(23.998 23.998) rotate(180)"
                        fill="none"
                        opacity="0"
                    />
                </g>
            </g>
        </svg>
    );
};

export default LogoutMenuIcon;
