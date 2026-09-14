import { copyTextToClipboard } from '@/utils/helper/copyClipboard';
import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useState } from 'react';
import { MText, MTextProps } from '.';

export const EllipsisTypography = styled(MText)<{ numLine: number }>(({ numLine }) => ({
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: numLine,
    WebkitBoxOrient: 'vertical'
}));

const ClipboardTypography = styled(MText)<{
    show: boolean;
    message: string;
}>(({ show, message, theme }) => ({
    position: 'relative',
    ...(show && {
        '&:after': {
            content: `"${message}"`,
            position: 'absolute',
            backgroundColor: `#ffffffCC`,
            right: 0,
            padding: 12,
            color: theme.palette.secondary[700]
        }
    })
}));

export const CopyToClipboardTypography = ({
    text,
    ...rest
}: Omit<MTextProps, 'children'> & {
    text: string;
}) => {
    const [show, setShow] = useState(false);
    useEffect(() => {
        if (show) {
            setTimeout(() => {
                setShow(false);
            }, 1000);
        }
    }, [show]);
    return (
        <ClipboardTypography
            {...rest}
            show={show}
            message={'Copy to clipboard!'}
            onClick={() => {
                copyTextToClipboard(text);
                setShow(true);
            }}>
            {text}
        </ClipboardTypography>
    );
};

export const Title = styled(MText)({
    fontWeight: 'bold'
});
