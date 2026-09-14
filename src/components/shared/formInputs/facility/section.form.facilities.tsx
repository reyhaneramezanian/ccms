import { FieldArray, FieldArrayRenderProps, useFormikContext } from 'formik';
import React, { memo, useState } from 'react';
import { FormSectionInnerWrapper, FormSubtitleSection } from '../styled.form';
import { Spacer } from '@/components/base/spacer';

import { FlexContainer } from '@/components/base/view-container/Container';

import styled from '@emotion/styled';
import { StyledColumn } from '@/components/base/view-container/Column';

const Wrapper = styled(FlexContainer)(({ theme }) => ({
    [theme.breakpoints.down.md]: {
        flexDirection: 'column'
    }
}));
const HalfWrapper = styled(FlexContainer)(({ theme }) => ({
    width: '50% !important',
    [theme.breakpoints.down.md]: {
        flexDirection: 'column',
        width: '100% !important'
    }
}));
const InnerWrapper = FormSectionInnerWrapper.withComponent(Wrapper);
const HalfInnerWrapper = FormSectionInnerWrapper.withComponent(HalfWrapper);

type FacilityComponentProps = React.FC<FieldArrayRenderProps & { values: Array<any> }>;
export const FacilityInputComponent = memo(
    ({
        values,
        title,
        Component,
        formKey,
        half = false,
        InnerWrapperComponent = half ? HalfInnerWrapper : InnerWrapper
    }: {
        values: Array<any>;
        title: string;
        formKey: string;
        Component: FacilityComponentProps;
        InnerWrapperComponent?: AppStyledComponent<any>;
        half?: boolean;
    }) => {
        return (
            <>
                <FormSubtitleSection>{title}</FormSubtitleSection>
                <Spacer space="16px" />
                <InnerWrapperComponent half={half}>
                    <FieldArray
                        name={formKey}
                        render={(funcs) => <Component {...funcs} values={values} />}
                    />
                </InnerWrapperComponent>
            </>
        );
    },
    (prev, next) => prev.values?.length === next.values?.length
);
// type FormValues = { [N_OTHER_FACILITIES]: Array<ProviderFacilityInput_InputType> };
export const FormSectionFacility = ({
    formKey,
    ...props
}: {
    formKey: string;
    title: string;
    Component: FacilityComponentProps;
}) => {
    const { values } = useFormikContext();
    return <FacilityInputComponent values={values?.[formKey]} formKey={formKey} {...props} />;
};
