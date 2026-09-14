import useTranslation from '@/i18n/hooks/useTranslation';
import { getWorkHourInputName } from '@/utils/dateTime/time';
import styled from '@emotion/styled';
import { Field, useField } from 'formik';
import React, { memo, useRef } from 'react';
import { useMemo } from 'react';
import { ClockIcon } from 'src/assets/common/ClockIcon';
import { MSelectInputFormik, StyledSelectContainer, ToggleProps } from '../dropdown/select';

import { MText } from '../MText';
import { Spacer } from '../spacer';
import { StyledColumn } from '../view-container/Column';
import { StyledRow } from '../view-container/Row';
import { BSInput, BSLabel, BSTwoDigitInputContainer, CommonInputRoot } from './styled';
import { useSubmitOnBlur } from './submitOnBlur';
import { MInputProps } from './type.input';
import { memoCompareChanges } from './utils';

export const BSTwoDigitInput = styled(BSInput)({
    width: 'calc(2ch + 4px)',
    textAlign: 'center',
    margin: 'auto',
    minWidth: '2ch'
});

type TwoDigitInputProps = MInputProps & {
    InputComponent?: AppStyledComponent<any>;
    InputWrapper?: AppStyledComponent<any>;
    submitOnBlur?: (_: any) => void;
};

export const CCTwoDigitInputField = memo(
    ({
        InputComponent = BSTwoDigitInput,
        InputWrapper = BSTwoDigitInputContainer,
        submitOnBlur,
        value,
        onInput,
        ...props
    }: TwoDigitInputProps) => {
        const { onBlur, onChange } = useSubmitOnBlur(submitOnBlur);
        const handleChange: MInputProps['onChange'] = (e) => {
            onChange();
            if (e.target.value.length <= 2) {
                props.onChange && props?.onChange(e);
            }
        };
        const ref = useRef<HTMLInputElement | null>();

        return (
            <InputWrapper onClick={() => ref.current?.focus()} value={Boolean(value)}>
                <InputComponent
                    onBlur={onBlur}
                    onChange={handleChange}
                    type="number"
                    onInput={(e: any) => {
                        onInput && onInput(e);
                        if (e.target.value.length > 2) e.target.value = e.target.value.slice(0, 2);
                    }}
                    value={value}
                    {...props}
                    ref={(refs: HTMLInputElement) => (ref.current = refs)}
                />
            </InputWrapper>
        );
    },
    memoCompareChanges
);

export const FormikTwoDigitInputField = (props: Omit<TwoDigitInputProps, 'value' | 'ref'>) => {
    const [field, meta] = useField(props.name);
    return <CCTwoDigitInputField {...props} {...field} />;
};

const WrapperTimeInput = styled.div({
    margin: 16
});

const SelectWrapperDiv = styled(CommonInputRoot)({
    minWidth: 100
});

const AMPMSelect = memo(({ name, ...rest }: { name: string }) => {
    return (
        <Field
            name={name}
            InputRoot={SelectWrapperDiv}
            component={MSelectInputFormik}
            options={[
                { option: 'AM', value: 'AM' },
                { option: 'PM', value: 'PM' }
            ]}
            {...rest}
            placeholder={'am/pm'}
        />
    );
});

export const FormikTimeHMInput = memo(
    ({
        label,
        WrapperComponent = WrapperTimeInput,
        name,
        InputProps = {},
        SelectProps = {}
    }: {
        SelectProps?: Pick<ToggleProps, 'InputComponent' | 'InputWrapper'>;
        InputProps?: Pick<TwoDigitInputProps, 'InputComponent' | 'InputWrapper'>;
        name: string;
        label?: string;
        WrapperComponent?: React.FC<any>;
    }) => {
        const { t } = useTranslation();
        const { hourName, minName, ampmName } = useMemo(() => {
            return getWorkHourInputName(name);
        }, [name]);

        return (
            <WrapperComponent>
                <StyledRow alignItems="center" wrap="true">
                    <MText span css={{ width: '5ch' }} variant="h6">
                        {label}
                    </MText>
                    <ClockIcon />
                    <MText span>{t('time')}</MText>

                    <StyledRow css={{ marginTop: 8 }} alignItems="center">
                        <FormikTwoDigitInputField
                            name={hourName}
                            onInput={(e) => {
                                if (+(e.target as any).value > 12) (e.target as any).value = 12;
                            }}
                            {...InputProps}
                        />
                        <MText css={{ margin: 8 }} variant="h2" fontWeight="bold">
                            :
                        </MText>
                        <FormikTwoDigitInputField
                            name={minName}
                            onInput={(e) => {
                                if (+(e.target as any).value > 59) (e.target as any).value = 59;
                            }}
                            {...InputProps}
                        />
                        <Spacer space="8px" />
                        <AMPMSelect name={ampmName} {...SelectProps} />
                    </StyledRow>
                </StyledRow>
            </WrapperComponent>
        );
    },
    (prev, next) => prev.name === next.name
);
