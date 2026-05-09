import * as React from "react";
import fr from "../locales/fr.json";
import es from "../locales/es.json";

type Language = "fr" | "es";
type Translations = typeof fr;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, options?: any) => any;
}

const translations: Record<Language, any> = { fr, es };

const LanguageContext = React.createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = React.useState<Language>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("language") as Language;
      if (saved === "fr" || saved === "es") return saved;
      
      // Try to detect browser language
      const browserLang = navigator.language.split("-")[0];
      if (browserLang === "es") return "es";
    }
    return "fr";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
  };

  // Simple nested key accessor: "hero.title" -> translations[lang].hero.title
  const t = (key: string, options?: any): any => {
    const keys = key.split(".");
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value && value[k]) {
        value = value[k];
      } else {
        return key; // Return the key if translation is missing
      }
    }
    
    // Simple interpolation for things like {city}
    if (typeof value === "string" && options) {
      Object.keys(options).forEach(optKey => {
        value = value.replace(`{${optKey}}`, options[optKey]);
      });
    }

    return value;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = React.useContext(LanguageContext);
  if (!context) {
    throw new Error("useTranslation must be used within a LanguageProvider");
  }
  return context;
}
