import { IIcon } from './type';

const AlarmIcon = ({ width = 16, height = 16, color = '#e63c49' }: IIcon) => {
    return (
        <svg
            id="vuesax_linear_alarm"
            data-name="vuesax/linear/alarm"
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 0 15.998 15.998">
            <g id="alarm">
                <path
                    id="Vector"
                    d="M0,0H13.332"
                    transform="translate(1.333 14.665)"
                    fill={color}
                    stroke={color}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                />
                <path
                    id="Vector-2"
                    data-name="Vector"
                    d="M6,0A6,6,0,0,0,0,6v4.666H12V6A6,6,0,0,0,6,0Z"
                    transform="translate(2 4)"
                    fill={color}
                    stroke={color}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                />
                <path
                    id="Vector-3"
                    data-name="Vector"
                    d="M0,0V.667"
                    transform="translate(7.999 1.333)"
                    fill={color}
                    stroke={color}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                />
                <path
                    id="Vector-4"
                    data-name="Vector"
                    d="M0,0,.667.667"
                    transform="translate(2.666 2.666)"
                    fill={color}
                    stroke={color}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                />
                <path
                    id="Vector-5"
                    data-name="Vector"
                    d="M.667,0,0,.667"
                    transform="translate(12.665 2.666)"
                    fill={color}
                    stroke={color}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                />
                <path id="Vector-6" data-name="Vector" d="M0,0H16V16H0Z" fill={color} opacity="0" />
            </g>
        </svg>
    );
};

export default AlarmIcon;
