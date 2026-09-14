type Language = { name: AppLanguages; direction: AppDir };
export const DEFAULT_LANG: Language = { name: "en", direction: "ltr" };
export const AVAILABLE_LANGUAGE: Array<Language> = [
  { name: "en", direction: "ltr" },
  { name: "es", direction: "ltr" },
];
