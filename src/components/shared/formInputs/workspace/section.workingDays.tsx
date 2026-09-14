import { MText } from '@/components/base/MText';
import { CheckboxProps } from '@/components/base/toggle/Checkbox';
import { StyledCheckbox } from '@/components/base/toggle/styled';
import { StyledRow } from '@/components/base/view-container/Row';
import styled from '@emotion/styled';
import { Field } from 'formik';
import { memo, useEffect, useRef, useState } from 'react';
import { N_WORKINGHOUR as N, WORKING_DAYS } from '../utilities/input.constant';

type Props = { name: string } & Pick<WeekDayCheckProps, 'WeekdayComponent' | 'WrapperComponent'>;

export const WeekdayCheck = styled(MText)<{ checked?: boolean; active?: boolean; c?: string }>(
    ({
        theme,
        checked,
        active,
        c = active ? theme.palette.info.yellow : theme.palette.primary.main
    }) => ({
        width: '3ch',
        height: '3ch',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: !active && !checked ? '#FFF' : c,
        border: `1px solid ${c}`,
        borderRadius: 4,
        color: !checked && !active ? theme.palette.primary.main : theme.palette.primary.light
    })
);

export type WeekDayCheckProps = CheckboxProps &
    AppBaseColorType & {
        WrapperComponent?: any;
        WeekdayComponent?: any;
        errorSpaceOn?: boolean;
        date: string;
        setDate: (_: string) => void;
        d: string;
    };

export const WeekdayCheckbox = memo(
    ({
        optionName,
        direction,
        onChange,
        value,
        meta,
        setDate,
        d,
        date,
        palette = 'primary',
        degree = 'main',
        palette2 = 'text',
        degree2 = 'main',
        errorSpaceOn = false,
        WrapperComponent = StyledCheckbox,
        WeekdayComponent = WeekdayCheck,

        ...props
    }: WeekDayCheckProps) => {
        const [disabled, setDisabled] = useState(false);
        const checked = Boolean(value);
        const prevChecked = useRef(undefined);
        useEffect(() => {
            if (prevChecked.current !== checked) {
                prevChecked.current = checked;
                if (!checked) {
                    setDate(undefined);
                    setDisabled(false);
                }
            }
        }, [checked, setDate, date, d]);
        const prevDate = useRef(undefined);
        useEffect(() => {
            if (prevDate.current !== date) {
                prevDate.current = date;
                if (date === d) {
                    setDisabled(false);
                } else if (checked) {
                    setDisabled(true);
                }
            }
        }, [date, d, checked]);

        return (
            <WrapperComponent selected={true}>
                <WeekdayCheck
                    onClick={() => {
                        setDate(d);
                    }}
                    active={d === date}
                    span
                    variant="h2"
                    checked={checked}>
                    {optionName}
                </WeekdayCheck>
                <input
                    {...props}
                    type="checkbox"
                    onChange={onChange}
                    disabled={disabled}
                    value={value}
                    checked={checked}
                />
            </WrapperComponent>
        );
    },
    (prev, next) =>
        prev.checked === next.checked && prev.value === next.value && prev.date === next.date
);

export const FormInputWorkingDay = memo(
    ({
        date,
        setDate,
        name,
        ...rest
    }: { date: string; setDate: any } & Props) => {
        return (
            <StyledRow wrap="true">
                {WORKING_DAYS.map(({ d, optionName }) => (
                    <Field name={`${name}.${d}.${N.dayOfWeek}`} key={d}>
                        {({ field, meta }: any) => (
                            <WeekdayCheckbox
                                date={date}
                                name={`${name}.${d}.${N.dayOfWeek}`}
                                optionName={optionName}
                                setDate={setDate}
                                d={d}
                                {...rest}
                                meta={meta}
                                {...field}
                            />
                        )}
                    </Field>
                ))}
            </StyledRow>
        );
    }
);
