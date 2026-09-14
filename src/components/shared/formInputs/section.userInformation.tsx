import { MImageUploaderFormik } from '@/components/base/images/ImageUploader';
import { MInputFormik } from '@/components/base/input/formik';
import CopyIcon from 'src/assets/common/CopyIcon';
import useTranslation from '@/i18n/hooks/useTranslation';
import { Grid } from '@material-ui/core';
import { memo } from 'react';
import { FormSectionInnerGrid, FormSectionOuterWrapper, FormTitleSection } from './styled.form';
import FormikRadioButtonGroup from '@/components/base/radio/RadioButtonGroup';
import { BSLabel } from '@/components/base/input/styled';
import { MCheckboxFormik } from '@/components/base/toggle/Checkbox';
import { StyledRow } from '@/components/base/view-container/Row';

import { UploadImageProfileCommon } from '@/components/base/images/cc';
import { GenderOption, LANGUAGES_OPTIONS } from 'src/data/options';
import { Spacer } from '@/components/base/spacer';

import { DropDownDatePickerFormik } from '@/components/base/calendar/section.dropDownDate';
import { N_USER_INFO as N } from './utilities/input.constant';
import { usePrefix } from './utilities/initForm/input.func';
import { MButton } from '@/components/base/MButton';
import { copyTextToClipboard } from '@/utils/helper/copyClipboard';
import { InputShowOnValue } from './cc.formHOC';
import { useProviderIsReadOnly } from './hooks/initialize';

export const FormCopyNumber = ({ value }) => {
    return (
        <MButton onClick={() => copyTextToClipboard(value)}>
            <CopyIcon css={{ margin: 8 }} palette="text" degree="main" />
        </MButton>
    );
};

export const FormSectionUserInformation = memo(({ prefix }: { prefix?: string }) => {
    const PX = usePrefix(prefix, N);
    const { t } = useTranslation();

    const isReadOnly = useProviderIsReadOnly();
    return (
        <FormSectionOuterWrapper>
            <FormTitleSection>{t('information')}</FormTitleSection>

            <FormSectionInnerGrid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                    <MImageUploaderFormik
                        name={`${PX}.${N.photoUrl}`}
                        UploadImageComponent={UploadImageProfileCommon}
                    />
                    <InputShowOnValue name={`${PX}.${N.id}`}>
                        <MInputFormik
                            disabled
                            name={`${PX}.${N.id}`}
                            label={t('id')}
                            EndAdornment={FormCopyNumber}
                        />
                    </InputShowOnValue>

                    <MInputFormik name={`${PX}.${N.firstName}`} label={t('firstName')} />
                    <MInputFormik name={`${PX}.${N.lastName}`} label={t('lastName')} />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <MInputFormik
                        name={`${PX}.${N.about}`}
                        label={t('aboutDoctor')}
                        multiline
                        rows={4}
                    />
                    <Spacer space="32px" />
                    <FormikRadioButtonGroup
                        name={`${PX}.${N.gender}`}
                        label={t('gender')}
                        gridItem={{ xs: 12, sm: 6, md: 4 }}
                        gridContainer={{ spacing: 2 }}
                        errorSpaceOn={true}
                        options={GenderOption}
                    />
                    <Spacer space="32px" />
                    <BSLabel>Birthday</BSLabel>
                    <DropDownDatePickerFormik name={`${PX}.${N.birthday}`} />
                    <Spacer space="32px" />
                    <BSLabel>{t('language')}</BSLabel>
                    <StyledRow wrap="true">
                        {LANGUAGES_OPTIONS.map(({ value, optionName }) => (
                            <MCheckboxFormik
                                key={value}
                                name={`${PX}.${N.langueage}.${value}`}
                                optionName={optionName}
                            />
                        ))}
                    </StyledRow>
                </Grid>

                <Grid item xs={12} sm={12} md={4}>
                    <MInputFormik
                        name={`${PX}.${N.phoneNumber}`}
                        label={t('phoneNumber')}
                        readOnly={isReadOnly.email}
                        disabled={isReadOnly.email}
                    />
                    <MInputFormik name={`${PX}.${N.securityNumber}`} label={t('secretryNumber')} />
                    <MInputFormik
                        name={`${PX}.${N.insuranceCovered}`}
                        label={t('insuranceCovered')}
                    />
                    <MInputFormik label={t('city')} name={`${PX}.${N.city}`} />
                </Grid>
            </FormSectionInnerGrid>
        </FormSectionOuterWrapper>
    );
});
