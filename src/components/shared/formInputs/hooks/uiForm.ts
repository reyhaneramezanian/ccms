import useTranslation from '@/i18n/hooks/useTranslation';
import { useMemo } from 'react';
import * as Yup from 'yup';
import * as C from '../utilities/input.constant';

export function usePlaceForm() {
    const { t } = useTranslation();
    const validationSchemaHospital = useMemo(() => {
        return Yup.object({
            [C.N_INFO.prefix]: Yup.object().shape({
                [C.N_INFO.email]: Yup.string()
                    .email(t('form.validation.email'))
                    .required(t('form.validation.required')),
                [C.N_INFO.telNumber]: Yup.string().required(t('form.validation.required')),
                [C.N_INFO.title]: Yup.string().required(t('form.validation.required'))
            }),
            [C.N_ADDRESS.prefix]: Yup.object().shape({
                [C.N_ADDRESS.city]: Yup.string().required(t('form.validation.required'))
            })
        });
    }, []);
    const validationSchemaLab = useMemo(() => {
        return Yup.object({
            [C.N_INFO.prefix]: Yup.object().shape({
                [C.N_INFO.userName]: Yup.string()
                    .email(t('form.validation.email'))
                    .required(t('form.validation.required')),
                [C.N_INFO.telNumber]: Yup.string().required(t('form.validation.required')),
                [C.N_INFO.title]: Yup.string().required(t('form.validation.required'))
            }),
            [C.N_ADDRESS.prefix]: Yup.object().shape({
                [C.N_ADDRESS.city]: Yup.string().required(t('form.validation.required'))
            })
        });
    }, []);
    return {
        validationSchemaHospital,
        validationSchemaLab
    };
}
