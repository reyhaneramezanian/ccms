import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { randomString } from 'src/utils/helper/random';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Compressor from 'compressorjs';
import { BlobServiceClient } from '@azure/storage-blob';
import config from 'config';
import { AppHtmlInputProps } from '@/components/base/input/type.input';

export const blobServiceClient = new BlobServiceClient(config.blobUrl);
const containerClient = blobServiceClient.getContainerClient('');

export type MediaUploadState = {
    items: Array<{
        id: string;
        uploading: boolean;
        done: number;
        progress: string;
        error: string;
        url: string;
        localUrl: string;
        originalName: string;
        size: string;
        format: string;
    }>;
};

export const initialState: MediaUploadState = {
    items: []
};

const imageUploaderSlice = createSlice({
    name: 'ImageReducerSlice',
    initialState,
    reducers: {
        uploadingStart: (
            state,
            {
                payload: { id, localUrl, originalName, size, format }
            }: PayloadAction<{
                id: string;
                localUrl: string;
                originalName: string;
                size: string;
                format: string;
            }>
        ) => {
            state.items.push({
                uploading: true,
                progress: '0',
                url: '',
                id: id,
                done: 0,
                error: '',
                localUrl: localUrl,
                originalName: originalName,
                size: size,
                format: format
            });
        },
        uploadingProgress: (
            state,
            { payload: { id, progress } }: PayloadAction<{ id: string; progress: string }>
        ) => {
            const idx = state.items.findIndex((i) => i?.id === id);
            if (idx === -1) return;
            state.items[idx].progress = progress;
        },

        uploadingError: (
            state,
            { payload: { id, error } }: PayloadAction<{ id: string; error: string }>
        ) => {
            const idx = state.items.findIndex((i) => i?.id === id);
            if (idx === -1) return;
            state.items[idx].error = error;
            state.items[idx].uploading = false;
            state.items[idx].progress = '0';
        },
        uploadingDone: (
            state,
            { payload: { id, url } }: PayloadAction<{ id: string; url: string }>
        ) => {
            const idx = state.items.findIndex((i) => i?.id === id);
            if (idx === -1) return;
            state.items[idx].uploading = false;
            state.items[idx].progress = '100';
            state.items[idx].done += 1;
            state.items[idx].url = url;
        },
        removeItem: (state, { payload: { id } }: PayloadAction<{ id: string }>) => {
            const idx = state.items.findIndex((i) => i?.id === id);
            if (idx === -1) return;
            state.items.splice(idx, 1);
        },
        resetUrl: (state, { payload: { id } }: PayloadAction<{ id: string }>) => {
            const idx = state.items.findIndex((i) => i?.id === id);
            if (idx === -1) return;
            state.items[idx].uploading = false;
            state.items[idx].progress = '';
            state.items[idx].error = '';
            state.items[idx].done = 0;
            state.items[idx].url = '';
            state.items[idx].localUrl = '';
            state.items[idx].originalName = '';
            state.items[idx].size = '';
            state.items[idx].format = '';
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
const { uploadingError, uploadingDone, uploadingProgress, uploadingStart, resetUrl, removeItem } =
    imageUploaderSlice.actions;

export function useImageUploader() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const fileRef = useRef<Record<string, File | Blob>>({});

    const imageUploader = useCallback(async (file: File | Blob, objectUrl, id) => {
        if (!(id in fileRef.current)) {
            fileRef.current.id = file;
        }
        const blobName = `${id}.jpg`;
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);

        new Compressor(file, {
            convertSize: 1000000,
            convertTypes: ['image/png', 'image/jpeg', 'image/jpg'],
            // The compression process is asynchronous,
            // which means you have to access the `result` in the `success` hook function.
            async success(result) {
                const size = getSize(result);
                dispatch(
                    uploadingStart({
                        id,
                        localUrl: objectUrl,
                        size,
                        originalName: (file as File).name,
                        format: result.type.replace('image/', '')
                    })
                );
                try {
                    const SIZE = result.size;
                    await blockBlobClient.upload(result, SIZE, {
                        onProgress: ({ loadedBytes }) => {
                            dispatch(
                                uploadingProgress({
                                    id,
                                    progress: ((loadedBytes / SIZE) * 100).toFixed(2)
                                })
                            );
                        }
                    });
                    dispatch(uploadingDone({ id, url: blobName }));
                } catch (err) {
                    dispatch(uploadingError({ id, error: err ? err.toString() : 'error' }));
                    // fileRef.current = (err as AxiosError).config;
                    // dispatch(uploadingError(err ? err.toString() : 'error'));
                    console.error(err);
                }
            },
            error(err) {
                dispatch(uploadingError({ id, error: err ? err.toString() : 'error' }));
            }
        });
    }, []);

    const uploadOnFile = useCallback(
        (file: File | Blob, id = randomString(10)) => {
            const _URL = window.URL || window.webkitURL;
            const objectUrl = _URL.createObjectURL(file);
            imageUploader(file, objectUrl, id);
        },
        [imageUploader]
    );

    const retry = useCallback(
        async (id: string) => {
            try {
                if (id in fileRef) {
                    uploadOnFile(fileRef.current.id, id);
                }
                // dispatch(uploadingStart());
                // const res = await getHttpClient()(fileRef.current);
                // handleResult(res);
            } catch (err) {
                // fileRef.current = (err as AxiosError).config;
                dispatch(uploadingError({ id, error: err ? err.toString() : 'error' }));
                console.error(err);
            }
        },
        [uploadOnFile]
    );

    const removeMedia = useCallback(
        (id: string) => {
            dispatch(removeItem({ id }));
        },
        [dispatch]
    );

    return {
        state,
        imageUploader,
        uploadOnFile,
        retry,
        removeMedia
    };
}

export const useUploadInput = (uploadOnFile: (_: File) => void, props?: AppHtmlInputProps) => {
    const inputFileRef = useRef<HTMLInputElement | null>();

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
                    {...props}
                />
            </>
        );
    }, [uploadOnFile, props]);

    const onFilePick = useCallback(() => {
        if (inputFileRef.current) inputFileRef.current.value = null;
        inputFileRef.current?.click();
    }, []);

    return {
        InputComponent,
        inputFileRef,
        onFilePick
    };
};

export function useVideoUploader(callback) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const fileRef = useRef<Record<string, File | Blob>>({});

    const videoUploader = useCallback(async (file: File | Blob, objectUrl, id) => {
        if (!(id in fileRef.current)) {
            fileRef.current.id = file;
        }
        const blobName = `${id}.mp4`;
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        const size = getSize(file);
        dispatch(
            uploadingStart({
                id,
                localUrl: objectUrl,
                size,
                originalName: (file as File).name,
                format: file.type
            })
        );

        try {
            const SIZE = file.size;

            const uploadBlobResponse = await blockBlobClient.upload(file, SIZE, {
                onProgress: ({ loadedBytes }) => {
                    dispatch(
                        uploadingProgress({
                            id,
                            progress: ((loadedBytes / SIZE) * 100).toFixed(2)
                        })
                    );
                }
            });
            dispatch(uploadingDone({ id, url: blobName }));
            callback?.({
                id,
                localUrl: objectUrl,
                size,
                originalName: (file as File).name,
                format: file.type,
                url: blobName
            });
        } catch (err) {
            dispatch(uploadingError({ id, error: err ? err.toString() : 'error' }));
            // fileRef.current = (err as AxiosError).config;
            // dispatch(uploadingError(err ? err.toString() : 'error'));
            console.error(err);
        }
    }, []);

    const uploadOnFile = useCallback(
        (file: File | Blob, id = randomString(10)) => {
            const _URL = window.URL || window.webkitURL;
            const objectUrl = _URL.createObjectURL(file);
            videoUploader(file, objectUrl, id);
        },
        [videoUploader]
    );

    const retry = useCallback(
        async (id: string) => {
            try {
                if (id in fileRef) {
                    uploadOnFile(fileRef.current.id, id);
                }
                // dispatch(uploadingStart());
                // const res = await getHttpClient()(fileRef.current);
                // handleResult(res);
            } catch (err) {
                // fileRef.current = (err as AxiosError).config;
                dispatch(uploadingError({ id, error: err ? err.toString() : 'error' }));
                console.error(err);
            }
        },
        [uploadOnFile]
    );

    const removeMedia = useCallback(
        (id: string) => {
            dispatch(removeItem({ id }));
        },
        [dispatch]
    );

    return {
        state,
        videoUploader,
        uploadOnFile,
        retry,
        removeMedia
    };
}
