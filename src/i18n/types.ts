import i18n from './config';

type i18nObjectType = typeof i18n.locales

export type Locale = i18nObjectType[number]["lang"]
const T:Locale = ""
export type Translations = {
    [key in Locale]: { [key: string]: string | any };
};

export type Strings = {
    [key in Locale]: Translations;
};

export type Localization = {
    direction: string
    locale: Locale;
    translations: Translations;
    namespaces: string | Array<string>;
};

export function isLocale(tested: string): tested is Locale {
    return i18n.locales.some(({ lang: key }) => key === tested);
}
