import { FieldMetaProps } from 'formik';
import React, { forwardRef, memo } from 'react';
import { InputErrorText } from './error';
import { BSInput, BSLabel, BSTextArea, CommonInputRoot, CommonInputWrapper } from './styled';
import { MInputProps } from './type.input';
import { memoCompareChanges } from './utils';

export const MInput = memo(
    forwardRef(
        (
            {
                label,
                StartAdornment,
                EndAdornment,
                value,
                meta,
                error,
                multiline = false,
                InputRoot = CommonInputRoot,
                InputWrapper = CommonInputWrapper,
                InputComponent = multiline ? BSTextArea : BSInput,
                rootStyle,
                wrapperStyle,
                inputStyle,
                errorSpaceOn = false,
                fullWidth,
                ...rest
            }: MInputProps & { error?: string; meta?: FieldMetaProps<any>; fullWidth?: boolean },
            ref
        ) => {
            return (
                <InputRoot css={rootStyle} value={Boolean(value)}>
                    {label && <BSLabel>{label}</BSLabel>}
                    <InputWrapper
                        fullWidth={fullWidth}
                        css={wrapperStyle}
                        error={meta?.touched && Boolean(error || meta?.error)}>
                        {StartAdornment && <StartAdornment className="start-adornment" />}
                        <InputComponent
                            ref={ref as any}
                            css={inputStyle}
                            {...rest}
                            value={value}
                            key={rest.name}
                            id={rest.name}
                        />

                        {EndAdornment && <EndAdornment className="end-adornment" value={value} />}
                    </InputWrapper>
                    {meta && <InputErrorText meta={meta} errorSpaceOn={errorSpaceOn} />}
                </InputRoot>
            );
        }
    ),
    memoCompareChanges
);
