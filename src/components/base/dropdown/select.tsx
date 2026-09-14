import React, { Fragment, memo, useEffect, useMemo, useRef, useState } from 'react';
import { useCallback } from 'react';
import { ArrowDownIcon } from 'src/assets/common/ArrowDownIcon';
import { BSInput, BSLabel, CommonInputRoot, CommonInputWrapper } from '../input/styled';

import { MText } from '../MText';
import { CommonMenuContainer } from './styled';
import { Dropdown, Portal, useDropdownMenu, useDropdownToggle } from 'react-overlays';

import styled from '@emotion/styled';
import { AnyPtrRecord } from 'dns';
import { FieldProps } from 'formik';
import { InputErrorText } from '../input/error';
import useTranslation from '@/i18n/hooks/useTranslation';
import { StyledSpinner } from '../loader/spinner';
import { MInputProps } from '../input/type.input';
import { MenuPortalHOC } from './menuPortalHoc';

export type SelectProps = AppCommonInput & {
    SelectWrapperDiv?: React.FC<any>;
    options?: ArrayOptionLoading;
    nooptText?: string;
    onChange?: (_: AppOptions) => void;
    onBlur?: (_: AnyPtrRecord) => void;
    value?: string | number | undefined;
    option?: string | number | undefined;
    placeholder?: string;
    TypographyComponent?: React.FC<any>;
    loading?: boolean;
    inputProps?: MInputProps;
    errorSpaceOn?: boolean;
    withPortal?: boolean;
    MenuContainerComponent?: AppStyledComponent<any>;
};

type MenuProps = Pick<SelectProps, 'onChange' | 'options' | 'nooptText' | 'MenuContainerComponent'>;
export type ToggleProps = Omit<MInputProps, 'value'> &
    Omit<
        SelectProps,
        'onChange' | 'options' | 'SelectWrapperDiv' | 'onBlur' | 'loading' | 'nooptText'
    >;

export const StyledSelectContainer = styled.div(({ theme }) => ({
    position: 'relative',
    cursor: 'pointer'
}));

const OptionTypography = styled(MText)({
    flex: 1,
    fontWeight: 500
});

const Loader = styled(StyledSpinner)({
    alignSelf: 'center'
});

export const SelectMenu = memo(
    ({ options, onChange, nooptText, MenuContainerComponent = CommonMenuContainer }: MenuProps) => {
        const { t } = useTranslation();
        const { show, props, close } = useDropdownMenu({
            flip: true,
            offset: [0, 0]
        });

        return (
            <MenuContainerComponent
                {...props}
                style={{ ...props.style, opacity: 1, pointerEvents: 'all' }}
                role="menu"
                show={show}>
                {options === 'loading' ? (
                    <Loader />
                ) : options?.length === 0 ? (
                    <MText>{nooptText ?? t('noopt')}</MText>
                ) : (
                    options?.map(({ option, value }, index) => (
                        <MText
                            key={`${value}-${index}`}
                            onClick={(e) => {
                                e.target.dispatchEvent(new Event('input', { bubbles: true }));
                                if (typeof onChange === 'function') {
                                    onChange({ option, value });
                                }
                                close(e as any);
                            }}>
                            {option}
                        </MText>
                    ))
                )}
            </MenuContainerComponent>
        );
    }
);

const Toggle = ({
    label,
    StartAdornment,
    EndAdornment,
    value,
    option,
    InputRoot = CommonInputRoot,
    InputWrapper = CommonInputWrapper,
    InputComponent = BSInput,
    rootStyle,
    wrapperStyle,
    inputStyle,
    TypographyComponent = OptionTypography,
    ...rest
}: ToggleProps) => {
    const [props, { toggle }] = useDropdownToggle();

    return (
        <InputRoot value={false} css={rootStyle}>
            {label && <BSLabel>{label}</BSLabel>}
            <InputWrapper
                css={wrapperStyle}
                {...props}
                onClick={() => {
                    toggle(false);
                }}>
                {StartAdornment && <StartAdornment />}
                <input {...rest} style={{ display: 'none' }} value={value} disabled />
                {(value === '' || value === undefined) && rest.placeholder && (
                    <MText palette="grey" degree="300">
                        {rest.placeholder}
                    </MText>
                )}
                <TypographyComponent>{option}</TypographyComponent>
                <span>
                    <ArrowDownIcon palette="grey" degree="300" />
                </span>
                {EndAdornment && <EndAdornment />}
            </InputWrapper>
        </InputRoot>
    );
};

export const Select = memo(
    ({
        SelectWrapperDiv = StyledSelectContainer,
        onChange,
        options,
        nooptText,
        inputProps,
        withPortal = false,
        MenuContainerComponent,
        ...props
    }: SelectProps) => {
        const [show, setShow] = useState(false);
        const onToggle = useCallback(() => {
            setShow((prevProps) => !prevProps);
        }, []);
        const MenuWrapper = useMemo(() => {
            if (withPortal) return MenuPortalHOC;
            return Fragment;
        }, [withPortal]);

        return (
            <Dropdown
                {...props}
                show={show}
                onToggle={onToggle}
                itemSelector="button:not(:disabled)">
                {({ dp }: any) => (
                    <SelectWrapperDiv {...dp}>
                        <Toggle {...props} {...(inputProps as any)} />
                        <MenuWrapper>
                            <SelectMenu
                                onChange={onChange}
                                options={options}
                                nooptText={nooptText}
                                MenuContainerComponent={MenuContainerComponent}
                                {...props}
                            />
                        </MenuWrapper>
                    </SelectWrapperDiv>
                )}
            </Dropdown>
        );
    },
    (prev, next) =>
        prev.name === next.name &&
        prev.value === next.value &&
        prev.option === next.option &&
        prev.options === next.options
);

export const MSelectInput = memo(({ options, value, ...props }: SelectProps) => {
    const selected: AppOptions = useMemo(() => {
        return typeof options === 'object'
            ? options.find((option) => option.value === value) || {
                  option: '',
                  value: ''
              }
            : { option: '', value: '' };
    }, [value, options]);

    return <Select {...props} options={options} {...selected} />;
});

export const MSelectInputFormik = memo(
    ({ form, field, options, errorSpaceOn = false, ...rest }: FieldProps<string> & SelectProps) => {
        const onChange = useCallback(
            (option) => {
                form.setFieldValue(field.name, option.value);
            },
            [form, field]
        );

        const selected: AppOptions = useMemo(() => {
            return typeof options === 'object'
                ? options.find((option) => option.value === field.value) || {
                      option: '',
                      value: ''
                  }
                : { option: '', value: '' };
        }, [field, options]);

        const meta = useMemo(() => {
            return form.getFieldMeta(field.name);
        }, [form, field]);

        return (
            <>
                <Select
                    {...rest}
                    options={options}
                    name={field.name}
                    value={selected?.value}
                    option={selected?.option}
                    onChange={onChange}
                    onBlur={field.onBlur}
                />

                <InputErrorText meta={meta} errorSpaceOn={errorSpaceOn} />
            </>
        );
    }
);
