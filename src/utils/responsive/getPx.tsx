// assumtions:
// The design size is 1920 * 1080 which makes the ratio of 1.5. The same ratio is considered for the user's display

const DESIGN_HEIGHT = 1080;
const DESIGN_WIDTH = 1920;

export const getPx = (value: number) => {
    if (typeof window === 'undefined') return value;

    const height = Math.min(screen.height, screen.width);

    return (value * height) / DESIGN_HEIGHT;
};
