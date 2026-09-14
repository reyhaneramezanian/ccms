import { TextField, TextFieldProps, useTheme, Typography } from '@mui/material';
import styled from '@emotion/styled';
import React, { forwardRef, memo, useMemo } from 'react';
import { InputErrorText } from './error';
import { BSLabel, CommonInputRoot } from './styled';
import { MInputProps } from './type.input';
import { memoCompareChanges } from './utils';
import { FieldProps, useField } from 'formik';

import NumberFormat from 'react-number-format';

const CommonTextField = styled(TextField)({
    '& .MuiInputBase-input': {
        //boxSizing: 'revert-layer',
        height: '1em',
        // borderRadius: '8px !important',
        backgroundColor: '#f8f8f8'
    },
    '& .MuiOutlinedInput-input': {
        // borderRadius: '8px !important',
        margin: '0 0 0 0',
        backgroundColor: '#f8f8f8 !important'
    },
    '&:hover': {
        border: 'none !important'
    }
});

export const MInput = memo(
    forwardRef(
        (
            {
                label,
                placeholder,
                maxRows,
                value,
                meta,
                timeshit = false,
                margin = false,
                necessary = true,
                error,
                InputComponent = CommonTextField,
                InputRoot = CommonInputRoot,
                errorSpaceOn = false,
                inputProps,
                showEmptyLabelBox,
                ...rest
            }: TextFieldProps & MInputProps & { showEmptyLabelBox?: boolean },
            ref
        ) => {
            const theme = useTheme();

            return (
                <InputRoot>
                    <Typography variant="body2">
                        <div
                            style={{
                                float: 'left',
                                margin: `${
                                    margin || timeshit ? '-4px 0 3px -35px' : '-4px 0 3px 0'
                                }`,
                                width: `${timeshit ? 'auto' : ''}`,
                                minWidth: `${timeshit ? '150px' : ''}`
                            }}>
                            {label}
                        </div>
                        {necessary && label !== '' && label !== undefined ? (
                            <div
                                style={{
                                    color: '#EB5757',
                                    float: 'left',
                                    margin: '-4px 0 3px 5px'
                                }}>
                                *
                            </div>
                        ) : (
                            ''
                        )}
                    </Typography>
                    {showEmptyLabelBox && <div style={{ height: 22 }} />}

                    <InputComponent
                        placeholder={placeholder}
                        maxRows={maxRows}
                        ref={ref as any}
                        {...rest}
                        value={value}
                        key={rest.name}
                        // label={label}
                        id={rest.name}
                        style={{
                            width: '100%',
                            height: 56,
                            borderRadius: `${
                                timeshit ? '0 8px 8px 0 !important' : '8px !important'
                            }`
                        }}
                        inputProps={{
                            sx: {
                                height: 56,
                                borderRadius: `${
                                    timeshit ? '0 8px 8px 0 !important' : '8px !important'
                                }`,
                                backgroundColor: '#f8f8f8 !important',
                                '&::placeholder': {
                                    color: rest.grayPlaceholder === true ? '#585858' : '#7A7A7A',
                                    opacity: 1,
                                    fontSize: 13,
                                    backgroundColor: '#f8f8f8 !important'
                                },
                                '&:hover': {
                                    border: 'none !important'
                                },
                                ...inputProps
                            }
                        }}
                    />

                    {meta && (
                        <div
                            style={{
                                // float: 'left',
                                margin: `${margin || timeshit ? '0 0 0 -35px' : ''}`
                            }}>
                            <InputErrorText meta={meta} errorSpaceOn={errorSpaceOn} />
                        </div>
                    )}
                </InputRoot>
            );
        }
    ),
    memoCompareChanges
);

export const MInputFormik = memo(
    forwardRef((props: TextFieldProps & MInputProps & { showEmptyLabelBox?: boolean }, ref) => {
        const [field, meta] = useField(props.name);

        return <MInput {...props} {...field} meta={meta} ref={ref as any} />;
    })
);

export const MPhoneNumberFormik = memo(
    forwardRef(
        ({ form, field, name, placeholder, label }: FieldProps<string> & MInputProps, ref) => {
            const meta = useMemo(() => {
                return form.getFieldMeta(field.name);
            }, [form, field]);

            return (
                <NumberFormat
                    ref={ref as any}
                    customInput={MInput}
                    format="(+###) ####-#####"
                    {...field}
                    name={name}
                    placeholder={placeholder}
                    label={label}
                    meta={meta}
                    onChange={(e) => {
                        form.setFieldValue(field.name, e.target.value);
                    }}
                />
            );
        }
    )
);
