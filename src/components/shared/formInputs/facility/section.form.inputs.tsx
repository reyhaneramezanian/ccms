import { StyledSelectContainer } from '@/components/base/dropdown/select';
import { MInputFormik } from '@/components/base/input/formik';

import { MText } from '@/components/base/MText';
import useTranslation from '@/i18n/hooks/useTranslation';
import { Grid } from '@material-ui/core';
import { Fragment, memo, useState } from 'react';
import { FormSectionInnerWrapper, FormSubtitleSection } from '../styled.form';
import { Spacer } from '@/components/base/spacer';
import { MButton } from '@/components/base/MButton';
import { BSChipsGridView, SelectChips } from '../cc.chips';
import { StyledRow } from '@/components/base/view-container/Row';
import { BSLabel, CommonInputRoot } from '@/components/base/input/styled';
import { StyledColumn } from '@/components/base/view-container/Column';
import styled from '@emotion/styled';
import { MInput } from '@/components/base/input';
import { useSnackbar } from 'notistack';

type Props = AppCommonChild & {
    chips: any;
    ChipsGridView?: AppStyledComponent<any>;
    WrapperComponent?: AppStyledComponent<any>;
    isFull?: boolean;
    remove: (_: number) => void;
};
const SectionGrid = styled.div(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    [theme.breakpoints.down.md]: {
        gridTemplateColumns: '1fr'
    }
}));
const HalfSectionGrid = styled.div(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: '1fr'
}));

const FullWidthWrapper = FormSectionInnerWrapper.withComponent(SectionGrid);
const HalfWidthWrapper = FormSectionInnerWrapper.withComponent(HalfSectionGrid);
const FormSectionFacilityTemplate = memo(
    ({
        chips,
        children,
        isFull = true,
        WrapperComponent = isFull ? FullWidthWrapper : HalfWidthWrapper,
        ChipsGridView = BSChipsGridView,
        remove
    }: Props) => {
        return (
            <WrapperComponent wrap="true">
                {children}
                <ChipsGridView>
                    {chips.map((i, index) => (
                        <Fragment key={index}>
                            <SelectChips onClose={() => remove(index)} title={i} />
                        </Fragment>
                    ))}
                </ChipsGridView>
            </WrapperComponent>
        );
    },
    (prev, next) => prev.chips === next.chips
);

const SelectWrapperDiv = styled(StyledSelectContainer)({
    flex: 1,
    margin: 8,
    maxWidth: 350,
    width: '100%'
});
const InputWrapper = SelectWrapperDiv.withComponent(CommonInputRoot);
const AddButton = styled(MButton)({
    padding: '16px 48px',
    margin: '0 8px'
});

const INITIAL_STATE = {
    title: '',
    telNumber: ''
};
export const FormSectionFacilityAmbulance = ({ values, push, remove }) => {
    const { t } = useTranslation();
    const [inputs, setInputs] = useState({ ...INITIAL_STATE });
    const { enqueueSnackbar } = useSnackbar();
    return (
        <FullWidthWrapper>
            <StyledRow alignContent="flex-start" alignItems="center" wrap="true" css={{ flex: 1 }}>
                <MInput
                    value={inputs.title}
                    onChange={(e) => setInputs((p) => ({ ...p, title: e.target.value }))}
                    placeholder={t('ambulanceName')}
                    label={t('ambulance')}
                    name="ambulanceName"
                    errorSpaceOn={true}
                    InputRoot={InputWrapper}
                    fullWidth
                />
                <MInput
                    value={inputs.telNumber}
                    label={t('telNumber')}
                    onChange={(e) => setInputs((p) => ({ ...p, telNumber: e.target.value }))}
                    placeholder={'+964 123456789'}
                    InputRoot={InputWrapper}
                    errorSpaceOn={true}
                    name="ambulanceTelNumber"
                    fullWidth
                />
                <StyledColumn css={{ maxWidth: 350, flex: 1 }}>
                    <BSLabel css={{ opacity: 0 }}>R</BSLabel>
                    <AddButton
                        variant="contained"
                        onClick={() => {
                            if (inputs.telNumber && inputs.title) {
                                push(inputs);
                                setInputs({ ...INITIAL_STATE });
                            } else {
                                enqueueSnackbar('Please fill title and number', {
                                    variant: 'warning'
                                });
                            }
                        }}>
                        <MText align="center" color="#FFF">
                            {t('add')}
                        </MText>
                    </AddButton>
                </StyledColumn>
            </StyledRow>
            <BSChipsGridView>
                {values?.map((i, index) => (
                    <SelectChips
                        key={index}
                        onClose={() => remove(index)}
                        title={i?.title}
                        description={i?.telNumber}
                    />
                ))}
            </BSChipsGridView>
        </FullWidthWrapper>
    );
};

export const FormSectionFacilities = () => {
    const { t } = useTranslation();
    const [s, sets] = useState(['Test', 'Test', 'Test']);
    return (
        <>
            <FormSubtitleSection>{t('addDoctor')}</FormSubtitleSection>
            <Spacer space="16px" />
            <FormSectionInnerWrapper>
                <Grid container spacing={2}>
                    <StyledColumn>
                        <BSLabel>{t('title')}</BSLabel>
                        <StyledRow>
                            <MInputFormik
                                name="title"
                                errorSpaceOn={true}
                                placeholder={t('title')}
                            />

                            <MButton
                                type="button"
                                variant="contained"
                                css={{ padding: '16px 48px', marginLeft: 24 }}>
                                <MText align="center" color="#FFF">
                                    {t('add')}
                                </MText>
                            </MButton>
                        </StyledRow>
                    </StyledColumn>

                    <StyledRow wrap="true">
                        {s.map((i, index) => (
                            <Fragment key={index}>
                                <SelectChips title={i} />
                            </Fragment>
                        ))}
                    </StyledRow>
                </Grid>
            </FormSectionInnerWrapper>
        </>
    );
};
