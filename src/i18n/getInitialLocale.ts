import i18n from "./config";

import { Locale, isLocale } from "./types";

export function getInitialLocale(): Locale {
  if (typeof window !== "undefined") {
    const localSetting = localStorage.getItem("locale");

    if (localSetting && isLocale(localSetting)) {
      return localSetting;
    }

    const [browserSetting] = navigator.language.split("-");

    if (isLocale(browserSetting)) {
      return browserSetting;
    }
  }
  return i18n.defaultLocale;
}
