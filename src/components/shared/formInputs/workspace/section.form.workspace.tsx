import { MInputFormik } from '@/components/base/input/formik';
import { MText } from '@/components/base/MText';
import useTranslation from '@/i18n/hooks/useTranslation';
import { Grid, GridProps } from '@material-ui/core';

import { FormSectionInnerWrapper, FormSubtitleSection, FormTitleSection } from '../styled.form';
import dynamic from 'next/dynamic';
import { N_ADDRESS as NA, N_INFO as NI, N_USER_INFO as NU } from '../utilities/input.constant';
import { memo, useMemo } from 'react';
import { FormSectionWorkspaceMultiple, FormSectionWorkspaceSingleTime } from './cc.workspace';
import { Field, useFormikContext } from 'formik';
import { MSelectInputFormik } from '@/components/base/dropdown/select';
import { CountryOptions, WorkCitiesByProvinceOption, WorkProvincesOption } from 'src/data/cities';
import { useRouter } from 'next/router';
import { usePlaceIsReadOnly, useProviderIsReadOnly } from '../hooks/initialize';

const MMapInputFormik = dynamic(() => import('@/components/base/map/mapInput'), { ssr: false });

const City = () => {
    const { values } = useFormikContext();
    return <CitySelect province={values?.[NA.prefix]?.[NA.governorate]} />;
};
const CitySelect = memo(
    ({ province }: { province: string }) => {
        const { t } = useTranslation();
        return (
            <Field
                name={`${NA.prefix}.${NA.city}`}
                component={MSelectInputFormik}
                options={WorkCitiesByProvinceOption(province)}
                label={t('city')}
                placeholder={t('city')}
            />
        );
    },
    (prev, next) => prev.province === next.province
);
export const FormSectionWorkspaceAddressInfo = ({
    grid,
    locationGrid
}: {
    grid?: Partial<GridProps>;
    locationGrid?: Partial<GridProps>;
}) => {
    const { t } = useTranslation();
    return (
        <>
            <Grid xs={12} md={6} lg={4} item {...grid}>
                <FormSubtitleSection>{t('location')}</FormSubtitleSection>
                <MInputFormik label={t('streetAddress')} name={`${NA.prefix}.${NA.address}`} />
                <Field
                    name={`${NA.prefix}.${NA.country}`}
                    component={MSelectInputFormik}
                    options={CountryOptions}
                    label={t('country')}
                    placeholder={t('country')}
                />
                {/* <Field
                    name={`${NA.prefix}.${NA.governorate}`}
                    component={MSelectInputFormik}
                    options={WorkProvincesOption}
                    label={t('province')}
                    placeholder={t('province')}
                /> */}
                {/* <City /> */}
                <Field
                    name={`${NA.prefix}.${NA.city}`}
                    component={MSelectInputFormik}
                    options={[
                        { option: 'Sulaymaniyeh', value: 'Sulaymaniyeh' },
                        { option: 'Erbil', value: 'Erbil' },
                        { option: 'Duhok', value: 'Duhok' }
                    ]}
                    label={t('city')}
                    placeholder={t('city')}
                />
            </Grid>
            <Grid xs={12} md={6} lg={4} item {...locationGrid}>
                <MText variant="h5" fontWeight="bold">
                    {t('map')}
                </MText>
                <MMapInputFormik name={`${NA.prefix}.${NA.positionOnMap}`} />
            </Grid>
        </>
    );
};
export const FormSectionWorkspaceContactPlace = memo(() => {
    const { t } = useTranslation();
    const isReadOnly = usePlaceIsReadOnly();
    return (
        <>
            <Grid xs={12} md={6} lg={4} item>
                <FormSubtitleSection>{t('contact')}</FormSubtitleSection>

                <MInputFormik label={t('fax')} name={`${NI.prefix}.${NI.fax}`} />
                <MInputFormik label={t('email')} name={`${NI.prefix}.${NI.userName}`} />
                <MInputFormik
                    label={t('telNumber')}
                    name={`${NI.prefix}.${NI.telNumber}`}
                    readOnly={isReadOnly.telNumber}
                    disabled={isReadOnly.telNumber}
                />
            </Grid>
            <FormSectionWorkspaceAddressInfo />
        </>
    );
});

export const FormSectionWorkspaceContactUser = memo(() => {
    const { t } = useTranslation();

    const isReadOnly = useProviderIsReadOnly();
    return (
        <>
            <Grid xs={12} md={6} lg={4} item>
                <FormSubtitleSection>{t('contact')}</FormSubtitleSection>

                <MInputFormik label={t('fax')} name={`${NU.prefix}.${NU.fax}`} />
                <MInputFormik
                    label={t('email')}
                    name={`${NU.prefix}.${NU.email}`}
                    readOnly={isReadOnly.email}
                    disabled={isReadOnly.email}
                />
                <MInputFormik
                    label={t('telNumber')}
                    name={`${NU.prefix}.${NU.phoneNumber}`}
                    readOnly={isReadOnly.telNumber}
                    disabled={isReadOnly.telNumber}
                />
            </Grid>
            <FormSectionWorkspaceAddressInfo />
        </>
    );
});

export const FormSectionWorkspace = memo(
    ({ singleWorkTime = true }: { singleWorkTime?: boolean }) => {
        const { t } = useTranslation();

        return (
            <>
                <FormTitleSection>{t('workspace.title')}</FormTitleSection>
                <FormSectionInnerWrapper>
                    <Grid container spacing={2}>
                        {singleWorkTime ? (
                            <>
                                <FormSectionWorkspaceSingleTime />
                                <FormSectionWorkspaceContactPlace />
                            </>
                        ) : (
                            <>
                                <FormSectionWorkspaceMultiple space="HOSPITAL" />
                                <FormSectionWorkspaceMultiple space="BEAUTY" />
                                <FormSectionWorkspaceMultiple space="CLINIC" />
                                <FormSectionWorkspaceContactUser />
                            </>
                        )}
                    </Grid>
                </FormSectionInnerWrapper>
            </>
        );
    }
);
