import React, { createContext, useContext } from "react";
import { translations } from "@/data/translations";

interface LanguageContextProps {
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextProps>({
  t: (key: string) => key,
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Simple translation function that always returns PT-BR translations
  const t = (key: string): string => {
    const parts = key.split(".");
    let translation: any = translations.pt;

    // Navigate through nested keys (e.g., 'nav.home')
    for (const part of parts) {
      if (translation && translation[part]) {
        translation = translation[part];
      } else {
        console.warn(`Chave de tradução não encontrada: ${key}`);
        return key;
      }
    }

    return typeof translation === "string" ? translation : key;
  };

  return (
    <LanguageContext.Provider value={{ t }}>
      {children}
    </LanguageContext.Provider>
  );
};
