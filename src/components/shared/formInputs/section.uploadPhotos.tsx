import useTranslation from '@/i18n/hooks/useTranslation';

import { memo } from 'react';
import { FormSectionInnerWrapper, FormSectionOuterWrapper, FormTitleSection } from './styled.form';
import { StyledRow } from '@/components/base/view-container/Row';
import { MImageUploaderFormik } from '@/components/base/images/ImageUploader';
import { UploadImageProductButtonCommon } from '@/components/base/images/cc';
import { N_PHOTOS as N } from './utilities/input.constant';

const RowInnerWrapper = FormSectionInnerWrapper.withComponent(StyledRow);
export const FormSectionUserUploadPhotos = memo(() => {
    const { t } = useTranslation();
    return (
        <FormSectionOuterWrapper>
            <FormTitleSection>{t('uploadPhotos')}</FormTitleSection>

            <RowInnerWrapper wrap="true">
                {[0, 1, 2, 3, 4].map((index) => (
                    <MImageUploaderFormik
                        key={index}
                        name={`${N.clinicPhotos}.${index}`}
                        UploadImageComponent={UploadImageProductButtonCommon}
                    />
                ))}
            </RowInnerWrapper>
        </FormSectionOuterWrapper>
    );
});
