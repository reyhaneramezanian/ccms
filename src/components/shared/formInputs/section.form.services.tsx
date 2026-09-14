import { MInputFormik } from '@/components/base/input/formik';
import useTranslation from '@/i18n/hooks/useTranslation';
import { Grid } from '@material-ui/core';
import { useState } from 'react'

import shortid from 'shortid';

import { FormSectionInnerWrapper, FormSectionOuterWrapper, FormTitleSection } from './styled.form';
import { Field } from 'formik';
import { MSelectInputFormik } from '@/components/base/dropdown/select';
import { DoctorSpecialitiesOptions } from 'src/data/providers';
import { MCheckboxFormik, MCheckbox } from '@/components/base/toggle/Checkbox';
import { N_USER_INFO as N } from './utilities/input.constant';
import { HOUR_OPTIONS, MIN_OPTIONS } from 'src/data/options';
import { usePrefix } from './utilities/initForm/input.func';
import { HOUR_POST_FIX, MIN_POST_FIX } from '@/utils/dateTime/time';
import { StyledColumn } from '@/components/base/view-container/Column';
import { StyledRow } from '@/components/base/view-container/Row';
import { MImageUploaderFormik } from '@/components/base/images/ImageUploader';
import { MButton } from '@/components/base/MButton';
import { MText } from '@/components/base/MText';
import {
    CommonProductImageWrapper,
    UploadCertificateButtonCommon
} from '@/components/base/images/cc';
import styled from '@emotion/styled';
import { CommonInputRoot } from '@/components/base/input/styled';

const SelectInput = styled(CommonInputRoot)({
    width: 'auto',
    minWidth: '100px',
    margin: 8
});
const IMAGE_MAX_WIDTH = 400;
const ImageWrapper = styled(CommonProductImageWrapper)({
    // flex: 1,
    maxWidth: IMAGE_MAX_WIDTH,
    maxHeight: 400,
    margin: '16px',
    // padding: 16,
    // alignItems: 'center',
    // justifyContent: 'center',
    cursor: 'pointer'
});

export const UrgentBookingLable = ({ accepted, handleAccepted }) => {
    return (
        <div></div>
    )
}

export const FormSectionServices = ({
    isDoctor = true,
    prefix,
    specialities
}: {
    isDoctor?: boolean;
    prefix?: string;
    specialities;
}) => {
    const { t } = useTranslation();
    const PX = usePrefix(prefix, N);

    const [uergentBooking, setUrgentBooking] = useState(true)


    return (
        <FormSectionOuterWrapper>
            <FormTitleSection>{t('service')}</FormTitleSection>
            <FormSectionInnerWrapper>
                <Grid container spacing={2}>
                    <Grid xs={12} sm={6} md={4} item>
                        {
                            isDoctor &&
                            <Field
                                name={`${PX}.${N.specialty}`}
                                errorSpaceOn={true}
                                component={MSelectInputFormik}
                                options={specialities}
                                placeholder={'Specialty'}
                                label={'specialty'}
                            />
                        }
                        <MCheckboxFormik
                            name={`${PX}.${N.isHaveInPerson}`}
                            errorSpaceOn={true}
                            optionName={t('homeService')}
                        />
                        <MInputFormik
                            label={t('subSpecialty')}
                            name={`${PX}.${N.subSpecialty}`}
                            rows={3}
                            multiline
                        />
                    </Grid>

                    <Grid xs={12} sm={6} md={4} item>
                        <MInputFormik
                            name={`${PX}.${N.regularBooking}`}
                            placeholder={t('price')}
                            label={t('regularBooking')}
                        />
                        <MCheckbox
                            // errorSpaceOn={true}
                            name='test'
                            optionName='Urgent Booking'
                            checked={uergentBooking}
                            onChange={() => setUrgentBooking(!uergentBooking)}
                            value={uergentBooking}
                        />
                        {uergentBooking ? (<MInputFormik
                            name={`${PX}.${N.urgentBooking}`}
                            key={shortid.generate()}
                            placeholder={t('price')}
                        />) : (<MInputFormik
                            name={`${PX}.${N.urgentBooking}`}
                            key={shortid.generate()}
                            placeholder={t('price')}
                            readOnly={true}
                        />)}

                        <div>
                            <MText>Max time for visit:</MText>
                            <StyledRow>
                                <div>
                                    <Field
                                        name={`${PX}.${N.maxTimeVisit}.${HOUR_POST_FIX}`}
                                        component={MSelectInputFormik}
                                        InputRoot={SelectInput}
                                        options={HOUR_OPTIONS}
                                        placeholder={'0'}
                                        label={t('hour')}
                                    />
                                </div>
                                <div>
                                    <Field
                                        name={`${PX}.${N.maxTimeVisit}.${MIN_POST_FIX}`}
                                        component={MSelectInputFormik}
                                        InputRoot={SelectInput}
                                        options={MIN_OPTIONS}
                                        placeholder={'0'}
                                        label={t('min')}
                                    />
                                </div>
                            </StyledRow>
                        </div>
                    </Grid>
                    <Grid xs={12} sm={12} md={4} item>
                        <MImageUploaderFormik
                            name={`${N.prefix}.${N.certificate}`}
                            UploadImageComponent={UploadCertificateButtonCommon}
                        />
                    </Grid>
                </Grid>
            </FormSectionInnerWrapper>
        </FormSectionOuterWrapper>
    );
};
