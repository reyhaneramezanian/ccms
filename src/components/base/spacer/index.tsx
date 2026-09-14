import styled from '@emotion/styled';

interface Props {
    hori?: number;
    vert?: number;
    space?: number | string;
    spaceXs?: number | string;
    spaceSm?: number | string;
    spaceMd?: number | string;
    spaceLg?: number | string;
}

export const Spacer = styled.div<Props>(
    ({ theme, space, hori, vert, spaceXs, spaceSm, spaceMd, spaceLg }) => ({
        ...(hori && {
            margin: `0 ${hori}px`,
            [theme.breakpoints.down.xs]: {
                margin: `0 ${hori / 2}px`
            },
            [theme.breakpoints.down.sm]: {
                margin: `0 ${hori / 1.5}px`
            },
            [theme.breakpoints.down.md]: {
                margin: `0 ${hori / 1.3}px`
            }
        }),
        ...(vert && {
            margin: `${vert}px 0`,
            [theme.breakpoints.down.xs]: {
                margin: `${vert / 2}px 0`
            },
            [theme.breakpoints.down.sm]: {
                margin: `${vert / 1.5}px 0`
            },
            [theme.breakpoints.down.md]: {
                margin: `${vert / 1.3}px 0`
            }
        }),
        ...(space && { margin: space }),
        ...(spaceXs && {
            [theme.breakpoints.down.xs]: {
                margin: spaceXs
            }
        }),
        ...(spaceSm && {
            [theme.breakpoints.down.sm]: {
                margin: spaceSm
            }
        }),
        ...(spaceMd && {
            [theme.breakpoints.down.md]: {
                margin: spaceMd
            }
        }),
        ...(spaceLg && {
            [theme.breakpoints.down.lg]: {
                margin: spaceLg
            }
        })
    })
);

export const CommonSpacer = styled.div({
    margin: '64px 0'
});
