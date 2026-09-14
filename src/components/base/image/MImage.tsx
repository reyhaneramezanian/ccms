import { forwardRef, HTMLAttributes, memo } from 'react';
import { useQuery } from 'react-query';

const DEFAULT_ADDRESS = '/images/1.png';

type PropTypes = HTMLAttributes<HTMLImageElement> & {
    resources: {
        src: string;
        fallback?: string;
    };
};

const queryConfigs = {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchIntervalInBackground: false,
    staleTime: Infinity,
    cacheTime: Infinity
};

export const MImage = memo(
    forwardRef(({ resources, ...rest }: PropTypes, ref) => {
        const { data: dataSrc } = useQuery(
            resources?.src,
            async () => {
                return await fetch(resources?.src)
                    .then(async (d) => await d.blob())
                    .then((p) => URL.createObjectURL(p));
            },
            { ...queryConfigs, enabled: !!resources?.src }
        );

        const { data: dataFallback } = useQuery(
            resources?.fallback,
            async () => {
                return await fetch(resources?.fallback)
                    .then(async (d) => await d.blob())
                    .then((p) => URL.createObjectURL(p));
            },
            { ...queryConfigs, enabled: !!resources?.fallback }
        );
        const { data: dataPlaceholder } = useQuery(
            DEFAULT_ADDRESS,
            async () => {
                return await fetch(DEFAULT_ADDRESS)
                    .then(async (d) => await d.blob())
                    .then((p) => URL.createObjectURL(p));
            },
            queryConfigs
        );

        const data = dataSrc || dataFallback || dataPlaceholder;

        return (
            <img
                {...rest}
                ref={ref as any}
                //if src is not provided
                src={data}
                onError={(e) => {
                    e.currentTarget.onerror = null;
                    //if src is provided but fails to load
                    e.currentTarget.src = dataFallback || dataPlaceholder;
                }}
            />
        );
    })
);
