import { SVGAttributes } from 'react';

export default function SortDownIcon({ ...props }: SVGAttributes<SVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="7" viewBox="0 0 10 7" {...props}>
            <g
                id="Polygon_3"
                data-name="Polygon 3"
                transform="translate(10 7) rotate(180)"
                fill="#e74753">
                <path d="M5,0l5,7H0Z" stroke="none" />
                <path
                    d="M 5 1.720461845397949 L 1.94318675994873 6 L 8.05681324005127 6 L 5 1.720461845397949 M 5 0 L 10 7 L 0 7 L 5 0 Z"
                    stroke="none"
                    fill="#222"
                />
            </g>
        </svg>
    );
}
