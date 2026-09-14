import { useRouter } from 'next/router';
import React from 'react';
import useTranslation from '@/i18n/hooks/useTranslation';
import i18n from '@/i18n/config';

const LocaleSwitcher: React.FC = () => {
    const router = useRouter();
    const handleLocaleChange = React.useCallback(
        (e: React.ChangeEvent<HTMLSelectElement>) => {
            const targetLang = e.target.value;
            const regex = new RegExp(`^/(${i18n.locales.map(({ lang: key }) => key).join('|')})`);
            router.push(router.pathname, router.asPath.replace(regex, `/${targetLang}`));
        },
        [router]
    );
    const { t, locale } = useTranslation();
    
    return (
        <div>
            <label className="language-switcher">
                {t("localeSwitcher")}
                <select onChange={handleLocaleChange} defaultValue={locale}>
                    {i18n.locales.map(({ lang: key }, i) => (
                        <option value={key} key={i}>
                            {key}
                        </option>
                    ))}
                </select>
            </label>
        </div>
    );
};

export default LocaleSwitcher;
