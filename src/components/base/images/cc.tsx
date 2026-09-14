import useTranslation from '@/i18n/hooks/useTranslation';
import styled from '@emotion/styled';
import { ProfileUploadIcon } from 'src/assets/common/ProfileIcon';
import { ReloadIcon } from 'src/assets/common/ReloadIcon';
import { UploadImageIcon } from 'src/assets/common/UploadImageIcon';
import { PrimarySpinner } from '../loader/spinner';
import { MButton } from '../MButton';
import { MText } from '../MText';
import { Spacer } from '../spacer';
import { StyledColumn } from '../view-container/Column';
import { StyledRow } from '../view-container/Row';
import { StyledAvatar } from './Avatar';
import { CommonImageProps } from './type.image';

export const ImageUploadError = styled(MButton)({
    position: 'absolute',
    '& > svg': {
        width: 36,
        height: 36
    }
});

const Placeholder = () => {
    const { t } = useTranslation();
    return (
        <>
            <UploadImageIcon color="#8B8B8B" />
            <MText color="#8B8B8B">{t('uploadPhoto')}</MText>
        </>
    );
};

export const CommonProductImageWrapper = styled(StyledAvatar)(({ theme }) => ({
    // width: '100%',
    maxWidth: 250,
    maxHeight: 150,
    borderRadius: 9,
    backgroundColor: theme.palette.background[200],
    border: `1px solid  ${theme.palette.background[200]}`,
    '&>div': {},
    '& svg': {
        width: 130,
        height: 100
    },
    '& img': {
        width: '100%',
        objectFit: 'cover'
    }
}));

export const UploadImageProductCommon = ({
    WrapperComponent = CommonProductImageWrapper,
    PlaceholderIcon = Placeholder,
    onClick,
    state,
    url,
    retry
}: CommonImageProps) => {
    return (
        <WrapperComponent
            onClick={onClick}
            uploading={state.uploading}
            error={Boolean(state.error)}>
            <StyledColumn>
                {url ? <img alt="company url" src={url} /> : <PlaceholderIcon />}
            </StyledColumn>

            {state.uploading && <PrimarySpinner />}
            {state.error && (
                <ImageUploadError onClick={retry}>
                    <ReloadIcon palette="info" degree="red" />
                </ImageUploadError>
            )}
        </WrapperComponent>
    );
};

export const CommonProfileImageWrapper = styled(StyledRow)(({ theme }) => ({
    cursor: 'pointer',
    position: 'relative',
    width: 120,
    height: 120,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:after': {
        content: "'+'",
        color: theme.palette.primary.main,
        position: 'absolute',
        right: 0,
        bottom: 0,
        width: 30,
        height: 30,
        borderRadius: '99em',
        backgroundColor: theme.palette.primary['200'],
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    '& svg': {
        width: 120,
        height: 120,
        color: theme.palette.grey['300']
    },
    '& img': {
        border: `1px solid  ${theme.palette.background[200]}`,
        borderRadius: '50%',
        overflow: 'hidden',
        width: '100%',
        objectFit: 'cover',
        aspectRatio: '1/1'
    }
}));

export const UploadImageProfileCommon = ({
    WrapperComponent = CommonProfileImageWrapper,
    PlaceholderIcon = ProfileUploadIcon,
    onClick,
    state,
    url,
    retry
}: CommonImageProps) => {
    return (
        <StyledRow>
            <WrapperComponent
                onClick={() => {
                    if (!state.error || !state.uploading) onClick();
                }}
                uploading={state.uploading}
                error={Boolean(state.error)}>
                {url ? <img alt="company url" src={url} /> : <PlaceholderIcon />}

                {state.uploading && <PrimarySpinner />}
                {state.error && (
                    <ImageUploadError onClick={retry}>
                        <ReloadIcon palette="info" degree="red" />
                    </ImageUploadError>
                )}
            </WrapperComponent>

            <MButton onClick={onClick} palette="primary" degree="200" css={{ margin: '0 16px' }}>
                <MText color="inherit">Upload Photo</MText>
            </MButton>
        </StyledRow>
    );
};

export const ProductWithPicker = styled(StyledAvatar)(({ theme }) => ({
    backgroundColor: '#FFF',
    border: `1px solid ${theme.palette.background[200]}`,
    boxShadow: '2px 2px 5px #ADADAD33',
    // overflow: 'hidden',
    position: 'relative',
    padding: 0,
    borderRadius: 9,
    width: 200,
    height: 150,
    '&>div': {},
    '& svg': {
        width: '100%',
        height: 76
    },
    '& img': {
        // width: '100%',
        objectFit: 'cover'
    }
}));

export const UploadImageProductButtonCommon = ({
    WrapperComponent = ProductWithPicker,
    PlaceholderIcon = Placeholder,
    onClick,
    state,
    url,
    retry,
    onRemove
}: CommonImageProps) => {
    const { t } = useTranslation();
    return (
        <StyledColumn css={{ margin: '16px 8px' }}>
            <WrapperComponent uploading={state.uploading} error={Boolean(state.error)}>
                {url ? <img alt="company url" src={url} /> : <PlaceholderIcon />}

                {state.uploading && <PrimarySpinner />}
                {state.error && (
                    <ImageUploadError onClick={retry}>
                        <ReloadIcon palette="info" degree="red" />
                    </ImageUploadError>
                )}
            </WrapperComponent>
            <Spacer space="24px" />
            {url ? (
                <MButton
                    variant="outlined"
                    palette="red"
                    degree="100"
                    css={{ backgroundColor: '#C153532F' }}
                    onClick={onRemove}>
                    <MText align="center" color={'inherit'}>
                        {t('removePhoto')}
                    </MText>
                </MButton>
            ) : (
                <MButton variant="contained" onClick={onClick}>
                    <MText align="center" color="#FFF">
                        {t('uploadPhoto')}
                    </MText>
                </MButton>
            )}
        </StyledColumn>
    );
};

const IMAGE_MAX_WIDTH = 400;
const ImageWrapper = styled(CommonProductImageWrapper)({
    maxWidth: IMAGE_MAX_WIDTH,
    maxHeight: 400,
    margin: '16px',
    cursor: 'pointer'
});
export const UploadCertificateButtonCommon = ({ onClick, ...props }: CommonImageProps) => {
    const { t } = useTranslation();
    return (
        <StyledColumn css={{ maxWidth: IMAGE_MAX_WIDTH, margin: 'auto' }}>
            <UploadImageProductCommon
                WrapperComponent={ImageWrapper}
                onClick={onClick}
                {...props}
            />
            <MButton
                onClick={onClick}
                type="button"
                variant="contained"
                css={{
                    padding: '5px 20px',
                    margin: '8px auto',
                    width: '100%'
                }}>
                <MText align="center" color="#FFF">
                    {t('uploadCertificate')}
                </MText>
            </MButton>
        </StyledColumn>
    );
};
