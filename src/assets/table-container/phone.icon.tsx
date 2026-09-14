import { SVGAttributes } from 'react';
import styled from '@emotion/styled';

export default function PhoneIcon({ ...props }: SVGAttributes<SVGElement>) {
    return (
        <svg
            id="Group_22125"
            data-name="Group 22125"
            xmlns="http://www.w3.org/2000/svg"
            width="42.92"
            height="43"
            viewBox="0 0 42.92 43"
            {...props}>
            <path
                id="Path_39331"
                data-name="Path 39331"
                d="M38.455,30.319a3.947,3.947,0,0,0-5.716,0l-3.675,5.1a28.41,28.41,0,0,1-7.757-5.1,25.616,25.616,0,0,1-5.1-7.757l5.1-3.675a3.947,3.947,0,0,0,0-5.716l-5.92-6.124a4.346,4.346,0,0,0-5.716,0l-5.716,5.92c-4.083,4.083.612,14.9,10,24.5s20.618,14.086,24.5,10l5.716-5.716a3.947,3.947,0,0,0,0-5.716Zm4.491,10L37.23,46.037c-3.062,2.858-12.861-1.225-21.843-10C6.609,27.257,2.526,17.254,5.384,14.4L11.1,8.68a1.973,1.973,0,0,1,2.858,0L19.674,14.4a1.973,1.973,0,0,1,0,2.858l-4.9,3.675a1.832,1.832,0,0,0-.612,2.45,34.955,34.955,0,0,0,5.512,8.37c2.041,2.246,4.7,3.879,8.37,5.512a1.891,1.891,0,0,0,2.45-.612l3.675-4.9a1.973,1.973,0,0,1,2.858,0l5.716,5.716A2.186,2.186,0,0,1,42.946,40.321Z"
                transform="translate(-2.475 -5.975)"
                fill="#d6e1ff"
            />
        </svg>
    );
}

export function CellPhoneIcon({ ...props }: SVGAttributes<SVGElement>) {
    return (
        <svg
            id="noun_Phone_892021"
            xmlns="http://www.w3.org/2000/svg"
            width="12.538"
            height="21.199"
            viewBox="0 0 12.538 21.199"
            {...props}>
            <g id="Group_22473" data-name="Group 22473" transform="translate(0 0)">
                <path
                    id="Path_39406"
                    data-name="Path 39406"
                    d="M25.554,958.362A2.608,2.608,0,0,0,23,961.012v15.9a2.608,2.608,0,0,0,2.554,2.65h7.43a2.608,2.608,0,0,0,2.554-2.65v-15.9a2.608,2.608,0,0,0-2.554-2.65Zm0,.964h7.43a1.631,1.631,0,0,1,1.611,1.446H23.943A1.631,1.631,0,0,1,25.554,959.326Zm-1.625,2.409H34.609v13.49H23.929Zm0,14.454H34.609v.723a1.643,1.643,0,0,1-1.625,1.686h-7.43a1.643,1.643,0,0,1-1.625-1.686Zm5.34.482a.723.723,0,1,0,.7.723A.71.71,0,0,0,29.269,976.671Z"
                    transform="translate(-23 -958.362)"
                    fill="#8b8b8b"
                />
            </g>
        </svg>
    );
}

const InlineBlockSpan = styled.span({
    display: 'inline-block'
});

const Flex = styled.div({
    display: 'flex'
});

const SpanNumber = styled.span({
    marginLeft: '6px'
});

type props = SVGAttributes<SVGElement> & { phoneNumber: string | number };

export function TableCellPhone({ phoneNumber, ...props }: props) {
    return (
        <InlineBlockSpan>
            <Flex>
                <CellPhoneIcon {...props} />
                <SpanNumber>{phoneNumber}</SpanNumber>
            </Flex>
        </InlineBlockSpan>
    );
}
