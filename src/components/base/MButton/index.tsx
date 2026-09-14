import { Fragment } from 'react';
import { SpinnerProps } from 'spinners-react/lib/esm/helpers';
import { StyledButtonSpinner } from '../loader/spinner';
import { MText, MTextProps } from '../MText';
import { BSButton, BSButtonWrapper, SButtonContained, SButtonOutline, SButtonText } from './styled';
import { MButtonProps } from './types.button';

type Props = MButtonProps &
    Partial<AppCommonChild> & {
        textProps?: MTextProps;
        loaderProps?: SpinnerProps;
        ButtonWrapper?: any;
        ButtonComponent?: React.FC<MButtonProps>;
        text?: string;
        loading?: boolean;
        onPress?: MButtonProps['onClick'];
        onLongPress?: MButtonProps['onDoubleClick'];
        textStyle?: MTextProps['style'];
        transparent?: boolean;
        iconLeft?: any;
        iconRight?: any;
        iconTop?: any;
        iconBottom?: any;
        rippleColor?: string;
        primary?: boolean;
        secondary?: boolean;
        disabledColor?: string;
        backgroundImage?: string;
        containerStyle?: MButtonProps['style'];
        gradient?: string | Array<string>;
    };

export const MButton = ({
    children,
    text,
    onPress,
    onLongPress,
    style,
    textStyle,
    disabled,
    color,
    transparent,
    iconLeft,
    iconRight,
    iconTop,
    iconBottom,
    rippleColor,
    primary,
    secondary,
    disabledColor,
    backgroundImage,
    containerStyle,
    gradient,
    textProps,
    loaderProps,
    loading,
    variant,
    type = 'button',
    ButtonComponent = variant === 'contained'
        ? SButtonContained
        : variant === 'outlined'
        ? SButtonOutline
        : variant === 'text'
        ? SButtonText
        : BSButton,
    ButtonWrapper = typeof loading === 'boolean' ? BSButtonWrapper : Fragment,
    ...props
}: Props) => {
    function createRipple(e) {
        const button = e.currentTarget;

        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${e.clientX - button.offsetLeft - radius}px`;
        circle.style.top = `${e.clientY - button.offsetTop - radius}px`;
        circle.classList.add('ripple');

        const ripple = button.getElementsByClassName('ripple')[0];

        if (ripple) {
            ripple.remove();
        }

        button.appendChild(circle);
        if (onPress) {
            onPress(e);
        } else if (props.onClick) {
            props.onClick(e);
        }
    }

    return (
        <ButtonWrapper {...(typeof loading === 'boolean' && { css: containerStyle })}>
            <ButtonComponent
                onClick={createRipple}
                onDoubleClick={onLongPress}
                css={style}
                type={type}
                disabled={disabled || loading}
                {...props}>
                {children ? (
                    children
                ) : (
                    <MText css={textStyle} {...textProps}>
                        {text}
                    </MText>
                )}
            </ButtonComponent>
            {loading && <StyledButtonSpinner size={25} {...loaderProps} />}
        </ButtonWrapper>
    );
};
