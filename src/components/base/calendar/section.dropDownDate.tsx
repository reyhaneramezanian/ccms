import { MSelectInput, MSelectInputFormik } from '@/components/base/dropdown/select';
import { StyledRow } from '@/components/base/view-container/Row';
import { Field } from 'formik';
import { memo } from 'react';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import styled from '@emotion/styled';
import { CommonInputRoot } from '../input/styled';
import { DATE_POST_FIX, MONTH_POST_FIX, YEAR_POST_FIX } from '@/utils/dateTime/time';
import { DateObject } from 'react-multi-date-picker';

dayjs.extend(localeData);

type OnCalendarChangeType = { type: 'month' | 'day' | 'year'; value: any };

export const DropDownDatePicker = memo(
    ({
        onDateChange
    }: {
        onDateChange: (_: OnCalendarChangeType) => void;
        clearField: () => void;
    }) => {
        return (
            <StyledRow>
                <MSelectInput
                    name="cal-month"
                    options={[{ option: 't', value: 't' }]}
                    onChange={(value) => {
                        onDateChange({ type: 'month', value });
                    }}
                />
                <MSelectInput
                    onChange={(value) => {
                        onDateChange({ type: 'day', value });
                    }}
                    name="cal-day"
                    options={[{ option: 't1', value: 't1' }]}
                />
                <MSelectInput
                    onChange={(value) => {
                        onDateChange({ type: 'year', value });
                    }}
                    name="cal-year"
                    options={[{ option: 't2', value: 't2' }]}
                />
            </StyledRow>
        );
    }
);

const SelectInput = styled(CommonInputRoot)({
    width: 'auto',
    minWidth: '100px !important',
    margin: 8
});
const DaysOptions = Array.from(Array(31), (_, i) => ({ option: i + 1, value: i + 1 }));

const MonthsOptions = new DateObject().locale.months.map(([name, shortName], index) => ({
    value: index,
    option: shortName
}));

const firstYear = 2010;
const YearsOptions = Array.from(Array(90), (_, i) => ({
    option: firstYear - i,
    value: firstYear - i
}));

export const DropDownDatePickerFormik = ({ name }: { name: string }) => {
    return (
        <StyledRow
            css={{
                "& div[class*='StyledSelectContainer']:first-of-type": {
                    width: 55,
                    marginRight: 12,
                    "& div[class*='CommonInputWrapper']": {
                        width: 55
                    }
                },
                "& div[class*='StyledSelectContainer']:last-of-type": {
                    width: 75,
                    "& div[class*='CommonInputWrapper']": {
                        width: 75
                    }
                }
            }}>
            <Field
                name={`${name}.${DATE_POST_FIX}`}
                InputRoot={SelectInput}
                component={MSelectInputFormik}
                options={DaysOptions}
                errorSpaceOn={true}
            />
            <Field
                name={`${name}.${MONTH_POST_FIX}`}
                InputRoot={SelectInput}
                component={MSelectInputFormik}
                options={MonthsOptions}
                errorSpaceOn={true}
            />
            <Field
                name={`${name}.${YEAR_POST_FIX}`}
                InputRoot={SelectInput}
                component={MSelectInputFormik}
                options={YearsOptions}
                errorSpaceOn={true}
            />
        </StyledRow>
    );
};
