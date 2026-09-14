import { IIcon } from './type';

const HomeMenuIcon = ({ width = 24, height = 24, color = '#7a7a7a' }: IIcon) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24">
            <g
                id="vuesax_linear_home-2"
                data-name="vuesax/linear/home-2"
                transform="translate(-620 -188)">
                <g id="home-2" transform="translate(620 188)">
                    <path
                        id="Vector"
                        d="M7.237.848,1.68,5.179A4.907,4.907,0,0,0,0,8.6v7.641a4.356,4.356,0,0,0,4.34,4.351H16.277a4.354,4.354,0,0,0,4.34-4.341V8.747a4.871,4.871,0,0,0-1.856-3.557L12.391.724A4.625,4.625,0,0,0,7.237.848Z"
                        transform="translate(1.691 1.706)"
                        fill="none"
                        stroke={color}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                    />
                    <path
                        id="Vector-2"
                        data-name="Vector"
                        d="M0,2.537V0"
                        transform="translate(12 15.321)"
                        fill="none"
                        stroke={color}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                    />
                    <path
                        id="Vector-3"
                        data-name="Vector"
                        d="M0,0H24V24H0Z"
                        fill="none"
                        opacity="0"
                    />
                </g>
            </g>
        </svg>
    );
};

export default HomeMenuIcon;
