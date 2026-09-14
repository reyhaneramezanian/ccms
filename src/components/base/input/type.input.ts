import { SelectProps, TextFieldProps } from '@mui/material';
import { FieldMetaProps } from 'formik';
import { DetailedHTMLProps, InputHTMLAttributes, ReactElement } from 'react';

export type AppHtmlInputProps = DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
>;

export type BaseInputProps = {
    name: string;
    InputRoot?: React.FC<any>;
    errorSpaceOn?: boolean;
    error?: string;
    label?: string;
    minHeight?: string;
    placeholder?: string;
    meta?: FieldMetaProps<any>;
    necessary?: boolean;
    margin?: boolean;
    timeshit?: boolean;
};

export type MInputProps = React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
> &
    React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLInputElement>, HTMLInputElement> &
    AppTypographyWeight &
    AppTypographyVariant &
    AppBaseColorType & {
        name: string;
        label?: string | ReactElement<any, any>;
        multiline?: boolean;
        grayPlaceholder?: boolean;
        StartAdornment?: React.FC<any>;
        EndAdornment?: React.FC<any>;
        InputRoot?: React.FC<any>;
        InputComponent?: React.FC<any> | React.FC<TextFieldProps>;
        InputWrapper?: React.FC<any>;
        rootStyle?: AppStyle;
        wrapperStyle?: AppStyle;
        inputStyle?: AppStyle;
        errorSpaceOn?: boolean;
    } & BaseInputProps;

export type MSelectProps = BaseInputProps & {
    label?: string;
    InputComponent?: React.FC<SelectProps>;
};
