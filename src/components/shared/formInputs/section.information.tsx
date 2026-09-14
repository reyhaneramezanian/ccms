import { MImageUploaderFormik } from '@/components/base/images/ImageUploader';
import { MInputFormik } from '@/components/base/input/formik';
import { MButton } from '@/components/base/MButton';
import { MText } from '@/components/base/MText';
import { StyledColumn } from '@/components/base/view-container/Column';

import useTranslation from '@/i18n/hooks/useTranslation';
import { Grid } from '@material-ui/core';
import styled from '@emotion/styled';
import { memo } from 'react';
import { FormSectionInnerGrid, FormTitleSection } from './styled.form';
import { Spacer } from '@/components/base/spacer';
import { CommonProductImageWrapper } from '@/components/base/images/cc';
import { N_INFO as N } from './utilities/input.constant';
import { useChangePassword } from '../modal/useChangePassword';
import { FormCopyNumber } from './section.userInformation';
import { InputDisableOnValue, InputShowOnValue } from './cc.formHOC';
import { useField } from 'formik';
import { StyledRow } from '@/components/base/view-container/Row';

const IMG_MAX_WIDTH = 300;
const ImageWrapper = styled(CommonProductImageWrapper)({
    flex: 1,
    maxWidth: IMG_MAX_WIDTH,
    // padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
});

const ChangePasswordButton = () => {
  
    const [f] = useField(`${N.prefix}.${N.email}`);

    return <ChangePasswordButtonComponent value={f?.value} />;
};
const ChangePasswordButtonComponent = memo(
    ({ value }: { value: string }) => {

        const { changePassword, loading } = useChangePassword();
        const { t } = useTranslation();
        return (
            <InputShowOnValue name={`${N.prefix}.${N.id}`}>
                <MButton
                    loading={loading}
                    css={{ width: '100%' }}
                    variant="contained"
                    onClick={() => changePassword(value)}>
                    <MText align="center" color="#FFF">
                        {t('changePassword')}
                    </MText>
                </MButton>
            </InputShowOnValue>
        );
    },
    (prev, next) => prev.value === next.value
);
export const FormSectionInformationUsername = memo(() => {
    const { t } = useTranslation();
    return (
        <StyledColumn
            css={{ maxWidth: 350, margin: 'auto', height: '100%' }}
            justifyContent="space-around">
            <InputDisableOnValue
                Input={MInputFormik}
                dependantName={`${N.prefix}.${N.id}`}
                name={`${N.prefix}.${N.email}`}
                label={t('username')}
                placeholder="Username"
            />

            <ChangePasswordButton />
        </StyledColumn>
    );
});

export const FormSectionInformationTitle = memo(() => {
    const { t } = useTranslation();
    return (
        <StyledColumn css={{ flex: 1 }}>
            <MInputFormik name={`${N.prefix}.${N.title}`} label={t('name')} />

            <MInputFormik
                errorSpaceOn={true}
                multiline
                rows={3}
                name={`${N.prefix}.${N.about}`}
                label={t('about')}
            />
        </StyledColumn>
    );
});

export const FormSectionInformationUpload = memo(() => {
    const { t } = useTranslation();
    return (
        <StyledColumn css={{ flex: 1 }}>
            <MImageUploaderFormik
                name={`${N.prefix}.${N.photoUrl}`}
                WrapperComponent={ImageWrapper}
            />
            <InputShowOnValue name={`${N.prefix}.${N.id}`}>
                <MInputFormik
                    disabled
                    name={`${N.prefix}.${N.id}`}
                    label={t('id')}
                    EndAdornment={FormCopyNumber}
                />
            </InputShowOnValue>
        </StyledColumn>
    );
});

const InnerWrapper = styled(FormSectionInnerGrid)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    [theme.breakpoints.down.sm]: {
        flexDirection: 'column'
    }
}));
export const FormSectionInformation = memo(() => {
    const { t } = useTranslation();
    return (
        <>
            <FormTitleSection>{t('information')}</FormTitleSection>
            <Grid container spacing={2}>
                <InnerWrapper item sm={12} md={7} css={{}}>
                    <FormSectionInformationUpload />
                    <Spacer space="0 32px" />
                    <FormSectionInformationTitle />
                </InnerWrapper>
                <Grid item md={1} sm={12} />
                <FormSectionInnerGrid item sm={12} md={4}>
                    <FormSectionInformationUsername />
                </FormSectionInnerGrid>
            </Grid>
        </>
    );
});

const SimpleWrapper = styled(FormSectionInnerGrid)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    [theme.breakpoints.down.md]: {
        gridTemplateColumns: '1fr 1fr'
    },
    ['@media(max-width: 900px)']: {
        gridTemplateColumns: '1fr'
    }
}));
export const FormSectionSimpleInformation = memo(() => {
    const { t } = useTranslation();
    return (
        <>
            <FormTitleSection>{t('information')}</FormTitleSection>

            <SimpleWrapper>
                <MImageUploaderFormik
                    name={`${N.prefix}.${N.photoUrl}`}
                    WrapperComponent={ImageWrapper}
                />

                <StyledColumn css={{ margin: '0 16px' }}>
                    <MInputFormik
                        name={`${N.prefix}.${N.title}`}
                        label={t('name')}
                        errorSpaceOn={false}
                    />
                    <InputShowOnValue name={`${N.prefix}.${N.id}`}>
                        <MInputFormik
                            disabled
                            name={`${N.prefix}.${N.id}`}
                            label={t('id')}
                            EndAdornment={FormCopyNumber}
                            errorSpaceOn={false}
                        />
                    </InputShowOnValue>
                </StyledColumn>

                <MInputFormik
                    errorSpaceOn={true}
                    multiline
                    rows={3}
                    name={`${N.prefix}.${N.about}`}
                    label={t('about')}
                />
            </SimpleWrapper>
        </>
    );
});
