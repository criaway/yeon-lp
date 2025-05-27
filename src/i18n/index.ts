// Simplified i18n implementation with fixed PT-BR language
import { translations } from "@/data/translations";

const i18n = {
  t(key: string): string {
    const parts = key.split(".");
    let translation: any = translations.pt;

    // Navigate through nested keys (e.g., 'nav.home')
    for (const part of parts) {
      if (translation && translation[part]) {
        translation = translation[part];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }

    return typeof translation === "string" ? translation : key;
  },
};

export default i18n;
