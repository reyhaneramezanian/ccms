const data = {
    min: {
        xs: 575.98,
        sm: 576,
        md: 768,
        lg: 992,
        xl: 1200
    },
    max: {
        xs: 575.98,
        sm: 767.98,
        md: 991.98,
        lg: 1199.98,
        xl: 500000
    }
};

const mediaScreen = (
    device: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
    syntax: 'min' | 'max' = 'max'
): string => {
    const mediaGenerator = (size: number) => {
        return syntax === 'max' ? `@media (max-width: ${size}px)` : `@media (min-width: ${size}px)`;
    };

    return mediaGenerator(data[syntax][device]);
};

export default mediaScreen;
