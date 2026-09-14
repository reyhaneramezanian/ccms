import React, { memo, useCallback, useEffect, useRef } from 'react';
import { useField, useFormikContext } from 'formik';
import { UploadImageProductCommon } from './cc';
import { ImageUploaderProps } from './type.image';
import { useImageUploadOnSelect } from 'src/hooks/useImageUploader';
import { getFullImageUrl } from '@/utils/helper/ui';

export const MImageUploader = memo(
    ({
        name,
        defaultUrl,
        clearField,
        setField,
        UploadImageComponent = UploadImageProductCommon,
        ...props
    }: ImageUploaderProps) => {
        const { state, InputComponent, imageUrl, setImageUrl, retry, reset, onFilePick } =
            useImageUploadOnSelect(name);

        const init = useRef(false);
        useEffect(() => {
            if (!init.current && typeof defaultUrl === 'string' && defaultUrl) {
                setImageUrl(getFullImageUrl(defaultUrl));
                init.current = true;
            }
        }, [defaultUrl, setImageUrl]);

        useEffect(() => {
            if (state.done && state.url) {
                setField(state.url);
            }
        }, [state, setField]);

        const onRemove = useCallback(() => {
            reset();
            clearField();
        }, [clearField, reset]);
        return (
            <>
                <UploadImageComponent
                    state={state}
                    retry={retry}
                    url={imageUrl || defaultUrl}
                    onRemove={onRemove}
                    onClick={onFilePick}
                    {...props}
                />
                {InputComponent}
            </>
        );
    },
    (prev, next) =>
        prev.name === next.name &&
        prev.defaultUrl === next.defaultUrl &&
        next?.meta?.touched === prev?.meta?.touched &&
        next?.meta?.error === prev?.meta?.error
);

export const MImageUploaderFormik = (
    props: Omit<ImageUploaderProps, 'clearField' | 'setField' | 'defaultUrl'>
) => {
    const [field, meta] = useField(props.name);
    const { setFieldValue } = useFormikContext();

    const clearField = useCallback(() => {
        setFieldValue(props.name, '');
    }, [props, setFieldValue]);

    const setField = useCallback(
        (value: string) => {
            if (value) {
                setFieldValue(props.name, value);
            }
        },
        [props, setFieldValue]
    );

    return (
        <MImageUploader
            {...props}
            defaultUrl={field?.value}
            meta={meta}
            clearField={clearField}
            setField={setField}
        />
    );
};
