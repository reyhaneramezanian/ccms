import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { randomString } from 'src/utils/helper/random';
import { getHttpClient } from 'src/utils/http/axios';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError, AxiosRequestConfig } from 'axios';
import Compressor from 'compressorjs';
import { useField } from 'formik';
import { getFullImageUrl } from '@/utils/helper/ui';
import { BlobServiceClient } from '@azure/storage-blob';
import config from 'config';

export const blobServiceClient = new BlobServiceClient(config.blobUrl);
const containerClient = blobServiceClient.getContainerClient(config.containerName);

export type ImageUploadState = {
    uploading: boolean;
    done: number;
    progress: number;
    error: string;
    url: string;
};

export const initialState: ImageUploadState = {
    uploading: false,
    progress: 0,
    error: '',
    done: 0,
    url: ''
};

const imageUploaderSlice = createSlice({
    name: 'ImageReducerSlice',
    initialState,
    reducers: {
        uploadingStart: (state) => {
            state.uploading = true;
            state.progress = 0;
            state.url = '';
        },

        uploadingProgress: (state, { payload }: PayloadAction<number>) => {
            state.progress = payload;
        },
        uploadingError: (state, { payload }: PayloadAction<string>) => {
            state.uploading = false;
            state.progress = 0;
            state.error = payload;
        },
        uploadingDone: (state, { payload: url }: PayloadAction<string>) => {
            state.uploading = false;
            state.progress = 0;
            state.done += 1;
            state.url = url;
        },
        resetUrl: (state) => {
            state.uploading = false;
            state.progress = 0;
            state.error = '';
            state.done = 0;
            state.url = '';
        }
    }
});

function getSize(file: File | Blob) {
    let size;
    if (file.size < 1000000) {
        size = Math.floor(file.size / 1000) + 'KB';
    } else {
        size = Math.floor(file.size / 1000000) + 'MB';
    }
    return size;
}

export const reducer = imageUploaderSlice.reducer;
const { uploadingError, uploadingDone, uploadingProgress, uploadingStart, resetUrl } =
    imageUploaderSlice.actions;

export function useImageCompressedUploader() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [imageUrl, setImageUrl] = useState('');
    const handleResult = useCallback((res) => {
        if (res) {
            //set imageurl after upload
            setImageUrl(getFullImageUrl(`${res.data}`));
            dispatch(uploadingDone(res.data));
        } else {
            errorConfig.current = res.config;
            dispatch(uploadingError('error'));
        }
    }, []);
    const errorConfig = useRef<AxiosRequestConfig>();

    const imageUploader = useCallback((file: any, objectUrl) => {
        dispatch(uploadingStart());
        const randonString = randomString(10);
        const id = `${file?.name || ''}${randonString}`;
        const blobName = `${id}.jpg`;
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);

        new Compressor(file, {
            convertSize: 1000000,
            convertTypes: ['image/png', 'image/jpeg', 'image/jpg'],
            // The compression process is asynchronous,
            // which means you have to access the `result` in the `success` hook function.
            async success(result) {
                const size = getSize(result);

                try {
                    const SIZE = result.size;
                    await blockBlobClient.upload(result, SIZE, {
                        onProgress: ({ loadedBytes }) => {
                            var percentCompleted = ((loadedBytes / SIZE) * 100).toFixed(2);
                            dispatch(uploadingProgress(Number(percentCompleted)));
                        }
                    });

                    handleResult({ data: blobName });
                    // dispatch(uploadingDone({ id, url: blobName }));
                } catch (err) {
                    dispatch(uploadingError(err ? err.toString() : 'error'));
                    // fileRef.current = (err as AxiosError).config;
                    // dispatch(uploadingError(err ? err.toString() : 'error'));
                    console.error(err);
                }

                // const img = new Image();

                // img.onload = async function () {
                //     const formData = new FormData();
                //     const name = `${randomString(15)}.${result.type.replace('image/', '')}`;
                //     formData.append('file', result, name);

                //     try {
                //         const res = await getHttpClient()({
                //             url: '/api/data/image/',
                //             method: 'POST',
                //             data: formData,
                //             headers: {
                //                 'Content-Type': 'multipart/form-data',
                //                 'Access-Control-Allow-Origin': '*',
                //                 'Access-Control-Allow-Credentials': 'true',
                //                 'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept',
                //                 'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
                //                 attributes: JSON.stringify({
                //                     width: img.width,
                //                     height: img.height,
                //                     tag: 'apsy-image'
                //                 })
                //             },
                //             onUploadProgress: function (progressEvent) {
                //                 console.log((progressEvent.loaded * 100) / progressEvent.total);
                //                 // var percentCompleted = Math.round(
                //                 //     (progressEvent.loaded * 100) / progressEvent.total
                //                 // );
                //                 // dispatch(uploadingProgress(percentCompleted));
                //             }
                //         });

                //         handleResult(res);
                //     } catch (err) {
                //         errorConfig.current = (err as AxiosError).config;
                //         dispatch(uploadingError(err ? err.toString() : 'error'));
                //         console.error(err);
                //     }
                // };
                // img.src = objectUrl;
            },
            error(err) {
                dispatch(uploadingError(err ? err.toString() : 'error'));
            }
        });
    }, []);

    const retry = useCallback(async () => {
        try {
            if (errorConfig.current) {
                dispatch(uploadingStart());
                const res = await getHttpClient()(errorConfig.current);
                handleResult(res);
            }
        } catch (err) {
            errorConfig.current = (err as AxiosError).config;
            dispatch(uploadingError(err ? err.toString() : 'error'));
            console.error(err);
        }
    }, []);
    const removePhoto = () => {
        dispatch(resetUrl());
    };

    return {
        state,
        imageUrl,
        setImageUrl,
        imageUploader,
        retry,
        removePhoto
    };
}

export const useImageUploadOnSelect = (inputName: string) => {
    const inputFileRef = useRef<HTMLInputElement | null>();

    const { state, retry, imageUploader, removePhoto, imageUrl, setImageUrl } =
        useImageCompressedUploader();

    const uploadOnFile = useCallback(
        (file: File | Blob) => {
            const _URL = window.URL || window.webkitURL;
            const objectUrl = _URL.createObjectURL(file);
            imageUploader(file, objectUrl);
            //locally set imageurl
            setImageUrl(objectUrl);
        },
        [setImageUrl, imageUploader]
    );

    const InputComponent = useMemo(() => {
        return (
            <>
                <input
                    type="file"
                    id="actual-btn"
                    hidden
                    accept="image/*"
                    ref={(refs) => (inputFileRef.current = refs)}
                    onChange={(e) => {
                        if (!e?.target?.files || e?.target?.files?.length < 1) return;
                        uploadOnFile(e.target.files[0]);
                    }}
                />
                <input hidden name={inputName} readOnly value={imageUrl} id={inputName} />
            </>
        );
    }, [inputName, imageUrl, uploadOnFile]);

    const reset = useCallback(() => {
        setImageUrl('');
        removePhoto();
    }, [setImageUrl, removePhoto]);

    const onFilePick = useCallback(() => {
        inputFileRef.current.value = null;
        inputFileRef.current?.click();
    }, []);

    return {
        setImageUrl,
        state,
        retry,
        InputComponent,
        inputFileRef,
        imageUrl,
        reset,
        onFilePick,
        uploadOnFile
    };
};
