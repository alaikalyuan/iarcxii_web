import { idTranslations } from "./locales/id";
import { enTranslations } from "./locales/en";
import { Language, TranslationDictionary } from "./types";

export * from "./types";

export const translations: Record<Language, TranslationDictionary> = {
  id: idTranslations,
  en: enTranslations,
};

export function getDictionary(lang: Language): TranslationDictionary {
  return translations[lang] || translations.id;
}
