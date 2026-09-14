import styled from '@emotion/styled';

export const StyledAvatar = styled.div<{ uploading?: boolean; error?: boolean }>(
    ({ theme, uploading, error }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        ...(uploading && { opacity: 0.5 }),
        ...(error && {
            boxShadow: `inset 0 0 10px 4px ${theme.palette.red.main}99`
        }),
        overflow: 'hidden',

        // width: 72,
        // height: 72,

        // '& > img': {
        //     width: '100%',
        //     height: '100%',
        //     border: `1px solid${theme.palette.secondary['700']}`
        // }
    })
);
