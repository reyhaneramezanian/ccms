import COLORS from '@/utils/theme/colors';
import styled from '@emotion/styled';
import { getPaletteColor, getTextColor, textWeight } from 'src/utils/theme/helper';
import { MText } from '../MText';

export interface StyledInputValueProps {
    value?: boolean;
    error?: boolean;
    min_w?: number;
}

export const BSInput = styled.input<AppBaseColorType & AppTypographyVariant & AppTypographyWeight>(
    ({
        theme,
        fontWeight: weight = 'medium',
        variant = 'body1',
        palette,
        degree,
        css,
        disabled
    }) => ({
        ...(css && css),
        color: getTextColor({ degree, palette }),
        ...(disabled && { opacity: 0.7 }),
        fontWeight: textWeight[weight],
        '&::placeholder': {
            color: COLORS.grey4,
            fontWeight: 400
        },
        padding: 0,
        minWidth: 100,
        flex: 1,
        backgroundColor: 'inherit',
        border: 'none',
        outline: 'none',
        '&:-webkit-autofill': {
            transitionDelay: '9999s',
            transitionProperty: 'background-color, color'
        },
        ...theme.typography[variant]
    })
);

export const BSTextArea = styled.textarea<
    AppBaseColorType & AppTypographyVariant & AppTypographyWeight
>(({ theme, fontWeight: weight = 'medium', variant = 'body1', palette, degree, css }) => ({
    ...(css && css),
    color: getTextColor({ degree, palette }),
    fontWeight: textWeight[weight],
    '&::placeholder': {
        color: theme.palette.palette.grey.main,
        fontWeight: 400
    },
    padding: 0,
    minWidth: 150,
    flex: 1,
    backgroundColor: 'inherit',
    border: 'none',
    outline: 'none',
    '&:-webkit-autofill': {
        transitionDelay: '9999s',
        transitionProperty: 'background-color, color'
    },
    ...theme.typography[variant]
}));

export const BSInputContainer = styled.div<StyledInputValueProps>(({ theme, css }) => ({
    ...(css && css),
    minWidth: 100,
    width: '100%',
    '& > p': {
        margin: 0,
        marginBottom: 8,
        // transform: theme.typography.transform.small,
        transformOrigin: 'bottom left'
    }
}));

export const CommonInputRoot = styled(BSInputContainer)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        borderRadius: 8,
        backgroundColor: '#F2F3F7',
        '& fieldset': {
            borderColor: '#F2F3F7'
        },
        '&.Mui-focused fieldset': {
            borderColor: '#F2F3F7'
        }
    }
}));

export const CommonSelectRoot = styled(BSInputContainer)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        borderRadius: 8,
        backgroundColor: '#F2F3F7',
        height: 48,
        '& fieldset': {
            borderColor: '#F2F3F7'
        },
        '&.Mui-focused fieldset': {
            borderColor: '#F2F3F7'
        }
    }
}));

export const CommonInputWrapper = styled.div<{ error?: boolean; fullWidth: boolean }>(
    ({ theme, error, css, fullWidth }) => ({
        ...(css && css),
        border: '1px solid',
        borderColor: theme.palette.text.main,
        borderRadius: theme.shape.borderRadius.common,
        display: 'flex',
        alignItems: 'center',
        '& > button': {
            padding: 0
        },
        padding: '5px 10px',
        ...(error && {
            borderColor: 'red'
        }),
        '& .start-adornment': {
            marginRight: 16
        },
        maxWidth: fullWidth ? '' : '20px',
        '@media(max-width:800px)': {
            maxWidth: 'unset'
        }
    })
);

export const ModalSearchInput = styled(BSInput)({
    cursor: 'pointer',
    minWidth: 100
});

export const BSTwoDigitInputContainer = styled.div<StyledInputValueProps>(
    ({ theme, value, css }) => ({
        ...(css && css),
        border: '1px solid',
        borderColor: theme.palette.text.main,
        borderRadius: theme.shape.borderRadius.common,
        cursor: 'text',
        padding: 16,
        // marginRight: 16,
        display: 'inline-block',
        'input::-webkit-outer-spin-button, input::-webkit-inner-spin-button': {
            WebkitAppearance: 'none',
            margin: 0
        },
        'input[type=number]': {
            MozAppearance: 'textfield'
        }
    })
);

export const BSLabel = styled(MText)(({ theme }) => ({
    ...theme.typography.h6,
    margin: '8px 0 ',
    marginTop: 0,
    // transform: theme.typography.transform.small,
    transformOrigin: 'bottom left',
    fontSize: 14
}));
