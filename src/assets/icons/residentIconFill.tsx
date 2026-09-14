import { IIcon } from './type';

const ResidentFlatFillIcon = ({ width = 24, height = 24, color = '#409fff' }: IIcon) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24">
            <g id="house-2" transform="translate(-300 -188)">
                <path
                    id="Vector"
                    d="M0,0H24V24H0Z"
                    transform="translate(300 188)"
                    fill="none"
                    opacity="0"
                />
                <path
                    id="Vector-2"
                    data-name="Vector"
                    d="M.75,0A.755.755,0,0,0,0,.75v1.5A.755.755,0,0,0,.75,3a.755.755,0,0,0,.75-.75V.75A.755.755,0,0,0,.75,0Z"
                    transform="translate(309.25 203.5)"
                    fill={color}
                />
                <path
                    id="Vector-3"
                    data-name="Vector"
                    d="M20.75,18.718h-1V7.447a1.99,1.99,0,0,0-.77-1.58l-7-5.44a1.983,1.983,0,0,0-2.46,0l-7,5.44a1.985,1.985,0,0,0-.77,1.57L1.7,18.718H.75a.75.75,0,0,0,0,1.5h20a.75.75,0,0,0,0-1.5ZM9.25,4.217h3a.75.75,0,0,1,0,1.5h-3a.75.75,0,0,1,0-1.5Zm6.5,14.5h-10V9.967a1.5,1.5,0,0,1,1.5-1.5h7a1.5,1.5,0,0,1,1.5,1.5Z"
                    transform="translate(301.25 190.533)"
                    fill={color}
                />
            </g>
        </svg>
    );
};

export default ResidentFlatFillIcon;
