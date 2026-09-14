import { Field, FieldMetaProps, useField } from 'formik';

import { StyledCheckbox } from './styled';
import { MText } from '../MText';
import { InputErrorText } from '../input/error';
import { StyledRow } from '../view-container/Row';

import { forwardRef, memo, useMemo } from 'react';
import { StyledColumn } from '../view-container/Column';
import { CheckboxTickSquareIcon } from 'src/assets/common/TickSquare';
import { MButton } from '../MButton';
import styled from '@emotion/styled';
import { BSLabel } from '../input/styled';
import { memoCompareChanges } from '../input/utils';
import { Checkbox } from '@mui/material';

export interface CheckboxProps extends FormikCheckboxProps {
    value: string;
    checked: boolean;
    onChange: (_: { target: { checked: boolean } }) => void;
    meta?: FieldMetaProps<any>;
}

interface FormikCheckboxProps {
    name: string;
    optionName: string;
    label?: string;
    direction?: 'row' | 'col';
}

export const MCheckbox = memo(
    forwardRef(
        ({
            label,
            optionName,
            direction,
            onChange,
            value,
            meta,
            degree = 'main',
            palette2 = 'text',
            degree2 = 'main',
            errorSpaceOn = false,
            palette = "palette",
            withoutErr = false,
            ...props
        }: CheckboxProps & AppBaseColorType & { errorSpaceOn?: boolean, withoutErr?: boolean }, ref) => {
            const Wrapper = useMemo(() => {
                return direction === 'row' ? StyledRow : StyledColumn;
            }, [direction]);
            return (
                <>
                    {label && <BSLabel fontWeight="semibold">{label}</BSLabel>}
                    <Wrapper ref={ref as any}>
                        <StyledCheckbox
                            selected={true}
                            onClick={(ev) => {
                                ev.target.dispatchEvent(new Event('input', { bubbles: true }));
                            }}
                            {...props}>
                            <CheckboxTickSquareIcon
                                checked={Boolean(value)}
                            />
                            {/* <Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 38 } }}/> */}
                            <input
                                {...props}
                                type="checkbox"
                                onChange={onChange}
                                value={value}
                                checked={Boolean(value)}
                            />
                            <MText>{optionName}</MText>
                        </StyledCheckbox>
                    </Wrapper>
                    {meta && !withoutErr && <InputErrorText meta={meta} errorSpaceOn={errorSpaceOn} />}
                </>
            );
        }
    ),
    memoCompareChanges
);

export const MCheckboxFormik = memo(
    forwardRef((props: FormikCheckboxProps & { errorSpaceOn?: boolean, withoutErr?: boolean }, ref) => {
        const [field, meta] = useField(props.name);

        return (
            <Field {...props}>
                {({ field, meta }: any) => <MCheckbox meta={meta} {...props} {...field} ref={ref as any} />}
            </Field>
        );
    })
);
