import config from 'config';

export function getFullImageUrl(url?: string) {
    if (url?.includes?.(config.blobBaseUrl)) return url;

    return url && `${config.blobBaseUrl}/images/${url}`;
}
