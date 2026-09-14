import { FieldMetaProps } from 'formik';
import { ImageUploadState } from 'src/hooks/useImageUploader';

interface Props {
    WrapperComponent?: AppStyledComponent<any>;
    PlaceholderIcon?: React.FC<any>;
}

export interface CommonImageProps extends Props {
    onClick: () => void;
    state: ImageUploadState;
    url: string;
    retry: () => void;
    onRemove?: () => void;
}

export interface ImageUploaderProps extends Props {
    defaultUrl?: string;
    name: string;
    clearField: () => void;
    setField: (_: string) => void;
    UploadImageComponent?: React.FC<CommonImageProps>;
    meta?: FieldMetaProps<any>;
}
