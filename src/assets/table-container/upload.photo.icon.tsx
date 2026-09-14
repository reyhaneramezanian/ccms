import { SVGAttributes } from 'react';

export default function UploadPhotoIcon({ ...props }: SVGAttributes<SVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="402"
            height="214"
            viewBox="0 0 402 214"
            {...props}>
            <defs>
                <filter
                    id="Rectangle_5561"
                    x="0"
                    y="0"
                    width="402"
                    height="214"
                    filterUnits="userSpaceOnUse">
                    <feOffset dx="2" dy="2" />
                    <feGaussianBlur stdDeviation="2.5" result="blur" />
                    <feFlood floodColor="#adadad" floodOpacity="0.2" />
                    <feComposite operator="in" in2="blur" />
                    <feComposite in="SourceGraphic" />
                </filter>
            </defs>
            <g id="Group_22127" data-name="Group 22127" transform="translate(-413.5 -741.5)">
                <g transform="matrix(1, 0, 0, 1, 413.5, 741.5)" filter="url(#Rectangle_5561)">
                    <g
                        id="Rectangle_5561-2"
                        data-name="Rectangle 5561"
                        transform="translate(5.5 5.5)"
                        fill="#fff"
                        stroke="gray"
                        strokeWidth="0.1">
                        <rect width="387" height="199" rx="9" stroke="none" />
                        <rect
                            x="0.05"
                            y="0.05"
                            width="386.9"
                            height="198.9"
                            rx="8.95"
                            fill="none"
                        />
                    </g>
                </g>
            </g>
            <g id="Group_129" data-name="Group 129" transform="translate(-596.115 -731.481)">
                <path
                    id="Path_2"
                    data-name="Path 2"
                    d="M857.651,796.2a40.464,40.464,0,0,0-5.051.317c-4.12-26.889-28.287-47.532-57.485-47.532s-53.365,20.643-57.483,47.532a40.472,40.472,0,0,0-5.054-.317c-21.242,0-38.462,16.5-38.462,36.865s17.22,36.865,38.463,36.865H857.652c21.242,0,38.463-16.5,38.463-36.865S878.894,796.2,857.651,796.2Z"
                    fill="none"
                    stroke="#8b8b8b"
                    strokeWidth="3"
                />
                <path
                    id="Path_5"
                    data-name="Path 5"
                    d="M1214.171,1076.292l-32.386-37.861a2.661,2.661,0,0,0-4.166,0l-32.386,37.861c-1.145,1.339-.757,2.435.863,2.435h13.22v47.8a3.233,3.233,0,0,0,2.945,3.443h34.88a3.234,3.234,0,0,0,2.946-3.443v-47.8h13.221C1214.928,1078.726,1215.316,1077.631,1214.171,1076.292Z"
                    transform="translate(-358.692 -260.042)"
                    fill="none"
                    stroke="#8b8b8b"
                    strokeWidth="3"
                />
            </g>
            <text
                id="Upload_photo"
                data-name="Upload photo"
                transform="translate(133.5 177.5)"
                fill="#8b8b8b"
                fontSize="22"
                fontFamily="ArialMT, Arial">
                <tspan x="0" y="0">
                    Upload photo
                </tspan>
            </text>
        </svg>
    );
}
