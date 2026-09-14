import { MSelectInputFormik, StyledSelectContainer } from '@/components/base/dropdown/select';
import FormikRadioButtonGroup from '@/components/base/radio/RadioButtonGroup';
import { FullWidthSeprator } from '@/components/base/spacer/seprator';
import { MCheckboxFormik } from '@/components/base/toggle/Checkbox';
import useTranslation from '@/i18n/hooks/useTranslation';
import styled from '@emotion/styled';
import { Grid } from '@material-ui/core';
import { Field } from 'formik';
import { memo, useMemo } from 'react';
import useGetPlans from 'src/graphql/shared/useGetPlans';
import { N_SUBSCRIBE_PLAN as N, SUBSCRIBE_VALUE_RADIO } from './utilities/input.constant';
import { FormSectionInnerWrapper, FormTitleSection } from './styled.form';

type OptionProps = {
    eachPatientOptions?: ArrayOptionLoading;
    fixedPriceOptions?: ArrayOptionLoading;
    adOptions?: ArrayOptionLoading;
    vipOptions?: ArrayOptionLoading;
};

const SelectInput = styled(StyledSelectContainer)({
    maxWidth: 400
});

const OnPatient = memo(
    ({ eachPatientOptions }: { eachPatientOptions: OptionProps['eachPatientOptions'] }) => {
        const { t } = useTranslation();
        return (
            <Field
                name={`${N.prefix}.${N.patient}`}
                SelectWrapperDiv={SelectInput}
                component={MSelectInputFormik}
                options={eachPatientOptions}
                placeholder={'Choose Price'}
            />
        );
    }
);
const FixedPrice = memo(
    ({ fixedPriceOptions }: { fixedPriceOptions: OptionProps['fixedPriceOptions'] }) => {
        const { t } = useTranslation();
        return (
            <Field
                name={`${N.prefix}.${N.fixed}`}
                SelectWrapperDiv={SelectInput}
                component={MSelectInputFormik}
                options={fixedPriceOptions}
                placeholder={'Choose Price'}
            />
        );
    }
);
const AdSelect = memo(({ adOptions }: { adOptions: OptionProps['adOptions'] }) => {
    const { t } = useTranslation();
    return (
        <Field
            name={`${N.prefix}.${N.adPlan}`}
            SelectWrapperDiv={SelectInput}
            component={MSelectInputFormik}
            options={adOptions}
            placeholder={'Choose Price'}
        />
    );
});
const VipSelect = memo(({ vipOptions }: { vipOptions: OptionProps['vipOptions'] }) => {
    const { t } = useTranslation();
    return (
        <Field
            name={`${N.prefix}.${N.vipPlan}`}
            SelectWrapperDiv={SelectInput}
            component={MSelectInputFormik}
            options={vipOptions}
            placeholder={'Choose Price'}
        />
    );
});

export const FormSectionSubscribePlanComponent = memo(
    ({ adOptions, eachPatientOptions, fixedPriceOptions, vipOptions }: OptionProps) => {
        const { t } = useTranslation();
        const radioOptions = useMemo(() => {
            return [
                {
                    option: t('subscribe.fixed'),
                    value: SUBSCRIBE_VALUE_RADIO.fixed,
                    Subtitle: FixedPrice,
                    subtitleMeta: { fixedPriceOptions }
                },
                {
                    option: t('subscribe.patient'),
                    value: SUBSCRIBE_VALUE_RADIO.patient,
                    Subtitle: OnPatient,
                    subtitleMeta: { eachPatientOptions }
                }
            ];
        }, [fixedPriceOptions, eachPatientOptions]);
        return (
            <>
                <FormTitleSection>{t('subscribe.title')}</FormTitleSection>
                <FormSectionInnerWrapper>
                    <FormikRadioButtonGroup
                        name={`${N.prefix}.${N.plan}`}
                        gridItem={{ xs: 12, sm: 6 }}
                        gridContainer={{ spacing: 2 }}
                        errorSpaceOn={true}
                        options={radioOptions}
                    />
                    <FullWidthSeprator />
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <MCheckboxFormik
                                errorSpaceOn={true}
                                name={`${N.prefix}.${N.vipCheck}`}
                                optionName={t('vip')}
                            />
                            <VipSelect vipOptions={vipOptions} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <MCheckboxFormik
                                errorSpaceOn={true}
                                name={`${N.prefix}.${N.adCheck}`}
                                optionName={t('ad')}
                            />
                            <AdSelect adOptions={adOptions} />
                        </Grid>
                    </Grid>
                </FormSectionInnerWrapper>
            </>
        );
    }
);
export const FormSectionSubscribePlanVipComponent = memo(
    ({ adOptions, eachPatientOptions, fixedPriceOptions, vipOptions }: OptionProps) => {
        const { t } = useTranslation();
        return (
            <>
                <FormSectionInnerWrapper>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <VipSelect vipOptions={vipOptions} />
                        </Grid>
                    </Grid>
                </FormSectionInnerWrapper>
            </>
        );
    }
);

export const FormSectionSubscribePlanAdComponent = memo(
    ({ adOptions, eachPatientOptions, fixedPriceOptions, vipOptions }: OptionProps) => {
        const { t } = useTranslation();
        return (
            <>
                <FormSectionInnerWrapper>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <AdSelect adOptions={adOptions} />
                        </Grid>
                    </Grid>
                </FormSectionInnerWrapper>
            </>
        );
    }
);
export const FormSectionSubscribePlanAccountSubscriptionComponent = memo(
    ({ adOptions, eachPatientOptions, fixedPriceOptions, vipOptions }: OptionProps) => {
        const { t } = useTranslation();
        const radioOptions = useMemo(() => {
            return [
                {
                    option: t('subscribe.fixed'),
                    value: SUBSCRIBE_VALUE_RADIO.fixed,
                    Subtitle: FixedPrice,
                    subtitleMeta: { fixedPriceOptions }
                },
                {
                    option: t('subscribe.patient'),
                    value: SUBSCRIBE_VALUE_RADIO.patient,
                    Subtitle: OnPatient,
                    subtitleMeta: { eachPatientOptions }
                }
            ];
        }, [fixedPriceOptions, eachPatientOptions]);
        return (
            <>
                <FormSectionInnerWrapper>
                    <FormikRadioButtonGroup
                        name={`${N.prefix}.${N.plan}`}
                        gridItem={{ xs: 12, sm: 6 }}
                        gridContainer={{ spacing: 2 }}
                        errorSpaceOn={true}
                        options={radioOptions}
                    />
                </FormSectionInnerWrapper>
            </>
        );
    }
);

export const FormSectionSubscribePlan = () => {
    const data = useGetPlans();

    const options: OptionProps = useMemo(() => {
        return {
            eachPatientOptions: data?.eachPatientItems
                ? data?.eachPatientItems.map((d) => ({
                      value: d?.id,
                      option: d.title
                  }))
                : 'loading',
            fixedPriceOptions: data?.fixedPriceItems
                ? data?.fixedPriceItems.map((d) => ({
                      value: d?.id,
                      option: d.title
                  }))
                : 'loading',
            adOptions: data?.adItems
                ? data?.adItems.map((d) => ({
                      value: d?.id,
                      option: d.title
                  }))
                : 'loading',
            vipOptions: data?.vipItems
                ? data?.vipItems.map((d) => ({
                      value: d?.id,
                      option: d.title
                  }))
                : 'loading'
        };
    }, [data]);

    return <FormSectionSubscribePlanComponent {...options} />;
};
export const FormSectionSubscribePlanAd = () => {
    const data = useGetPlans();

    const options: OptionProps = useMemo(() => {
        return {
            adOptions: data?.adItems
                ? data?.adItems.map((d) => ({
                      value: d?.id,
                      option: d.title
                  }))
                : 'loading',
        };
    }, [data]);

    return <FormSectionSubscribePlanAdComponent {...options} />;
};
export const FormSectionSubscribePlanVip = () => {
    const data = useGetPlans();

    const options: OptionProps = useMemo(() => {
        return {
            vipOptions: data?.vipItems
                ? data?.vipItems.map((d) => ({
                      value: d?.id,
                      option: d.title
                  }))
                : 'loading'
        };
    }, [data]);

    return <FormSectionSubscribePlanVipComponent {...options} />;
};
export const FormSectionSubscribePlanAccountSubscription = () => {
    const data = useGetPlans();

    const options: OptionProps = useMemo(() => {
        return {
            eachPatientOptions: data?.eachPatientItems
                ? data?.eachPatientItems.map((d) => ({
                      value: d?.id,
                      option: d.title
                  }))
                : 'loading',
            fixedPriceOptions: data?.fixedPriceItems
                ? data?.fixedPriceItems.map((d) => ({
                      value: d?.id,
                      option: d.title
                  }))
                : 'loading',
        };
    }, [data]);

    return <FormSectionSubscribePlanAccountSubscriptionComponent {...options} />;
};
