import { FormikProps } from 'formik';
import { useRouter } from 'next/router';
import { useMemo, useRef } from 'react';
import { useGetIdFromUrl } from 'src/routes';

export function useInitializeForm<T>() {
    const id = useGetIdFromUrl();

    const formRef = useRef<FormikProps<T>>();
    const isEditForm = useRef(false);

    return {
        id,
        formRef,
        isEditForm
    };
}

export function useProviderIsReadOnly() {
    const router = useRouter();
    return useMemo(() => {
        return {
            email:
                // router.asPath.includes('doctors/edit') || router.asPath.includes('dentists/edit'),
                false,
            telNumber:
                // router.asPath.includes('doctors/edit') || router.asPath.includes('dentists/edit')
                false
        };
    }, []);
}
export function usePlaceIsReadOnly() {
    const router = useRouter();
    return useMemo(() => {
        return {
            telNumber: router.asPath.includes('hospitals-&-clinics/edit')
        };
    }, []);
}
