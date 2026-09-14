import { IIcon } from './type';

const IntercomCalling = ({ width = 16, height = 16, color = '#3dcc79' }: IIcon) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 0 16.042 16.042">
            <path
                id="Phone"
                d="M6.4,2a2.213,2.213,0,0,1,2.21,1.9v.007a8.6,8.6,0,0,0,.47,1.885v0a2.209,2.209,0,0,1-.5,2.334l0,0-.511.51a10.931,10.931,0,0,0,3.322,3.314l.516-.515a2.216,2.216,0,0,1,2.334-.5,8.646,8.646,0,0,0,1.889.47h.007a2.212,2.212,0,0,1,1.9,2.234v2.15a2.336,2.336,0,0,1-.186.922,2.215,2.215,0,0,1-2.227,1.316h-.014a15.235,15.235,0,0,1-6.633-2.354,14.991,14.991,0,0,1-4.613-4.6A15.171,15.171,0,0,1,2.01,4.422V4.41A2.213,2.213,0,0,1,4.212,2Z"
                transform="translate(-2 -2)"
                fill={color}
                fillRule="evenodd"
            />
        </svg>
    );
};

export default IntercomCalling;
