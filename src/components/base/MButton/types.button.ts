import themeObj from '@/provider/theme/themeObject';

type Radius = keyof typeof themeObj['shape']['borderRadius'];

export type MButtonStyleProps = AppBaseColorType &
    AppTypographyWeight & {
        radius?: Radius;
        active?: boolean;
        loading?: boolean;
        variant?: 'text' | 'contained' | 'outlined';
        hoverEffect?: 'common' | 'none';
    };

export type MButtonProps = React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
> &
    MButtonStyleProps;
