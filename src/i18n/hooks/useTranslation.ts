import { useContext, useEffect } from "react";
import { LanguageContext } from "../LanguageContext";

function keyError(key: string, locale: string) {
  console.warn(`Translation '${key}' for locale '${locale}' not found.`);
  return "";
}

export default function useTranslation(namespace = "common") {
  const { localization } = useContext(LanguageContext);

  function t(key: string) {
    try {
      if (!key.includes(".")) {
        if (!localization.translations[namespace][key]) {
          keyError(key, localization.locale);
        }
        return localization.translations[namespace][key];
      }

      const objKeyTrace = key.split(".");
      let lastObject: any = localization.translations[namespace];
      objKeyTrace.forEach((k) => {
        if (!lastObject[k]) {
          keyError(key, localization.locale);
        }
        lastObject = lastObject[k];
      });
      return lastObject;
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (!(namespace in localization.translations)) {
      console.error(
        `Outside the Language Provider or namespace ${namespace} is not exists in your page namespaces`
      );
    }
  }, [namespace, localization]);

  return {
    t,
    locale: localization.locale,
  };
}
