import config from 'config';
import { BlobServiceClient } from '@azure/storage-blob';
import { useState } from 'react';
import { randomString } from '@/utils/helper/random';

const blobServiceClient = new BlobServiceClient(config.blobUrl);
const containerClient = blobServiceClient.getContainerClient(config.containerName);

export function useFileUpload(
    initialData = { file: undefined, url: undefined, progress: undefined },
    callback: (data: { file: File; url: string; progress: number }) => void
) {
    const [result, setResult] = useState(initialData);

    async function upload(file) {
        if (!file) return;

        const [fileName, extention] = file?.name?.split('.');
        const name = `${fileName}-${randomString(10)}.${extention}`;
        const size = file.size;
        const blockBlobClient = containerClient.getBlockBlobClient(name);
        const _URL = window.URL || window.webkitURL;
        const objectUrl = _URL.createObjectURL(file);
        const result = { progress: 0, file, url: name, objectUrl };

        // callback?.(result);

        await blockBlobClient.upload(file, size, {
            onProgress: ({ loadedBytes }) => {
                setResult({
                    ...result,
                    progress: +((loadedBytes / size) * 100).toFixed(2)
                });
            }
        });

        result.progress = 100;

        setResult(result);
        callback?.(result);
    }

    function reset() {
        const initialData = { file: undefined, url: undefined, progress: undefined };

        setResult(initialData);
        callback?.(initialData);
    }

    return { upload, reset, ...result };
}
