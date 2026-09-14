export const breakpointsKeys = {
    xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1300,
};
type BreakpointType = Record<keyof typeof breakpointsKeys, string>;
export const BP_DN: BreakpointType = Object.keys(breakpointsKeys).reduce(
    (acc, key) => ({
        ...acc,
        [key]: `@media(max-width: ${(breakpointsKeys as any)[key]}px)`
    }),
    {} as BreakpointType
);
export const BP_UP: BreakpointType = Object.keys(breakpointsKeys).reduce(
    (acc, key) => ({
        ...acc,
        [key]: `@media(min-width: ${(breakpointsKeys as any)[key]}px)`
    }),
    {} as BreakpointType
);

const heightBreakpointsKeys = {
    xs: 600,
    sm: 800,
    md: 1080,
    lg: 1600,
    xl: 2000
};

export const BP_UP_H: BreakpointType = Object.keys(heightBreakpointsKeys).reduce(
    (acc, key) => ({
        ...acc,
        [key]: `@media(min-height: ${(heightBreakpointsKeys as any)[key]}px)`
    }),
    {} as BreakpointType
);
export const BP_DN_H: BreakpointType = Object.keys(heightBreakpointsKeys).reduce(
    (acc, key) => ({
        ...acc,
        [key]: `@media(max-height: ${(heightBreakpointsKeys as any)[key]}px)`
    }),
    {} as BreakpointType
);
