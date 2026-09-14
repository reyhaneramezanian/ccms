import { SVGAttributes } from 'react';

export default function TableSearchIcon({ ...props }: SVGAttributes<SVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12.311"
            height="12.318"
            viewBox="0 0 12.311 12.318"
            {...props}>
            <path
                id="ic_round-search"
                d="M10.9,9.818h-.57l-.2-.195a4.718,4.718,0,1,0-.505.505l.195.2v.57l3.069,3.069a.761.761,0,0,0,1.076-1.076Zm-4.333,0A3.249,3.249,0,1,1,9.818,6.569,3.245,3.245,0,0,1,6.569,9.818Z"
                transform="translate(-1.874 -1.874)"
                fill="#8b8b8b"
            />
        </svg>
    );
}
