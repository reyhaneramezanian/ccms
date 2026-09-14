import React from 'react';
import { useRouter } from 'next/router';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { isLocale, Localization, Locale } from './types';
// import * as defaultStrings from './locales/en';
import locales from './locales';
import { GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import i18n from './config';
import { useRef } from 'react';

/**
 * Language Context
 */
interface ContextProps {
    readonly localization: Localization;
    readonly setLocale: (localization: Localization) => void;
}

export const LanguageContext = React.createContext<ContextProps>({
    localization: {
        direction: 'ltr',
        locale: 'en', // default lang
        translations: {
            /*common: defaultStrings.common*/
        }, // default translations TODO: what to do here?
        namespaces: ['common'] // default namespace TODO: could we null this? 'common' might be misleading
    },
    setLocale: () => null
});

/**
 * Language Context: Provider
 */

export const LanguageProvider: React.FC<{ localization: Localization }> = ({
    localization,
    children
}) => {
    const init = useRef(true);

    const [localizationState, setLocalizationState] = React.useState({
        locale: localization?.locale,
        translations: localization?.translations,
        namespaces: localization?.namespaces
    });
    const [getStoredLocale, setStoredLocale] = useLocalStorage('locale');

    const { query } = useRouter();

    React.useEffect(() => {
        if (localizationState.locale !== getStoredLocale) {
            setStoredLocale(localizationState.locale);
        }
    }, [localizationState, setStoredLocale, getStoredLocale]);

    React.useEffect(() => {
        if (
            typeof query.lang === 'string' &&
            isLocale(query.lang) &&
            (localization?.locale !== query.lang || init.current)
        ) {
            init.current = false;
            setLocalizationState({
                locale: localization?.locale,
                translations: localization?.translations,
                namespaces: localization?.namespaces
            });
        }
    }, [query.lang, localizationState, localization]);

    return (
        <LanguageContext.Provider value={{ localization, setLocale: setLocalizationState }}>
            {children}
        </LanguageContext.Provider>
    );
};

const getDirection = (Language: any) => {
    const { locales } = i18n

    for (var key in locales) {
        const { lang, direction } = locales[key]
        
        if(Language == lang) return direction
      }
    return null;
}

export const getLocalizationProps = (
    ctx: GetStaticPropsContext<ParsedUrlQuery>,
    ...namespaces: Array<string>
) => {
    const lang: Locale = (ctx.params?.lang as Locale) || i18n.defaultLocale;
    const locale = locales[lang];

    const strings = namespaces.reduce(
        (acc, namespace) => ({
            ...acc,
            [namespace]: locale[namespace]
        }),
        {}
    );

    const translations = {
        ...strings
    };
    const Language = ctx.params?.lang || 'en'

    const direction = getDirection(Language)
    return {
        locale: Language,
        direction: direction,
        translations,
        namespaces
    };
};
