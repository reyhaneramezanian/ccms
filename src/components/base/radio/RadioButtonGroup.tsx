import { Field, FieldMetaProps } from 'formik';

import { StyledRadioButton, StyledRadioButtonGroup, StyledRadioOption } from './styled';
import { MText } from '../MText';
import { InputErrorText } from '../input/error';
import { StyledRow } from '../view-container/Row';
import React, { memo, useMemo } from 'react';
import { StyledColumn } from '../view-container/Column';
import { Grid, GridProps } from '@material-ui/core';
import { BSLabel } from '../input/styled';
import RadioButtonIcon from 'src/assets/common/radio-button';
import { Spacer } from '../spacer';
import { Typography } from '@mui/material';

export interface RadioGroupProps {
    name: string;
    options: Array<
        AppOptions & { Subtitle?: string | React.FC<any>; subtitleMeta?: Record<any, any> }
    >;
    label?: string;
    gridContainer?: GridProps;
    gridItem?: GridProps;
    WrapperComponent?: AppStyledComponent<any>;
    StyledInput?: AppStyledComponent<any>;
}

export const RadioButtonGroup = memo(
    ({
        label,
        options,
        gridContainer,
        gridItem,
        onChange,
        meta,
        WrapperComponent = StyledRadioButtonGroup,
        StyledInput = StyledRadioButton,
        value: selectedValue,
        errorSpaceOn,
        ...props
    }: RadioGroupProps & {
        meta?: FieldMetaProps<any>;
        errorSpaceOn?: boolean;
        value: string;
        onChange: (_: { target: { value: string } }) => void;
    }) => {
        console.log('se', selectedValue);

        return (
            <WrapperComponent>
                {label && <BSLabel fontWeight="semibold">{label}</BSLabel>}
                <Grid container {...gridContainer}>
                    {options?.map(({ value, option, Subtitle, subtitleMeta }) => (
                        <Grid item key={value} {...gridItem}>
                            <StyledInput id={value} selected={selectedValue === value}>
                                <input type="radio" onChange={onChange} {...props} value={value} />
                                <div>
                                    <StyledRadioOption fontWeight="medium">
                                        <RadioButtonIcon
                                            selected={
                                                selectedValue === String(option).toLowerCase()
                                            }
                                        />
                                        <Spacer space={4} />
                                        <Typography>{option}</Typography>
                                    </StyledRadioOption>
                                    {Subtitle && typeof Subtitle === 'string' && (
                                        <MText variant="body2" span>
                                            {Subtitle}
                                        </MText>
                                    )}
                                </div>
                            </StyledInput>
                            {Subtitle && typeof Subtitle !== 'string' && (
                                <Subtitle {...(subtitleMeta && subtitleMeta)} />
                            )}
                        </Grid>
                    ))}
                </Grid>
                {meta && <InputErrorText meta={meta} errorSpaceOn={errorSpaceOn} />}
            </WrapperComponent>
        );
    },
    (prev, next) =>
        prev.name === next.name && prev.value === next.value && prev.options === next.options
);

const FormikRadioButtonGroup = (props: RadioGroupProps & { errorSpaceOn?: boolean }) => {
    return (
        <Field {...props}>
            {({ field, meta }: any) => <RadioButtonGroup meta={meta} {...props} {...field} />}
        </Field>
    );
};

export default FormikRadioButtonGroup;
